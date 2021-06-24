import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Alert from "../layout/Alert";
const Forget = () => {
  useEffect(() => {
    document.title = "Should Do - Forget";
  }, []);

  const [pass, setPass] = useState({
    email: "",
    password: "",
    newPassword: "",
  });

  const [alert, setAlert] = useState({
    type: null,
    msg: [],
  });

  const history = useHistory();

  const handleChange = (e) => {
    setPass({
      ...pass,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("/user");

      if (res.status === 200 && res.data.length >= 1) {
        let user = res.data.filter((usr) => {
          if (usr.email === pass.email && usr.password === pass.password)
            return usr;
          else return null;
        });

        if (user.length > 0) {
          user = user[0];

          const userData = {
            ...user,
            password: pass.newPassword,
          };

          await axios.put(`/user/${user.id}`, userData, {
            "Content-Type": "application/json",
          });

          setPass({
            email: "",
            password: "",
            newPassword: "",
          });

          history.push("/login");
        } else {
          setAlert({
            type: "error",
            msg: ["Incorrect Email or Password"],
          });
        }
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
  return (
    <div className="row forget">
      <div className="conatiner">
        <form
          className="col s10 offset-s1 m8 offset-m2 "
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="row center">
            <h3>Reset Password</h3>
          </div>
          {alert.msg.length > 0 && (
            <Alert type={alert.type} msg={alert.msg} clearAlert={clearAlert} />
          )}
          {/* EMAIL */}
          <div className="row">
            <div className="input-field col s12">
              <input
                value={pass.email}
                onChange={(e) => handleChange(e)}
                name="email"
                id="email"
                type="email"
                className="validate"
                required
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="row">
            <div className="input-field col s12">
              <input
                id="old-password"
                name="password"
                value={pass.password}
                onChange={(e) => handleChange(e)}
                type="password"
                className="validate"
                required
              />
              <label htmlFor="old-password">Old Password</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="new-password"
                name="newPassword"
                value={pass.newPassword}
                onChange={(e) => handleChange(e)}
                type="password"
                className="validate"
                required
              />
              <label htmlFor="new-password">New Password</label>
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
                Change
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

export default Forget;
