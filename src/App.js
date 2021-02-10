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

function App() {
  return (
    <div className="App">
      <Title />
      <Nav />
      <Sidebar />
      <Router className="articles-list">
        <ArticleList path="/" />
        <ArticleList path="/:topic/articles" />
        <SingleArticle path="/articles/:article_id" />
        <UserPage path="/users/:username" />
        <ArticlePoster path="/articles/post" />
        <ErrorDisplayer default />
      </Router>
    </div>
  );
}

export default App;
