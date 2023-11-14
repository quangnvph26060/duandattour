const rounded = {
  borderRadius: '25px',
};
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.jpg';


const HeaderWebsite = () => {

  const token = localStorage.getItem("token");
  const [usersId, setUserId] = useState("");
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


  return <div> <div className="menu flex items-center justify-between">
    <div className='flex'>
      <a href="/"><img style={rounded} src={logo} alt="logo" width="100px" /></a>

      <nav className='font-semibold p-4 pt-8 pl-18'>
        <div className='max-w-7xl flex justify-between items-center mx-auto relative'>
          <ul className='flex text-[#2D4271] max-w-7xl gap-12'>
            <li><a href="/" className=''>PolyTour</a></li>
            <li className='group'>
              <a href="/tour" className='menu-items'>Tour</a>
              {/* Menu phân cấp*/}
                <div className='flex max-withd gap-10 bg-white p-5 absolute top-full left-15 mt-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-0 transition-all duration-500'>
                  <ul className='p-2'>
                    <li className='py-1'><a href="" className='mega-menu-title'>Tour Miền Bắc</a></li>
                    <li className='py-2 pt-3'><a href="" className='mega-menu-items'>Du lịch Hà Nội</a></li> 
                    <li className='py-2'><a href=""className='mega-menu-items'>Du lịch Hạ Long</a></li>
                    <li className='py-2'><a href=""className='mega-menu-items'>Du lịch Bắc Ninh</a></li>
                    <li className='py-2'><a href=""className='mega-menu-items'>Du lịch Phú Thọ</a></li>
                    <li className='py-2'><a href=""className='mega-menu-items'>Du lịch Ninh Bình</a></li>
                    <li className='py-3'><a href=""className='mega-menu-items underline decoration-3 text-blue-600'>Xem tất cả</a></li>
                  </ul>

                  <ul className='p-2'>
                    <li className='py-1'><a href="" className='mega-menu-title'>Tour Miền Trung</a></li>
                    <li className='py-2 pt-3'><a href="" className='mega-menu-items'>Du lịch Huế</a></li> 
                    <li className='py-2'><a href=""className='mega-menu-items'>Du lịch Quảng Trị</a></li>
                    <li className='py-2'><a href="" className='mega-menu-items'>Du lịch Quảng Bình</a></li>
                    <li className='py-2'><a href="" className='mega-menu-items'>Du lịch Đà Nẵng</a></li>
                    <li className='py-2'><a href="" className='mega-menu-items'>Du lịch Quảng Nam</a></li>
                    <li className='py-3'><a href=""className='mega-menu-items underline decoration-3 text-blue-600'>Xem tất cả</a></li>
                  </ul>

                  <ul className='p-2'>
                    <li className='py-1'><a href="" className='mega-menu-title'>Tour Miền Tây Nam Bộ</a></li>
                    <li className='py-2 pt-3'><a href="" className='mega-menu-items'>Du lịch Phú Quốc</a></li> 
                    <li className='py-2'><a href=""className='mega-menu-items'>Du lịch Tiền Giang</a></li>
                    <li className='py-2'><a href="" className='mega-menu-items'>Du lịch Cần Thơ</a></li>
                    <li className='py-2'><a href="" className='mega-menu-items'>Du lịch Vĩnh Long</a></li>
                    <li className='py-2'><a href="" className='mega-menu-items'>Du lịch Sóc Trăng</a></li>
                    <li className='py-3'><a href=""className='mega-menu-items underline decoration-3 text-blue-600'>Xem tất cả</a></li>
                  </ul>

                  <ul className='p-2'>
                    <li className='py-1'><a href="" className='mega-menu-title'>Tour Miền Đông Nam Bộ</a></li>
                    <li className='py-2 pt-3'><a href="" className='mega-menu-items'>Du lịch Đồng Nai</a></li> 
                    <li className='py-2'><a href=""className='mega-menu-items'>Du lịch Bà Rịa-Vũng Tàu</a></li>
                    <li className='py-2'><a href="" className='mega-menu-items'>Du lịch Côn Đảo</a></li>
                    <li className='py-2'><a href="" className='mega-menu-items'>Du lịch TP. Hồ Chí Minh</a></li>
                    <li className='py-2'><a href="" className='mega-menu-items'>Du lịch Tây Ninh</a></li>
                    <li className='py-3'><a href=""className='mega-menu-items underline decoration-3 text-blue-600'>Xem tất cả</a></li>
                  </ul>
                </div>
              {/* Menu phân cấp*/}
            </li>
            <li><a href="/news" className=''>Tin tức</a></li>
            <li><a href="" className=''>Khuyến mãi</a></li>
            <li><a href="/contact" className=''>Liên hệ</a></li>
          </ul>
          {/* <ul>
            <li><a href="">kjhlkjh</a></li>
          </ul> */}
        </div>
      </nav>
    </div>
    <div className="search flex items-center">
      <input type="text" placeholder="Search..." className="border-yellow-300
border-[3px] px-2 py-2  rounded" />
      <button className="bg-blue-500 text-white py-2 px-3 rounded ml-2">Search</button>


      <div className="ml-2">
        {token ? (
          <Link to="/profile">
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
          </Link>
        ) : (
          <Link to="/signup">
            <button className="bg-green-500 text-white py-1 px-3 rounded">
              <i className="fas fa-user"></i>
            </button>
          </Link>
        )}
      </div>

    </div>
  </div>
  </div>
};

export default HeaderWebsite;
