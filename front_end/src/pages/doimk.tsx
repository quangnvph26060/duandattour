import React, { useEffect, useState } from 'react';
import logo from '../img/logo.jpg'
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios'; // Import Axios
import '../index.css'
const rounded = {
    borderRadius: '25px',
};
const Dmkuser = () => {
    const token = localStorage.getItem("token");
    const [usersId, setUserId] = useState("");
    useEffect(() => {
        if (token) {
            // Gửi yêu cầu API để lấy thông tin người dùng từ token
            fetch("http://localhost:8000/api/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((userData) => {
                    setUserId(userData);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [token])
    const handleLogout = async () => {
        try {
            // Gửi yêu cầu đăng xuất đến API
            await axios.delete('http://127.0.0.1:8000/api/logout');

            // Sau khi đăng xuất thành công, chuyển hướng người dùng đến trang đăng nhập hoặc trang chính.
            window.location.href = 'http://localhost:5173';
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        }
    };
    return (
        <div>
            {/*  */}
            <div className='container mx-auto'>
                <div className='flex gap-10'>
                    <aside className='w-1/5 container mx-auto'>
                        <div className='border border-gray-300 rounded-lg container mx-auto'>
                            <div className='px-4 py-7 flex gap-1'>
                                <img
                                    src={`http://localhost:8000/storage/${usersId.image}`}
                                    alt="img"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%', // Đặt border-radius thành 50% để làm cho hình ảnh tròn
                                        border: '2px solid #fff', // Đặt border với màu và độ rộng tùy chọn
                                    }}
                                />
                                <div className='p-2'>
                                    <h1 className='font-medium p-1'>${usersId.name}</h1>
                                    <p className='text-sm px-1 text-left'>${usersId.email}</p>
                                </div>
                            </div>
                            <hr className='mx-5 h-[2px] bg-slate-900' />
                            <div className='py-3'></div>

                            <h2 className='px-5 font-medium py-2'>Tài khoản</h2>
                            <div className=''>
                                <a href="/profile"><p className='text-sm text-red-500 py-1'>Thông tin cá nhân</p></a>
                                <a href="/changeMk"> <p className='text-gray-500 text-sm py-1 hover:text-red-500'>Đổi mật khẩu</p></a>
                                <a href="#" onClick={handleLogout}>
                                    <p className='text-gray-500 text-sm py-1 hover:text-red-500'>Đăng xuất</p>
                                </a>
                                <a href=""><p className='text-gray-500 text-sm py-1 hover:text-red-500'>Yêu cầu xóa tài khoản</p></a>
                            </div>
                            <a href="/giohanguser"><h3 className='px-5 py-1 font-medium hover:text-red-500'>Đơn đặt chỗ</h3></a>
                            <a href=""><h3 className='px-5 py-1 font-medium hover:text-red-500'>Đánh giá của quý khách</h3></a>
                            <a href=""><h3 className='px-5 py-1 pb-10 font-medium hover:text-red-500'>Yêu thích đã lưu</h3></a>
                        </div>
                    </aside>

                    {/*  */}
                    <article className='w-4/5 container border border-gray-300 rounded-lg '>
                        <div className="wrapper p-md-4 px-5">
                            <div className="heading">
                                <h5 className="text-xl font-medium">Đổi mật khẩu</h5>
                                <p className="text-muted mb-4">
                                    Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho
                                    người khác
                                </p>
                            </div>
                            <form className="row change-password py-4">
                                <div className="col-12">
                                    <div className="mb-3 row">
                                        <label htmlFor="inputOldPassword" className="col-sm-3 col-form-label">Mật khẩu cũ</label>
                                        <div className="col-sm-7">

                                            <input className="form-control" id="Password" name="Password" placeholder="Mật khẩu cũ" type="password" value="" />
                                        </div>
                                        <div className="col d-inline-flex align-items-center">
                                            <a className="fw-bold" href="#">Quên mật khẩu?</a>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="inputNewPassword" className="col-sm-3 col-form-label">Mật khẩu mới</label>
                                        <div className="col-sm-7"></div>
                                        <input className="form-control" id="PasswordNew" name="PasswordNew" placeholder="Mật  khẩu mới" type="password" value="" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="inputConfirmPassword" className="col-sm-3 col-form-label">Nhập lại mật khẩu mới</label>
                                    <div className="col-sm-7">
                                        <input className="form-control" id="RePasswordNew" name="RePasswordNew" placeholder="Nhập lại mật khẩu mới" type="password" value="" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3"></div>
                                    <div className="col-md-7">
                                        <button className="btn btn-primary w-100">Đổi mật khẩu&nbsp;&nbsp;<i className="fas fa-sign-in-alt" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default Dmkuser