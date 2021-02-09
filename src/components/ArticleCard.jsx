import { Link } from "@reach/router";

const ArticleCard = ({
  title,
  author,
  comment_count,
  created_at,
  article_id,
  body,
}) => {
  const preview = body.slice(0, 75);
  const formattedTime = created_at.split("T")[0];
  return (
    <div className="article-card">
      <Link
        to={`/articles/${article_id}`}
        style={{ color: "black", textDecoration: "none" }}
      >
        <h5>{title}</h5>
        <h6>{preview}...</h6>
      </Link>
      <h6>
        Posted by
        <Link to={`/users/${author}`}> {author}</Link> on {formattedTime}
      </h6>
      <Link to={`/articles/${article_id}/`}>
        <h6>Comments({comment_count})</h6>
      </Link>

      <p></p>
    </div>
  );
};

export default ArticleCard;
