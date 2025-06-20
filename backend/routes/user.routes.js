import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"; 
import { singleUpload } from "../middlewares/multer.js";
import { register, login, updateProfile,logout, updateProfilePhoto } from "../controllers/user.controller.js";

import multer from "multer";

const upload = multer();

const router =express.Router();
router.route("/register").post(singleUpload,register);
router.post("/login",login);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.put('/update-profile-photo', isAuthenticated, singleUpload, updateProfilePhoto);
router.route("/logout").get(logout);

export default router;