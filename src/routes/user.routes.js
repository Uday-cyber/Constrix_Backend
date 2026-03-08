import express from "express";
import { deleteUser, loginUser, logoutUser, registerUser, updateUser, updateUserProfile } from "../controllers/user.controllers.js";
import { registerValidator } from "../validators/auth.validators.js";
import { validate } from "../middlewares/validate.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/register", registerValidator, validate, registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.delete("/delete", verifyJWT, deleteUser);
router.patch("/update", verifyJWT, updateUser);
router.patch("/update-profile", verifyJWT, upload.single("profile"), updateUserProfile);

export default router;
