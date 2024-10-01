import UsersModels from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const CreateUser = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, message: 'Tài khoản hoặc mật khẩu không được để trống!' })
        }
        const username = await UsersModels.findOne({ username: req.body.username })

        if (username) {
            return res.status(400).json({ success: false, message: 'Tài khoản đã tồn tại!' })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await UsersModels.create({
            ...req.body,
            password: hashedPassword,
        });
        //JWT
        const token = jwt.sign({ _id: newUser._id }, 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(201).json({
            status: 'Success',
            message: "Đăng ký tài khoản thành công",
            token,
        });
    } catch (error) {
        console.log(error);

        res.status(300).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UsersModels.findOne({ username });
        if (!user) return res.status(404).json({ success: false, message: 'Tài khoản không tồn tại!' })

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Tài khoản hoặc mật khẩu không chính xác!' });
        }

        const token = jwt.sign({ _id: user._id }, 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(200).json({
            status: 'Success',
            token,
            message: "Đăng nhập thành công!",
            user: {
                _id: user._id,
                username: user.username,
            }
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

export { CreateUser, Login }