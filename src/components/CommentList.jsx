import React, { Component } from "react";
import * as api from "../api";
import Loader from "./Loader";
import CommentCard from "./CommentCard";
import CommentPoster from "./CommentPoster";

class CommentList extends Component {
  state = { comments: [], isLoading: true };

  componentDidMount() {
    this.fetchComments(this.props.article_id);
  }
  render() {
    const { username, comment_count, article_id } = this.props;
    const { comments, isLoading } = this.state;
    if (isLoading) return <Loader />;
    return (
      <>
        <CommentPoster
          article_id={article_id}
          username={username}
          addNewComment={this.addNewComment}
        />
        <section className="comments-list">
          <h5>Comments({comment_count})</h5>
          {comments.map((comment) => {
            return <CommentCard key={comment.comment_id} {...comment} />;
          })}
        </section>
      </>
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
  addNewComment = (newComment) => {
    this.setState((currentState) => {
      return { comments: [newComment, ...currentState.comments] };
    });
  };
}

export default CommentList;
