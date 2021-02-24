const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    0: "GET    /",
    1: "GET    /jumplings",
    2: "POST   /jumplings",
    3: "GET /jumplings/:name",
    4: "PUT /jumplings/:id",
    5: "DELETE /jumplings/:id",
    6: "-----------------------",
    7: "GET    /jumplings/presenter",
  });
});

const jumplings = require("./src/routes/jumpings");
app.use("/jumplings", jumplings);

module.exports = app;
