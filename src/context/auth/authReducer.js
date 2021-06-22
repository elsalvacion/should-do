import React from "react";
import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, SET_USER } from "./types";

const authReducer = (state, action) => {
  switch (action.name) {
    case REGISTER_USER:
      return {
        ...state,
        authLoading: false,
        authErrors: false,
      };
    case LOGIN_USER:
      return {
        ...state,
        user: action.value,
        isAuthenticated: true,
        authLoading: false,
        authErrors: false,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        authLoading: false,
        authErrors: false,
      };
    default:
      return state;
  }
};

export default authReducer;
