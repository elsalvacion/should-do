import React, { useReducer } from "react";
import TaskContext from "./taskContext";
import taskReducer from "./taskReducer";
import {
  SET_LOADING,
  SET_ERRORS,
  SET_TASK,
  GET_TASK,
  FETCH_OTHER_TASK,
  CHANGE_TASK,
  DELETE_TASK,
  CHANGE_STATUS,
  EDIT_TASK,
} from "./types";

const TaskState = (props) => {
  const initState = {
    loading: false,
    errors: false,
    tasks: {
      today: null,
      yesterday: null,
      tomorrow: null,
    },
    history: [],
  };

  const [state, action] = useReducer(taskReducer, initState);

  // Create a new task
  const createTask = (data) => {
    action({
      name: SET_TASK,
      value: data,
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
        tasks: state.tasks,
        createTask,
        setLoading,
        setError,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
