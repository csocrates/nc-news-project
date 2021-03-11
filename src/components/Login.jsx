import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";

class Login extends Component {
  state = { newUser: "", userError: false, isValidUser: null };

  handleInput = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { newUser, userError } = this.state;
    api
      .getUser(newUser)
      .then(() => {
        this.setState({ userError: false });
        this.props.logIn(newUser);
      })
      .catch((err) => {
        this.setState({ userError: true });
      });
  };

  render() {
    const { username, logOut } = this.props;
    const { newUser, userError } = this.state;
    if (username) {
      return (
        <>
          <br />
          <br />
          <p>
            {" "}
            You are logged in as{" "}
            <Link to={`users/${username}`}>{username}</Link>
          </p>
          <button className="login-button" onClick={logOut}>
            Log Out
          </button>
          <br />
          <br />
          <Link to="/">Back to Homepage</Link>
        </>
      );
    }
    if (!username) {
      return (
        <>
          <br />
          <br />
          <form>
            <label>
              Username:
              <input
                type="text"
                onChange={this.handleInput}
                value={newUser}
                id="newUser"
              />
            </label>
            <br />
            <br />
            <button
              className="login-button"
              type="submit"
              onClick={this.handleSubmit}
            >
              Log In
            </button>
            {userError ? <p>Not A Valid User</p> : <p></p>}
            <br />
          </form>
          <Link to="/">Back to Homepage</Link>
        </>
      );
    }
  }
}

export default Login;
