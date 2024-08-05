import mongoose from "mongoose"

export const connectDb = async () =>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb is Connected : ${con.connection.host}`)
    } catch (error) {
     console.log(`Error in MongoDb Connection : ${error.message}`);
     process.exit(1);
    }
}