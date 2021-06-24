import React, { Fragment, useState, useContext, useEffect } from "react";
import AddTaskForm from "../form/AddTaskForm";
import TaskContext from "../../context/task/taskContext";
import AuthContext from "../../context/auth/authContext";
import { v4 as uuidv4 } from "uuid";
import { Redirect } from "react-router-dom";
import Alert from "./Alert";

const AddTask = () => {
  const taskContext = useContext(TaskContext);
  const { createTask, toEdit, editTask, clearEdit } = taskContext;
  const { user } = useContext(AuthContext);
  const [task, setTask] = useState({
    task_name: "",
    day: "today",
    time: "",
  });

  useEffect(() => {
    if (toEdit) {
      setTask(toEdit);
    }
  }, [taskContext, toEdit]);

  const [alert, setAlert] = useState({
    type: null,
    msg: [],
  });

  const clearAlert = () => {
    setAlert({
      type: "",
      msg: [],
    });
  };
  const addTask = (e) => {
    e.preventDefault();

    try {
      if (task.task_name === "" || task.time === "") {
        setAlert({
          type: "error",
          msg: ["All fields are required"],
        });
      } else {
        if (user) {
          const data = {
            id: uuidv4(),
            ...task,
            status: "undone",
            current_date: new Date(),
            userId: user.id,
          };

          createTask(data);

          setAlert({
            type: "success",
            msg: ["Successfully added"],
          });
        } else {
          <Redirect to="/login" />;
        }
      }
    } catch (err) {
      console.log("Error at add task");
    }
  };

  const changeTask = () => {
    try {
      if (task.task_name === "" || task.time === "") {
        setAlert({
          type: "error",
          msg: ["All fields are required"],
        });
      } else {
        editTask(task);

        setAlert({
          type: "success",
          msg: ["Successfully added"],
        });
      }
    } catch (err) {
      console.log("Error");
    }
  };

  const clearAll = () => {
    clearEdit();
    resetStates();
    setAlert({
      type: "",
      msg: [],
    });
  };

  const resetStates = () => {
    setTask({
      time: "",
      task_name: "",
      day: "today",
    });
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      <div className="fixed-action-btn">
        <a
          href="#!"
          className="btn-floating btn-large waves-effect waves-light teal darken-4 tooltipped modal-trigger"
          data-target="add-task"
          data-position="top"
          data-tooltip="Create Task"
        >
          <i className="large material-icons">add</i>
        </a>
      </div>
      <div id="add-task" className="modal">
        <div className="modal-content">
          <h4 className="center">Add a To-DO</h4>
          <div className="row">
            <form onSubmit={(e) => addTask(e)}>
              {alert.msg.length > 0 && (
                <Alert
                  type={alert.type}
                  msg={alert.msg}
                  clearAlert={clearAlert}
                />
              )}
              <AddTaskForm task={task} handleChange={handleChange} />
              <div className="col s12">
                <a
                  href="#!"
                  type="submit"
                  className={`waves-effect waves-green btn-flat teal darken-4 white-text modal-submit `}
                  onClick={toEdit ? changeTask : addTask}
                >
                  {toEdit ? "Update" : "Add"}
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat white-text modal-btn"
            onClick={(e) => clearAll()}
          >
            Close
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default AddTask;
