import express from "express";
import { loginUser, registerUser } from "../controllers/user.controllers.js";
import { registerValidator } from "../validators/auth.validators.js";
import { validate } from "../middlewares/validate.middlewares.js";

const router = express.Router();

router.post("/register", registerValidator, validate, registerUser);
router.post("/login", loginUser);

export default router;
