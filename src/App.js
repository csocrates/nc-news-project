import "./App.css";
import Title from "./components/Title";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import { Router } from "@reach/router";
import ArticleList from "./components/ArticleList";
import SortBy from "./components/SortBy";

function App() {
  return (
    <div className="App">
      <Title />
      <Nav />
      <SortBy />
      <Sidebar />
      <Router className="article-list">
        <ArticleList path="/" />
      </Router>
    </div>
  );
}

export default App;
