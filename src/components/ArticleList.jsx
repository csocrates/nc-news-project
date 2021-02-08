import React, { Component } from "react";
import ArticleCard from "./ArticleCard";

class ArticleList extends Component {
  render() {
    return (
      <div>
        <p>List of articles...</p>
        <ArticleCard />
        <ArticleCard />
      </div>
    );
  }
}

export default ArticleList;
