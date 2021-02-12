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
import * as api from "./api";

import React, { Component } from "react";

class App extends Component {
  state = { topics: [], username: "jessjelly" };
  componentDidMount() {
    this.fetchTopics();
  }

  render() {
    const { topics, username } = this.state;
    return (
      <div className="App">
        <Title username={username} />
        <Nav />
        <Sidebar topics={topics} />
        <Router className="articles-list">
          <ArticleList path="/" />
          <ArticleList path="/:topic/articles" />
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
    console.log("posted topic", postedTopic);
    this.setState((currentState) => {
      return { topics: [...currentState.topics, postedTopic] };
    });
  };
}

export default App;
