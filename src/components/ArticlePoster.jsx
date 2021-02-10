import React, { Component } from "react";
import * as api from "../api";

class ArticlePoster extends Component {
  state = { article: {}, topics: [] };

  componentDidMount() {
    this.fetchTopics();

    // handleInput(){}

    // handleSubmit(){}
  }
  render() {
    const { topics } = this.state;
    return (
      <form className="article-poster">
        <h2>Your chance to be read by millions...</h2>
        <label>
          Title:
          <input type="text" />
        </label>
        <label>
          Body:
          <textarea id="body" rows="10" columns="30" />
        </label>
        <label>Choose a relevant topic: </label>
        <select name="topics" id="topics">
          {topics.map((topic) => {
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
        <button type="submit">Post</button>
      </form>
    );
  }
  fetchTopics() {
    api.getTopics().then((topics) => {
      this.setState({ topics });
    });
  }
}

// <label for="cars">Choose a car:</label>
// <select id="cars" name="cars">
//   <option value="volvo">Volvo</option>
//   <option value="saab">Saab</option>
//   <option value="fiat">Fiat</option>
//   <option value="audi">Audi</option>
// </select>

export default ArticlePoster;
