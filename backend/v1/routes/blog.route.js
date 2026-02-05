const { protectRoute } = require("../utils/jwt");
const {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  deleteBlogBySlug,
  updateBlogBySlug,
  getMyBlogs,
} = require("../controllers/blog.controller");
const {
  blogValidator,
  slugValidator,
} = require("../middlewares/blog.middleware");

const express = require("express");

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/my-blogs", protectRoute, getMyBlogs);
router.get("/:slug", slugValidator, getBlogBySlug);
router.post("/create", protectRoute, blogValidator, createBlog);
router.put("/:slug", slugValidator, blogValidator, updateBlogBySlug);
router.delete("/:slug", slugValidator, deleteBlogBySlug);

module.exports = router;
