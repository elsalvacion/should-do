import React, { Fragment } from "react";

const Navbar = () => {
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
          <a href="#!" className="white-text nav-link">
            Help
          </a>
        </li>
        <li>
          <a href="#!" className="white-text nav-link">
            About
          </a>
        </li>
      </ul>
    </Fragment>
  );
};

export default Navbar;
