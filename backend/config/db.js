import mongoose from "mongoose"
export const connectDB = async () =>{
    try {
        await mongoose.connect(`mongodb+srv://pratikpatil9113:ysTFY94aaE367Xig@cluster0.38kshrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("db connected");
    } catch (error) {
        console.error("error ", error);
    }
}
