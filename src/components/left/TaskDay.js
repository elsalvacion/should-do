import React from "react";

const TaskDay = ({ day }) => {
  return (
    <div className="task-head">
      <h4 className="heading">{day}</h4>
      <a
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
