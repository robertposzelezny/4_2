"use strict";
import { categories, funnyJoke, lameJoke } from "./db.js";
import express from "express";

const app = express();

app.get("/jokebook/categories", (req, res) => {
  res.json(categories);
});

app.get("/jokebook/joke/:category", (req, res) => {
  const category = req.params.category;
  if (!categories.includes(category)) {
    return res.status(404).json({
      error: `no jokes for category ${category}`,
    });
  }

  const jokes = category === "funnyJoke" ? funnyJoke : lameJoke;

  const random = Math.floor(Math.random() * jokes.length);

  res.json(jokes[random]);
});

app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.originalUrl,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
