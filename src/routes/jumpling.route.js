const express = require("express");
const router = express.Router();
const Joi = require("joi");
const JumplingModel = require("../models/jumpling.model");
const JumplingControllers = require("../controller/jumpling.controllers");
// const getRandom = require("./getRandom");

//data
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
router.param("id", async (req, res, next, id) => {
  try {
    const jump = await JumplingControllers.findById(id, next);
    req.jump = jump;
    next();
  } catch (err) {
    next(err);
  }
});

//route
router.get("/presenter", async (req, res) => {
  // res.status(200).json(jumplings[getRandom()]);
});

router.get("/", async (req, res) => {
  try {
    const allSong = await JumplingControllers.getAllJumps(next);
    res.status(200).json(allSong);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  // const validation = validate(req.body);
  // if (validation.error) {
  //   const error = new Error(validation.error.details[0].message);
  //   error.statusCode = 400;
  //   next(error);
  // } else {
  //   const newJump = {
  //     id: id,
  //     name: req.body.name,
  //   };
  //   jumplings.push(newJump);
  //   id++;

  //   res.status(200).json(newJump);
  // }
  try {
    const newJump = await JumplingControllers.createOne(req.body, next);
    res.status(201).json(newJump);
  } catch (err) {
    next(err);
  }
});

router.get("/:name", async (req, res) => {
  try {
    const jump = await JumplingControllers.createOne(req.body, next);
    res.status(200).json(jump);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  // const validation = validate(req.body);
  // if (validation.error) {
  //   const error = new Error(validation.error.details[0].message);
  //   error.statusCode = 400;
  //   next(error);
  // } else {
  //   const idx = jumplings.findIndex(
  //     (jump) => jump.id === parseInt(req.jump.id)
  //   );
  //   jumplings[idx].name = req.body.name;
  //   res.status(200).json(jumplings[idx]);
  // }
  try {
    const updatedJump = await JumplingControllers.updateById(
      req.jump.id,
      req.body,
      next
    );
    res.status(200).json(updatedJump);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const delatedJump = await JumplingControllers.deleteById(req.jump.id, next);
    res.status(200).json(delatedJump);
  } catch (err) {
    next(err);
  }
});

//validation
router.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = router;