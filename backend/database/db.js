import mongoose from 'mongoose';

const uri = "mongodb+srv://admin:admin@cluster0.vnjm7.mongodb.net/ContactsDB?retryWrites=true&w=majority";

const connectDb = async () => {
    try {
        const con = await mongoose.connect(uri);
        console.log(`Connected to MongoDB: ${con.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDb;