const express = require("express");
const cors = require("cors");

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

app.listen(PORT, () => {
  console.log(`Middleware server running on port ${PORT}`);
});
