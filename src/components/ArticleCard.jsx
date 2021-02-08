const ArticleCard = ({ title, author, comment_count, created_at }) => {
  const formattedTime = created_at.split("T")[0];
  return (
    <div className="article-card">
      <h5>{title}</h5>
      <h6>
        Posted by {author} on {formattedTime}
      </h6>
      <h6>Comments({comment_count})</h6>
      <p></p>
    </div>
  );
};

export default ArticleCard;
