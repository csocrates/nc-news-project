import React from "react";
import logo from "../img/logo.png";
import { Link } from "@reach/router";

const Title = ({ username }) => {
  if (username) {
    return (
      <header className="title">
        <img src={logo} alt="logo" className="logo"></img>
        <p className="loggedin-msg">
          Logged in as <Link to={`users/${username}`}>{username}</Link>
        </p>

        <h1 className="main-title">NC NEWS</h1>
      </header>
    );
  }
  if (!username)
    return (
      <header className="title">
        <img src={logo} alt="logo" className="logo"></img>
        <p className="loggedin-msg">Guest User</p>
        <h1 className="main-title">NC NEWS</h1>
      </header>
    );
};

export default Title;
