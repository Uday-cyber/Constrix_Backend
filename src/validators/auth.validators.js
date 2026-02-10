import { body } from "express-validator";

export const registerValidator = [
  body("firstName")
    .trim()
    .notEmpty().withMessage("First name is required")
    .isLength({ min: 2 }).withMessage("First name must be at least 2 chars"),

  body("lastName")
    .trim()
    .notEmpty().withMessage("Last name is required")
    .isLength({ min: 2 }).withMessage("Last name must be at least 2 chars"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Passsword must be 8 character long")
    .matches(/[A-Z]/).withMessage("Password must contain 1 uppercase letter")
    .matches(/[0-9]/).withMessage("Password must contain 1 number"),
];
