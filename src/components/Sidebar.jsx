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
        <h2>Topics</h2>
        <form>
          <label>
            <input type="text" placeholder="Create Topic"></input>
            <button type="submit">Post</button>
          </label>
        </form>
        <h3>Trending Topics</h3>
        {topics.map((topic) => {
          return (
            <li>
              <Link to={`${topic.slug}/articles`} key={topic.slug}>
                {topic.slug}
              </Link>
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
