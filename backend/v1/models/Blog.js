const mongoose = require("mongoose");
const slugify = require("slugify");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      index: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    body: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
    like: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

BlogSchema.pre("save", function () {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, {
      replacement: "-",
      lower: true,
      strict: true,
      trim: true,
    });
  }
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
