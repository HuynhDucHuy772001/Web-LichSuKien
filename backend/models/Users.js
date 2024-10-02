import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    tokenExpiration: {
        type: Date,
    },
});

const UsersModels = mongoose.model('users', usersSchema);

export default UsersModels;