const express = require("express");
const {
  register,
  login,
  checkAuth,
  logout,
} = require("../controllers/auth.controller");
const {
  registerValidator,
  loginValidator,
} = require("../middlewares/auth.middleware");
const { checkToken, protectRoute } = require("../utils/jwt");

const router = express.Router();

router.post("/register", checkToken, registerValidator, register);
router.post("/login", checkToken, loginValidator, login);
router.get("/me", protectRoute, checkAuth);
router.get("/logout", logout);

module.exports = router;
