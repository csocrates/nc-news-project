import React from "react";
import logo from "../img/logo.png";

const Title = ({ username }) => {
  if (username) {
    return (
      <header className="title">
        <img src={logo} alt="logo" className="logo"></img>
        <p className="loggedin-msg">{`Logged in as ${username}`}</p>
        <h1 className="main-title">NC NEWS</h1>
      </header>
    );
  }
  if (!username)
    return (
      <header className="title">
        <img src={logo} alt="logo" className="logo"></img>
        <h1 className="main-title">NC NEWS</h1>
      </header>
    );
};

export default Title;
