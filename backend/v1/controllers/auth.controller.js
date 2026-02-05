const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

const register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);

    res.cookie("CHANNEL_TOKEN", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 7,
      secure: false,
    });

    return res.status(201).json({ message: "User successfully created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error in Creating User" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "User does not exists, Register plz" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "User password does not match" });
    }

    const token = generateToken(user._id);

    res.cookie("CHANNEL_TOKEN", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 7,
      secure: false,
    });

    return res.status(200).json({ message: "User Logged in Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error User not Logged in" });
  }
};

const checkAuth = async (req, res) => {
  const userid = req.userid;
  try {
    const user = await User.findById(userid);
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("CHANNEL_TOKEN", {
    httpOnly: true,
    secure: false,
  });
  res.status(200).json({ message: "Logged out Successfully" });
};

module.exports = { register, login, checkAuth, logout };
