const z = require("zod");

const registerSchema = z.object({
  email: z.email(),
  username: z.string().min(5, "Username length should be Minimum 5"),
  password: z.string().min(5, "Password length should be minimum 5"),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(5, "Password length should be minimum 5"),
});

module.exports = { registerSchema, loginSchema };
