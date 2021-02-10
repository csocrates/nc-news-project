import React, { Component } from "react";
import * as api from "../api";
import ErrorDisplayer from "./ErrorDisplayer";
import SuccessDisplayer from "./SuccessDisplayer";
import Loader from "./Loader";

class ArticlePoster extends Component {
  state = {
    title: "",
    body: "",
    topic: "coding",
    author: "jessjelly",
    topics: [],
    errorMessage: "",
    successMessage: "",
    isLoading: true,
    postedArticle: {},
  };

  componentDidMount() {
    this.fetchTopics();
    this.setState({ successMessage: "" });
  }

  handleInput = ({ target: { value, id } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, body, topic, author } = this.state;
    const newArticle = { title, body, topic, author };
    api.postArticle(newArticle).then(({ data }) => {
      this.setState({
        successMessage: data.msg,
        postedArticle: data.article,
        isLoading: false,
      });
    });
    //   .catch(({ data: { msg } }) => {
    //     this.setState({ errorMessage: msg, isLoading: false });
    //   });
    this.setState({
      title: "",
      body: "",
      topic: "coding",
      author: "jessjelly",
    });
  };

  render() {
    const { topics } = this.state;
    const {
      title,
      body,
      topic,
      errorMessage,
      successMessage,
      isLoading,
      postedArticle,
    } = this.state;
    if (isLoading) return <Loader />;
    if (errorMessage) return <ErrorDisplayer err={errorMessage} />;
    if (successMessage)
      return (
        <SuccessDisplayer
          msg={successMessage}
          item={postedArticle}
          type="article"
        />
      );

    return (
      <form className="article-poster">
        <h2>Your chance to be read by the millions...</h2>
        <label>
          Title:
          <input
            type="text"
            id="title"
            value={title}
            onChange={this.handleInput}
          />
        </label>
        <br />
        <br />
        <label>
          Body:
          <textarea
            id="body"
            value={body}
            onChange={this.handleInput}
            rows="10"
            columns="30"
          />
        </label>
        <br />
        <br />
        <label>Choose a relevant topic: </label>
        <select id="topic" value={topic} onChange={this.handleInput}>
          {topics.map((topic) => {
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <button type="submit" onClick={this.handleSubmit}>
          Post!
        </button>
      </form>
    );
  }
  fetchTopics() {
    api.getTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  }
}

export default ArticlePoster;
