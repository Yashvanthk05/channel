const z = require("zod");

const blogSchema = z.object({
  title: z.string(),
  description: z.string().max(200),
  body: z.string(),
  status: z.enum(["public", "private"]).optional(),
});

const slugSchema = z
  .string()
  .min(1, "Slug cannot be empty")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

module.exports = { blogSchema, slugSchema };
