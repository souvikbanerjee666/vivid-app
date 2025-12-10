import dotenv from "dotenv"
import { app } from "./app.js"
import dbConnect from "./database/dbConnect.js"


dotenv.config({path: "../.env"})


dbConnect()
.then(() => {
    app.on("error",  (error) => console.log("mongoDB connection failed!!",error));

    app.listen(process.env.PORT || 5000, ()=> {
        console.log(`server is running: ${process.env.PORT}`);
    
    })
})
.catch((err) => console.log("MongoDB connection error",err))