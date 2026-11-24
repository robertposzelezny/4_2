"use strict";

const express = require("express");
const app = express();

app.get("/math/circle/:r", (req, res) => {
  const r = parseFloat(req.params.r);

  const result = {
    area: (Math.PI * r * r).toFixed(2),
    circumference: (2 * Math.PI * r).toFixed(2),
  };

  res.json(result);
});

app.get("/math/rectangle/:width/:height", (req, res) => {
  const a = parseFloat(req.params.width);
  const b = parseFloat(req.params.height);

  const result = {
    area: (a * b).toFixed(2),
    circumference: (2 * a + 2 * b).toFixed(2),
  };

  res.json(result);
});

app.get("/math/power/:base/:exponent", (req, res) => {
  const base = Number(req.params.base);
  const exponent = Number(req.params.exponent);

  if (!Number.isFinite(base) || !Number.isFinite(exponent)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const result = Math.pow(base, exponent);

  const response = { result };

  if (req.query.root === "true") {
    if (base < 0) {
      return res.status(400).json({ error: "Invalid input" });
    }

    response.root = Math.sqrt(base);
  }

  res.json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
