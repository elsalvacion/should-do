import React, { useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min";

const Task = (props) => {
  useEffect(() => {
    M.Collapsible.init(document.querySelectorAll(".collapsible"), {
      accordion: true,
    });
  });
  const { task, changeToDone, delTask, taskEdit } = props;
  const { status, task_name, id, time } = task;
  return (
    <div className={`collection-item ${status}`}>
      <div>
        <b>{time} </b> {task_name}
        <div className="secondary-content">
          <a
            href="#!"
            className="tooltipped manip-task"
            data-position="left"
            data-tooltip="Done"
            onClick={() => changeToDone(task, "done")}
          >
            <i className="material-icons green-text">check</i>
          </a>
          <a
            href="#!"
            className="tooltipped manip-task"
            data-position="top"
            data-tooltip="Cancel"
            onClick={() => changeToDone(task, "undone")}
          >
            <i className="material-icons red-text">clear</i>
          </a>
          <a
            href="#!"
            className="tooltipped manip-task modal-trigger"
            data-position="top"
            data-tooltip="Edit"
            data-target="add-task"
            onClick={() => taskEdit(task)}
          >
            <i className="material-icons grey-text">edit</i>
          </a>
          <a
            href="#!"
            className="tooltipped manip-task"
            data-position="right"
            data-tooltip="Delete"
            onClick={() => delTask(id)}
          >
            <i className="material-icons red-text">delete</i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Task;
