import React, { Component } from "react";
import * as api from "../api";

const defaultState = {
  username: "",
  body: "",
  commentError: "",
  successMessage: "",
  postedComment: {},
};

class CommentPoster extends Component {
  state = defaultState;

  handleInput = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  validate = () => {
    const { body } = this.state;
    let commentError = "";
    if (body.length < 3) {
      commentError = "Your comment is pathetically short. Try again.";
    }
    if (commentError) {
      this.setState({ commentError });
      return false;
    }
    return true;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { article_id, username } = this.props;
    const { body } = this.state;
    const newComment = { username, body };
    const isValid = this.validate();
    if (isValid) {
      api
        .postComment(article_id, newComment)
        .then(({ data }) => {
          this.props.addNewComment(data.comment);
          this.setState({ successMessage: data.msg });
        })
        .catch((err) => {
          console.dir(err);
        });
      this.setState(defaultState);
    }
  };

  render() {
    const { body, commentError } = this.state;
    return (
      <form className="comment-poster">
        <label>
          Add a comment:
          <textarea id="body" value={body} onChange={this.handleInput} />
        </label>
        <button type="submit" onClick={this.handleSubmit}>
          Post!
        </button>
        <p style={{ color: "#800000" }}>{commentError}</p>
      </form>
    );
  }
}

export default CommentPoster;
