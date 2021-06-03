import React from "react";
import LeftTop from "../components/left/LeftTop";
import RightScrollspy from "../components/right/RightScrollspy";
import LeftTasks from "./LeftTasks";

const Main = () => {
  return (
    <div className="row">
      <div className="col m9 s12 left">
        <div className="container">
          <LeftTop />
        </div>
        <LeftTasks />
      </div>
      <div className="col m3 s0 right">
        <RightScrollspy />
      </div>
    </div>
  );
};

export default Main;
