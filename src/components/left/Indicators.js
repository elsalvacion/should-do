import React from "react";

const Indicators = () => {
  return (
    <div className="center circles">
      <div className="valign-wrapper">
        <i className="material-icons done-circle">lens</i>
        Completed
      </div>
      <div className="valign-wrapper">
        <i className="material-icons undone-circle">lens</i>
        Uncomplete
      </div>
      <div className="valign-wrapper">
        <i className="material-icons elapsed-circle">lens</i>
        Elapsed
      </div>
    </div>
  );
};

export default Indicators;
