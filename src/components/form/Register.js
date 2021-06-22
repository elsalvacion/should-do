import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import axios from "axios";

const Register = () => {
  useEffect(() => {
    document.title = "Should Do - Register";
  }, []);

  const authContext = useContext(AuthContext);
  const { registerUser } = authContext;

  const [register, setRegister] = useState({
    first_name: "",
    last_name: "",
    email: "",
    confirm_email: "",
    password: "",
    confirm_password: "",
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

    const res = await axios.get("/user");

    const available = res.data.filter((user) => {
      if (user.email === register.email) {
        return user;
      } else {
        return null;
      }
    });

    if (available.length > 0) {
      console.log("User Exist");
    } else {
      const data = {
        first_name: register.first_name,
        last_name: register.last_name,
        email: register.email,
        password: register.password,
      };
      registerUser(data);
      setRegister({
        first_name: "",
        last_name: "",
        email: "",
        confirm_email: "",
        password: "",
        confirm_password: "",
      });
      history.push("/login");
    }
  };
  return (
    <div className="row">
      <div className="conatiner">
        <form
          className="col col s10 offset-s1 m8 offset-m2 "
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="row center">
            <h3>Register</h3>
            <p>
              Already a member? <Link to="/login">Login</Link>{" "}
            </p>
          </div>

          {/* NAME */}
          <div className="row">
            <div className="input-field col s6">
              <input
                placeholder="Placeholder"
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
                id="confirm email"
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
              <button
                className="btn waves-effect waves-light teal darken-4"
                type="submit"
                name="action"
              >
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
