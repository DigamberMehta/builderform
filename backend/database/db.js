import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://disposable01121:1QImwIq7m14Cr7Cc@cluster0.wrtq25z.mongodb.net/builderformdata");
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
    };
 
export default connectDB;