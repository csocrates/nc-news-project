import React, { Component } from "react";
import * as api from "../api";
import ErrorDisplayer from "./ErrorDisplayer";
import SuccessDisplayer from "./SuccessDisplayer";
import Loader from "./Loader";

const defaultState = {
  slug: "",
  description: "",
  topicError: "",
  successMessage: "",
  isLoading: true,
  postedTopic: {},
};

class TopicPoster extends Component {
  state = defaultState;

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  handleInput = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  validate = () => {
    const { slug } = this.state;
    let topicError = "";

    if (slug.length < 3) {
      topicError = "That just ain't gonna cut it cabron... (min 3 characters)";
    }
    if (topicError) {
      this.setState({ topicError });
      return false;
    }
    return true;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { slug, description } = this.state;
    const newTopic = { slug, description };
    const isValid = this.validate();
    if (isValid) {
      api
        .postTopic(newTopic)
        .then(({ data }) => {
          this.setState({
            postedTopic: data.topic,
            successMessage: data.msg,
            isLoading: false,
          });
          this.props.addTopic(data.topic);
        })
        .catch((err) => {
          console.dir(err);
        });

      // this.setState(defaultState);
    }
  };

  render() {
    const {
      slug,
      description,
      topicError,
      successMessage,
      isLoading,
    } = this.state;
    if (isLoading) return <Loader />;
    if (successMessage)
      return (
        <SuccessDisplayer
          msg={successMessage}
          item="postedTopic"
          type="topic"
        />
      );

    return (
      <form className="topic-poster">
        <h2>"Build fountains, and the water shall cascade..."</h2>
        <label>
          Topic:
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={this.handleInput}
          />
          <p style={{ color: "#800000" }}>{topicError}</p>
        </label>
        <br />
        <br />
        <label>
          Description:
          <textarea
            id="description"
            value={description}
            onChange={this.handleInput}
            rows="10"
            columns="20"
            placeholder="A brief description of the topic would really help the community out!"
          />
        </label>
        <br />
        <br />
        <button type="submit" onClick={this.handleSubmit}>
          Create Topic!
        </button>
      </form>
    );
  }
}

export default TopicPoster;
