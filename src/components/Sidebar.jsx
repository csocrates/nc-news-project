import React from "react";
import { Link } from "@reach/router";

const Sidebar = ({ topics }) => {
  return (
    <div className="topics-sidebar">
      <h2>Browse Articles by Topic:</h2>

      {topics.map((topic) => {
        return (
          <li key={topic.slug}>
            <Link to={`${topic.slug}/articles`}>{topic.slug}</Link>
          </li>
        );
      })}
    </div>
  );
};

export default Sidebar;
