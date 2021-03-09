import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import ArticlesHeader from "./ArticlesHeader";
import Loader from "./Loader";
import * as api from "../api";
import ErrorDisplayer from "./ErrorDisplayer";
import { Link } from "@reach/router";

class ArticleList extends Component {
  state = {
    topic: "",
    articles: [],
    sort_by: "",
    isLoading: true,
    errorMessage: "",
  };

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps) {
    console.log("hello");
    const { topic } = this.props;
    const { sort_by } = this.state;
    console.log(sort_by);

    //stops infinite loop (new props triggers rerender triggers cdu)
    if (topic !== prevProps.topic) {
      this.setState({ isLoading: true, errorMessage: "" });
      this.fetchArticles(topic);
    }
  }

  render() {
    const { articles, topic, isLoading, errorMessage } = this.state;
    if (isLoading) return <Loader />;
    if (errorMessage) return <ErrorDisplayer err={errorMessage} />;
    if (articles.length === 0)
      return (
        <>
          <h3>
            {" "}
            Uh oh, nobody's posted any articles for this topic - better get
            writing!
          </h3>
          <Link to="/articles/post">Post an article</Link>
        </>
      );

    return (
      <section className="article-list">
        <ArticlesHeader topic={topic} />
        <div className="dropdown">
          <button className="sortbtn">Sort</button>
          <div className="dropdown-content">
            <button
              onClick={() => {
                this.sortArticles("votes");
              }}
            >
              Highest Voted
            </button>
            <button
              onClick={() => {
                this.sortArticles("comment_count");
              }}
            >
              Most Commented
            </button>
          </div>
        </div>
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} {...article} />;
        })}
      </section>
    );
  }
  fetchArticles(topic) {
    api
      .getArticles(topic)
      .then((articles) => {
        this.setState({
          articles,
          isLoading: false,
          topic,
        });
      })
      .catch(
        ({
          response: {
            data: { msg },
          },
        }) => {
          this.setState({ isLoading: false, errorMessage: msg });
        }
      );
  }
  sortArticles(sort_by) {
    api.sortArticles(sort_by).then((articles) => {
      this.setState({ isLoading: false, articles });
    });
  }
  handleClick(sort_by) {
    this.setState({ sort_by });
  }
}

export default ArticleList;
