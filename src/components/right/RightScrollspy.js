import React, { Fragment, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min";

const RightScrollspy = () => {
  return (
    <Fragment>
      <div className="col hide-on-small-only m3 l2 spy">
        <ul className="section table-of-contents">
          <li>
            <a href="#sun" className="scroll-link">
              Yesterday
            </a>
          </li>
          <li>
            <a href="#mon" className="scroll-link">
              Today
            </a>
          </li>
          <li>
            <a href="#tue" className="scroll-link">
              Tomorrow
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default RightScrollspy;
