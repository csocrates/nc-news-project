import React, { Component } from "react";
import * as api from "../api";

const defaultState = {
  body: "",
  commentError: false,
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

    if (body.length < 3) {
      this.setState({ commentError: true });
      return false;
    } else {
      this.setState({ commentError: false });
      return true;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { article_id, user, addNewComment } = this.props;
    const { body } = this.state;
    const newComment = { username: user, body };
    const isValid = this.validate();
    if (isValid) {
      api
        .postComment(article_id, newComment)
        .then(({ data }) => {
          addNewComment(data.comment);
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
        {commentError ? (
          <p style={{ color: "#800000" }}>
            Your comment is pathetically short. Try again.
          </p>
        ) : null}
      </form>
    );
  }
}

export default CommentPoster;
