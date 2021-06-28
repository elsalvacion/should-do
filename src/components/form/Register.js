import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import axios from "axios";
import CryptoJs from "crypto-js";
import Alert from "../layout/Alert";
import Spinner from "../layout/Spinner";
import config from "../../config";

const Register = () => {
  useEffect(() => {
    document.title = "Should Do - Register";
  }, []);

  const authContext = useContext(AuthContext);
  const { registerUser, authLoading } = authContext;
  const secretKey = "onlyfortesting";

  const [register, setRegister] = useState({
    first_name: "",
    last_name: "",
    email: "",
    confirm_email: "",
    password: "",
    confirm_password: "",
  });

  const clearAlert = () => {
    setAlert({
      type: "",
      msg: [],
    });
  };

  const [alert, setAlert] = useState({
    type: null,
    msg: [],
  });

  let history = useHistory();

  const handleChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${config.dbKey}/user`);
      let pwd = CryptoJs.AES.encrypt(register.password, secretKey).toString();

      const available = res.data.filter((user) => {
        if (user.email === register.email) {
          return user;
        } else {
          return null;
        }
      });

      if (available.length > 0) {
        setAlert({
          type: "error",
          msg: ["User Email Exist"],
        });
      } else {
        if (
          register.email !== register.confirm_email ||
          register.password !== register.confirm_password
        ) {
          setAlert({
            type: "error",
            msg: ["Email or Password do not match"],
          });
        } else {
          const data = {
            first_name: register.first_name,
            last_name: register.last_name,
            email: register.email,
            password: pwd,
          };
          setRegister({
            first_name: "",
            last_name: "",
            email: "",
            confirm_email: "",
            password: "",
            confirm_password: "",
          });
          registerUser(data);
          history.push("/login");
        }
      }
    } catch (err) {
      console.log("Error at Register");
    }
  };

  return (
    <div className="row">
      <div className="conatiner">
        <form
          className="col col s10 offset-s1 m8 offset-m2 "
          onSubmit={(e) => handleSubmit(e)}
        >
          {authLoading && <Spinner />}
          <div className="row center">
            <h3>Register</h3>
            <p>
              Already a member? <Link to="/login">Login</Link>{" "}
            </p>
          </div>

          {alert.msg.length > 0 && (
            <Alert type={alert.type} msg={alert.msg} clearAlert={clearAlert} />
          )}

          {/* NAME */}
          <div className="row">
            <div className="input-field col s6">
              <input
                id="first_name"
                type="text"
                className="validate"
                name="first_name"
                onChange={(e) => handleChange(e)}
                required
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="input-field col s6">
              <input
                id="last_name"
                type="text"
                className="validate"
                name="last_name"
                onChange={(e) => handleChange(e)}
                required
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
          </div>
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

          <div className="row">
            <div className="input-field col s12">
              <input
                id="confirm_email"
                type="email"
                className="validate"
                name="confirm_email"
                onChange={(e) => handleChange(e)}
                required
              />
              <label htmlFor="confirm_email">Confirm Email</label>
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
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="confirm_password"
                type="password"
                className="validate"
                name="confirm_password"
                onChange={(e) => handleChange(e)}
                required
              />
              <label htmlFor="confirm_password">Confirm Password</label>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="row">
            <div className="input-field col s12">
              <button className="btn teal darken-4" type="submit" name="action">
                Register
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
