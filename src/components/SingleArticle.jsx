import React, { Component } from "react";
import * as api from "../api";
import ErrorDisplayer from "./ErrorDisplayer";
import Loader from "./Loader";
import CommentList from "./CommentList";

class SingleArticle extends Component {
  state = { article: {}, isLoading: true, errorMessage: "" };

  componentDidMount() {
    this.fetchArticleById(this.props.article_id);
  }
  render() {
    const {
      article: { title, author, body, votes, comment_count, article_id },
      isLoading,
      errorMessage,
    } = this.state;
    if (isLoading) return <Loader />;
    if (errorMessage) return <ErrorDisplayer err={errorMessage} />;
    return (
      <section className="single-article">
        <h3>{title}</h3>
        <p>-{author}</p>
        <p>{body}</p>
        <CommentList article_id={article_id} />
      </section>
    );
  }
  fetchArticleById(article_id) {
    api
      .getArticleById(article_id)
      .then((article) => {
        this.setState({ article, isLoading: false });
      })
      .catch(
        ({
          response: {
            data: { err },
          },
        }) => {
          this.setState({ errorMessage: err, isLoading: false });
        }
      );
  }
}

export default SingleArticle;
