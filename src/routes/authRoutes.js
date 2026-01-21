import express from "express";
const router = express.Router();
import { register, login, logout } from "./../controllers/authController.js";
import {
  validateLoginSchema,
  validateRegisterSchema,
} from "../validators/validateAuthSchema.js";
import validateRequest from "../middlewares/validateRequest.js";
router.post("/register", validateRequest(validateRegisterSchema), register);
router.post("/login", validateRequest(validateLoginSchema), login);
router.get("/logout", logout);

export default router;
