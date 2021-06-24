import React, { useContext } from "react";
import TaskContext from "../../context/task/taskContext";
const TaskDay = ({ day }) => {
  const taskContext = useContext(TaskContext);
  const { setHistory } = taskContext;
  return (
    <div className="task-head">
      <h4 className="heading">{day}</h4>
      <a
        onClick={() => setHistory()}
        href="#!"
        className="btn-floating btn-large waves-effect waves-light teal darken-4 tooltipped"
        data-position="top"
        data-tooltip="History"
      >
        <i className="medium material-icons">history</i>
      </a>
    </div>
  );
};

export default TaskDay;
