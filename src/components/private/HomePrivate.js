import React, { useContext } from "react";
import Home from "../layout/Home";
import AuthContext from "../../context/auth/authContext";
import { Redirect, withRouter } from "react-router-dom";
const HomePrivate = ({ ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  if (isAuthenticated) return <Home />;
  return <Redirect to="/login" />;
};

export default withRouter(HomePrivate);
