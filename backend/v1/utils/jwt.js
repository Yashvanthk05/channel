const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.cookies.CHANNEL_TOKEN || null;
  if (!token) return next();

  try {
    const result = jwt.verify(token, process.env.SECRET);
    res.status(200).json({ message: "User already Logged In" });
  } catch (err) {
    next();
  }
};

const protectRoute = (req, res, next) => {
  const token = req.cookies.CHANNEL_TOKEN || null;
  if (!token) return res.status(401).json({ message: "Login in required" });
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userid = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Login Required" });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.SECRET, { expiresIn: "1d" });
};

module.exports = { checkToken, protectRoute, generateToken };
