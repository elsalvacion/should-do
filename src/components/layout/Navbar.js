import React, { Fragment, useContext } from "react";
import TaskContext from "../../context/task/taskContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const taskContext = useContext(TaskContext);

  const { setToday, setTomorrow } = taskContext;
  return (
    <Fragment>
      <nav className="teal darken-4">
        <div className="nav-wrapper">
          <div className="container">
            <NavLink to="/" className="left brand-logo">
              Should <span>Do</span>
            </NavLink>
            <NavLink
              to="/"
              data-target="sidenav"
              className="right  sidenav-trigger"
            >
              <i className="large material-icons">menu</i>
            </NavLink>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <NavLink to="/" className="nav-link center">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/help" className="nav-link center">
                  Help
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="nav-link center">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="nav-link center">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="nav-link center">
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <ul className=" teal darken-4 sidenav " id="sidenav">
        <li>
          <NavLink
            onClick={() => setToday()}
            to="/"
            className="white-text nav-link center"
          >
            Today
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={() => setTomorrow()}
            to="/"
            className="white-text nav-link center"
          >
            Tomorrow
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="white-text nav-link center">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/help" className="white-text nav-link center">
            Help
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="white-text nav-link center">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="white-text nav-link center">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className="white-text nav-link center">
            Register
          </NavLink>
        </li>
      </ul>
    </Fragment>
  );
};

export default Navbar;
