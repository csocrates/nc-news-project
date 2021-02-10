import React from "react";
import { Link } from "@reach/router";

const SuccessDisplayer = ({ msg, item, type }) => {
  if (type === "article") {
    return (
      <>
        <p>{msg}</p>
        <p>
          See your article on the <Link to="/">Front Page</Link>!
          <br />
          <br />
          Think you've got another in you?{" "}
          <Link to="/articles/post">Post another article</Link>
        </p>
      </>
    );
  }
};

export default SuccessDisplayer;
