import React, { Fragment, useContext, useEffect } from "react";
import Indicators from "../components/left/Indicators";
import Task from "../components/left/Task";
import TaskDay from "../components/left/TaskDay";
import TaskContext from "../context/taskContext";

const LeftTasks = () => {
  const taskContext = useContext(TaskContext);
  const {
    today,
    tomorrow,
    // yesterday,
    filtered,
    allTasks,
    changeStatus,
    deleteTask,
    setToEdit,
    getTasks,
  } = taskContext;

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, []);

  let completed = [];
  let uncompleted = [];
  let elapsed = [];
  let todayTask = null;

  const fetchData = () => {
    if (filtered) {
      todayTask = filtered;
      console.log("Filtered at left task: ", filtered);
    } else {
      todayTask = allTasks;
    }
    if (todayTask.length > 0) {
      uncompleted = [];
      completed = [];
      elapsed = [];
      // eslint-disable-next-line
      todayTask.map((task) => {
        if (today) {
          if (task.status === "undone" && task.day === "today") {
            uncompleted.push(task);
          } else if (task.status === "done" && task.day === "today") {
            completed.push(task);
          } else if (task.status === "elapsed" && task.day === "today") {
            elapsed.push(task);
          }
        }

        if (tomorrow) {
          if (task.status === "undone" && task.day === "tomorrow") {
            uncompleted.push(task);
          } else if (task.status === "done" && task.day === "tomorrow") {
            completed.push(task);
          } else if (task.status === "elapsed" && task.day === "tomorrow") {
            elapsed.push(task);
          }
        }

        // if (yesterday) {
        //   if (task.status === "undone" && task.day === "yesterday") {
        //     uncompleted.push(task);
        //   } else if (task.status === "done" && task.day === "yesterday") {
        //     completed.push(task);
        //   } else if (task.status === "cancelled" && task.day === "yesterday") {
        //     cancelled.push(task);
        //   } else if (task.status === "elapsed" && task.day === "yesterday") {
        //     elapsed.push(task);
        //   }
        // }
      });
    }
  };

  fetchData();

  if (
    completed.length === 0 &&
    uncompleted.length === 0 &&
    elapsed.length === 0
  ) {
    return (
      <Fragment>
        <h4 className="center">No Entry.</h4>
        <p className="center">You can add by clicking on the + icons</p>
      </Fragment>
    );
  }

  return (
    <div className="tasks">
      <Indicators />
      <TaskDay today={today} />
      <ul className="collapsible popout">
        {uncompleted.length > 0 && (
          <li className={completed.length === 0 ? "active" : undefined}>
            <div className="collapsible-header">
              <i className="material-icons">access_time</i>UnCompleted Tasks
            </div>
            <div className="collapsible-body">
              <div className="collection">
                {uncompleted.map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    changeToDone={changeStatus}
                    delTask={deleteTask}
                    taskEdit={setToEdit}
                  />
                ))}
              </div>
            </div>
          </li>
        )}

        {completed.length > 0 && (
          <li className="active">
            <div className="collapsible-header">
              <i className="material-icons">check</i>Completed Tasks
            </div>
            <div className="collapsible-body">
              <div className="collection">
                {completed.map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    changeToDone={changeStatus}
                    delTask={deleteTask}
                    taskEdit={setToEdit}
                  />
                ))}
              </div>
            </div>
          </li>
        )}

        {elapsed.length > 0 && (
          <li
            className={
              completed.length === 0 && uncompleted.length === 0
                ? "active"
                : undefined
            }
          >
            <div className="collapsible-header">
              <i className="material-icons">alarm_off</i>Elapsed Tasks
            </div>
            <div className="collapsible-body">
              <div className="collection">
                {elapsed.map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    changeToDone={changeStatus}
                    delTask={deleteTask}
                    taskEdit={setToEdit}
                  />
                ))}
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default LeftTasks;
