import React, { Fragment } from "react";

const AddTask = () => {
  return (
    <Fragment>
      <div class="fixed-action-btn">
        <a
          href="#!"
          className="btn-floating btn-large waves-effect waves-light teal darken-4 tooltipped modal-trigger"
          data-target="add-task"
          data-position="top"
          data-tooltip="Create Task"
        >
          <i className="large material-icons">add</i>
        </a>
      </div>
      <div id="add-task" className="modal">
        <div className="modal-content">
          <h4 className="center">Add a To-DO</h4>
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="task_name" className="dark-text">
                Summarize Task (Max-Length: 50 Characters)
              </label>
              <input
                id="task_name"
                name="task_name"
                type="text"
                maxLength="50"
              />
            </div>
            <div className="col s12">
              <label htmlFor="date">Pick a Date</label>
              <input type="text" class="datepicker" name="date" id="date" />
            </div>
            <div className="col s12">
              <label htmlFor="time">Pick a Time</label>
              <input type="text" class="timepicker" name="time" id="time" />
            </div>
            <div className="col s12">
              <a
                href="#!"
                className="modal-close waves-effect waves-green btn-flat teal darken-4 white-text modal-submit"
              >
                Add
              </a>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat red white-text modal-btn"
          >
            Close
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default AddTask;
