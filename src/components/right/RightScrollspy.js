import React, { Fragment, useContext } from "react";
import TaskContext from "../../context/taskContext";

const RightScrollspy = () => {
  const taskContext = useContext(TaskContext);
  const { setToday, setTomorrow } = taskContext;
  return (
    <Fragment>
      <div className="col hide-on-small-only m3 l2 spy">
        <ul className="section table-of-contents">
          <li>
            <a onClick={() => setToday()} href="#!" className="scroll-link ">
              Today
            </a>
          </li>
          <li>
            <a onClick={() => setTomorrow()} href="#!" className="scroll-link ">
              Tomorrow
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default RightScrollspy;
