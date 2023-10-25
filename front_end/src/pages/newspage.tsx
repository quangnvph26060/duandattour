import React from 'react'
import { Link } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import logo from "../img/logo.jpg"
import anh16 from "../img/anh16.png"
import anh5 from "../img/anh5.png"
import anh18 from "../img/anh18.png"
import anh6 from "../img/anh6.png"
import anh20 from "../img/anh20.jpg"
import anh21 from "../img/anh21.jpg"
import anh22 from "../img/anh22.jpg"
import anh10 from "../img/ảnh 10.jpg"
import anh23 from "../img/anh23.png"
import anh24 from "../img/anh24.png"

const rounded = {
  borderRadius: '25px',
};

const News = () => {
  return (
    <div>
      <header>
        <div className="menu flex items-center justify-between">
          <div className='flex'>
            <img style={rounded} src={logo} alt="logo" width="70px" />
            <nav className='font-semibold p-4 pt-6 pl-18'>
              <ul className='flex text-[#2D4271] gap-12'>
                <a href="/">PolyTour</a>
                <a href="/tour">Tour</a>
                <a href="/news">Tin tức</a>
                <a href="">Khuyến mãi</a>
                <a href="/contact">Liên hệ</a>
              </ul>
            </nav>
          </div>
          <div className="search flex items-center">
            <input type="text" placeholder="Search..." className="border-yellow-300
border-[3px] px-2 py-2  rounded" />
            <button className="bg-blue-500 text-white py-2 px-3 rounded ml-2">Search</button>


            <div className="ml-2">
              <Link to="/signup">
                <button className="bg-green-500 text-white py-1 px-3 rounded">
                  <i className="fas fa-user"></i>
                </button>
              </Link>
            </div>

          </div>
        </div>

      </header>

      <div>
        <article className='container mx-auto'>
          <h1 className='text-center text-red-500 font-semibold text-3xl py-3'>Tin tức PolyTour</h1>
          <div className='flex gap-72 py-2 container justify-center'>
            <p className='font-medium'>Tin tức du lịch</p>
            <p className='font-medium'>Cẩm nang du lịch</p>
            <p className='font-medium'>Kinh nghiệm du lịch</p>
          </div>
          <h1 className='text-xl font-medium py-3'>Tin tức du lịch</h1>

          <div className='flex gap-5'>
            <div className='w-3/5'>
              <img src={anh16} alt="anh16" className='w-auto rounded-xl' />
              <p className='py-4 px-3 text-red-500 font-medium'>Tin tức dữ liệu</p>
              <h2 className='px-3 font-semibold text-4xl'>Tận hưởng kỳ nghỉ trọn vẹn tại những khách sạn <br /> sang chảnh ở Đà Nẵng</h2>
              <p className='text-sm px-3 py-4'>10/10/2023</p>
            </div>
            <div className='w-2/5'>
              <div className='flex gap-3'>
                <img src={anh5} alt="anh17" className='w-64 rounded-lg' />
                <div>
                  <p className='text-red-500 font-medium text-lg'>Tin Tức Dữ Liệu</p>
                  <p className='font-medium py-4 text-lg'>5 điểm đến tuyệt vời cho các <br /> hoạt động ngoài trời khi du lịch <br /> Hàn Quốc</p>
                  <p className='font-medium'>26/09/2023</p>
                </div>
              </div>
              <div className='flex gap-3 py-11'>
                <img src={anh18} alt="anh18" className='w-64 rounded-lg' />
                <div>
                  <p className='text-red-500 font-medium text-lg'>Tin Tức Dữ Liệu</p>
                  <p className='font-medium py-8 text-lg'>Những cung đường Đông - Tây Bắc đẹp nhất khi vào mùa thu</p>
                  <p className='font-medium'>26/09/2023</p>
                </div>
              </div>
              <div className='flex gap-3'>
                <img src={anh6} alt="anh16" className='w-64 rounded-lg' />
                <div>
                  <p className='text-red-500 font-medium text-lg'>Tin Tức Dữ Liệu</p>
                  <p className='font-medium py-4 text-lg'>Du lịch Châu Âu mùa thu ghé thăm Zaanse Schans ngôi làng cối xay gió nổi tiếng nhất thế giới</p>
                  <p className='font-medium'>26/09/2023</p>
                </div>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='container flex mb-3 px-5 justify-between align-items-center'>
              <h2 className='py-4 text-xl font-semibold'>Cẩm nang du lịch</h2>
              <a href="" className='fw-bold py-4 font-medium'>Xem tất cả</a>
            </div>
            <div className='grid grid-cols-3 gap-14'>
              <img src={anh20} alt="anh20" className='rounded-xl w-auto' />
              <img src={anh21} alt="anh21" className='rounded-xl w-auto' />
              <img src={anh22} alt="anh22" className='rounded-xl w-auto' />
            </div>
          </div>
          <div>
            <div className='container flex mb-3 px-5 py-3 justify-between align-items-center'>
              <h2 className='py-4 text-xl font-semibold'>Cẩm nang du lịch</h2>
              <a href="" className='fw-bold py-4 font-medium'>Xem tất cả</a>
            </div>
            <div className='grid grid-cols-3 gap-14'>
              <div>
                <img src={anh10} alt="anh10" className='rounded-xl w-auto' />
                <p className='text-red-500 py-3 px-1 font-medium'>Kinh nghiệm du lịch</p>
              </div>
              <div>
                <img src={anh23} alt="anh23" className='rounded-xl w-auto' />
                <p className='text-red-500 py-3 px-1 font-medium'>Kinh nghiệm du lịch</p>
              </div>
              <div>
                <img src={anh24} alt="anh24" className='rounded-xl w-auto' />
                <p className='text-red-500 py-3 px-1 font-medium'>Kinh nghiệm du lịch</p>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* footer */}
      <footer className='text-center py-5'></footer>
    </div>
  )
}

export default News