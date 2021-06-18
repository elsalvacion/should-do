import React, { useEffect } from "react";
import { Link } from "react-router-dom";
const Forget = () => {
  useEffect(() => {
    document.title = "Should Do - Forget";
  }, []);

  return (
    <div className="row forget">
      <div className="conatiner">
        <form className="col col s10 offset-s1 m8 offset-m2 ">
          <div className="row center">
            <h3>Reset Password</h3>
          </div>
          {/* EMAIL */}
          <div className="row">
            <div className="input-field col s12">
              <input id="email" type="email" className="validate" />
              <label htmlFor="email">Email</label>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="row">
            <div className="input-field col s12">
              <input id="old-password" type="password" className="validate" />
              <label htmlFor="old-password">Old Password</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input id="new-password" type="password" className="validate" />
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
