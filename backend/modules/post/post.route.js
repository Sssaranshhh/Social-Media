import { Router } from "express";
import PostController from "./post.controller.js"

const route=Router()

route.post("/:username/post",PostController.createpost)
route.get("/:username/getposts",PostController.getuserposts)
route.get("/:username/getfeeds",PostController.getfeeds)
route.get("/:username/elseposts",PostController.getelseposts)
route.get("/getallposts",PostController.getallposts)
route.put("/like/:postId", PostController.likePost);

export default route