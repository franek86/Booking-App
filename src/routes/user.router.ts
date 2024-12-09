import express from "express";
import { getSession, loginUser, logoutUser, refreshToken, registerUser, userProfile } from "../controllers/user.controller";

import authenticateToken from "../middleware/auth";
import validate from "../middleware/validations";
import { registerUserSchema } from "../shared/validationSchema";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh-token", refreshToken);
router.get("/me", authenticateToken, userProfile);
router.get("/getSession", authenticateToken, getSession);

export default router;
