import React from "react";
import Task from "../components/left/Task";

const LeftTasks = () => {
  return (
    <div className="tasks">
      <h5 className="heading center">Fri, 4 Jun 2021. </h5>
      <ul class="collection">
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
