import mongoose from "mongoose";

const dbCon = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('mongodb is connected');
    } catch (error) {

    }
}

export default dbCon;