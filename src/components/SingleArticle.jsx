import React, { Component } from "react";
import * as api from "../api";
import ErrorDisplayer from "./ErrorDisplayer";
import Loader from "./Loader";
import CommentList from "./CommentList";
import VoteUpdater from "./VoteUpdater";
import ArticleDeleter from "./ArticleDeleter";

class SingleArticle extends Component {
  state = { article: {}, isLoading: true, errorMessage: "" };

  componentDidMount() {
    this.fetchArticleById(this.props.article_id);
  }

  componentDidUpdate(prevProps) {
    const { article_id } = this.props;
    if (article_id !== prevProps.article_id) {
      this.fetchArticleById(article_id);
    }
  }

  render() {
    const { username } = this.props;
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
        <p>by {author}</p>
        <p>{body}</p>
        <VoteUpdater id={article_id} votes={votes} type="articles" />
        <ArticleDeleter
          article_id={article_id}
          user={username}
          author={author}
        />
        <CommentList
          article_id={article_id}
          comment_count={comment_count}
          username={username}
        />
      </section>
    );
  }
  fetchArticleById(article_id) {
    api
      .getArticleById(article_id)
      .then((article) => {
        this.setState({ article, isLoading: false });
      })
      .catch((err) => {
        this.setState({
          errorMessage: err.response.data.msg,
          isLoading: false,
        });
      });
  }
}

export default SingleArticle;
