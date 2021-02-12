import React from "react";
import * as api from "../api";

const ArticleDeleter = ({ article_id, user, author }) => {
  console.log(user, author);
  return (
    <button
      disabled={!user === author}
      onClick={() => {
        if (window.confirm("Are you sure you wish to delete this article?"))
          api.deleteArticle(article_id);
      }}
    >
      Remove Article
    </button>
  );
};

export default ArticleDeleter;
