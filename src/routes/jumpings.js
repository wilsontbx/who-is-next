const express = require("express");
const router = express.Router();
const Joi = require("joi");
const getRandom = require("./getRandom");
const math = require("mathjs");
//data
const jumplings = require("./data");
let id = 1;

//validation
function validate(jump) {
  const schema = Joi.object({
    id: Joi.number().integer(),
    name: Joi.string().min(3).required(),
  });
  return schema.validate(jump);
}

//middleware
router.param("id", (req, res, next, id) => {
  let jump = jumplings.find((jump) => jump.id === parseInt(id));
  req.jump = jump;
  next();
});

//route
router.get("/presenter", (req, res) => {
  console.log(getRandom());
  res.status(200).json(jumplings[getRandom()]);
});

router.get("/", (req, res) => {
  res.status(200).json(jumplings);
});

router.post("/", (req, res, next) => {
  const validation = validate(req.body);
  if (validation.error) {
    const error = new Error(validation.error.details[0].message);
    error.statusCode = 400;
    next(error);
  } else {
    const newJump = {
      id: id,
      name: req.body.name,
    };
    jumplings.push(newJump);
    id++;

    res.status(200).json(newJump);
  }
});

router.get("/:name", (req, res) => {
  const idx = jumplings.findIndex((jump) => jump.name === req.params.name);
  res.status(200).json(jumplings[idx]);
});

router.put("/:id", (req, res, next) => {
  const validation = validate(req.body);
  if (validation.error) {
    const error = new Error(validation.error.details[0].message);
    error.statusCode = 400;
    next(error);
  } else {
    const idx = jumplings.findIndex(
      (jump) => jump.id === parseInt(req.jump.id)
    );
    jumplings[idx].name = req.body.name;
    res.status(200).json(jumplings[idx]);
  }
});

router.delete("/:id", (req, res) => {
  const idx = jumplings.findIndex((jump) => jump.id === parseInt(req.jump.id));
  const jumpDelete = jumplings.splice(idx, idx < 0 ? 0 : 1);
  let jump = jumpDelete[0];
  res.status(200).json(jump);
});

//validation
router.use((err, req, res, next) => {
  res.status(err.statusCode).send(`${err}`);
});

module.exports = router;
