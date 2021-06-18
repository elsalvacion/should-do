import React, { useEffect } from "react";
import Indicators from "../components/left/Indicators";
import LeftTop from "../components/left/LeftTop";
import RightScrollspy from "../components/right/RightScrollspy";
import LeftTasks from "./LeftTasks";

const Main = () => {
  useEffect(() => {
    document.title = "Should Do - Home";
  }, []);
  return (
    <div className="row">
      <div className="col m9 s11 left" id="left">
        <div className="container">
          <LeftTop />
          <Indicators />
        </div>
        <LeftTasks />
      </div>
      <div className="col m3 s0 hide-on-small right">
        <RightScrollspy />
      </div>
    </div>
  );
};

export default Main;
