import React from "react";

const CommentCard = ({ username, votes, created_at, body }) => {
  const formattedTime = created_at.split("T")[0];
  return (
    <section className="comment-card">
      <p>{body}</p>
      <p>
        posted by {username} on {formattedTime} ☝️ {votes}
      </p>
    </section>
  );
};

export default CommentCard;
