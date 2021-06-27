import axios from "axios";
import CryptoJs from "crypto-js";
import React, { useEffect, useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Alert from "../layout/Alert";
import Spinner from "../layout/Spinner";
import AuthContext from "../../context/auth/authContext";
import config from "../../config";

const Forget = () => {
  const authContext = useContext(AuthContext);
  const { authLoading } = authContext;

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
  const secretKey = "onlyfortesting";

  const handleChange = (e) => {
    setPass({
      ...pass,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${config.dbKey}/user`);

      let user = res.data.filter((usr) => {
        const pwd = CryptoJs.AES.decrypt(usr.password, secretKey).toString(
          CryptoJs.enc.Utf8
        );
        if (usr.email === pass.email && pwd === pass.password) return usr;
        else return null;
      });

      if (user.length > 0) {
        user = user[0];
        const newPwd = CryptoJs.AES.encrypt(
          pass.newPassword,
          secretKey
        ).toString();
        const userData = {
          ...user,
          password: newPwd,
        };

        await axios.put(`${config.dbKey}/user/${user.id}`, userData, {
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
          {authLoading && <Spinner />}

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
