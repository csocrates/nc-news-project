import React, { Component } from "react";
import * as api from "../api";

class Sidebar extends Component {
  state = { topics: [] };

  componentDidMount() {
    this.fetchTopics();
  }

  render() {
    return (
      <div className="topics-sidebar">
        <ul>topics here</ul>
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
