import React, { Component } from "react";
import * as api from "../api";

class Login extends Component {
  state = { newUser: "", userError: false, isValidUser: null };

  handleInput = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { newUser } = this.state;
    this.props.logIn(newUser);
  };

  render() {
    const { username, logOut } = this.props;
    const { newUser, userError } = this.state;
    if (username) {
      return (
        <>
          <br />
          <br />
          <p> {`You are logged in as ${username}`}</p>
          <button className="login-button" onClick={logOut}>
            Log Out
          </button>
        </>
      );
    }
    if (!username) {
      return (
        <>
          <label>
            Username:
            <input
              type="text"
              onChange={this.handleInput}
              value={newUser}
              id="newUser"
            />
          </label>
          <button
            className="login-button"
            type="submit"
            onClick={this.handleSubmit}
          >
            Log In
          </button>
          {userError ? <p>Not A Valid User</p> : ""}
        </>
      );
    }
  }
}

export default Login;
