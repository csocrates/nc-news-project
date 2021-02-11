import axios from "axios";

//creates baseURL
const request = axios.create({
  baseURL: "https://my-first-app-nc-news.herokuapp.com/api",
});

export const getTopics = () => {
  return request.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const getArticles = (topic) => {
  return request
    .get("/articles", { params: { topic: topic } })
    .then(({ data }) => {
      return data.articles;
    });
};

export const getArticleById = (article_id) => {
  return request.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getComments = (article_id) => {
  return request.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const getUser = (username) => {
  return request.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  });
};

export const patchVotes = (id, vote_inc, type) => {
  return request.patch(`${type}/${id}`, { inc_votes: vote_inc });
};

export const postArticle = (newArticle) => {
  return request.post("/articles", newArticle);
};

export const postTopic = (newTopic) => {
  return request.post("/topics", newTopic);
};
