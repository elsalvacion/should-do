import React, { useReducer } from "react";
import TaskContext from "./taskContext";
import taskReducer from "./taskReducer";
import {
  SET_LOADING,
  SET_ERRORS,
  SET_TODAY,
  SET_TOMORROW,
  SET_HISTORY,
  SET_EDIT,
  DELETE_TASK,
  GET_TASK,
  CHANGE_STATUS,
  EDIT_TASK,
  CLEAR_EDIT,
  SET_FILTER,
  CLEAR_FILTER,
  SET_HISTORY_TASK,
  GET_HISTORY_TASK,
} from "./types";
import config from "../../config";
import axios from "axios";

const TaskState = (props) => {
  const initState = {
    loading: false,
    errors: false,
    allTasks: [],
    historyTask: [],
    today: true,
    yesterday: false,
    tomorrow: false,
    history: null,
    toEdit: null,
    filtered: null,
  };

  const [state, action] = useReducer(taskReducer, initState);

  const compareDate = (date) => {
    const d1 = new Date();
    const d2 = new Date(date);
    const dayCompare = d1.getDate() > d2.getDate();
    const monthCompare = d1.getMonth() > d2.getMonth();
    const yearCompare = d1.getFullYear() > d2.getFullYear();

    return dayCompare || monthCompare || yearCompare;
  };

  // Create a new task
  const createTask = async (data) => {
    try {
      setLoading();

      await axios.post(`${config.dbKey}/tasks/`, data, {
        "Content-Type": "application/json",
      });

      getTasks();
    } catch (err) {
      action({
        name: SET_ERRORS,
      });
    }
  };

  const setHistoryTask = async (task) => {
    try {
      setLoading();

      await axios.post(`${config.dbKey}/history`, task, {
        "Content-Type": "application/json",
      });

      action({
        name: SET_HISTORY_TASK,
        value: task,
      });
    } catch (err) {
      console.log(err);
      action({
        name: SET_ERRORS,
      });
    }
  };

  const deleteTaskSendToHistory = async (id) => {
    try {
      setLoading();
      await axios.delete(`${config.dbKey}/tasks/${id}`);
    } catch (err) {
      console.log(err);
      action({
        name: SET_ERRORS,
      });
    }
  };

  const getTasks = async () => {
    try {
      setLoading();

      const user = JSON.parse(sessionStorage.getItem("user"));

      let res = await axios.get(`${config.dbKey}/tasks`);

      let tasks = res.data;

      const getOnlyMyTask = tasks.filter((task) => {
        if (user._id === task.userId) return task;
        else return null;
      });

      const historyRemoved = getOnlyMyTask.filter((task) => {
        if (compareDate(task.current_date)) {
          setHistoryTask(task);
          deleteTaskSendToHistory(task._id);
          return null;
        } else {
          return task;
        }
      });

      action({
        name: GET_TASK,
        value: historyRemoved,
      });
    } catch (err) {
      action({
        name: SET_ERRORS,
      });
    }
  };

  const getHistoryTask = async () => {
    try {
      setLoading();

      const res = await axios.get(`${config.dbKey}/history`);

      const user = JSON.parse(sessionStorage.getItem("user"));

      let tasks = res.data;

      const getOnlyHisHistory = tasks.filter((task) => {
        if (user._id === task.userId) return task;
        else return null;
      });

      action({
        name: GET_HISTORY_TASK,
        value: getOnlyHisHistory,
      });
    } catch (err) {
      console.log(err);
      action({
        name: SET_ERRORS,
      });
    }
  };

  const changeStatus = async (task, status) => {
    try {
      setLoading();
      task.status = status;
      await axios.put(`${config.dbKey}/tasks/${task._id}`, task, {
        "Content-type": "application/json",
      });
      action({
        name: CHANGE_STATUS,
        value: task,
      });
    } catch (err) {
      console.log(err);
      action({
        name: SET_ERRORS,
      });
    }
  };

  const deleteTask = async (id) => {
    try {
      setLoading();
      await axios.delete(`${config.dbKey}/tasks/${id}`);
      action({
        name: DELETE_TASK,
        value: id,
      });
    } catch (err) {
      console.log(err);
      action({
        name: SET_ERRORS,
      });
    }
  };
  const editTask = async (task) => {
    try {
      setLoading();

      await axios.put(`${config.dbKey}/tasks/${task._id}`, task, {
        "Content-Type": "application/json",
      });
      action({
        name: EDIT_TASK,
        value: task,
      });
    } catch (err) {
      console.log(err);
      action({
        name: SET_ERRORS,
      });
    }
  };

  const setToEdit = (task) => {
    setLoading();
    action({
      name: SET_EDIT,
      value: task,
    });
  };

  const clearEdit = () => {
    setLoading();
    action({
      name: CLEAR_EDIT,
    });
  };

  const setFilter = (text) => {
    setLoading();
    text = text.toLowerCase();
    let filterArray = null;
    if (
      text !== "" &&
      state.allTasks.length > 0 &&
      (state.today || state.tomorrow)
    ) {
      filterArray = state.allTasks.filter((task) =>
        task.task_name.toLowerCase().includes(text) ||
        task.time.toLowerCase().includes(text)
          ? task
          : null
      );
      console.log(
        "Today",
        state.today,
        "Filtered at task state: ",
        filterArray
      );
    }
    if (text !== "" && state.allTasks.length > 0 && state.history) {
      filterArray = state.historyTask.filter((task) =>
        task.task_name.toLowerCase().includes(text) ||
        task.time.toLowerCase().includes(text)
          ? task
          : null
      );
    }

    if (filterArray) {
      action({
        name: SET_FILTER,
        value: filterArray,
      });
    } else {
      action({
        name: CLEAR_FILTER,
      });
      console.log("No data");
    }
  };

  const setToday = () => {
    setLoading();
    action({
      name: SET_TODAY,
    });
  };

  const setTomorrow = () => {
    setLoading();
    action({
      name: SET_TOMORROW,
    });
  };

  const setHistory = () => {
    setLoading();
    action({
      name: SET_HISTORY,
    });
  };

  const setLoading = () => {
    action({
      name: SET_LOADING,
    });
  };

  const setError = () => {
    action({
      name: SET_ERRORS,
    });
  };
  return (
    <TaskContext.Provider
      value={{
        loading: state.loading,
        errors: state.errors,
        today: state.today,
        tomorrow: state.tomorrow,
        yesterday: state.yesterday,
        allTasks: state.allTasks,
        toEdit: state.toEdit,
        filtered: state.filtered,
        history: state.history,
        historyTask: state.historyTask,
        createTask,
        setLoading,
        setError,
        changeStatus,
        deleteTask,
        editTask,
        getTasks,
        setToEdit,
        clearEdit,
        setFilter,
        setToday,
        setTomorrow,
        setHistory,
        getHistoryTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
