const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Hello World");
});

const router = require("./src/routes");
app.use("/jumplings", router);

module.exports = app;
