const rounded = {
  borderRadius: "25px",
};
import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import logo from '../img/logo.jpg';
import { useGetMenuQuery } from '../../api/menu';
import { data } from 'autoprefixer';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const HeaderWebsite = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    // Khi được click, cập nhật state để thêm hoặc xoá class "active"
    setIsActive(!isActive);
  };
  const handleRemoveClass = () => {
    // Xóa class bằng cách đặt giá trị isActive về false
    setIsActive(false);
  };
  const baseClasses = "flex text-[#2D4271] max-w-7xl gap-12 reponsive-menu";

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
  }, [token]);

  const { data: Data, error, isLoading } = useGetMenuQuery();

  const parentCallback  = () => {
    console.log("parentCallback");
  }

  // 
  
  // const navigate = useNavigate();

  const reloadTour = (e) => {
    e.preventDefault();
    window.location.reload();
  };
  
  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Có lỗi xảy ra: {error.message}</div>;
  }
  const menuData = Data?.menuPhanCap || [];

  let loaiTour: string[] = [];
  let diemDens: string[] = [];

  if (menuData) {
    // Lặp qua mảng data để trích xuất thông tin
    menuData.forEach((item) => {
      if (item && item.loaiTour) {
        loaiTour.push(item.loaiTour.ten_loai_tour); // Thêm tên loại tour vào mảng
        diemDens = [...diemDens, ...item.diemDens]; // Thêm tất cả địa điểm vào mảng
      }
    });
  }
  console.log(loaiTour);
  console.log(diemDens);

  return (
    <div className="container mx-auto box-border">
      {" "}
      <div className="flex items-center justify-between ">
        <div className="flex">
          <a href="/">
            <img style={rounded} src={logo} alt="logo" width="100px" />
          </a>

          <nav className="font-semibold p-4 pt-8 pl-18">
            <div className="max-w-7xl flex justify-between items-center mx-auto relative">
              <ul className={`${baseClasses} ${isActive ? "active-menu" : ""}`}>
                <li>
                  <a href="/" className="">
                    PolyTour
                  </a>
                </li>

                <li className="group">
                  <a href="/tour" className="menu-items">
                    Tour
                  </a>
                  <ul className="sub-menu">
                    <li className=''>   <a href="" className=''>{loaiTour}</a></li>
                    <li className=''>   <a href="" className=''>{diemDens}</a></li>
                    <li className=''><a href="" className='mega-menu-items underline decoration-3 text-blue-600'>Xem tất cả</a></li>
                  </ul>

                  {/* <div className='flex max-withd bg-white container mx-auto justify-between p-5 absolute top-full left-0 mt-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-0 transition-all duration-500'>
             

                <ul className='p-2 gap-10'>
                  <li className='py-1'>
                    <a href="" className='mega-menu-title'>{loaiTour}</a>
                    </li>
                  <ul>
   {diemDens}
      </ul>
               
                
                </ul>
              </div> */}
                  {/* Menu phân cấp*/}
                  {/* <div className='flex max-withd bg-white container mx- auto justify-between p-5 absolute top-full left-0 mt-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-0 transition-all duration-500'>
                  <ul className='p-2'>
                    <li className='py-1 flex gap-10'>   <a href="" className='mega-menu-title'>{loaiTour}</a></li>
                    <li className='py-1 flex gap-10'>   <a href="" className='mega-menu-title'>{diemDens}</a></li>
                    <li className='py-3'><a href=""className='mega-menu-items underline decoration-3 text-blue-600'>Xem tất cả</a></li>
                  </ul>

                 

               
                </div> */}
                  {/* Menu phân cấp*/}
                </li>
                <li>
                  <a href="/news" className="">
                    Tin tức
                  </a>
                </li>
                <li>
                  <a href="" className="">
                    Khuyến mãi
                  </a>
                </li>
                <li>
                  <a href="/contact" className="">
                    Liên hệ
                  </a>
                </li>
                <div
                  className="w-6 h-6 close-responsive lg:hidden block "
                  onClick={handleRemoveClass}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2976/2976286.png"
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
              </ul>
            </div>
          </nav>
        </div>
        <div className="search-menu flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border-yellow-300
border-[3px] px-2 py-2  rounded"
          />
          <button className="bg-blue-500 text-white py-2 px-3 rounded ml-2">
            Search
          </button>

          <div className="ml-2 reponsive-bt-menu">
            {token ? (
              <Link to="/profile">
                <img
                  src={`http://localhost:8000/storage/${usersId.image}`}
                  alt="img"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%", // Đặt border-radius thành 50% để làm cho hình ảnh tròn
                    border: "2px solid #fff", // Đặt border với màu và độ rộng tùy chọn
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
            <div className="w-6 h-6 lg:hidden block " onClick={handleToggle}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/2976/2976215.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderWebsite;