import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import * as api from "../api";

class ArticleList extends Component {
  state = { articles: [], isLoading: true };

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps) {
    const { topic } = this.props;
    //stops infinite loop (new props triggers rerender triggers cdu)
    if (topic !== prevProps.topic) {
      this.fetchArticles(topic);
    }
  }

  render() {
    const { articles } = this.state;
    return this.state.isLoading ? (
      <p>Loading...</p>
    ) : (
      <div className="articles">
        <p>Newest Articles...</p>
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} {...article} />;
        })}
      </div>
    );
  }
  fetchArticles(topic) {
    api.getArticles(topic).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  }
}

export default ArticleList;
