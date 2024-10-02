import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://web-lichsukien.onrender.com/api/auth/login', { username, password });
            if (response.data.status === 'Success') {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));

                // Set token expiration
                const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 ngày từ giờ
                localStorage.setItem('tokenExpiration', expirationTime);

                alert(response.data.message);
                navigate('/home');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra trong quá trình đăng nhập!');
        }
    };

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-body'>
                            <h2 className='card-title text-center mb-4'>Đăng nhập</h2>
                            {/* {error && <div className='alert alert-danger'>{error}</div>} */}
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor='username' className='form-label'>Tài khoản</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='username'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='password' className='form-label'>Mật khẩu</label>
                                    <input
                                        type='password'
                                        className='form-control'
                                        id='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type='submit' className='btn btn-primary w-100'>Đăng nhập</button>
                            </form>
                            <div className='mt-3 text-center'>
                                Bạn không có tài khoản? <Link to='/register'>Đăng ký</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>

    );
}
