import express from "express"
import cors from "cors"

import connectDB from "./config/db.js"
import PostRoutes from "./modules/post/post.route.js"
import UserRoutes from "./modules/user/user.route.js"
const app=express()


connectDB()



app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))



app.use(express.json())


app.use("/api/user/",PostRoutes)
app.use("/api/",UserRoutes)


export default app