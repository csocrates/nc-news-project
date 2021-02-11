import React, { Component } from "react";
import * as api from "../api";
import ErrorDisplayer from "./ErrorDisplayer";
import SuccessDisplayer from "./SuccessDisplayer";
import Loader from "./Loader";

const defaultState = {
  title: "",
  body: "",
  topic: "coding",
  topics: [],
  errorMessage: "",
  successMessage: "",
  isLoading: true,
  postedArticle: {},
  titleError: "",
  bodyError: "",
  userError: "",
};

class ArticlePoster extends Component {
  state = defaultState;

  componentDidMount() {
    this.fetchTopics();
  }

  componentDidUpdate() {
    this.fetchTopics();
  }

  handleInput = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  validate = () => {
    const { username } = this.props;
    const { title, body } = this.state;
    let titleError = "";
    let bodyError = "";
    let userError = "";
    if (title.length < 3) {
      titleError =
        "No title this short can accurately describe anything worth reading.";
    }
    if (titleError) {
      this.setState({ titleError });
      return false;
    }
    if (body.length < 30) {
      bodyError =
        "Short and sweet is good and all, but this is giving me a toothache. (min 30 characters)";
    }
    if (bodyError) {
      this.setState({ bodyError });
      return false;
    }
    if (username === "") {
      userError = "Nice try. You must be logged in to post an article.";
    }
    if (userError) {
      this.setState({ userError });
      return false;
    }
    return true;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username } = this.props;
    const { title, body, topic } = this.state;
    const newArticle = { title, body, topic, author: username };
    const isValid = this.validate();

    if (isValid) {
      api
        .postArticle(newArticle)
        .then(({ data }) => {
          this.setState({
            successMessage: data.msg,
            postedArticle: data.article,
            isLoading: false,
          });
        })
        .catch((err) => {
          console.dir(err);
        });
      // .catch(({ data: { msg } }) => {
      //   this.setState({ errorMessage: msg, isLoading: false });
      // });
      this.setState(defaultState);
    }
  };

  render() {
    const {
      topics,
      title,
      body,
      topic,
      errorMessage,
      successMessage,
      isLoading,
      postedArticle,
      titleError,
      bodyError,
      userError,
    } = this.state;
    if (isLoading) return <Loader />;
    if (errorMessage) return <ErrorDisplayer err={errorMessage} />;
    if (successMessage)
      return (
        <SuccessDisplayer
          msg={successMessage}
          item={postedArticle}
          type="article"
          reset={this.resetPostArticlePage}
        />
      );

    return (
      <form className="article-poster">
        <h2>"And my word was read, and changed lives for the better..."</h2>
        <label>
          Title:
          <input
            type="text"
            id="title"
            value={title}
            onChange={this.handleInput}
          />
          <p style={{ color: "#800000" }}>{titleError}</p>
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
          <p style={{ color: "#800000" }}>{bodyError}</p>
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
        <p style={{ color: "#800000" }}>{userError}</p>
      </form>
    );
  }
  fetchTopics() {
    api.getTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  }
  resetPostArticlePage = () => {
    this.setState({ successMessage: "" });
  };
}

export default ArticlePoster;
