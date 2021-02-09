import React, { Component } from "react";
import * as api from "../api";
import Loader from "./Loader";
import CommentCard from "./CommentCard";

class CommentList extends Component {
  state = { comments: [], isLoading: true };

  componentDidMount() {
    this.fetchComments(this.props.article_id);
  }
  render() {
    const { comments, isLoading } = this.state;
    if (isLoading) return <Loader />;
    return (
      <section className="comments-list">
        <h5>Comments</h5>
        {comments.map((comment) => {
          return <CommentCard key={comment.comment_id} {...comment} />;
        })}
      </section>
    );
  }
  fetchComments(article_id) {
    api
      .getComments(article_id)
      .then((comments) => {
        this.setState({ comments, isLoading: false });
      })
      .catch((err) => {
        console.dir(err);
      });
  }
}

export default CommentList;
