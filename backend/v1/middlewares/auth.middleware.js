const { registerSchema, loginSchema } = require("../schemas/auth.schema");
const User = require("../models/User");

const registerValidator = async (req, res, next) => {
  const { email, username, password } = req.body;
  const result = registerSchema.safeParse({ email, username, password });

  if (!result.success) {
    return res.status(400).json({ message: result.error.issues });
  }

  const userByEmail = await User.findOne({ email: email });

  if (userByEmail) {
    return res.status(401).json({ message: "User exists with this Email" });
  }

  const userByUsername = await User.findOne({ username: username });

  if (userByUsername) {
    return res.status(401).json({ message: "User exists with this Username" });
  }

  next();
};

const loginValidator = (req, res, next) => {
  const { email, password } = req.body;
  const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    return res.status(401).json({ message: result.error.issues });
  }

  next();
};

module.exports = { registerValidator, loginValidator };
