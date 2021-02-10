import React, { Component } from "react";
import * as api from "../api";
import ErrorDisplayer from "./ErrorDisplayer";
import Loader from "./Loader";
import CommentList from "./CommentList";
import VoteUpdater from "./VoteUpdater";

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
        <VoteUpdater id={article_id} votes={votes} type="articles" />
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
            data: { msg },
          },
        }) => {
          this.setState({ errorMessage: msg, isLoading: false });
        }
      );
  }
}

export default SingleArticle;
