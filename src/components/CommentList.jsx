import React, { Component } from "react";
import * as api from "../api";
import Loader from "./Loader";
import CommentCard from "./CommentCard";
import CommentPoster from "./CommentPoster";

class CommentList extends Component {
  state = { comments: [], isLoading: true };

  componentDidMount() {
    const { article_id } = this.props;
    this.fetchComments(article_id);
  }

  componentDidUpdate(prevProps) {
    const { article_id } = this.props;
    if (article_id !== prevProps.article_id) {
      this.fetchComments(article_id);
    }
  }

  render() {
    const { comment_count, article_id, user } = this.props;
    const { comments, isLoading } = this.state;
    if (isLoading) return <Loader />;
    return (
      <>
        <CommentPoster
          article_id={article_id}
          user={user}
          addNewComment={this.addNewComment}
        />
        <section className="comments-list">
          <h5>Comments({comment_count})</h5>
          {comments.map((comment) => {
            return (
              <CommentCard
                key={comment.comment_id}
                comment_id={comment.comment_id}
                {...comment}
                user={user}
                removeDeletedComment={this.removeDeletedComment}
              />
            );
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
  removeDeletedComment = (comment_id) => {
    this.setState((currentState) => {
      return {
        comments: currentState.comments.filter(
          (comment) => comment.comment_id !== comment_id
        ),
      };
    });
  };
}

export default CommentList;
