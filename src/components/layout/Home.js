import React, { Fragment } from "react";
import Main from "../../containers/Main";
import AddTask from "./AddTask";
const Home = () => {
  return (
    <Fragment>
      <Main />
      <AddTask />
    </Fragment>
  );
};

export default Home;
