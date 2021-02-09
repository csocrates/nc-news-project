import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";

class Sidebar extends Component {
  state = { topics: [] };

  componentDidMount() {
    this.fetchTopics();
  }

  render() {
    const { topics } = this.state;
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
  }
  fetchTopics() {
    api.getTopics().then((topics) => {
      this.setState({ topics });
    });
  }
}

export default Sidebar;
