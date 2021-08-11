import React, { Fragment, useContext, useEffect } from "react";
import Spinner from "../components/layout/Spinner";
import Task from "../components/left/Task";
import TaskDay from "../components/left/TaskDay";
import TaskContext from "../context/task/taskContext";
const LeftTasks = () => {
  const taskContext = useContext(TaskContext);
  const {
    today,
    tomorrow,
    history,
    historyTask,
    filtered,
    allTasks,
    loading,
    changeStatus,
    deleteTask,
    setToEdit,
    getTasks,
    getHistoryTask,
    setToday,
    setTomorrow,
  } = taskContext;

  useEffect(() => {
    getTasks();
    getHistoryTask();
    // eslint-disable-next-line
  }, []);

  let completed = null;
  let uncompleted = null;
  let todayTask = null;

  const fetchData = () => {
    if (filtered) {
      todayTask = filtered;
    } else if (history) {
      todayTask = historyTask;
    } else {
      todayTask = allTasks;
    }
    if (todayTask) {
      uncompleted = [];
      completed = [];

      // eslint-disable-next-line
      todayTask.map((task) => {
        if (today) {
          if (task.status === "undone" && task.day === "today") {
            uncompleted.push(task);
          } else if (task.status === "done" && task.day === "today") {
            completed.push(task);
          }
        }

        if (tomorrow) {
          if (task.status === "undone" && task.day === "tomorrow") {
            uncompleted.push(task);
          } else if (task.status === "done" && task.day === "tomorrow") {
            completed.push(task);
          }
        }
        if (history) {
          if (task.status === "undone") {
            uncompleted.push(task);
          } else if (task.status === "done") {
            completed.push(task);
          }
        }
      });
    }
  };

  fetchData();

  if (loading) {
    return <Spinner />;
  }

  if (
    completed.length === 0 &&
    uncompleted.length === 0 &&
    historyTask.length === 0
  ) {
    return (
      <Fragment>
        <div className="days hide-on-med-and-up ">
          <button
            onClick={() => setToday()}
            className="btn teal darken-4 white-text "
          >
            Today
          </button>
          <button
            onClick={() => setTomorrow()}
            className="btn teal darken-4 white-text"
          >
            Tomorrow
          </button>
        </div>
        <h4 className="center">No Entry.</h4>
        <p className="center">You can add by clicking on the + icons</p>
      </Fragment>
    );
  }

  const checkDay = () => {
    if (today) return "Today";
    else if (tomorrow) return "Tomorrow";
    else if (history) return "History";
  };

  return (
    <div className="tasks">
      <div className="days hide-on-med-and-up ">
        <button
          onClick={() => setToday()}
          className="btn teal darken-4 white-text "
        >
          Today
        </button>
        <button
          onClick={() => setTomorrow()}
          className="btn teal darken-4 white-text"
        >
          Tomorrow
        </button>
      </div>
      <TaskDay historyTasks={historyTask} day={checkDay()} />

      <ul className="collapsible popout">
        {uncompleted.length > 0 && (
          <li className="active">
            <div className="collapsible-header">
              <i className="material-icons">access_time</i>UnCompleted Tasks
            </div>
            <div className="collapsible-body">
              <div className="collection">
                {uncompleted.map((task) => (
                  <Task
                    key={task._id}
                    task={task}
                    history={history}
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
          <li className={uncompleted.length === 0 ? "active" : undefined}>
            <div className="collapsible-header">
              <i className="material-icons">check</i>Completed Tasks
            </div>
            <div className="collapsible-body">
              <div className="collection">
                {completed.map((task) => {
                  return (
                    <Task
                      key={task._id}
                      task={task}
                      history={history}
                      changeToDone={changeStatus}
                      delTask={deleteTask}
                      taskEdit={setToEdit}
                    />
                  );
                })}
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default LeftTasks;
