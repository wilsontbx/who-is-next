const JumplingModel = require("../models/jumpling.model");

const JumplingController = {
  createOne: async (jump, next) => {
    try {
      const newJump = new JumplingModel(jump);
      await newJump.save();
      return newJump;
    } catch (err) {
      next(err);
    }
  },
  getAllJumps: async (next) => {
    try {
      const allJump = await JumplingModel.find();
      return allJump;
    } catch (err) {
      next(err);
    }
  },
  findById: async (id) => {
    try {
      const findJump = await JumplingModel.findById(id);
      return findJump;
    } catch (err) {
      next(err);
    }
  },
  updateById: async (id, body, next) => {
    try {
      const updatedJump = await JumplingModel.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      return updatedJump;
    } catch (err) {
      next(err);
    }
  },
  deleteById: async (id, next) => {
    try {
      const deletedJump = await JumplingModel.findByIdAndDelete(id);
      return deletedJump;
    } catch (err) {
      next(err);
    }
  },
};

module.exports = JumplingController;
