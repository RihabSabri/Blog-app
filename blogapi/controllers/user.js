const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    const { password, ...others } = users._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("user not found");
    }
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateUser = async (req, res) => {
  if (req.user.id === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      return res.status(200).json({ updatedUser });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json({ success: false, error: "Permission denied" });
  }
};
const deleteUser = async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({ user });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json({ success: false, error: "Permission denied" });
  }
};

module.exports = { getAllUsers, getSingleUser, updateUser, deleteUser };
