const { blogSchema, slugSchema } = require("../schemas/blog.schema");

const blogValidator = (req, res, next) => {
  const results = blogSchema.safeParse(req.body);

  if (!results.success) {
    return res
      .status(400)
      .json({ message: "Blog Bad Request", err: results.error.issues });
  }

  next();
};

const slugValidator = (req, res, next) => {
  const results = slugSchema.safeParse(req.params.slug);

  if (!results.success) {
    return res.status(400).json({ message: "Slug Bad Request" });
  }

  next();
};

module.exports = { blogValidator, slugValidator };
