import React from "react";
import logo from "../img/logo.png";

const Title = () => {
  return (
    <header className="title">
      <img src={logo} alt="logo" className="logo"></img>
      <h1 className="main-title">NC News</h1>
    </header>
  );
};

export default Title;
