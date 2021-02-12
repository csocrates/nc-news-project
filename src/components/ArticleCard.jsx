import { Link } from "@reach/router";

const ArticleCard = ({
  title,
  author,
  comment_count,
  created_at,
  article_id,
  body,
  topic,
}) => {
  const preview = body.slice(0, 75);
  const formattedTime = created_at.split("T")[0];
  return (
    <div className="article-card">
      <Link
        to={`/articles/${article_id}`}
        style={{ color: "black", textDecoration: "none" }}
      >
        <h5 className="article-title">{title}</h5>
      </Link>
      <p style={{ fontSize: "10px" }}>u/ in {topic}</p>
      <h6>{preview}...</h6>
      <h6>
        Posted by
        <Link to={`/users/${author}`}> {author}</Link> on {formattedTime}
      </h6>
      <Link to={`/articles/${article_id}/`}>
        <h6>Comments({comment_count})</h6>
      </Link>
    </div>
  );
};

export default ArticleCard;
