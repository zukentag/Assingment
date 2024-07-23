const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const API_KEYS = process.env.API_KEY;
const NEWS_BASE_URL_HEADLINES = process.env.NEWS_BASE_URL_HEADLINES;
const NEWS_BASE_URL_EVERYTHING = process.env.NEWS_BASE_URL_EVERYTHING;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.get("/news", async (req, res) => {
  const { category } = req.query;
  try {
    const response = await fetch(
      `${NEWS_BASE_URL_HEADLINES}?apiKey=${API_KEYS}&category=${category}&country=in&pageSize=10`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return res.json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    return res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    const response = await fetch(
      `${NEWS_BASE_URL_EVERYTHING}?apiKey=${API_KEYS}&q=${query}&pageSize=10`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Error searching news:", error);
    return res.status(500).json({ error: "Failed to search news" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port`, PORT);
});
