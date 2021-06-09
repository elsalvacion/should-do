import React, { Fragment, useEffect } from "react";
const AddTaskForm = (props) => {
  const { task, handleChange } = props;
  const { task_name, day, time } = task;
  useEffect(() => {
    document.querySelector("#task_name").focus();
  });
  return (
    <Fragment>
      <div className="input-field col s12">
        <label htmlFor="task_name" className="dark-text">
          Summarize Task (Max-Length: 50 Characters)
        </label>
        <input
          id="task_name"
          name="task_name"
          value={task_name}
          onChange={(e) => handleChange(e)}
          type="text"
          maxLength="50"
        />
      </div>
      <div className="input-field col s12">
        <select name="day" value={day} onChange={(e) => handleChange(e)}>
          <option value="" disabled selected>
            Choose a day
          </option>
          <option value="today">Today</option>
          <option value="tommorow">Tomorrow</option>
        </select>
        <label>Select Day</label>
      </div>
      <div className="col s12">
        <label htmlFor="time">Pick a Time</label>
        <input
          type="text"
          className="timepicker"
          value={time}
          onSelect={(e) => handleChange(e)}
          name="time"
          id="time"
        />
      </div>
    </Fragment>
  );
};

export default AddTaskForm;
