import express from "express";
import { addDoctor } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", upload.single("image"), addDoctor);
// we have to send image in form data with the name field name "image"
// image will be parsed from 'upload.single("image")'

export default adminRouter;
