import express from "express";
import studentController from "./controllers/studentController.js";
// import loginController from "./controllers/loginController.js"
import userController from "./controllers/userController.js"
const router=express.Router();

router.use('/student',studentController);
// router.use('/auth',loginController);
router.use('/user',userController);

export default router;