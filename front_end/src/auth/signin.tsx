import React from 'react';
import logo from '../img/logo.jpg';

const Signup = () => {
  const rounded = {
    borderRadius: '50%',
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="banner">
        <h1 className="text-2xl text-center font-bold mb-4">Welcome to PolyTour</h1>
      </div>

      <div className="menu flex items-center justify-between">
        <div className="logo">
          <img style={rounded} src={logo} alt="Logo" className="w-18 h-12" />
        </div>
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
    </div>
  );
};

export default Signup;