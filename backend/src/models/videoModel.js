import mongoose from "mongoose"
import { User } from "./userModel"

const videoSchema = new mongoose.Schema({
    videoFile: {
        type: String
    },
    title: {
        type: String,
        required: true,
    },
    thumnail: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean
    },
    ownedBY: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
})

const Video = mongoose.model("video",videoSchema)
export default Video