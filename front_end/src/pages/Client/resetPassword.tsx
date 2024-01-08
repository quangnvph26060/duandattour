import React, { useEffect, useState } from 'react';
import logo from '../img/logo.jpg'
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';

const rounded = {
    borderRadius: '25px',
};
const ResetPassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
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
    const handlePasswordChange = async (e) => {
        e.preventDefault();

        // Validate that the new password and confirm password match
        if (newPassword !== confirmPassword) {
            alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
            return;
        }

        try {
            await axios.put('http://127.0.0.1:8000/api/change_password', {
                password: oldPassword,
                passwordnew: newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Đổi mật khẩu thành công!");
            await axios.delete('http://127.0.0.1:8000/api/logout', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('role');

            // Redirect or perform other actions after logout

            window.location.href = 'http://localhost:5173/signup';
        } catch (error) {
            console.error('Lỗi khi đổi mật khẩu:', error);
        }
    };
    const handleForgotPassword = async () => {
        try {
            const response = await axios.post('http://your-api-url/forgot-password', {
                email: usersId.email, // Sử dụng email đã lưu
            });

            console.log(response.data.message);
            // Hiển thị thông báo cho người dùng
        } catch (error) {
            console.error('Lỗi khi yêu cầu quên mật khẩu:', error.response.data.message);
            // Xử lý lỗi và hiển thị thông báo cho người dùng
        }
    };

    // const resetPassword = () => {
     const navigate = useNavigate();   
    const [email, setEmail] = useState('');
    // }
    const resetPassword = (event) => {
        event.preventDefault();
       axios.put("http://127.0.0.1:8000/api/password/reset", { email })
          .then(response => {
            // Xử lý kết quả thành công
            alert("Lấy lại mật khẩu thành công, bạn vui lòng kiểm tra mail để lấy mật khẩu !!");
            navigate('/signup');

          })
          .catch(error => {
            // Xử lý lỗi
            console.error(error);
            // alert("Bạn chưa đăng nhập!");
          });
      };

      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
    return (
        <div>
            {/*  */}
            <div className='container mx-auto'>
                <div className='flex gap-10'>
                    {/* <aside className='w-1/5 container mx-auto'>
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

                            </div>
                            <a href="/giohanguser"><h3 className='px-5 py-1 font-medium hover:text-red-500'>Tour đã đặt</h3></a>
                            <a href=""><h3 className='px-5 py-1 font-medium hover:text-red-500'>Đánh giá của quý khách</h3></a>
                            <a href=""><h3 className='px-5 py-1 pb-10 font-medium hover:text-red-500'>Yêu thích đã lưu</h3></a>
                        </div>
                    </aside> */}

                    {/*  */}
                    <article className='w-4/5 container border border-gray-300 rounded-lg '>
                        <div className="wrapper p-md-4 px-5 ">
                            <div className="heading py-4">
                                <h5 className="text-xl font-medium">Quên mật khẩu</h5>
                                {/* <p className=" mb-4">
                                    Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho
                                    người khác
                                </p> */}
                            </div>
                            <form className="change-password px-5" onSubmit={resetPassword}>
                                <div className="col-12">
                                    <div className="mb-3 row flex justify-between">
                                        <label htmlFor="inputOldPassword" className="col-sm-3 col-form-label py-2">Email</label>
                                        <div className="col-sm-7 px-5">
                                            <input
                                                className="form-control border border-gray-300 rounded-md lg:w-[500px] md:w-[300px] h-10 px-3"
                                                id="email"
                                                name="email"
                                                placeholder="Email"
                                                type="email"
                                                value={email}
                                                onChange={handleEmailChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-center py-3 ">
                                    <div className="col-md-3"></div>
                                    <div className="col-md-7 bg-red-500 py-3 px-20 rounded-lg">
                                        <button className="btn btn-primary w-100 text-white"type="submit">
                                            Lấy lại mật khẩu&nbsp;&nbsp;<i className="fas fa-sign-in-alt" aria-hidden="true"></i>
                                        </button>
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

export default ResetPassword 