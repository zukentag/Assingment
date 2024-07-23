import React, { useState, useEffect } from "react";
import Category from "./components/Category";
import News from "./components/News";
import Search from "./components/Search";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const NewsCategories = process.env.REACT_APP_NEWS_CATEGORIES?.split(",");

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("technology");
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        `${API_BASE_URL}/news?category=${selectedCategory}`
      );
      const data = await response.json();
      setArticles(data.articles);
    };

    if (selectedCategory) {
      fetchNews();
    }
  }, [selectedCategory]);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term) {
      const response = await fetch(`${API_BASE_URL}/search?query=${term}`);
      const data = await response.json();
      setSearchResults(data.articles);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div>
      <Category
        categories={NewsCategories}
        onSelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <Search onSearch={handleSearch} />
      {searchTerm ? (
        <News articles={searchResults} />
      ) : (
        <News articles={articles} />
      )}
    </div>
  );
};

export default App;
