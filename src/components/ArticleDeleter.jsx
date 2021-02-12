import * as api from "../api";
import SuccessDisplayer from "./SuccessDisplayer";

import { Component } from "react";

class ArticleDeleter extends Component {
  state = { successMessage: "" };
  render() {
    const { successMessage } = this.state;
    const { article_id, user, author } = this.props;
    if (successMessage)
      return <SuccessDisplayer msg={successMessage} type={"deleteArticle"} />;
    if (user === author) {
      return (
        <button
          onClick={() => {
            if (
              window.confirm(
                `${user}, are you sure you wish to delete this article?`
              )
            )
              api.deleteArticle(article_id).then((res) => {
                this.setState({
                  successMessage: "Article successfully deleted",
                });
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
