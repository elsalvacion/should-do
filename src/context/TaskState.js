import React, { useReducer } from "react";
import TaskContext from "./taskContext";
import taskReducer from "./taskReducer";
import {
  SET_LOADING,
  SET_ERRORS,
  SET_TODAY,
  SET_TOMORROW,
  SET_EDIT,
  GET_TODAY,
  GET_TOMORROW,
  FETCH_OTHER_TASK,
  CHANGE_TASK,
  DELETE_TASK,
  GET_TASK,
  CHANGE_STATUS,
  EDIT_TASK,
  CLEAR_EDIT,
} from "./types";

import axios from "axios";

const TaskState = (props) => {
  const initState = {
    loading: false,
    errors: false,
    today: [],
    yesterday: [],
    tomorrow: [],
    history: [],
    toEdit: null,
  };

  const [state, action] = useReducer(taskReducer, initState);

  // Create a new task
  const createTask = async (data, day = "today") => {
    try {
      setLoading();
      if (day === "today") {
        axios.post("/today", data, {
          "Content-Type": "application/json",
        });

        action({
          name: SET_TODAY,
          value: data,
        });
      }
      if (day === "tomorrow") {
        axios.post("/today", data, {
          "Content-Type": "application/json",
        });

        action({
          name: SET_TOMORROW,
          value: data,
        });
      }
    } catch (err) {
      action({
        name: SET_ERRORS,
      });
    }
  };

  const getTasks = async () => {
    try {
      const res = axios.get("/today");
      console.log(res.data);
      action({
        name: GET_TODAY,
        value: res.data,
      });
    } catch (err) {
      action({
        name: SET_ERRORS,
      });
    }
  };

  const changeStatus = (task, status) => {
    setLoading();

    task.status = status;
    action({
      name: CHANGE_STATUS,
      value: task,
    });
  };

  const deleteTask = async (id) => {
    try {
      setLoading();
      await axios.delete(`/today/${id}`);
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
      await axios.put(`/today/${task.id}`, task, {
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
        toEdit: state.toEdit,
        createTask,
        setLoading,
        setError,
        changeStatus,
        deleteTask,
        editTask,
        getTasks,
        setToEdit,
        clearEdit,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
