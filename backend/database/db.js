import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://digambermehta2603:t5ElwXKSrbynj2K5@cluster0.ctzr3gx.mongodb.net/userformdeta");
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
    };
 
export default connectDB;