import React, { useContext } from "react";
import TaskContext from "../../context/task/taskContext";
const LeftTop = () => {
  const taskContext = useContext(TaskContext);
  const { setFilter } = taskContext;

  return (
    <div className="row">
      <div className="col s12 search">
        <label htmlFor="filter">Max Length 10 characteres</label>
        <input
          id="search"
          type="text"
          placeholder="Filter task by status, id, title, time"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default LeftTop;
