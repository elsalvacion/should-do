import React, { useContext } from "react";
import TaskContext from "../../context/taskContext";
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
          id="filter"
          onChange={(e) => {
            console.log(e.target.value);
            setFilter(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default LeftTop;
