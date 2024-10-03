import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import EditEvent from './EditEvent';
import './style.css';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { getAuthHeader } from '../../utils/auth';

export default function EventList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const fetchEvent = await axios.get('https://web-lichsukien.onrender.com/api/get/', {
                headers: getAuthHeader()
            });
            const response = fetchEvent.data;
            console.log(response);
            setData(response);
        } catch (error) {
            console.log("Không thể kết nối đến máy chủ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const removeDiacritics = useCallback((str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }, []);

    useEffect(() => {
        if (data.events) {
            const keywordWithoutDiacritics = removeDiacritics(searchTerm.toLowerCase());
            const filtered = data.events.filter(event => {
                const eventTitleWithoutDiacritics = removeDiacritics(event.ten_su_kien.toLowerCase());
                return eventTitleWithoutDiacritics.includes(keywordWithoutDiacritics);
            });
            setFilteredData(filtered);
        }
    }, [searchTerm, removeDiacritics, data.events]);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sự kiện này?')) {
            try {
                const response = await axios.delete(`https://web-lichsukien.onrender.com/api/delete/${id}`, {
                    headers: getAuthHeader()
                });
                if (response.data.success) {
                    alert(response.data.message);
                    fetchData(); // Tải lại danh sách sự kiện sau khi xóa thành công
                } else {
                    alert('Không thể xóa sự kiện.');
                }
            } catch (error) {
                console.error('Error deleting event:', error);
                alert('Không thể xóa sự kiện.');
            }
        }
    };

    function handleEdit(id) {
        setSelectedEventId(id);
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
        setSelectedEventId(null);
        fetchData();
    }

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(data.events);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Events');
        XLSX.writeFile(workbook, 'events.xlsx');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className='container my-4'>
            <h2 className='text-center mb-4'>Danh sách các sự kiện</h2>

            <div className='row mb-3'>
                <div className='col d-flex justify-content-between'>
                    <div>
                        <Link className='btn btn-primary me-1' to='/create' role='button'>Thêm sự kiện mới</Link>
                        <button type='button' className='btn btn-outline-primary me-1' onClick={fetchData} >Tải lại</button>
                    </div>
                    <input
                        type="text"
                        className="form-control w-25"
                        placeholder="Tìm kiếm sự kiện..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button type='button' className='btn btn-success ms-auto' onClick={handleExport} >Tải xuống file Excel</button>
                    <button className='btn btn-secondary ms-1' onClick={handleLogout}>Đăng xuất</button>
                </div>
            </div>

            {loading ? ( // Hiển thị spinner khi đang tải dữ liệu
                <div className='text-center'>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th className='text-center align-middle'>Hình ảnh</th>
                            <th className='text-center align-middle'>Tiêu đề sự kiện</th>
                            <th className='text-center align-middle'>Lĩnh vực</th>
                            <th className='text-center align-middle'>Ngày diễn ra sự kiện</th>
                            <th className='text-center align-middle'>Địa điểm tổ chức sự kiện</th>
                            <th className='text-center align-middle'>Bài viết</th>
                            <th className='text-center align-middle'>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-center align-middle'>
                                        <img src={item.hinh_anh} alt="Event" style={{ width: '150px', height: '100px' }} />
                                    </td>
                                    <td className='text-center align-middle' style={{ width: '10%' }}>{item.ten_su_kien}</td>
                                    <td className='text-center align-middle'>{item.linh_vuc}</td>
                                    <td className='text-center align-middle'>
                                        {format(new Date(item.ngay_dien_ra_su_kien), 'dd/MM/yyyy')}
                                    </td>
                                    <td className='text-center align-middle' style={{ width: '15%' }}>{item.dia_diem.dia_chi}</td>
                                    <td className='text-left line-clamp-scroll'>{item.bai_viet}</td>
                                    <td style={{ width: "10px", whiteSpace: 'nowrap' }} className='align-center align-middle'>
                                        <button className='btn btn-primary btn-sm me-1' onClick={() => handleEdit(item._id)}>Chỉnh sửa</button>
                                        <button type='button' className='btn btn-danger btn-sm' onClick={() => handleDelete(item._id)}>Xóa</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
            {showModal && (
                <EditEvent
                    showModal={showModal}
                    handleClose={handleCloseModal}
                    eventId={selectedEventId}
                />
            )}
        </div>
    );
}
