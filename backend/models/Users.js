import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
});

const UsersModels = mongoose.model('users', usersSchema);

export default UsersModels;