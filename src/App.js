import "./App.css";
import Title from "./components/Title";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import { Router } from "@reach/router";
import ArticleList from "./components/ArticleList";
import ErrorDisplayer from "./components/ErrorDisplayer";
import SingleArticle from "./components/SingleArticle";
import UserPage from "./components/UserPage";
import ArticlePoster from "./components/ArticlePoster";
import TopicPoster from "./components/TopicPoster";
import Login from "./components/Login";
import * as api from "./api";

import React, { Component } from "react";

class App extends Component {
  state = { topics: [], username: "" };
  componentDidMount() {
    this.fetchTopics();
  }

  render() {
    const { topics, username } = this.state;
    return (
      <div className="App">
        <Title username={username} />
        <Nav username={username} />
        <Sidebar topics={topics} />
        <Router className="articles-list">
          <ArticleList path="/" />
          <ArticleList path="/:topic/articles" />
          <Login
            path="/login"
            username={username}
            logOut={this.logOut}
            logIn={this.logIn}
          />
          <SingleArticle path="/articles/:article_id" username={username} />
          <UserPage path="/users/:username" />
          <ArticlePoster path="/articles/post" username={username} />
          <TopicPoster path="topics/post" addTopic={this.addTopic} />
          <ErrorDisplayer default />
        </Router>
      </div>
    );
  }
  fetchTopics() {
    api.getTopics().then((topics) => {
      this.setState({ topics });
    });
  }
  addTopic = (postedTopic) => {
    this.setState((currentState) => {
      return { topics: [...currentState.topics, postedTopic] };
    });
  };
  logOut = () => {
    this.setState({ username: "" });
  };
  logIn = (username) => {
    this.setState({ username });
  };
}

export default App;
