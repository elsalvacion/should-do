import React from "react";

const LeftTop = () => {
  return (
    <div className="row">
      <div className="col s12 search">
        <input
          id="search"
          type="text"
          placeholder="Filter task by title or description ..."
        />
      </div>
    </div>
  );
};

export default LeftTop;
