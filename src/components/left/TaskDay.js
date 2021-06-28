import React, { useContext, useEffect } from "react";
import TaskContext from "../../context/task/taskContext";
import M from "materialize-css/dist/js/materialize.min";

const TaskDay = ({ day, historyTasks }) => {
  const taskContext = useContext(TaskContext);
  const { setHistory } = taskContext;
  useEffect(() => {
    M.Tooltip.init(document.querySelectorAll(".tooltipped"));
  });
  return (
    <div className="task-head">
      <h4 className="heading">{day}</h4>
      {historyTasks.length > 0 && (
        <a
          onClick={() => setHistory()}
          href="#!"
          className="btn-floating btn teal darken-4 tooltipped"
          data-position="top"
          data-tooltip="History"
        >
          <i className=" material-icons">history</i>
        </a>
      )}
    </div>
  );
};

export default TaskDay;
