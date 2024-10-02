import EventsModels from "../models/Events.js"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const CreateEvent = async (req, res) => {
    try {
        // Kiểm tra và gán giá trị từ req.body
        const {
            ten_su_kien,
            ngay_dien_ra_su_kien,
            thoi_gian_dien_ra_su_kien,
            dia_diem,
            gia_ve,
            hinh_anh,
            clip_gioi_thieu,
            linh_vuc,
            bai_viet,
            nguon,
            don_vi_to_chuc
        } = req.body;

        // Kiểm tra và gán các giá trị lồng nhau
        const dia_chi = dia_diem?.dia_chi;
        const link_ban_do = dia_diem?.link_ban_do;
        const loai_gia_ve = gia_ve?.loai_gia_ve;
        const so_tien = gia_ve?.so_tien;
        const logo = don_vi_to_chuc?.logo;
        const ten = don_vi_to_chuc?.ten;
        const sdt = don_vi_to_chuc?.thong_tin_lien_he?.sdt;
        const website = don_vi_to_chuc?.thong_tin_lien_he?.website;

        // Kiểm tra điều kiện cần thiết cho các trường bắt buộc
        if (!ten_su_kien || !ngay_dien_ra_su_kien || !dia_chi || !loai_gia_ve || (loai_gia_ve === 'Số tiền' && !so_tien) || !hinh_anh || !clip_gioi_thieu || !linh_vuc || !nguon) {
            return res.status(400).json({ success: false, message: 'Thiếu thông tin cần thiết.' });
        }

        // Kiểm tra và xác thực token
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Không có token.' });
        }
        const decoded = jwt.verify(token, 'secret77');
        if (!decoded) {
            return res.status(401).json({ success: false, message: 'Token không hợp lệ.' });
        }

        // Tạo sự kiện mới
        const NewEvent = new EventsModels({
            ten_su_kien,
            ngay_dien_ra_su_kien,
            thoi_gian_dien_ra_su_kien,
            dia_diem: { dia_chi, link_ban_do },
            gia_ve: { loai_gia_ve, so_tien },
            hinh_anh,
            clip_gioi_thieu,
            linh_vuc,
            bai_viet,
            nguon,
            don_vi_to_chuc: { logo, ten, thong_tin_lien_he: { sdt, website } }
        });

        // Lưu sự kiện vào MongoDB
        await NewEvent.save();

        // Gửi phản hồi thành công
        res.status(200).json({
            success: true,
            message: 'Thêm mới sự kiện thành công',
            NewEvent
        });
    } catch (error) {
        console.log(error);

        // Gửi phản hồi lỗi
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

export default CreateEvent;

//read events
const GetEvent = async (req, res) => {
    try {
        //Kiểm tra và xác thực token
        // const token = req.headers['authorization'].split(' ')[1];
        // if (!token) {
        //     return res.status(401).json({ success: false, message: 'Không có token.' });
        // }
        // const decoded = jwt.verify(token, 'secret77');
        // if (!decoded) {
        //     return res.status(401).json({ success: false, message: 'Token không hợp lệ.' });
        // }

        const events = await EventsModels.find()
        if (!events) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy sự kiện' })
        }
        res.status(200).json({ success: true, events })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

//get event id
const GetEventByID = async (req, res) => {
    try {
        // Kiểm tra và xác thực token
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Không có token.' });
        }
        const decoded = jwt.verify(token, 'secret77');
        if (!decoded) {
            return res.status(401).json({ success: false, message: 'Token không hợp lệ.' });
        }

        const EventId = req.params.id;
        const event = await EventsModels.findById(EventId);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy sự kiện' });
        }
        res.status(200).json({ success: true, message: 'Trả về sự kiện thành công', event });
    } catch (error) {
        console.log('Error in GetEventByID:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


//update event
const UpdateEvent = async (req, res) => {
    try {
        // Kiểm tra và xác thực token
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Không có token.' });
        }
        const decoded = jwt.verify(token, 'secret77');
        if (!decoded) {
            return res.status(401).json({ success: false, message: 'Token không hợp lệ.' });
        }

        const EventId = req.params.id;
        const updateEvent = await EventsModels.findByIdAndUpdate(EventId, req.body, { new: true });
        if (!updateEvent) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy sự kiện' });
        }
        res.status(200).json({ success: true, message: 'Cập nhật sự kiện thành công', updateEvent });
    } catch (error) {
        console.log('Error in UpdateEvent:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

//delete event
const DeleteEvent = async (req, res) => {
    try {
        // Kiểm tra và xác thực token
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Không có token.' });
        }
        const decoded = jwt.verify(token, 'secret77');
        if (!decoded) {
            return res.status(401).json({ success: false, message: 'Token không hợp lệ.' });
        }

        const EventId = req.params.id;
        const deleteEvent = await EventsModels.findByIdAndDelete(EventId)
        if (!deleteEvent) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy sự kiện' });
        }
        res.status(200).json({ success: true, message: 'Đã xóa sự kiện thành công', deleteEvent });
    } catch (error) {
        console.log('Error in DeleteEvent:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export { CreateEvent, GetEvent, UpdateEvent, DeleteEvent, GetEventByID }