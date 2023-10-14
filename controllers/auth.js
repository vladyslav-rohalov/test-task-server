const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { controllerWrapper } = require("../helpers");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const payload = { id: newUser._id, role: "user" };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "30d" });
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    user: {
      email: newUser.email,
      name: user.name,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = { id: user._id, role: "user" };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "30d" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    user: {
      email: user.email,
      name: user.name,
    },
    token,
  });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
};
