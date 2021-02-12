import * as api from "../api";

import { Component } from "react";

class ArticleDeleter extends Component {
  render() {
    const { article_id, user, author, removeArticle } = this.props;
    if (user === author) {
      return (
        <button
          onClick={() => {
            if (
              window.confirm(
                `${user}, are you sure you wish to delete this article?`
              )
            )
              api.deleteArticle(article_id).then(() => {
                removeArticle();
              });
          }}
        >
          Delete Article
        </button>
      );
    } else return null;
  }
}

export default ArticleDeleter;
