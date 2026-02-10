import express from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { registerValidator } from "../validators/auth.validators.js";
import { validate } from "../middlewares/validate.middlewares.js";

const router = express.Router();

router.post("/register", registerValidator, validate, registerUser);

export default router;
