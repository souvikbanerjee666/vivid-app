import mongoose from "mongoose"
import Video from "./videoModel"


const userSchema = mongoose.Schema({
   username: {
       type: String,
       required: true,
       unique: true,
       index: true,
       trim: true
   },
    fullName: {
        type: String,
        required: [true,"fullName is required"]
    },
      email:{
        type: String,
        unique: true,
        required: [true,"email is required"]
      },
      password:{
        type: String,
        required: [true,"password is required"]
      },
      avatar: {
        type: String,
      },
      coverImage: {
        type: String
      },
      watchHistory: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: Video
        }
      ],
      refreshToken: {
        type: String
      }
},
       {timestamps:true}
)

export const User = mongoose.model("User",userSchema)