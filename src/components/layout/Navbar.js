import React, { Fragment, useContext } from "react";
import TaskContext from "../../context/taskContext";

const Navbar = () => {
  const taskContext = useContext(TaskContext);

  const { setToday, setTomorrow } = taskContext;
  return (
    <Fragment>
      <nav className="teal darken-4">
        <div className="nav-wrapper">
          <div className="container">
            <a href="#!" className="left brand-logo">
              Should <span>Do</span>
            </a>
            <a
              href="#!"
              data-target="sidenav"
              className="right  sidenav-trigger"
            >
              <i className="large material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a href="#!" className="nav-link center">
                  Help
                </a>
              </li>
              <li>
                <a href="#!" className="nav-link center">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <ul className=" teal darken-4 sidenav " id="sidenav">
        <li>
          <a
            onClick={() => setToday()}
            href="#!"
            className="white-text nav-link center"
          >
            Today
          </a>
        </li>
        <li>
          <a
            onClick={() => setTomorrow()}
            href="#!"
            className="white-text nav-link center"
          >
            Tomorrow
          </a>
        </li>
        <li>
          <a href="#!" className="white-text nav-link center">
            Help
          </a>
        </li>
        <li>
          <a href="#!" className="white-text nav-link center">
            About
          </a>
        </li>
      </ul>
    </Fragment>
  );
};

export default Navbar;
