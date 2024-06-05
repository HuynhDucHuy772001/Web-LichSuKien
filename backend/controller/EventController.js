import EventsModels from "../models/Events.js"

const CreateEvent = async (req, res) => {
    try {
        const { duong_dan_hinh_anh, ten_su_kien, thoi_gian_dien_ra_su_kien, dia_diem, loai_su_kien, mo_ta } = req.body

        const NewEvent = new EventsModels({
            duong_dan_hinh_anh, ten_su_kien, thoi_gian_dien_ra_su_kien, dia_diem, loai_su_kien, mo_ta
        })
        await NewEvent.save()
        res.status(200).json({ success: true, Message: 'Thêm mới sự kiện thành công', NewEvent })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, Message: 'Internal Server Error', NewEvent })
    }
}

//read events
const GetEvent = async (req, res) => {
    try {
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