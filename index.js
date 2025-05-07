const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.get("/hello", (req, res) => {
  res.status(200);
  res.send({ response: "hello world!" });
});

app.all("/*", async (req, res) => {
  try {
    const url = `https://isit950-backend.vercel.app${req.originalUrl}`;
    const config = {
      method: req.method,
      url: url,
      headers: {
        Authorization: req.headers["authorization"],
        "Content-Type": req.headers["content-type"],
      },
      data: req.body,
    };

    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Middleware server running on port ${PORT}`);
});
