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
  }
  const newJump = {
    id: jumplings.length + 1,
    name: req.body.name,
  };
  jumplings.push(newJump);
  res.status(200).json(newJump);
});

//validation
router.use((err, req, res, next) => {
  res.statusCode = err.statusCode;
  res.send(`${err}`);
});

module.exports = router;
