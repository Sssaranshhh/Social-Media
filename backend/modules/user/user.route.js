import { Router } from "express";
import userController from "./user.controller.js";

const route= Router()


route.post("/user/signup",userController.signup)
route.post("/user/login",userController.login)
route.post("/user/fetchuser",userController.getuser)
route.post("/user/delete",userController.delete)


export default route