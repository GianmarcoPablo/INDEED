import { Router } from "express";
import {
    newAccount,
    confirmAccount,
    login,
    forgetPassword,
    confirmToken,
    newPassword,
    profile
} from "../controllers/recruiter.controller.js";

import checkAuth from "../middleware/checkAuth.js";


const router = Router()

router.post("/", newAccount)

router.get("/confirm/:token", confirmAccount)

router.post("/login", login)

router.post("/forget-password", forgetPassword)

router.route("/forget-password/:token").get(confirmToken).post(newPassword)

router.get("/profile", checkAuth, profile)

export default router