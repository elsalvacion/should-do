import React, { Fragment, useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Main from "./containers/Main";
import AddTask from "./components/layout/AddTask";
import TaskState from "./context/TaskState";
function App() {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <Fragment>
      <Navbar />
      <TaskState>
        <Main />
        <AddTask />
      </TaskState>
    </Fragment>
  );
}

export default App;
