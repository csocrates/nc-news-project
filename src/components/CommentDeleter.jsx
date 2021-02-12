import React from "react";
import * as api from "../api";

const CommentDeleter = ({ comment_id, user, author, removeDeletedComment }) => {
  if (user === author) {
    return (
      <button
        onClick={() => {
          if (
            window.confirm(
              `${user}, are you sure you wish to delete this comment?`
            )
          )
            api.deleteComment(comment_id).then(() => {
              removeDeletedComment(comment_id);
            });
        }}
      >
        Remove Comment
      </button>
    );
  } else return null;
};

export default CommentDeleter;
