import mongoose from "mongoose";
const commentschema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, require: true }
        ,
        replies: [{
            type: mongoose.Schema.Types.ObjectId, ref: "commentschema"
        }]

    }, { timestamps: { type: Date, default: Date.now() } }
)

const Postschema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    user_name: { type: String },
    url: { type: String },
    tags: [{ type: String }],
    likes: {type: Number, default: 0},
    comments: [commentschema],
    description: { type: String }
}, { timestamps: true })

export default mongoose.model("post", Postschema)