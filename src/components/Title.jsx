import React from "react";
import logo from "../img/logo.png";

const Title = ({ username }) => {
  return (
    <header className="title">
      <img src={logo} alt="logo" className="logo"></img>
      <p className="login">Logged in as {username}</p>
      <h1 className="main-title">NC NEWS</h1>
    </header>
  );
};

export default Title;
