const express = require("express");
const router = express.Router();
const Joi = require("joi");

//data
const jumplings = [];

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
      id: jumplings.length + 1,
      name: req.body.name,
    };
    jumplings.push(newJump);
    res.status(200).json(newJump);
  }
});

router.get("/:id", (req, res) => {
  res.status(200).json(req.jump);
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
