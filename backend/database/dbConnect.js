import mongoose from "mongoose"
import { db_Name } from "../constants"

dotenv.config({ path: './.env' })
async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${db_Name}`);
      console.log(`\n mongoDB connected successfully !! DB HOST : ${connectionInstance}`);
    } catch (error) {
        console.error(`mongoDB connection failed : ${error}`);
        process.exit(1)
    }
}

export default connectDB