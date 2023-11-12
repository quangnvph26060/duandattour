// import React, { Component, useEffect, useState } from 'react';
// import logo from '../img/logo.jpg'
// import { AiOutlineSearch } from 'react-icons/ai';
// import axios from 'axios'; // Import Axios
// import '../index.css'
// const rounded = {
//     borderRadius: '25px',
// };
// const Dmkuser = () => {
//     const token = localStorage.getItem("token");
//     const [usersId, setUserId] = useState("");

//     //tạo mật khẩu mới
//     // const [currentPassword, setCurrentPassword] = useState('');
//     // const [newPassword, setNewPassword] = useState('');
//     // const [confirmNewPassword, setConfirmNewPassword] = useState('');
//     // const [message, setMessage] = useState('');

//     // const handleSubmit = (event: { preventDefault: () => void; }) => {
//     //     event.preventDefault();

//     //     // Kiểm tra xem bạn đang thực hiện tác vụ nào (đổi mật khẩu hoặc tạo mật khẩu mới)
//     //     // Ví dụ: sử dụng biến action (có thể là "change" hoặc "reset")
//     //     const action = 'reset'; // Đổi thành 'change' hoặc 'reset' tùy theo tác vụ cần thực hiện

//     //     if (action === 'reset') {
//     //         // Kiểm tra tính hợp lệ của mật khẩu và xác nhận mật khẩu mới
//     //         if (newPassword !== confirmNewPassword) {
//     //             setMessage("Mật khẩu không khớp. Vui lòng kiểm tra lại.");
//     //             return;
//     //         }

//     //         // Gọi API để tạo mật khẩu mới
//     //         fetch('https://example.com/api/reset-password', {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //             },
//     //             body: JSON.stringify({ newPassword }),
//     //         })
//     //         .then(response => response.json())
//     //         .then(data => {
//     //             setMessage(data.message);
//     //         })
//     //         .catch(error => {
//     //             setMessage("Đã xảy ra lỗi: " + error.message);
//     //         });
//     //     } else if (action === 'change') {
//     //         // Gọi API để thay đổi mật khẩu
//     //         fetch('https://example.com/api/change-password', {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //             },
//     //             body: JSON.stringify({ currentPassword, newPassword }),
//     //         })
//     //         .then(response => response.json())
//     //         .then(data => {
//     //             setMessage(data.message);
//     //         })
//     //         .catch(error => {
//     //             setMessage("Đã xảy ra lỗi: " + error.message);
//     //         });
//     //     }


//     useEffect(() => {
//         if (token) {
//             // Gửi yêu cầu API để lấy thông tin người dùng từ token
//             fetch("http://localhost:8000/api/user", {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             })
//                 .then((response) => response.json())
//                 .then((userData) => {
//                     setUserId(userData);
//                 })
//                 .catch((error) => {
//                     console.error(error);
//                 });
//         }
//     }, [token])
//     const handleLogout = async () => {
//         try {
//             // Gửi yêu cầu đăng xuất đến API
//             await axios.delete('http://127.0.0.1:8000/api/logout');

//             // Sau khi đăng xuất thành công, chuyển hướng người dùng đến trang đăng nhập hoặc trang chính.
//             window.location.href = 'http://localhost:5173';
//         } catch (error) {
//             console.error('Lỗi khi đăng xuất:', error);
//         }
//     };

    

//     return (
//         <div>
//             {/*  */}
//             <div className='container mx-auto'>
//                 <div className='flex gap-10'>
//                     <aside className='w-1/5 container mx-auto'>
//                         <div className='border border-gray-300 rounded-lg container mx-auto'>
//                             <div className='px-4 py-7 flex gap-1'>
//                                 <img
//                                     src={`http://localhost:8000/storage/${usersId.image}`}
//                                     alt="img"
//                                     style={{
//                                         width: '50px',
//                                         height: '50px',
//                                         borderRadius: '50%', // Đặt border-radius thành 50% để làm cho hình ảnh tròn
//                                         border: '2px solid #fff', // Đặt border với màu và độ rộng tùy chọn
//                                     }}
//                                 />
//                                 <div className='p-2'>
//                                     <h1 className='font-medium p-1'>${usersId.name}</h1>
//                                     <p className='text-sm px-1 text-left'>${usersId.email}</p>
//                                 </div>
//                             </div>
//                             <hr className='mx-5 h-[2px] bg-slate-900' />
//                             <div className='py-3'></div>

//                             <h2 className='px-5 font-medium py-2'>Tài khoản</h2>
//                             <div className='con'>
//                                 <a href="/profile"><p className='text-sm text-red-500 py-1'>Thông tin cá nhân</p></a>
//                                 <a href="/changeMk"> <p className='text-gray-500 text-sm py-1 hover:text-red-500'>Đổi mật khẩu</p></a>
//                                 <a href="#" onClick={handleLogout}>
//                                     <p className='text-gray-500 text-sm py-1 hover:text-red-500'>Đăng xuất</p>
//                                 </a>
//                                 <a href=""><p className='text-gray-500 text-sm py-1 hover:text-red-500'>Yêu cầu xóa tài khoản</p></a>
//                             </div>
//                             <a href="/giohanguser"><h3 className='px-5 py-1 font-medium hover:text-red-500'>Đơn đặt chỗ</h3></a>
//                             <a href=""><h3 className='px-5 py-1 font-medium hover:text-red-500'>Đánh giá của quý khách</h3></a>
//                             <a href=""><h3 className='px-5 py-1 pb-10 font-medium hover:text-red-500'>Yêu thích đã lưu</h3></a>
//                         </div>
//                     </aside>

//                     {/*  */}
//                     <article className='w-4/5 container border border-gray-300 rounded-lg '>
//                         <div className="wrapper p-md-4 px-5 ">
//                             <div className="heading py-4">
//                                 <h5 className="text-xl font-medium">Đổi mật khẩu</h5>
//                                 <p className=" mb-4">
//                                     Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho
//                                     người khác
//                                 </p>
//                             </div>
//                             <form className="change-password px-5">
//                                 <div className="col-12">
//                                     <div className="mb-3 row flex justify-between">
//                                         <label htmlFor="inputOldPassword" className="col-sm-3 col-form-label py-2">Mật khẩu cũ</label>
//                                         <div className="col-sm-7 px-5">
//                                             <input className="form-control border border-gray-300 rounded-md lg:w-[500px] md:w-[300px] h-10 px-3" id="Password" name="Password" placeholder="Mật khẩu cũ" type="password" value="" />
//                                         </div>
//                                         <div className="col d-inline-flex align-items-center py-2">
//                                             <a className="font-medium pl-28 text-blue-500" href="#">Quên mật khẩu?</a>
//                                         </div>
//                                     </div>
//                                     <div className="mb-3 row flex gap-32">
//                                         <label htmlFor="inputNewPassword" className="col-sm-3 col-form-label py-2">Mật khẩu mới</label>
//                                         <div className="col-sm-7 px-5">
//                                             <input className="form-control border border-gray-300 rounded-md lg:w-[500px] md:w-[300px] h-10 px-3" id="PasswordNew" name="PasswordNew" placeholder="Mật  khẩu mới" type="password" value="" />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="mb-3 row flex gap-20 container">
//                                     <label htmlFor="inputConfirmPassword" className="py-2">Nhập lại mật khẩu mới</label>
//                                     <div className="col-sm-7 px-[7px]">
//                                         <input className="form-control border border-gray-300 rounded-md lg:w-[500px] md:w-[300px] h-10 px-3" id="RePasswordNew" name="RePasswordNew" placeholder="Nhập lại mật khẩu mới" type="password" value="" />
//                                     </div>
//                                 </div>
//                                 <div className="row justify-center py-3 ">
//                                     <div className="col-md-3"></div>
//                                     <div className="col-md-7 bg-red-500 py-3 px-20 rounded-lg">
//                                         <button className="btn btn-primary w-100 text-white">Đổi mật khẩu&nbsp;&nbsp;<i className="fas fa-sign-in-alt" aria-hidden="true"></i></button>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </article>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Dmkuser