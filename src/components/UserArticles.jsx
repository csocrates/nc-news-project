import React from "react";
import ArticleCard from "./ArticleCard";

const UserArticles = ({ articles }) => {
  return (
    <section className="userArticles">
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} {...article} />;
      })}
    </section>
  );
};

export default UserArticles;
