import React, { useReducer } from "react";
import axios from "axios";
import CryptoJs from "crypto-js";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import config from "../../config";
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SET_ERRORS,
  SET_LOADING,
} from "./types";

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    authLoading: false,
    authErrors: false,
  };

  const [state, action] = useReducer(authReducer, initialState);
  const secretKey = "onlyfortesting";

  const registerUser = async (data) => {
    try {
      setLoading();

      await axios.post(`${config.dbKey}/user`, data, {
        "Content-Type": "application/json",
      });

      action({
        name: REGISTER_USER,
      });
    } catch (err) {
      console.log(err);
      action({
        name: SET_ERRORS,
      });
    }
  };

  const loginUser = async (data) => {
    try {
      setLoading();
      const res = await axios.get(`${config.dbKey}/user`);

      const available = res.data.filter((user) => {
        const pwd1 = CryptoJs.AES.decrypt(user.password, secretKey).toString(
          CryptoJs.enc.Utf8
        );
        const pwd2 = CryptoJs.AES.decrypt(data.password, secretKey).toString(
          CryptoJs.enc.Utf8
        );
        if (user.email === data.email && pwd1 === pwd2) {
          return user;
        } else {
          return null;
        }
      });

      if (available) {
        action({
          name: LOGIN_USER,
          value: available[0],
        });
      } else {
        action({
          name: SET_ERRORS,
        });
      }
    } catch (err) {
      console.log(err);
      action({
        name: SET_ERRORS,
      });
    }
  };

  const logoutUser = () => {
    action({
      name: LOGOUT_USER,
    });
  };

  const setLoading = () => {
    action({
      name: SET_LOADING,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        authLoading: state.authLoading,
        authErrors: state.authErrors,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
