import React from "react";
import { Link } from "@reach/router";

const SuccessDisplayer = ({ msg, item, type, reset }) => {
  if (type === "article") {
    return (
      <>
        <p>{msg}</p>
        <p>
          See your article on the <Link to="/">Front Page</Link>!
          <br />
          <br />
          Think you've got another in you?{" "}
          <button onClick={reset}>Post another article</button>
        </p>
      </>
    );
  }
  if (type === "topic") {
    return (
      <>
        <p>{msg}</p>
        <p>Congratulations, now time to get writing some content!</p>
      </>
    );
  }
};

export default SuccessDisplayer;
