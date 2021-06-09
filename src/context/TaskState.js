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
  CHANGE_STATUS,
  EDIT_TASK,
  CLEAR_EDIT,
} from "./types";

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
  const createTask = (data, day = "today") => {
    setLoading();
    if (day === "today") {
      action({
        name: SET_TODAY,
        value: data,
      });
    }
    if (day === "tomorrow") {
      action({
        name: SET_TOMORROW,
        value: data,
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

  const deleteTask = (id) => {
    setLoading();
    action({
      name: DELETE_TASK,
      value: id,
    });
  };
  const editTask = (task) => {
    action({
      name: EDIT_TASK,
      value: task,
    });
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
        setToEdit,
        clearEdit,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
