import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://diptikantarout1234_db_user:resume123@cluster0.6chk6yz.mongodb.net/RESUME')
       .then(() => console.log('DB CONNECTED'))
}