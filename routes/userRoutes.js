import express from "express";
import { forgotPwdForm, loginForm, registerForm, register } from "../controllers/userController.js";

const router = express.Router()

router.get('/login', loginForm)
router.get('/register', registerForm)
router.post('/register', register)
router.get('/forgot-pwd', forgotPwdForm)

export default router