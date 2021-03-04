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
  findById: async (id, next) => {
    try {
      const findJumpID = await JumplingModel.findById(id);
      return findJumpID;
    } catch (err) {
      next(err);
    }
  },
  findByName: async (name, next) => {
    try {
      const findJumpName = await JumplingModel.find({ name: name }).collation({
        locale: "en",
        strength: 1,
      });
      return findJumpName;
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
  random: async (next) => {
    try {
      // if(everyone choosen ){
      //   updateAll = false
      // }

      const randomJump = await JumplingModel.aggregate([
        { $match: { choose: false } },
        { $sample: { size: 1 } },
      ]);

      const randomUpdateJump = await JumplingModel.findByIdAndUpdate(
        randomJump[0]._id,
        {
          choose: true,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return randomUpdateJump;
    } catch (err) {
      next(err);
    }
  },
  getAllChoose: async (next) => {
    try {
      const allChooseJump = await JumplingModel.find({ choose: true });
      return allChooseJump;
    } catch (err) {
      next(err);
    }
  },
};

module.exports = JumplingController;
