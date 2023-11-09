import React, { useEffect, useState } from 'react';
import logo from '../img/logo.jpg'
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios'; // Import Axios

const rounded = {
    borderRadius: '25px',
};
const Giohanguser = () => {
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
    return (
        <div>
            <br /><br /><br /><br />
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

                    <article className='w-4/5 container'>
                        <div className='flex border justify-between px-10 py-5 rounded-lg'>
                            <a href="">Tất cả</a>
                            <a href="">Chờ xác nhận</a>
                            <a href="">Đã đặt</a>
                        </div>
                        <div className='py-5'>
                            <div className='flex border gap-5 px-10 py-5 rounded-lg'>
                                <div className='pt-1'>
                                    <AiOutlineSearch />
                                </div>
                                <input type="text" className='overflow-hidden w-96' placeholder='Tìm kiếm theo tên tour/tourCode hoặc số booking' name="" id="" />
                            </div>
                        </div>
                        <div className='px-2'>
                            <h1 className='text-2xl font-medium'>Liên tuyến Miền Trung - Miền Nam</h1>
                            <p className='py-3'>10/11/2023 - 20/11/2023</p>
                        </div>
                        <div>
                            <div className='flex border gap-5 px-10 py-5 rounded-lg'>
                                <div>
                                    <div className='flex gap-4'>
                                        <img src="http://localhost:5173/src/img/sl.webp" className='w-1/3 rounded-lg' alt="" />
                                        <div>
                                            <h2 className='text-2xl font-medium'>Hà Nội - Sapa - Fansipang - Ninh Bình - Tràng An - Bái Đính - Yên Tử | Thu bên nhau</h2>
                                            <div className='py-4'>
                                                <p className='py-1font-medium'>Tuyệt vời</p>
                                                <p>358 Quan tâm</p>
                                                <div className='flex justify-between'>
                                                    <p className='py-3'>Số booking: 2HBNDFSBV43476</p>
                                                    <div>
                                                        <p className='text-xl text-red-500 font-medium'>Quá Hạn thanh toán</p>
                                                        <p className='text-xl text-red-500 font-medium'>14,790,000₫</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p className='py-4'>1 người 6 đêm</p>
                                            </div>
                                        </div>

                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default Giohanguser