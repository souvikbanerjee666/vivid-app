import { password } from "bun"
import mongoose from "mongoose"


const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
      username: {
        type: String,
        unique: true,
        required: true
      },
      email:{
        type: String,
        unique: true,
        required: true
      },
      password:{
        type: String,
        required: true
      }
},
       {timestamps:true}
)

export const User = mongoose.model("User",userSchema)