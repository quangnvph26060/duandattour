import React from 'react'
import logo from "../img/logo.jpg"
import anh16 from "../img/anh16.png"

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
            <h1 className='text-center text-red-500 font-semibold text-3xl py-5'>Tin tức Vietravel</h1>
            <div className='flex gap-72 py-2 container justify-center'>
                <p className='font-medium'>Tin tức du lịch</p>
                <p className='font-medium'>Cẩm nang du lịch</p>
                <p className='font-medium'>Kinh nghiệm du lịch</p>
            </div>
            <h1 className='text-xl font-medium py-3'>Tin tức du lịch</h1>

            <div className='flex'>
                <div className='w-2/3'>
                    <img src={anh16} alt="anh16" className='w-auto rounded-xl' />
                    <p className='py-5 px-3 text-red-500 font-medium'>Tin tức dữ liệu</p>
                    <h2 className='px-3 font-semibold text-4xl'>Tận hưởng kỳ nghỉ trọn vẹn tại những khách sạn <br /> sang chảnh ở Đà Nẵng</h2>
                </div>
                <div className='w-1/3'>akjhsk</div>
            </div>
        </article>
      </div>
    </div>
  )
}

export default News