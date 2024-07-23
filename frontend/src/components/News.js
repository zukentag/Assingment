import React from "react";

const News = ({ articles }) => {
  return (
    <ol>
      <h2> Articles </h2>
      {articles?.map((article) => (
        <li key={article.url}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </li>
      ))}
    </ol>
  );
};

export default News;
