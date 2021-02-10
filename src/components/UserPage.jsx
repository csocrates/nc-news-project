import React, { Component } from "react";
import * as api from "../api";
import Loader from "./Loader";

class UserPage extends Component {
  state = { user: {}, isLoading: true };

  componentDidMount() {
    this.fetchUser(this.props.username);
  }

  render() {
    const {
      user: { username, name, avatar_url },
      isLoading,
    } = this.state;
    console.log(this.state);
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
      </section>
    );
  }
  fetchUser(username) {
    this.setState({ isLoading: true });
    api.getUser(username).then((user) => {
      this.setState({ user, isLoading: false });
    });
  }
}

export default UserPage;
