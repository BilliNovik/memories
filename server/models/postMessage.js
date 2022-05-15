import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: String,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

export default mongoose.model('postMessage', postSchema)