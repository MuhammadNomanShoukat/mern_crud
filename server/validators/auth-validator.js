const z = require("zod");

const signUpSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username minimum should be at least 3 characters" })
    .max(255, {
      message: "Username maximum should be at least 255 characters",
    }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(3, { message: "Password minimum should be at least 3 characters" })
    .max(255, {
      message: "Password maximum should be at least 255 characters",
    }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, { message: "Email minimum should be at least 3 characters" })
    .max(255, {
      message: "Email maximum should be at least 255 characters",
    }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone minimum should be at least 10 characters" })
    .max(20, {
      message: "Phone maximum should be at least 20 characters",
    }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, { message: "Email minimum should be at least 3 characters" })
    .max(255, {
      message: "Email maximum should be at least 255 characters",
    }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(3, { message: "Password minimum should be at least 3 characters" })
    .max(255, {
      message: "Password maximum should be at least 255 characters",
    }),
});

module.exports = { signUpSchema, loginSchema };
