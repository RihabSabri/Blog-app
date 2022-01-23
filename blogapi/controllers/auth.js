const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    return res.status(201).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json("Wrong username");
    }
    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      return res.status(404).json("Wrong password");
    }
    const userToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, userToken });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { registerUser, loginUser };
