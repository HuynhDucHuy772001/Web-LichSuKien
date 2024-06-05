import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema({
    duong_dan_hinh_anh: {
        type: String
    },
    ten_su_kien: {
        type: String
    },
    thoi_gian_dien_ra_su_kien: {
        type: String
    },
    dia_diem: {
        type: String
    },
    loai_su_kien: {
        type: String
    },
    mo_ta: {
        type: String
    }
}, { timestamps: true })

const EventsModels = mongoose.model('events', eventsSchema)

export default EventsModels