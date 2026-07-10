import { Router } from "express";
import { body } from "express-validator";
import * as authController from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post(
  "/register",
  [
    body("fullName").trim().notEmpty().withMessage("Full name is required."),
    body("username").trim().isLength({ min: 3 }).withMessage("Username must be at least 3 characters."),
    body("email").isEmail().withMessage("Enter a valid email address.").normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters.")
      .matches(/\d/)
      .withMessage("Password must include a number."),
    body("confirmPassword").custom((val, { req }) => val === req.body.password).withMessage("Passwords don't match."),
  ],
  validate,
  authController.register
);

router.post(
  "/login",
  [
    body("emailOrUsername").trim().notEmpty().withMessage("Email or username is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  validate,
  authController.login
);

router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.post("/forgot-password", [body("email").isEmail()], validate, authController.forgotPassword);
router.post(
  "/reset-password",
  [body("token").notEmpty(), body("password").isLength({ min: 8 })],
  validate,
  authController.resetPassword
);
router.get("/me", requireAuth, authController.me);

export default router;
