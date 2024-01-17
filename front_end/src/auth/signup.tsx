import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import logo from '../img/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { Avatar } from 'antd';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); // Thêm state để lưu trữ các lỗi
  // const {setUser, setToken} = useStateContext();
  const rounded = {
    borderRadius: '50%',
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Kiểm tra email
    if (!email) {
      errors.email = 'Vui lòng nhập email';
      isValid = false;
    }

    // Kiểm tra password
    if (!password) {
      errors.password = 'Vui lòng nhập mật khẩu';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });
      if (response.status === 200) {
        console.log(response.data)
        const token = response.data.access_token;
        const role = response.data.role;
        showSuccessMessage();
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("id", response.data.data.id);
        // authContext.storeAuthData(token,role);
        //  setUser(response.data.role);
        // 

        if (localStorage.getItem("role") === 'admin') {

          window.location.href = 'http://localhost:5173/admin';
        } else {
          window.location.href = 'http://localhost:5173/';
        }



      }
    } catch (error) {
      console.log('Đã xảy ra lỗi', error);

      // Xử lý lỗi đăng nhập không thành công
      // alert("Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại.");
      showErrorMessage()
    }
  };

  const showSuccessMessage = () => {
    // Hiển thị thông báo thành công
    const successMessage = document.createElement('div');
    successMessage.classList.add(
      'fixed', 'top-16', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2',
      'p-12', 'bg-green-500', 'text-white', 'rounded', 'shadow-lg', 'z-50', 'animate-fadeInOut'
    );

    // Thêm biểu tượng loading
    const loadingIcon = document.createElement('span');
    loadingIcon.classList.add('mr-2', 'text-2xl', 'animate-spin', 'inline-block');
    loadingIcon.innerHTML = '⏳'; // Unicode biểu tượng loading

    // Thêm nội dung thông báo
    successMessage.appendChild(loadingIcon);
    successMessage.innerHTML += "Đang đăng nhập...";

    // Thêm phần tử vào body hoặc một phần tử khác trong DOM
    document.body.appendChild(successMessage);

    // Tạo một Promise để giả lập việc đăng nhập thành công
    const loginSuccessPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 4000); // Giả lập thời gian đăng nhập thành công (2 seconds)
    });

    // Xử lý khi đăng nhập thành công
    loginSuccessPromise.then(() => {
      // Thay thế biểu tượng loading bằng biểu tượng dấu tích
      loadingIcon.innerHTML = '✅'; // Unicode biểu tượng dấu tích

      // Tự động ẩn thông báo sau một khoảng thời gian
      setTimeout(() => {
        successMessage.remove();
      }, 2000); // 2000 milliseconds (2 seconds)
    });
  };

  const showErrorMessage = () => {
    // Hiển thị thông báo báo lỗi
    const ErrorMessage = document.createElement('div');
    ErrorMessage.classList.add(
      'fixed', 'top-20', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2',
      'p-10', 'bg-red-500', 'text-white', 'rounded', 'shadow-lg', 'z-50', 'animate-fadeInOut'
    );

    // Thêm biểu tượng lỗi sử dụng Font Awesome
    const errorIcon = document.createElement('span');
    errorIcon.classList.add('mr-2', 'text-2xl', 'font-awesome', 'fa-exclamation-circle');

    // Thêm nội dung thông báo
    ErrorMessage.appendChild(errorIcon);
    ErrorMessage.innerHTML += "Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại.";

    // Thêm phần tử vào body hoặc một phần tử khác trong DOM
    document.body.appendChild(ErrorMessage);

    // Tự động ẩn thông báo sau một khoảng thời gian
    setTimeout(() => {
      ErrorMessage.remove();
    }, 2000); // 3000 milliseconds (3 seconds)
  };


  return (
    <div className="bg-white rounded-lg shadow p-4">


      <div className="signup-form mt-4 flex flex-col items-center">
        <div className="hello mt-10 mb-10">
          <h1 className="text-2xl text-center font-bold mb-4">Chào Mừng Bạn Đến Với
            <br /> PoLyTour</h1>
        </div>
        <div className="flex flex-col">
          <div>
            <form onSubmit={handleLogin}>
              {/* Hiển thị lỗi cho email */}
              {errors.email && <p className="text-red-500">{errors.email}</p>}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className="form-input"
              />
              <br />
              {/* Hiển thị lỗi cho password */}
              {errors.password && <p className="text-red-500">{errors.password}</p>}
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={handlePasswordChange}
                className="form-input mt-4"
              />
              <br />
              <Link to={`/resetPassword`}> Quên mật khẩu? </Link>
              {/* <a href="#" className="text-blue-500 text-sm mt-3">
               
              </a> */}
              <br />
              <button
                type="submit"
                className="bg-blue-500 text-white py-1 px-3 rounded mt-7"
                style={{ width: '300px' }}
              >
                Đăng Nhập
              </button>
            </form>
          </div>

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
      </div>{' '}
    </div>
  );
};

export default Login;