import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://web-lichsukien.onrender.com/api/auth/signup', { username, password });
            if (response.data.status === 'Success') {
                alert(response.data.message);
                navigate('/login');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Có lỗi xảy ra trong quá trình đăng ký tài khoản');
        }
    };

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-body'>
                            <h2 className='card-title text-center mb-4'>Đăng ký</h2>
                            {error && <div className='alert alert-danger'>{error}</div>}
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
                                <button type='submit' className='btn btn-primary w-100'>Đăng ký</button>
                            </form>
                            <div className='mt-3 text-center'>
                                Bạn đã có tài khoản? <Link to='/login'>Đăng nhập</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}