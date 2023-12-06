import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetTourByIdQuery } from '../api/TourApi';

const Favorite = () => {

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
    function calculateNumberOfDays(start, end) {
        const startDate = new Date(start);
        const endDate = new Date(end);

        const timeDifference = Math.abs(endDate - startDate);
        const numberOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        return numberOfDays;
    }


    const token = localStorage.getItem("token");
    const [usersId, setUserId] = useState("");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [idCccd, setIdCccd] = useState('');
    const [address, setAddress] = useState('');
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

                    setName(userData.name);
                    setEmail(userData.email);
                    setPhoneNumber(userData.sdt);
                    setIdCccd(userData.cccd);
                    setAddress(userData.dia_chi);

                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [token])

    const [tourfavorite, setTourfavorite] = useState([]);
    useEffect(() => {
        addToFavorites();
    }, []);
    const addToFavorites = () => {
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/favorites', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setTourfavorite(response.data);

                console.log(response.data);
            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            });
        console.log('123', tourfavorite)
    };

    const tourIds = tourfavorite.map(item => item.tour_id);
    // console.log('sdfdsf',tourIds);
    const { data: postData, error, isLoading } = useGetTourByIdQuery(tourIds);
    // console.log('2323',postData)
    useEffect(() => {
        // Dòng log này chỉ được gọi khi postData đã được cập nhật
        console.log('2323', postData);
    }, [postData]);

    return (
        <div className='mx-auto container flex gap-10 py-8'>
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
                            {(role === 'admin' || role === 'huong_dan_vien' || role === 'nhan_vien') && (
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
                    <a href="/favorite"><h3 className='px-5 py-1 pb-10 font-medium hover:text-red-500'>Yêu thích đã lưu</h3></a>
                </div>
            </aside>


            <div className="container mx-auto w-4/5" style={{ display: "flex", gap: "10px" }}>
                <div>
                    <div className='container mx-auto border border-gray-400 rounded-lg text-center lg:w-[1200px] md:w-[700px] mb:w-[300px]'><h1 className='text-xl font-semibold pb-5 py-4'>Các Tour Đã Lưu</h1></div>
                    <div className='flex gap-4 py-4 container mx-auto'>



                        <div className='grid grid-cols-3 gap-7 container mx-auto'>
                            {
                                tourfavorite.map((items) => (
                                    <div key={items.id} className="relative hover:transform hover:-translate-y-2 hover:transition-transform hover:duration-300">
                                        {/* ... (your existing code) */}
                                        <div className=' bg-white rounded-t-lg shadow-xl'>

                                            <div className="relative">
                                                <div className="py-2 absolute top-0 left-1">

                                                </div>
                                                <img src="http://localhost:5173/src/img/anh7.png" className="rounded-t-lg mb-3 h-[250px]" alt="" />
                                            </div>

                                            <p className="px-2">{items.lich_khoi_hanh} - {calculateNumberOfDays(items.lich_khoi_hanh, items.ngay_ket_thuc)} ngày - Giờ đi: 05:20</p>
                                            <Link to={""}><p className='font-bold py-2 px-2'>{items.ten_tour}</p></Link>
                                            <p className='font-bold py-2 px-2'>Số lượng: {items.soluong} </p>
                                            <div className='flex gap-2 py-2 px-4'>
                                                <p className='text-sm'>Nơi khởi hành: </p>
                                                <p className='font-medium text-sm'>{items.diem_khoi_hanh}</p>
                                            </div>
                                            <p className='text-base pt-1 px-4 text-blue-950 font-semibold'>Giá trẻ em: {items.gia_treem}₫</p>
                                            <div className='grid grid-cols-2 justify-between px-4 p-1'>
                                                <p className='text-xl font-bold text-red-500'>{items.gia_nguoilon}₫</p>
                                                <div className='bg-yellow-300 py-2 text-center font-semibold rounded-xl text-white shadow-xl'>10% Giảm</div>
                                            </div>
                                            <div className="px-3 py-4 grid grid-cols-2 gap-7">
                                                <button className="bg-red-500 hover:bg-red-900 px-4 py-2 rounded-lg text-white shadow-xl">Đặt Ngay</button>
                                                <button className="border border-blue-600 px-5 py-2 rounded-lg hover:bg-slate-300 hover:text-white shadow-xl"><a href="" className="text-blue-600">Xem chi tiết</a></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Favorite