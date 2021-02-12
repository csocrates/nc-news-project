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
  titleError: false,
  bodyError: false,
  userError: false,
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

    if (title.length < 3) {
      this.setState({ titleError: true });
      return false;
    } else {
      this.setState({ titleError: false });
    }
    if (body.length < 30) {
      this.setState({ bodyError: true });
      return false;
    } else {
      this.setState({ bodyError: false });
    }
    if (username === "") {
      this.setState({ userError: true });
      return false;
    } else {
      this.setState({ userError: false });
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
          {titleError ? (
            <p style={{ color: "#ff8c2d" }}>
              No title this short can accurately describe anything worth
              reading.
            </p>
          ) : (
            ""
          )}
        </label>
        <br />
        <br />
        <label>
          Body:
          <br />
          <textarea
            id="body"
            value={body}
            onChange={this.handleInput}
            rows="10"
            columns="30"
          />
          {bodyError ? (
            <p style={{ color: "#ffd7aa" }}>
              Short and sweet is good and all, but this is giving me a
              toothache. (min 30 characters)
            </p>
          ) : (
            ""
          )}
        </label>
        <br />
        <br />
        <label>Choose your topic: </label>
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
        {userError ? (
          <p style={{ color: "#800000" }}>
            "Nice try. You must be logged in to post an article.";
          </p>
        ) : (
          ""
        )}
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
