const asyncHandler = require("express-async-handler");
const { restart } = require("nodemon");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");
// @desc  Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.find({
    message: "Goals retrieved",
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// @desc  Set goal
// @route POST /api/goals 
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

// @desc  Update goal
// @route PUT /api/goals
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Check for user
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Check if goal belongs to user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// @desc  Delete goal
// @route DELETE /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Check for user
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Check if goal belongs to user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id, message: "Goal deleted" });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
