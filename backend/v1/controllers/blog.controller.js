const slugify = require("slugify");
const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  const { title, description, body } = req.body;
  try {
    const blog = await Blog.findOne({
      slug: slugify(title, {
        lower: true,
        replacement: "-",
        strict: true,
        trim: true,
      }),
    });

    if (blog) {
      return res
        .status(409)
        .json({ message: "Blog with similar title exists" });
    }

    if (!req.body.status)
      await Blog.create({ title, description, body, author: req.userid });
    else
      await Blog.create({
        title,
        description,
        body,
        author: req.userid,
        status: req.body.status,
      });
    res.status(201).json({ message: "Blog Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Blog Creation Failed", error: err });
  }
};

const getBlogBySlug = async (req, res) => {
  const slug = req.params.slug;

  try {
    const blog = await Blog.findOne({ slug }).populate("author");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).send(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Blog Fetch Failed" });
  }
};

const getAllBlogs = async (req, res) => {
  const page = req.query.page | 1;
  const limit = req.query.limi | 10;
  const skip = (page - 1) * limit;

  try {
    const blogs = await Blog.find({ status: { $ne: "private" } }).populate("author")
      .skip(skip)
      .limit(limit);
    const totalBlogs = await Blog.countDocuments({
      status: { $ne: "private" },
    });
    const totalPages = Math.ceil(totalBlogs / limit);

    res.status(200).json({ blogs, page, limit, totalPages });
  } catch (err) {
    res.status(500).json({ message: "Server error Blogs not fetched" });
  }
};

const getMyBlogs = async (req, res) => {
  const page = req.query.page | 1;
  const limit = req.query.limit | 10;
  const skip = (page - 1) * limit;
  const userid = req.userid;

  try {
    const blogs = await Blog.find({ author: userid }).skip(skip).limit(limit);

    const totalBlogs = await Blog.countDocuments({ author: userid });
    const totalPages = Math.ceil(totalBlogs / limit);

    res.status(200).json({ blogs, page, limit, totalPages });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

const updateBlogBySlug = async (req, res) => {
  const { description, body } = req.body;
  const slug = req.params.slug;

  try {
    const blog = await Blog.findOneAndUpdate(
      { slug },
      { description, body },
      { new: true },
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Blog updation failed" });
  }
};

const deleteBlogBySlug = async (req, res) => {
  const slug = req.params.slug;

  try {
    const blog = await Blog.findOneAndDelete({ slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Blog deletion failed" });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  getMyBlogs,
  deleteBlogBySlug,
  updateBlogBySlug,
};
