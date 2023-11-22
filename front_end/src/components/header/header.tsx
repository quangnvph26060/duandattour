

const rounded = {
  borderRadius: '25px',
};
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.jpg';
import { useGetMenuQuery } from '../../api/menu';
import { data } from 'autoprefixer';

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
  const { data: Data, error, isLoading } = useGetMenuQuery();

  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Có lỗi xảy ra: {error.message}</div>;
  }
  const menuData = Data?.menuPhanCap || []


  let loaiTour: string[] = [];
  let diemDens: string[] = []

  // if (menuData) {
  //   // Lặp qua mảng data để trích xuất thông tin
  //   menuData.forEach((item) => {
  //     if (item && item.loaiTour) {
  //       loaiTour.push(item.loaiTour.ten_loai_tour); // Thêm tên loại tour vào mảng
  //       diemDens = [...diemDens, ...item.diemDens]; // Thêm tất cả địa điểm vào mảng
  //     }
  //   });
  // }
  // console.log(loaiTour);
  // console.log(diemDens);
  const combinedData = {};
  if (menuData) {


    menuData.forEach((item) => {
      if (item && item.loaiTour) {
        const loaiTourName = item.loaiTour.ten_loai_tour;
        const diemDens = item.diemDens;
        if (!combinedData[loaiTourName]) {
          // Nếu loại tour chưa tồn tại trong đối tượng, tạo nó
          combinedData[loaiTourName] = [];
        }
        // Thêm danh sách điểm đến vào loại tour tương ứng
        combinedData[loaiTourName].push(...diemDens);
      }
    });
    console.log(combinedData);
  }
  return <div> <div className="menu flex items-center justify-between">
    <div className='flex'>
      <a href="/"><img style={rounded} src={logo} alt="logo" width="100px" /></a>

      <nav className='font-semibold p-4 pt-8 pl-18'>
        <div className='max-w-7xl flex justify-between items-center mx-auto relative'>
          <ul className='flex  text-[#2D4271] max-w-7xl gap-12'>
            <li><a href="/" className=''>PolyTour</a></li>

            <li className='group'>
              <a href="/tour" className='menu-items'>Tour</a>


              {/* Menu phân cấp*/}
              <div className='flex max-withd bg-white container mx-auto justify-between p-5 absolute top-full left-0 mt-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-0 transition-all duration-500'>
                <ul className='p-2 flex flex-wrap'> {/* Sử dụng flex-wrap để các loại tour hiển thị ngang */}
                  {Object.keys(combinedData).map((loaiTourName) => (
                    <li className='py-1 pr-4' key={loaiTourName}> {/* Thêm pr-4 để tạo khoảng cách giữa các loại tour */}
                      <a href='' className='mega-menu-title'>{loaiTourName}</a>
                      <ul className='sub-menu'>
                        {combinedData[loaiTourName].map((diemDen) => (
                          <li className='py-2' key={diemDen}>
                            <a href='' className='mega-menu-items'>{diemDen}</a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                  <li className='py-3'>
                    <a href='' className='mega-menu-items underline decoration-3 text-blue-600'>Xem tất cả</a>
                  </li>
                </ul>
              </div>

              {/* Menu phân cấp*/}

            </li>
            <li><a href="/news" className=''>Tin tức</a></li>
            <li><a href="" className=''>Khuyến mãi</a></li>
            <li><a href="/contact" className=''>Liên hệ</a></li>
          </ul>
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
