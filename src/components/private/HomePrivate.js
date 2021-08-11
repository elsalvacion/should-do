import React, { useContext, useEffect } from "react";
import Home from "../layout/Home";
import AuthContext from "../../context/auth/authContext";
import { Redirect, withRouter } from "react-router-dom";
const HomePrivate = ({ ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loginUser } = authContext;
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    user && loginUser(user);

    //eslint-disable-next-line
  }, []);
  if (isAuthenticated) return <Home />;
  return <Redirect to="/login" />;
};

export default withRouter(HomePrivate);
