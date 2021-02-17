import React from "react";

const Login = ({ username, logOut, logIn }) => {
  console.log(username);
  if (username) {
    return (
      <>
        <p> {`You are currently logged in as ${username}`}</p>
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
          <input type="text" />
        </label>
        <button className="login-button" onClick={logIn}>
          Log In
        </button>
      </>
    );
  }
};

export default Login;
