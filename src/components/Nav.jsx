import React, { Component } from "react";
import { Link } from "@reach/router";

class Nav extends Component {
  render() {
    return (
      <div className="dropdown">
        <button className="dropbtn">Home</button>
        <div className="dropdown-content">
          <Link to="/">Home</Link>
          <Link to="/articles/post">Post an Article</Link>
          <Link to="/topics/post">Post a Topic</Link>
          <Link to="">Something else</Link>
        </div>
      </div>
    );
  }
}

export default Nav;
