import React from 'react'
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
        <div className='flex'>
          <img style={rounded} src={logo} alt="logo" width="100px" />
          <nav className='p-4 pt-6 pl-20'>
            <ul className='flex gap-12'>
              <a href="">Du lịch</a>
              <a href="">Vận chuyển</a>
              <a href="">Tin tức</a>
              <a href="">Khuyến mãi</a>
              <a href="">Liên hệ</a>
            </ul>
          </nav>
          <div className='p-4 pt-6 ml-auto'>
            <input className='border border-blue-400 rounded-md w-64' type="text" placeholder='Bắt đầu tìm kiếm...' name="" id="" />
          </div>
          <button className='pr-5'>
            <svg xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
            </svg>
          </button>
        </div>
      </header>

      <div>
        <article className='container mx-auto'>
          <h1 className='text-center text-red-500 font-semibold text-3xl py-3'>Tin tức Vietravel</h1>
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