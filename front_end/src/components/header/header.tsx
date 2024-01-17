const rounded = {
  borderRadius: "25px",
};
import axios from "axios";
import { IPour } from "../../interface/home";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { useGetMenuQuery } from "../../api/menu";

import "../../page.css";
interface Tour {
  id: number;
  ten_tour: string;
  diem_di: string;
  diem_den: string;
  lich_khoi_hanh: string;
  ngay_ket_thuc: string;
  diem_khoi_hanh: string;
  gia_tour: number;
  mo_ta: string;
  soluong: number;
}
const HeaderWebsite = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tours, setTours] = useState<IPour[]>([]);
  const [filteredTours, setFilteredTours] = useState<IPour[]>([]);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Tour[]>([]);
  const [matchedResults, setMatchedResults] = useState<Tour[]>([]);

  const token = localStorage.getItem("token");
  const [usersId, setUserId] = useState("");
  const [imagesData, setImagesData] = useState([]);

  useEffect(() => {
    const fetchImagesData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/admin/logo"
        );
        setImagesData(response.data); // Assuming the API response is an array of image data
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchImagesData();
  }, []);

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

  const parentCallback = () => {
    console.log("parentCallback");
  };

  //

  // const navigate = useNavigate();

  // if (isLoading) {
  //   return <div>Đang tải dữ liệu...</div>;
  // }

  // if (error) {
  //   return <div>Có lỗi xảy ra: {error.message}</div>;
  // }
  const menuData = Data?.menuPhanCap || [];

  let loaiTour: string[] = [];
  let diemDens: string[] = [];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const handleSearch = () => {
    // Xử lý tìm kiếm dữ liệu
  
    // Đặt lại giá trị searchTerm thành null
    setSearchTerm("");
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setFilteredTours([]);
    setSearched(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const displayedTours = searched ? filteredTours : tours;
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
    
  }

  return (
    <div>
      {" "}
      <div className="menu flex items-center justify-between">
        <div className="flex">
          <a href="/">
            {imagesData.length > 0 ? (
              <img
              className="rounded-3xl w-[50px] h-[50px] mt-4"
             
                src={`http://localhost:8000/storage/${imagesData[0].image_logo}`}
                alt=""
             
              />
            ) : (
              <span></span>
            )}
          </a>

         
          <nav className="font-semibold p-4 pt-8 pl-18">
            <div className="max-w-7xl flex justify-between items-center mx-auto relative">
              <ul className="flex  text-[#2D4271] max-w-7xl gap-12">
                <li>
                <Link to={""} className="menu-items">
                  Trang chủ
                </Link>
                  {/* <a href="/" className="">
                   
                  </a> */}
                </li>

                <li className="group visible">
                  <Link to={"tour"} className="menu-items">
                    Du lịch
                  </Link>
                  {/* Menu phân cấp*/}
                  <div className="container mx-auto max-w-full w-full" style={{ zIndex: 10 }}>
                    <div className="">
                      <ul style={{ zIndex: 10 }} className=" flex flex-wrap bg-[aliceblue] fixed p-8 right-7 left-8 mt-20 rounded-xl border-blue-300 border opacity-0 invisible  group-hover:opacity-100 group-hover:visible group-hover:mt-5 transition-all duration-500">
                        {" "}
                        {/* Sử dụng flex-wrap để các loại tour hiển thị ngang */}
                        {Object.keys(combinedData).map((loaiTourName) => (
                          <li className="py-1 pr-4" key={loaiTourName}>
                            {" "}
                            {/* Thêm pr-4 để tạo khoảng cách giữa các loại tour */}
                            <a href="" className="">
                              {loaiTourName}
                            </a>
                            <ul className="">
                              {combinedData[loaiTourName].map((diemDen) => (
                                <li className="py-1" key={diemDen}>
                                  <Link
                                    to={`/tour/${diemDen}`}
                                    className="mega-menu-items"
                                  >
                                    {diemDen}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                       
                      </ul>
                    </div>
                  </div>

                  {/* Menu phân cấp*/}
                </li>
                <li>
                  <a href="/news" className="">
                    Tin tức
                  </a>
                </li>
               
                <li>
                  <a href="/contact" className="">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="search flex items-center">
          <div className="search mt-2   tours-center">
            <input
              style={{ width: "220px" }}
              className="border-yellow-300 border-[3px] px- py-2 rounded"
              type="text"
              placeholder="Search...."
              value={searchTerm}
              onChange={handleSearchChange}
            />
         <Link
            to={`/tour/${searchTerm}`}
            className="mega-menu-items"
          >
            <button className="bg-blue-500 text-white py-2 px-3 rounded ml-2" onClick={handleSearch}>
              Search
            </button>
          </Link>
            {token && (
            <Link to={'/favorite'} className="px-3">
               <i className="far  text-2xl mr-2 text-blue-400 hover:text-red-500">&#xf004;</i>
            </Link>
          )}
          </div>

          <div className="ml-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderWebsite;
