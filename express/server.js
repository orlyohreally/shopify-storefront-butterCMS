const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const path = require("path");
// const prerender = require("prerender-node").set(
//   "prerenderToken",
//   process.env.PRERENDER_TOKEN
// );

const app = express();
app.use(bodyParser.json())

const router = express.Router();

// prerender.crawlerUserAgents.push("googlebot");
// prerender.crawlerUserAgents.push("bingbot");
// prerender.crawlerUserAgents.push("yandex");
// app.use(prerender);

router.get("/api", (req, res) => {
  res.status(200).json({ message: "I do work!" });
});
console.log(__dirname);
router.get("/*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../storefront/dist/storefront/index.html")
  );
});
app.use("/.netlify/functions/server", router); // path must route to lambda

app.use(express.static(path.join(__dirname, "../storefront/dist/storefront")));

module.exports = app;
module.exports.handler = serverless(app);
