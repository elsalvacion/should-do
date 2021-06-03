import React, { Fragment } from "react";

const RightScrollspy = () => {
  return (
    <Fragment>
      <div className="col hide-on-small-only m3 l2">
        <ul className="section table-of-contents">
          <li>
            <a href="#sun" className="scroll-link">
              Sun
            </a>
          </li>
          <li>
            <a href="#mon" className="scroll-link">
              Mon
            </a>
          </li>
          <li>
            <a href="#tue" className="scroll-link">
              Tue
            </a>
          </li>
          <li>
            <a href="#wed" className="scroll-link">
              Wed
            </a>
          </li>
          <li>
            <a href="#thu" className="scroll-link">
              Thu
            </a>
          </li>
          <li>
            <a href="#fri" className="scroll-link">
              Fri
            </a>
          </li>
          <li>
            <a href="#sat" className="scroll-link">
              Sat
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default RightScrollspy;
