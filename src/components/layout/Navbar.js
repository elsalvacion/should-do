import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
const Navbar = () => {
  const { isAuthenticated, logoutUser } = useContext(AuthContext);
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
              {isAuthenticated ? (
                <Fragment>
                  <li>
                    <NavLink to="/" className="nav-link center">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about" className="nav-link center">
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/help" className="nav-link center">
                      Help
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={(e) => logoutUser()}
                      to="#!"
                      className="nav-link center"
                    >
                      Logout
                    </NavLink>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li>
                    <NavLink to="/about" className="nav-link center">
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/help" className="nav-link center">
                      Help
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
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <ul className=" teal darken-4 sidenav " id="sidenav">
        {isAuthenticated ? (
          <Fragment>
            <li>
              <NavLink to="/" className="nav-link center white-text">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-link center white-text">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/help" className="nav-link center white-text">
                Help
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={(e) => logoutUser()}
                to="#!"
                className="nav-link center white-text"
              >
                Logout
              </NavLink>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <NavLink to="/about" className="nav-link center white-text">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/help" className="nav-link center white-text">
                Help
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="nav-link center white-text">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="nav-link center white-text">
                Register
              </NavLink>
            </li>
          </Fragment>
        )}
      </ul>
    </Fragment>
  );
};

export default Navbar;
