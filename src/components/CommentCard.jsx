import React from "react";
import CommentDeleter from "./CommentDeleter";

const CommentCard = ({
  username,
  created_at,
  body,
  comment_id,
  user,
  removeDeletedComment,
}) => {
  const formattedTime = created_at.split("T")[0];
  return (
    <section className="comment-card">
      <p>{body}</p>
      <p>
        posted by {username} on {formattedTime}
      </p>
      <CommentDeleter
        author={username}
        comment_id={comment_id}
        user={user}
        removeDeletedComment={removeDeletedComment}
      />
    </section>
  );
};

export default CommentCard;
