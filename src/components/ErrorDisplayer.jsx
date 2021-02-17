import React from "react";
import sadMonkey from "../img/sad-monkey.jpg";

const ErrorDisplayer = ({ err }) => {
  return (
    <section>
      <h2>{err}</h2>
      <img src={`${sadMonkey}`} alt="sad monkey" width="50%" height="50%" />
    </section>
  );
};

export default ErrorDisplayer;
