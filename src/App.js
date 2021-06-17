import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Main from "./containers/Main";
import AddTask from "./components/layout/AddTask";
import TaskState from "./context/TaskState";
import About from "./components/layout/About";
import Help from "./components/layout/Help";
function App() {
  useEffect(() => {
    M.AutoInit();
  });

  return (
    <Router>
      <TaskState>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Fragment>
              <Main />
              <AddTask />
            </Fragment>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/help">
            <Help />
          </Route>
        </Switch>
      </TaskState>
    </Router>
  );
}

export default App;
