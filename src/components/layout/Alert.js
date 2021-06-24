import { useState } from "react";

const Alert = (props) => {
  const [toggle, setToggle] = useState(true);
  const { type, msg, clearAlert } = props;

  const handleToggle = () => {
    setToggle(!toggle);
    clearAlert();
  };
  return (
    <div
      className={`white-text left-text alert ${type} ${
        toggle ? "show" : "hide"
      }`}
      id="alert"
    >
      {" "}
      <p className={type}>
        <a
          href="#!"
          className="secondary-content"
          onClick={(e) => {
            handleToggle();
          }}
        >
          <i className=" material-icons white-text">close</i>
        </a>
      </p>
      {msg.map((alert, idx) => (
        <li key={idx} className={type}>
          {alert}
        </li>
      ))}
    </div>
  );
};

export default Alert;
