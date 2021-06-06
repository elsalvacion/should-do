import React from "react";
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

const taskReducer = (state, action) => {
  switch (action.name) {
    case SET_TASK: {
      return {
        ...state,
        loading: false,
        errors: false,
      };
    }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: true,
      };
    default:
      return state;
  }
};

export default taskReducer;
