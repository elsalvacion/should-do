import React, { useReducer } from "react";
import TaskContext from "./taskContext";
import taskReducer from "./taskReducer";
import {
  SET_LOADING,
  SET_ERRORS,
  SET_TODAY,
  SET_TOMORROW,
  SET_EDIT,
  DELETE_TASK,
  GET_TASK,
  SET_TASK,
  CHANGE_STATUS,
  EDIT_TASK,
  CLEAR_EDIT,
  SET_FILTER,
  CLEAR_FILTER,
  // SET_YESTERDAY,
} from "./types";

import axios from "axios";

const TaskState = (props) => {
  const initState = {
    loading: false,
    errors: false,
    allTasks: [],
    today: true,
    yesterday: false,
    tomorrow: false,
    history: null,
    toEdit: null,
    filtered: null,
  };

  const [state, action] = useReducer(taskReducer, initState);

  // Credit to Stackoverflow
  const get24HrsFrmAMPM = (timeStr) => {
    if (timeStr && timeStr.indexOf(" ") !== -1 && timeStr.indexOf(":") !== -1) {
      var hrs = 0;
      var tempAry = timeStr.split(" ");
      var hrsMinAry = tempAry[0].split(":");
      hrs = parseInt(hrsMinAry[0], 10);
      if ((tempAry[1] === "AM" || tempAry[1] === "am") && hrs === 12) {
        hrs = 0;
      } else if ((tempAry[1] === "PM" || tempAry[1] === "pm") && hrs !== 12) {
        hrs += 12;
      }
      return (
        ("0" + hrs).slice(-2) +
        ":" +
        ("0" + parseInt(hrsMinAry[1], 10)).slice(-2)
      );
    } else {
      return null;
    }
  };

  const calcElapsed = (time) => {
    const hrs = new Date().getHours();

    const mins = new Date().getMinutes();

    const timeStr = get24HrsFrmAMPM(time);

    const timeSplit = timeStr.split(":");

    if (Number(hrs) > Number(timeSplit[0])) {
      return "elapsed";
    } else {
      if (
        Number(hrs) === Number(timeSplit[0]) &&
        Number(mins) > Number(timeSplit[1])
      ) {
        // console.log("Time has elapsed");
        return "elapsed";
      } else {
        // console.log("Time didnt elapsed");
        return false;
      }
    }
  };

  // Create a new task
  const createTask = async (data) => {
    try {
      setLoading();

      const checkTimeStatus = calcElapsed(data.time);

      if (checkTimeStatus === "elapsed") {
        data.status = "elapsed";
      }

      axios.post("/tasks", data, {
        "Content-Type": "application/json",
      });

      action({
        name: SET_TASK,
        value: data,
      });
    } catch (err) {
      action({
        name: SET_ERRORS,
      });
    }
  };

  const getTasks = async () => {
    try {
      let res = await axios.get("/tasks");

      let tasks = res.data;

      // console.log("Res.data: ", res.data);

      const checkedTasks = tasks.map((task) => {
        const checkTimeStatus = calcElapsed(task.time);

        if (checkTimeStatus === "elapsed") {
          task.status = "elapsed";
        }
        return task;
      });

      // console.log("Checked Time: ", checkedTasks);

      action({
        name: GET_TASK,
        value: checkedTasks,
      });
    } catch (err) {
      action({
        name: SET_ERRORS,
      });
    }
  };

  const changeStatus = async (task, status) => {
    try {
      setLoading();
      task.status = status;
      await axios.put(`/tasks/${task.id}`, task, {
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
      await axios.delete(`/tasks/${id}`);
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
      const checkTimeStatus = calcElapsed(task.time);

      if (checkTimeStatus === "elapsed") {
        task.status = "elapsed";
      }
      await axios.put(`/tasks/${task.id}`, task, {
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
    action({
      name: SET_EDIT,
      value: task,
    });
  };

  const clearEdit = () => {
    action({
      name: CLEAR_EDIT,
    });
  };

  const setFilter = (text) => {
    text = text.toLowerCase();
    setLoading();
    let filterArray = null;
    if (text !== "" && state.allTasks.length > 0) {
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
    action({
      name: SET_TODAY,
    });
  };

  const setTomorrow = () => {
    action({
      name: SET_TOMORROW,
    });
  };

  // const setYesterday = () => {
  //   action({
  //     name: SET_YESTERDAY,
  //   });
  // };

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
        // setYesterday,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
