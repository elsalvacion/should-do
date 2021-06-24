import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "materialize-css/dist/css/materialize.css";
import M from "materialize-css/dist/js/materialize";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import TaskState from "./context/task/TaskState";
import AuthState from "./context/auth/AuthState";
import About from "./components/layout/About";
import Help from "./components/layout/Help";
import Login from "./components/form/Login";
import Register from "./components/form/Register";
import Forget from "./components/form/Forget";
import HomePrivate from "./components/private/HomePrivate";
function App() {
  useEffect(() => {
    M.AutoInit();
    M.Modal.init(document.querySelectorAll(".modal"));
  });

  return (
    <Router>
      <AuthState>
        <TaskState>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <HomePrivate />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/help">
              <Help />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/forget">
              <Forget />
            </Route>
          </Switch>
        </TaskState>
      </AuthState>
    </Router>
  );
}

export default App;
