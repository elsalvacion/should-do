import React from "react";
import Indicators from "../components/left/Indicators";
import Task from "../components/left/Task";

const LeftTasks = () => {
  return (
    <div className="tasks">
      <Indicators />
      <div className="task-head">
        <h4 className="heading">Today</h4>
        <a
          href="#!"
          className="btn-floating btn-large waves-effect waves-light teal darken-4 tooltipped"
          data-position="top"
          data-tooltip="History"
        >
          <i className="medium material-icons">history</i>
        </a>
      </div>
      <ul class="collection">
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </ul>
    </div>
  );
};

export default LeftTasks;
