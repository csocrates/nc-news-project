import React from "react";

const ArticlesHeader = (props) => {
  return (
    <header className="articles-header">
      {props.topic ? (
        <h2>All about {props.topic}...</h2>
      ) : (
        <h2>Newest Articles</h2>
      )}
    </header>
  );
};

export default ArticlesHeader;
