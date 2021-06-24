import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import axios from "axios";
import Alert from "../layout/Alert";

const Login = () => {
  useEffect(() => {
    document.title = "Should Do - Login";
  }, []);

  const authContext = useContext(AuthContext);
  const { loginUser, isAuthenticated } = authContext;

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    type: null,
    msg: [],
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.get("/user");

      const available = res.data.filter((user) => {
        if (user.email === login.email && user.password === login.password) {
          return user;
        } else {
          return null;
        }
      });
      const data = {
        email: login.email,
        password: login.password,
      };
      if (available.length > 0) {
        loginUser(data);
        setLogin({
          email: "",
          password: "",
        });
      } else {
        setAlert({
          type: "error",
          msg: ["Incorrect Email or Password"],
        });
      }
    } catch (err) {
      console.log("Error");
    }
  };

  const clearAlert = () => {
    setAlert({
      type: "",
      msg: [],
    });
  };
  return isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <div className="row login">
      <div className="conatiner">
        <form
          className="col col s10 offset-s1 m8 offset-m2 "
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="row center">
            <h3>Login</h3>
          </div>
          {alert.msg.length > 0 && (
            <Alert type={alert.type} msg={alert.msg} clearAlert={clearAlert} />
          )}
          {/* EMAIL */}
          <div className="row">
            <div className="input-field col s12">
              <input
                id="email"
                type="email"
                className="validate"
                name="email"
                onChange={(e) => handleChange(e)}
                required
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="row">
            <div className="input-field col s12">
              <input
                id="password"
                type="password"
                className="validate"
                name="password"
                onChange={(e) => handleChange(e)}
                required
              />
              <label htmlFor="password">Password</label>
              <p>
                <Link to="/forget">Forget Password? </Link>{" "}
              </p>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="row">
            <div className="input-field col s12">
              <button
                className="btn waves-effect waves-light teal darken-4"
                type="submit"
                name="action"
              >
                Login
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
          <div className="row">
            <p>
              New to ShouldDo? Create a new account{" "}
              <Link to="/register">here</Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
