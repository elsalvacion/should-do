import React, { Fragment, useContext, useEffect } from "react";
import Indicators from "../components/left/Indicators";
import Task from "../components/left/Task";
import TaskDay from "../components/left/TaskDay";
import TaskContext from "../context/taskContext";

const LeftTasks = () => {
  const taskContext = useContext(TaskContext);
  const { filtered, today, changeStatus, deleteTask, setToEdit, getTasks } =
    taskContext;

  useEffect(() => {
    getTasks();
  }, []);

  let completed = [];
  let uncompleted = [];
  let cancelled = [];
  let elapsed = [];
  let todayTask = null;
  if (filtered) {
    todayTask = filtered;
    console.log("Filtered at left task: ", filtered);
  } else {
    todayTask = today;
  }
  if (todayTask.length > 0) {
    todayTask.map((task) => {
      if (task.status === "undone") {
        uncompleted.push(task);
      } else if (task.status === "done") {
        completed.push(task);
      } else if (task.status === "cancelled") {
        cancelled.push(task);
      } else if (task.status === "elapsed") {
        elapsed.push(task);
      }
    });
  }

  if (!todayTask) {
    return (
      <Fragment>
        <h4 className="center">No Task added today.</h4>
        <p className="center">You can add by clicking on the + icons</p>
      </Fragment>
    );
  }

  return (
    <div className="tasks">
      <Indicators />
      <TaskDay day="Today" />
      <ul className="collapsible popout">
        {uncompleted.length > 0 && (
          <li>
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
          <li>
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
          <li>
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
