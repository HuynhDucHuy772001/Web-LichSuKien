import jwt from 'jsonwebtoken';
import UsersModels from "../models/Users.js";

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Không có token, quyền truy cập bị từ chối' });
    }

    if (token === process.env.HARD_TOKEN) {
        req.user = { role: 'thirdParty' };
        return next();
    }

    try {
        const decoded = jwt.verify(token, 'secret77');
        const user = await UsersModels.findOne({ _id: decoded._id, token: token });

        if (!user) {
            throw new Error('Tài khoản không tồn tại');
        }

        if (user.tokenExpiration < new Date()) {
            user.token = null;
            user.tokenExpiration = null;
            await user.save();
            throw new Error('Token hết hạn');
        }

        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token không hợp lệ' });
    }
};

export default authMiddleware;