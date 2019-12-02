const express = require("express"); //CommonJS Modules
const db = require("./data/hubs-model");

const server = express();
server.use(express.json()); //to allow express to parse JSON

server.get("/", (req, res) => {
  res.send({ api: "up and running" });
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

server.post("/hubs", (req, res) => {
  hubData = req.body

  db.add(hubData)
    .then(hub => {
      res.status(201).json(hub)
    })
    .catch(error => {
      console.log("error on /POST hubs", error);
      res
        .status(500)
        .json({ errorMessage: "error adding hub" });
    });
})

server.delete('/hubs/:id', (req, res) => {
  const id = req.params.id

  db.remove(id)
    .then(removed => {
      if (removed) {
        res.status(200).json({ message: "hubs removed successfully", removed })
      } else {
        res.status(404).json({ message: "hub not found" })
      }
    })
    .catch(error => {
      console.log("error on /DELETE hubs/:id", error);
      res
        .status(500)
        .json({ errorMessage: "error removing the hub" });
    });
    
})

const port = 4000;

server.listen(port, () => {
  console.log(`\n ** API running on port ${port} ** \n`);
});
