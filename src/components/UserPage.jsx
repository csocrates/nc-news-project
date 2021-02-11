import React, { Component } from "react";
import * as api from "../api";
import Loader from "./Loader";
import UserArticles from "./UserArticles";

class UserPage extends Component {
  state = { user: {}, articles: [], isLoading: true };

  componentDidMount() {
    const { username } = this.props;
    this.fetchUser(username);
    this.fetchArticles(username);
  }

  componentDidUpdate(prevProps) {
    const { username } = this.props;
    if (username !== prevProps.username) {
      this.fetchUser(username);
    }
  }

  render() {
    const {
      user: { username, name, avatar_url },
      articles,
      isLoading,
    } = this.state;
    if (isLoading) return <Loader />;
    return (
      <section className="user-page">
        <h2>{username}</h2>
        <h3>a.k.a. {name} </h3>
        <img
          src={`${avatar_url}`}
          alt={`${username}'s avatar`}
          width="20%"
          height="20%"
        />
        <h3>{username}'s recent articles:</h3>
        <UserArticles articles={articles} />
      </section>
    );
  }
  fetchUser(username) {
    this.setState({ isLoading: true });
    api.getUser(username).then((user) => {
      this.setState({ user, isLoading: false });
    });
  }
  fetchArticles(username) {
    this.setState({ isLoading: true });
    api
      .getArticlesbyAuthor(username)
      .then((articles) => {
        this.setState({ articles, isLoading: false });
      })
      .catch((err) => {
        console.dir(err);
      });
  }
}

export default UserPage;
