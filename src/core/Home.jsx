import React from "react";
import "../styles.css";
import Base from "./Base";

const Home = () => {
  return (
    <Base title="Home Page" description="This our our home page.">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
      </div>
      <h1>Home Page</h1>
    </Base>
  );
};

export default Home;
