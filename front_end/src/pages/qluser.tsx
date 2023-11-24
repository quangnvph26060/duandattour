
import logo from '../img/logo.jpg'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../style.css";
const rounded = {
    borderRadius: '25px',
};

const QLuser = () => {

    const token = localStorage.getItem("token");
    const [usersId, setUserId] = useState("");
    const Td = JSON.parse(localStorage.getItem('id'));

    const role = localStorage.getItem('role');
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

    const handleLogout = async (e) => {
        e.preventDefault();
        const confirmLogout = window.confirm("Bạn chắc chắn muốn đăng xuất?");

        if (!confirmLogout) {
            return;
        }
        try {
            const token = localStorage.getItem("token");
            await axios.delete('http://127.0.0.1:8000/api/logout', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('role');
            // Display a success message
            alert("Đăng xuất thành công!");
            window.location.href = 'http://localhost:5173';
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        }
    };
    const [isDivVisible, setDivVisible] = useState(false);

    const toggleDiv = () => {
        setDivVisible(!isDivVisible);
    };

    const closeDiv = () => {
        setDivVisible(false);
    };
    // console.log(usersId);


    return (
        <div>
            {/* Content */}
            <div className="container mx-auto">
                <div className="flex gap-10">
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
                                    {role === 'admin' && (
                                        <a href="/admin"><p className='text-sm text-red-500 py-1'>Quản lý Website</p></a>
                                    )}
                                    <a href="/profile"><p className='text-sm text-red-500 py-1'>Thông tin cá nhân</p></a>
                                    <a href="/changeMk"> <p className='text-gray-500 text-sm py-1 hover:text-red-500'>Đổi mật khẩu</p></a>
                                    <a href="#" onClick={handleLogout}>
                                        <p className='text-gray-500 text-sm py-1 hover:text-red-500'>Đăng xuất</p>
                                    </a>

                                </div>
                            </div>
                            <a href="/giohanguser"><h3 className='px-5 py-1 font-medium hover:text-red-500'>Tour đã đặt</h3></a>
                            <a href=""><h3 className='px-5 py-1 font-medium hover:text-red-500'>Đánh giá của quý khách</h3></a>
                            <a href=""><h3 className='px-5 py-1 pb-10 font-medium hover:text-red-500'>Yêu thích đã lưu</h3></a>
                        </div>
                    </aside>
                    <article className="w-4/5">
                        <div className="border border-gray-300 rounded-lg">
                            <div className="flex justify-between items-center mr-3">
                                <h1 className="font-medium text-xl py-3 px-5">
                                    Thông tin cá nhân
                                </h1>
                                <div className="border bg-red-500 rounded-lg  text-[#ffffff] py-2" onClick={toggleDiv}>
                                    <button><p className="mx-5">  Chỉnh sửa thông tin</p></button>

                                </div>
                            </div>
                            <p className="text-gray-500 text-sm pb-5 px-5">
                                Cập nhật thông tin của Quý khách và tìm hiểu các thông tin này
                                được sử dụng ra sao.
                            </p>
                            {/* <hr  className='h-[2px] bg-slate-400 mx-5'/> */}
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full overflow-x-auto text-sm text-left text-gray-500 dark:text-gray-400">
                                    <tbody>
                                        <tr className="bg-white border-y dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                Họ và Tên
                                            </th>
                                            <td className="px-6 py-4">M{usersId.name}</td>
                                            <td className=" px-6 py-4 text-right">
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                Tổng số tour đã đi
                                            </th>
                                            <td className="px-6 py-4">0</td>
                                            <td className="px-6 py-4 text-right">
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                Địa chỉ Email
                                            </th>
                                            <td className="px-6 py-4">{usersId.email}</td>
                                            <td className="px-6 py-4 text-right mr-4">
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                Số điện thoại
                                            </th>
                                            <td className="px-6 py-4">{usersId.sdt}</td>
                                            <td className="px-6 py-4 text-right mr-4">
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                Ngày sinh
                                            </th>
                                            <td className="px-6 py-4">Chưa có thông tin</td>
                                            <td className="px-6 py-4 text-right mr-4">
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                Giới tính
                                            </th>
                                            <td className="px-6 py-4">Chưa có thông tin</td>
                                            <td className="px-6 py-4 text-right mr-4">
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                Quốc tịch
                                            </th>
                                            <td className="px-6 py-4">Chưa có thông tin</td>
                                            <td className="px-6 py-4 text-right mr-4">
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                Địa chỉ
                                            </th>
                                            <td className="px-6 py-4">{usersId.dia_chi}</td>
                                            <td className="px-6 py-4 text-right mr-4">
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                CMND
                                            </th>
                                            <td className="px-6 py-4">{usersId.cccd}</td>
                                            <td className="px-6 py-4 text-right mr-4">

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            {isDivVisible && (
                <div
                    className="container mx-auto box-border bg-black bg-opacity-50 w-full h-[1000px] fixed z-10 top-0 "
                    id="buttonToShowHide"
                >
                    <div className="border rounded-md fixed top-[5%] left-[25%] z-20 bg-[#ffffff] w-1/2 shadow-2xl shadow-gray-400">
                        <div className="flex justify-between items-center px-5 py-3 border-b bg-blue-500 rounded-tl-md rounded-tr-md ">
                            <button>
                                <p className=" text-lg font-semibold  text-[#ffffff] ">
                                    Sửa thông tin cá nhân
                                </p>
                            </button>
                            <button className="close-img" onClick={closeDiv}>
                                <img src="/src/img/close.png" alt="" />
                                <p className='bg-slate-600'>Đóng</p>
                            </button>
                        </div>

                        <form
                            action=""
                            className="px-5 py-3 text-base font-normal text-[#000] mb-8"
                        >
                            <label htmlFor="" className="form-edit">
                                <p>Họ và tên : </p>
                                <input type="text" placeholder="Họ và tên " />
                            </label>
                            <label htmlFor="" className="mt-3 form-edit">
                                <p className="mt-3">Tổng số tour đã đi : </p>
                                <input
                                    type="number"
                                    placeholder="Tổng số tour đi  "
                                    className="no-spinners"
                                    min={0}
                                />
                            </label>
                            <label htmlFor="" className="mt-3 form-edit">
                                <p className="mt-3">Địa chỉ email </p>
                                <input
                                    type="email"
                                    placeholder="Địa chỉ email  "
                                    className="no-spinners"
                                />
                            </label>
                            <label htmlFor="" className="mt-3 form-edit">
                                <p className="mt-3">Số điện thoại </p>
                                <input
                                    type="number"
                                    placeholder="Số điện thoại   "
                                    className="no-spinners"
                                    min={0}
                                />
                            </label>

                            <label htmlFor="" className="mt-3 form-edit">
                                <p className="mt-3"> </p>
                            </label>
                            <label htmlFor="" className="mt-3 form-edit">
                                <p className="mt-3">Cccd : </p>
                                <input
                                    type="number"
                                    placeholder="Căn cước công dân   "
                                    className="no-spinners"
                                />
                            </label>
                            <label htmlFor="" className="mt-3 form-edit">
                                <p className="mt-3">Địa chỉ : </p>
                                <input
                                    type="text"
                                    placeholder="Địa chỉ   "
                                    className="no-spinners"
                                />
                            </label>
                            <div className="flex justify-center mt-5">
                                <button className="border py-2 bg-blue-500 text-[#ffffff] w-2/5 text-center rounded-lg">
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QLuser;