import mongoose from "mongoose"

const dbConnect = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log(`\n MongoDB connected successfully !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection failed: ${error}`);
        process.exit(1);
    }
}
export default dbConnect
