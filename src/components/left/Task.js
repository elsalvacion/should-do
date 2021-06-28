import React, { Fragment, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min";

const Task = (props) => {
  useEffect(() => {
    M.Collapsible.init(document.querySelectorAll(".collapsible"), {
      accordion: true,
    });
    M.Tooltip.init(document.querySelectorAll(".tooltipped"));
  });
  const { task, changeToDone, delTask, taskEdit, history } = props;
  const { status, task_name, id, time, current_date } = task;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(current_date);
  return (
    <div className={`collection-item ${status}`}>
      <div>
        <b>
          {history
            ? days[date.getDay()] +
              ", " +
              date.getDate() +
              " " +
              months[date.getMonth()] +
              " " +
              date.getFullYear()
            : time}{" "}
        </b>
        {task_name}
        <div className="secondary-content">
          {!history && (
            <Fragment>
              {status === "done" ? (
                <a
                  href="#!"
                  className="tooltipped manip-task"
                  data-position="top"
                  data-tooltip="Undone"
                  onClick={() => changeToDone(task, "undone")}
                >
                  <i className="material-icons red-text">clear</i>
                </a>
              ) : (
                <a
                  href="#!"
                  className="tooltipped manip-task"
                  data-position="left"
                  data-tooltip="Done"
                  onClick={() => changeToDone(task, "done")}
                >
                  <i className="material-icons green-text">check</i>
                </a>
              )}
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
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
