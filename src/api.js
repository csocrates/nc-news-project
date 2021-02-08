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
