
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const rounded = {
    borderRadius: '25px',
};


const QLuser = () => {

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

            <br /><br /><br /><br />

            {/* Content */}
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
                                    <h1 className='font-medium p-1'>{usersId.name}</h1>
                                    <p className='text-sm px-1 text-left'>{usersId.email}</p>
                                </div>
                            </div>
                            <hr className='mx-5 h-[2px] bg-slate-900' />
                            <div className='py-3'>
                                <h2 className='px-5 font-medium py-2'>Tài khoản</h2>
                                <div className='px-10'>
                                    <a href="/profile"><p className='text-sm text-red-500 py-1'>Thông tin cá nhân</p></a>
                                    <a href="/changeMk"> <p className='text-gray-500 text-sm py-1 hover:text-red-500'>Đổi mật khẩu</p></a>
                                    <a href="#" onClick={handleLogout}>
                                        <p className='text-gray-500 text-sm py-1 hover:text-red-500'>Đăng xuất</p>
                                    </a>

                                </div>
                            </div>
                            <a href="/giohanguser"><h3 className='px-5 py-1 font-medium hover:text-red-500'>Đơn đặt chỗ</h3></a>
                            <a href=""><h3 className='px-5 py-1 font-medium hover:text-red-500'>Đánh giá của quý khách</h3></a>
                            <a href=""><h3 className='px-5 py-1 pb-10 font-medium hover:text-red-500'>Yêu thích đã lưu</h3></a>
                        </div>
                    </aside>
                    <article className='w-4/5'>
                        <div className='border border-gray-300 rounded-lg'>
                            <h1 className='font-medium text-xl py-3 px-5'>Thông tin cá nhân</h1>
                            <p className='text-gray-500 text-sm pb-5 px-5'>Cập nhật thông tin của Quý khách và tìm hiểu các thông tin này được sử dụng ra sao.</p>
                            {/* <hr  className='h-[2px] bg-slate-400 mx-5'/> */}
                            <form className="relative overflow-x-auto shadow-md sm:rounded-lg" >
                                <table className="w-full overflow-x-auto text-sm text-left text-gray-500 dark:text-gray-400">
                                    <tbody id='editForm'>
                                        {/* <!-- Các trường chỉnh sửa và nút lưu ở đây --> */}
                                        <tr className="bg-white border-y dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Họ và Tên
                                            </th>
                                            <td className="px-6 py-4">
                                                {usersId.name}
                                            </td>
                                            <td className=" px-6 py-4 text-right">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Chỉnh sửa</a>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Tổng số tour đã đi
                                            </th>
                                            <td className="px-6 py-4">
                                                0
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Chỉnh sửa</a>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Địa chỉ Email
                                            </th>
                                            <td className="px-6 py-4">
                                                {usersId.email}
                                            </td>
                                            <td className="px-6 py-4 text-right mr-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Chỉnh sửa</a>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Số điện thoại
                                            </th>
                                            <td className="px-6 py-4">
                                                {usersId.sdt}
                                            </td>
                                            <td className="px-6 py-4 text-right mr-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Chỉnh sửa</a>
                                            </td>
                                        </tr>

                                        <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Giới tính
                                            </th>
                                            <td className="px-6 py-4">
                                                Chưa có thông tin
                                            </td>
                                            <td className="px-6 py-4 text-right mr-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Chỉnh sửa</a>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Quốc tịch
                                            </th>
                                            <td className="px-6 py-4">
                                                Chưa có thông tin
                                            </td>
                                            <td className="px-6 py-4 text-right mr-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Chỉnh sửa</a>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Địa chỉ
                                            </th>
                                            <td className="px-6 py-4">
                                                {usersId.dia_chi}
                                            </td>
                                            <td className="px-6 py-4 text-right mr-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Chỉnh sửa</a>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                CMND
                                            </th>
                                            <td className="px-6 py-4">
                                                {usersId.cccd}
                                            </td>
                                            <td className="px-6 py-4 text-right mr-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Chỉnh sửa</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>

                        </div>
                    </article>
                </div>
            </div>

        </div>
    )
}

export default QLuser