import React from 'react';
import logo from '../img/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
const Signup = () => {
  const rounded = {
    borderRadius: '50%',
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
    

      <div className="menu flex items-center justify-between">
      <a href="/" className="logo">
  <div>
    <img style={rounded} src={logo} alt="Logo" className="w-18 h-12" />
  </div>
</a>
        <ul className="flex">
          <li className="mr-4">
            <a href="/">Du lịch</a>
          </li>
          <li className="mr-4">
            <a href="/about">Vận Chuyển</a>
          </li>
          <li className="mr-4">
            <a href="/contact">Vietravel MICE</a>
          </li>
          <li className="mr-4">
            <a href="/about">VietravelPlus</a>
          </li>
          <li className="mr-4">
            <a href="/contact">Tin tức</a>
          </li>
          <li className="mr-4">
            <a href="/contact">Liên hệ</a>
          </li>
        </ul>
        <div className="search flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-400 px-2 py-1 rounded"
          />
          <button className="bg-blue-500 text-white py-1 px-3 rounded ml-2">Search</button>

          <div className="ml-2">
            <button className="bg-green-500 text-white py-1 px-3 rounded">
              <i className="fas fa-user"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="signup-form mt-4 flex flex-col items-center">
      <div className="hello mt-10 mb-10">
        <h1 className="text-2xl text-center font-bold mb-4">Chào Mừng Bạn Đến Với 
       <br /> PoLyTour</h1>
      </div>
<div className="flex flex-col">
  <label htmlFor="phoneNumber" className="mb-1">Số điện thoại hoặc email*</label>
  <input
    type="phoneNumber"
    id="phoneNumber"
    placeholder="Tài khoản"
    className="border border-gray-400 px-2 py-1 rounded mt-2"
    style={{ width: '400px' }}
  />
</div>
<div className="flex flex-col mt-10">
  <label htmlFor="password" className="mb-1 ">Mật khẩu</label>
  <input
    type="password"
    id="password"
    placeholder="Mật khẩu"
    className="border border-gray-400 px-2 py-1 rounded mt-2"
    style={{ width: '400px' }}
    

  />
   <a href="#" className="text-blue-500 text-sm mt-3">Quên mật khẩu?</a>
</div>
        <button className="bg-blue-500 text-white py-1 px-3 rounded mt-7 " style={{ width: '300px' }}>
          Đăng Nhập
        </button>
        <a href="/signin">
        <button className="bg-red-500 text-white py-1 px-3 rounded mt-7 " style={{ width: '300px' }}>
          Đăng Ký
        </button>
        </a>
      </div>
      <div className="flex justify-center mt-10">
  <button className="flex items-center bg-blue-500 text-white py-2 px-4 rounded mr-2">
    <FontAwesomeIcon icon={faFacebook} className="mr-2" />
    Facebook
  </button>
  <button className="flex items-center bg-red-500 text-white py-2 px-4 rounded ml-2">
    <FontAwesomeIcon icon={faGoogle} className="mr-2" />
    Google
  </button>
</div>
      <footer className="mt-8 text-center text-gray-500">
    &copy; {new Date().getFullYear()} Your Website. All rights reserved.
  </footer>
    </div>
  );
};

export default Signup;