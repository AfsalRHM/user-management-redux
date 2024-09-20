import express from "express";

const router = express.Router();

import { signup, signin, signout, adminSignin } from "../controllers/auth.controller.js";

router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.get('/sign-out', signout);

router.post("/admin-sign-in", adminSignin);

export default router;
