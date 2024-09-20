import express from "express";
import { fetchUsers, editSave, deleteUser } from "../controllers/admin.controller.js"; 
import { verifyToken } from "../utils/verify.user.js";

const router = express.Router();

router.get("/fetchusers", fetchUsers);
router.put('/edituser/:id', editSave);
router.delete('/deleteuser/:id', deleteUser);
// router.post("/update/:id", verifyToken, updateUser);
// router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
