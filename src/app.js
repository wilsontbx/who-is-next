const express = require("express");
const app = express();
app.use(express.json());

const requireJsonContent = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).send("Server wants application/json!");
  } else {
    next();
  }
};

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

app.post("/", requireJsonContent, (req, res) => {
  res.status(201).send("Thanks for the JSON!");
});

const jumplings = require("./routes/jumpling.route");
app.use("/jumplings", jumplings);

const userRouter = require("./routes/user.route");
app.use("/user", userRouter);

module.exports = app;
