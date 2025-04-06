import mongoose from "mongoose";

import { ENV_VARS } from "./envVar.js";

export const connectDB = async() =>{
    try{
       const con =  await mongoose.connect(ENV_VARS.MONGO_URI)
       console.log("momgodb connected"+ con.connection.host);
    }catch(error){

        console.log("error connection in mongodb" + error.message);
process.exit(1);
// 1 means error , 0 means no error 
    }
}