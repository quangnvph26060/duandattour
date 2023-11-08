import React from 'react'
import logo from '../img/logo.jpg'
import { AiOutlineSearch } from 'react-icons/ai';


const rounded = {
  borderRadius: '25px',
};
const Giohanguser = () => {
  return (
    <div>
      <header>
        <div className='flex'>
          <a href="/"><img style={rounded} src={logo} alt="logo" width="100px" /></a>
          <nav className='p-4 pt-6 pl-20'>
            <ul className='flex gap-12'>
              <a href="/tour">Du lịch</a>
              <a href="">Vận chuyển</a>
              <a href="/news">Tin tức</a>
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
      {/*  */}
      <div className='container mx-auto'>
        <div className='flex gap-10'>
          <aside className='w-1/5 container mx-auto'>
            <div className='border border-gray-300 rounded-lg container mx-auto'>
              <div className='px-4 py-7 flex gap-1'>
                <img src={logo} className='w-14' alt="" />
                <div className='p-2'>
                  <h1 className='font-medium p-1'>Nguyễn Mạnh Hiếu</h1>
                  <p className='text-sm px-1 text-left'>nguyenmanhhieutl@gmail.com</p>
                </div>
              </div>
              <hr className='mx-5 h-[2px] bg-slate-900' />
              <div className='py-3'>
                <h2 className='px-5 font-medium py-2'>Tài khoản</h2>
                <div className='px-10'>
                  <a href=""><p className='text-sm text-red-500 py-1'>Thông tin cá nhân</p></a>
                  <a href=""> <p className='text-gray-500 text-sm py-1 hover:text-red-500'>Đổi mật khẩu</p></a>
                  <a href=""><p className='text-gray-500 text-sm py-1 hover:text-red-500'>Đăng xuất</p></a>
                  <a href=""><p className='text-gray-500 text-sm py-1 hover:text-red-500'>Yêu cầu xóa tài khoản</p></a>
                </div>
              </div>
              <a href=""><h3 className='px-5 py-1 font-medium hover:text-red-500'>Đơn đặt chỗ</h3></a>
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
              <h1 className='text-2xl font-medium'>Khu Vực Tour</h1>
              <p className='py-3'>ngày/tháng/nắm</p>
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