import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema({
    ten_su_kien: {
        type: String
    },
    thoi_gian_dien_ra_su_kien: {
        type: Date
    },
    dia_diem: {
        dia_chi: {
            type: String,
        },
        link_ban_do: {
            type: String,
        }
    },
    gia_ve: {
        loai_gia_ve: {
            type: String,
        },
        so_tien: {
            type: String,
        }
    },
    hinh_anh: {
        type: String
    },
    clip_gioi_thieu: {
        type: String
    },
    linh_vuc: {
        type: String
    },
    bai_viet: {
        type: String
    },
    nguon: {
        type: String
    },
    don_vi_to_chuc: {
        logo: {
            type: String,
        },
        ten: {
            type: String,
        },
        thong_tin_lien_he: {
            sdt: {
                type: Number,
            },
            website: {
                type: String,
            }
        }
    }
}, { timestamps: true });

const EventsModels = mongoose.model('events', eventsSchema);

export default EventsModels;