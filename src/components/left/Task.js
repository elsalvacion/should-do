import React from "react";

const Task = () => {
  return (
    <li class="collection-item ">
      <div>
        Change Wifi pass
        <div className="secondary-content">
          <a
            href="#!"
            className="tooltipped"
            data-position="left"
            data-tooltip="Done"
          >
            <i className="material-icons green-text">check</i>
          </a>
          <a
            href="#!"
            className="tooltipped"
            data-position="top"
            data-tooltip="Cancel"
          >
            <i className="material-icons red-text">clear</i>
          </a>
          <a
            href="#!"
            className="tooltipped"
            data-position="top"
            data-tooltip="Edit"
          >
            <i className="material-icons grey-text">edit</i>
          </a>
          <a
            href="#!"
            className="tooltipped"
            data-position="right"
            data-tooltip="Delete"
          >
            <i className="material-icons red-text">delete</i>
          </a>
        </div>
      </div>
    </li>
  );
};

export default Task;