const express = require("express"); //CommonJS Modules
const db = require("./data/hubs-model");

const server = express();

server.get("/", (req, res) => {
  res.send({ api: "up and running" });
});

const port = 4000;

server.listen(port, () => {
  console.log(`\n ** API running on port ${port} ** \n`);
});

server.get("/hubs", (req, res) => {
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      console.log("error on /GET hubs", error);
      res
        .status(500)
        .json({ errorMessage: "error getting list of hubs from database" });
    });
});
