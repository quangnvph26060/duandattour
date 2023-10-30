import React from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';


import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  FaBeer,
  FaFlag,
  FaCarSide,
  FaLongArrowAltDown,
  FaRegHeart,
  FaStar,
} from "react-icons/fa";
import logo from "./img/logo.jpg"
import { useGetTourByIdQuery, useGetdetailTourByIdQuery } from "../../api/TourApi";

type Props = {};

const DetailPage = (props: Props) => {
  const radius = {
    borderRadius: "10px",
    height: "545px",
    width: "685px",
  };
  const radius1 = {
    borderRadius: "10px",
    height: "200px",
    width: "263px",
  };
  const radius2 = {
    borderRadius: "10px",
    height: "325px",
    width: "580px  ",
  };
  const img1 = {
   
    borderRadius: "5px",
    height: "210px",
    width: "309px  ",
  };
  const { idTour } = useParams<{ idTour: any }>();
  const { data: Tourdata } = useGetdetailTourByIdQuery(idTour || "");

const img = Tourdata?.images


  console.log(Tourdata);
  
  return (
    <div className="container mx-auto ">
      <div className="menu flex items-center justify-between">
        <div className='flex'>
          <img src={logo} alt="logo" width="70px" />
          <nav className='font-semibold p-4 pt-6 pl-18'>
            <ul className='flex text-[#2D4271] gap-12'>
              <a href="/">PolyTour</a>
              <a href="/tour">Tour</a>
              <a href="/">Tin tức</a>
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
        </div></div>
      <div className="Menu  h-10 "></div>
      {/* Header trên ội dung dưới*/}
      <div className="Detail   bg-[#f9f9f9] h-[1500px]">
        <div className="container mx-auto">
          <div className="Title flex ml-[120px] justify-between py-10">
            <div className="title">
              <p className="text-[26px] text-[#2D4271] font-bold">
              {Tourdata?.ten_tour}
              </p>
            </div>

            <div className="price buy mr-40 flex gap-5 ">
              <p className="text-[26px] text-red-500 font-bold">{Tourdata?.gia_tour}</p>
              <p className="mt-2">/khách</p>
              <button
                type="button"
                className="text-white bg-red-500 hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-3.5 h-3.5 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                </svg>
                <Link to="/booktour">
                  Đặt ngay
                </Link>

              </button>
            </div>
          </div>
          <div className="rate ml-[120px] mb-5 mt-[-25px] flex gap-2">
            <h2 className="text-yellow-300 text-[25px]">
              <FaStar />
            </h2>
            <h2 className="text-yellow-300 text-[25px]">
              <FaStar />
            </h2>
            <h2 className="text-yellow-300 text-[25px]">
              <FaStar />
            </h2>
            <h2 className="text-yellow-300 text-[25px]">
              <FaStar />
            </h2>
            <h2 className="text-yellow-300 text-[25px]">
              <FaStar />
            </h2>
          </div>
          <div className="Image ml-[120px] gap-5 flex">
            {/* <div>
              <img
                src="https://media.travel.com.vn/tour/tfd_220701022713_187185.jpg"
                style={radius}
              />
            </div>
            <div>
              {" "}
              <div className="flex gap-5">
                {" "}
                <img
                  style={radius1}
                  src="https://media.travel.com.vn/tour/tfd_220701023049_247289.jpg"
                  alt=""
                />
                <img
                  style={radius1}
                  src="https://media.travel.com.vn/tour/tfd_220701023656_254440.jpg"
                  alt=""
                />{" "}
              </div>
              <div className="mt-5">
                <img
                  src="https://media.travel.com.vn/destination/dc_211112_GRAND%20WORLD%20(4).jpg"
                  style={radius2}
                />
              </div>
            </div> */}
            <img src={Tourdata?.images} alt="" />
        
          </div>
          <div className="Description justify-between flex ml-[120px] mt-5 py-4">
            <div className="Desc text-[#2D4271] text-[15px]">
              <p className="max-w-[500px]">
            {Tourdata?.mo_ta}
              </p>
              <div className="h-[230px] w-[530] border rounded-md mt-3 bg-white py-5 px-5">
                <p className="mt-1 text-[#2D4271] text-[18px] font-medium">
                  Khởi hành {Tourdata?.lich_khoi_hanh}
                </p>
                <p className="mt-1 text-[#2D4271] text-[18px] font-medium">
                  Tập trung 05:30 ngày 04/10/2023
                </p>
                <p className="mt-1 text-[#2D4271] text-[18px] font-medium">
                  Thời gian {Tourdata?.thoi_gian}
                </p>
                <p className="mt-1 text-[#2D4271] text-[18px] font-medium">
                
                  Nơi khởi hành {Tourdata?.diem_khoi_hanh}
                </p>
                <p className="mt-1   text-[#2D4271] text-[18px] font-medium">
             
                  Số lượng {Tourdata?.soluong  }
                </p>
              </div>
            </div>
            <div className="grid mr-[120px] grid-cols-4 gap-5">
              <div className="">
                <h2 className="text-blue-600">
                  <FaFlag />
                </h2>
                <p>Thời gian</p>
                <p>3 ngày 2 đêm</p>
              </div>
              <div className="">
                <h2 className="text-blue-600">
                  <FaFlag />
                </h2>
                <p>Thời gian</p>
                <p>3 ngày 2 đêm</p>
              </div>
              <div className="">
                <h2 className="text-blue-600">
                  <FaFlag />
                </h2>
                <p>Thời gian</p>
                <p>3 ngày 2 đêm</p>
              </div>
              <div className="">
                <h2 className="text-blue-600">
                  <FaFlag />
                </h2>
                <p>Thời gian</p>
                <p>3 ngày 2 đêm</p>
              </div>
              <div className="">
                <h2 className="text-blue-600">
                  <FaFlag />
                </h2>
                <p>Thời gian</p>
                <p>3 ngày 2 đêm</p>
              </div>
              <div className="">
                <h2 className="text-blue-600">
                  <FaFlag />
                </h2>
                <p>Thời gian</p>
                <p>3 ngày 2 đêm</p>
              </div>
              <div className="">
                <h2 className="text-blue-600">
                  <FaFlag />
                </h2>
                <p>Thời gian</p>
                <p>3 ngày 2 đêm</p>
              </div>
              <div className="">
                <h2 className="text-blue-600">
                  <FaFlag />
                </h2>
                <p>Thời gian</p>
                <p>3 ngày 2 đêm</p>
              </div>
            </div>
          </div>
          <div className="bg-white container">
            <div className="text-center font-bold text-[#2D4271] text-[25px] py-5">

              <h2>Lịch trình</h2>
            </div>
            <div className="ml-[120px] flex gap-2 mr-[115px] lichtring max-h-[2000px] bg-white border-[1px] rounded border-gray-400 ">
            <div className="w-1/3 bg-[#f9f9f9]">
            <h2 className="mb-4 font-bold text-[#2D4271] text-[16px] py-5">
            
            {Tourdata?.lich_t_rinh.map((tieude) => (
        <p key={tieude.id}>{tieude.tieu_de}</p>
      ))}
            </h2>
            <h2 className="mb-4 font-bold text-[#2D4271] text-[16px] py-5">
            
            </h2>
       
            
            <h2 className="mb-4 font-bold text-[#2D4271] text-[16px] py-5">
            Ngày 3 - SA PA - CÔC LẾU - HẢI PHÒNG (Ăn sáng, trưa) (// '$name')
            </h2>
            </div>
            <div className="w-2/3 ">
              <div className="max-w-full">
              <h2 className="mb-4 font-bold text-[#2D4271] text-[16px] py-5">
              {Tourdata?.lich_t_rinh.map((tieude) => (
        <p key={tieude.id}>{tieude.noi_dung}</p>
      ))}
            </h2>
               
              </div>  
            </div>
            </div>
            <div className="ml-[120px] chitiet">
              <div className="row gap-[48px] flex justify-between">
                <div className="left">
                  <h2 className="mb-4 font-bold text-[#2D4271] text-[25px] py-5">
                    Chi tiết tour
                  </h2>
                  <div className="h-[300px] bg-slate-100 w-[620px] rounded">
                    <p className="font-semibold text-[#2D4271] text-[20px] pt-8 px-4">
                      {" "}
                      Thông tin hãng Xe
                    </p>
                    <div className="flex justify-between">
                      {" "}
                      <p className="text-[#2D4271] px-4 mt-4 ">
                        Ngày đi -(5/10/20323){" "}
                      </p>{" "}
                      <p className="mt-4">|</p>{" "}
                      <p className="text-[#2D4271] px-4 mt-4 mr-[150px] ">
                        {" "}
                        Ngày về (5/10/20323){" "}
                      </p>
                    </div>
                    <div className="flex">
                      <div className="text-blue-700 px-4 mt-4 flex gap-2 ">
                        T.P Hồ Chí Minh{" "}
                        <h2 className="mt-1">
                          <FaCarSide />
                        </h2>{" "}
                        Điểm đến{" "}
                      </div>
                      <div className="text-blue-700 px-4 mt-4 flex gap-2 ">
                        Điểm đến
                        <h2 className="mt-1">
                          <FaCarSide />
                        </h2>{" "}
                        T.P Hồ Chí Minh{" "}
                      </div>
                    </div>

                    <p className="mt-4 ml-2 mr-2">
                      {" "}
                      <hr />
                    </p>
                    <p className="font-semibold text-[#2D4271] text-[20px] pt-8 px-4">
                      {" "}
                      Thông tin hướng dẫn viên
                    </p>
                    <p className="text-[#2D4271] px-4 mt-4 ">
                      Hướng dẫn đoàn: Thái deptrai{" "}
                    </p>
                    <p className="text-[#2D4271] px-4 mt-4 ">
                      Hướng dẫn tiên: Thái deptrai1{" "}
                    </p>
                  </div>
                </div>
                <div className="right mr-48">
                  <h2 className="mb-4 mr-[140px] font-bold text-[#2D4271] text-[25px] py-5">
                    Giá tour & phụ thu phòng đơn
                  </h2>
                  <div className="h-[300px] bg-slate-100 w-[620px] rounded">
                    <div className="grid grid-cols-3 gap-2">
                      <p className="font-semibold text-[#2D4271] text-[20px] pt-8 px-4">
                        {" "}
                        Loại khách
                      </p>{" "}
                      <p className="font-semibold text-[#2D4271] text-[20px] pt-8 px-4">
                        {" "}
                        Giá tour
                      </p>
                      <p className="font-semibold text-[#2D4271] text-[20px] pt-8 px-4">
                        {" "}
                        Land tour
                      </p>
                    </div>
                    <div className="flex justify-between">
                      {" "}
                      <p className="text-[#2D4271] px-4 mt-4 ">
                        Người lớn (Từ 12 tuổi trở lên){" "}
                      </p>{" "}
                      <p className="mt-4">499,000 đ </p>{" "}
                      <p className="text-[#2D4271] px-4 mt-4 mr-[150px] ">
                        {" "}
                        499,000 đ
                      </p>
                    </div>
                    <div className="flex justify-between">
                      {" "}
                      <p className="text-[#2D4271] px-4 mt-4 ">Trẻ em </p>{" "}
                      <p className="mt-4 text-red-500 ml-10">299,000 đ </p>{" "}
                      <p className=" px-4 mt-4 mr-[150px] ml-5 text-red-500">
                        {" "}
                        299,000 đ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[300px] container mx-auto bg-white">
            <p className="title font-bold text-[#2D4271] text-[25px] text-center py-5 px-5">
              Những thông tin cần lưu ý
            </p>
            <div className="ml-[120px]">
              <div className="flex gap-14">
                <div className="w-[615px] ">
                  {" "}
                  <button className="bg-gray-300 w-[615px] justify-between hover:bg-gray-400 text-[#2D4271] text-center font-bold py-2 px-4 rounded inline-flex items-center">
                    <span>Giá tour bao gồm</span>
                    <h2>
                      <FaLongArrowAltDown />
                    </h2>
                  </button>
                  <button className="mt-5 bg-gray-300 w-[615px] justify-between hover:bg-gray-400 text-[#2D4271] text-center font-bold py-2 px-4 rounded inline-flex items-center">
                    <span>Giá tour bao gồm</span>
                    <h2>
                      <FaLongArrowAltDown />
                    </h2>
                  </button>
                  <button className="bg-gray-300 mt-5 w-[615px] justify-between hover:bg-gray-400 text-[#2D4271] text-center font-bold py-2 px-4 rounded inline-flex items-center">
                    <span>Giá tour bao gồm</span>
                    <h2>
                      <FaLongArrowAltDown />
                    </h2>
                  </button>
                </div>
                <div>
                  {" "}
                  <button className=" bg-gray-300 w-[615px] justify-between hover:bg-gray-400 text-[#2D4271] text-center font-bold py-2 px-4 rounded inline-flex items-center">
                    <span>Giá tour bao gồm</span>
                    <h2>
                      <FaLongArrowAltDown />
                    </h2>
                  </button>
                  <button className="bg-gray-300 mt-5 w-[615px] justify-between hover:bg-gray-400 text-[#2D4271] text-center font-bold py-2 px-4 rounded inline-flex items-center">
                    <span>Giá tour bao gồm</span>
                    <h2>
                      <FaLongArrowAltDown />
                    </h2>
                  </button>
                  <button className="bg-gray-300 w-[615px] mt-5 justify-between hover:bg-gray-400 text-[#2D4271] text-center font-bold py-2 px-4 rounded inline-flex items-center">
                    <span>Giá tour bao gồm</span>
                    <h2>
                      <FaLongArrowAltDown />
                    </h2>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="Cate bg-[#f9f9f9] ">
            <p className=" font-bold text-[#2D4271] text-[25px] text-center ">
              Có thể quý khách sẽ thích
            </p>
            <div className="ml-[120px] w-[1320px] grid grid-cols-4 py-5">
              <div className="item h-[500px] w-[310px] rounded   ">
                <div className="img img-container">
                  <img
                    className="image"
                    style={img1}
                    src="https://media.travel.com.vn/destination/tf_230620051651_690667_Bai%20Bien.jpg"
                    alt=""
                  />
                  <div className="icon-overlay">
                    {/* Chèn icon ở đây */}
                    <a href="">
                      <h2>
                        <FaRegHeart />
                      </h2>
                    </a>
                  </div>
                </div>
                <div className="content ml-[5px] py-3 text-[#2D4271] ">
                  <p> 26/10/2023 - Giờ đi: 05:00</p>
                  <p className="font-semibold">Phan Thiết - Mũi Né - Hòn Rơm - Đồi Cát Bay </p>
                  <p>Nơi khởi hành TP. Hồ Chí Minh</p>
                  <p className="mt-4 text-red-500">499,000 ₫</p>
                  <button
                    type="button"
                    className="text-white mt-3 bg-red-500 hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="w-3.5 h-3.5 mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 21"
                    >
                      <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                    </svg>
                    Đặt ngay
                  </button>
                </div>
              </div>
              <div className="item h-[500px] w-[310px] rounded ">
                <div className="img img-container">
                  <img
                    className="image"
                    style={img1}
                    src="https://media.travel.com.vn/destination/tf_230620051651_690667_Bai%20Bien.jpg"
                    alt=""
                  />
                  <div className="icon-overlay">
                    {/* Chèn icon ở đây */}
                    <a href="">
                      <h2>
                        <FaRegHeart />
                      </h2>
                    </a>
                  </div>
                </div>
                <div className="content ml-[5px] py-3 text-[#2D4271] ">
                  <p> 26/10/2023 - Giờ đi: 05:00</p>
                  <p className="font-semibold">Phan Thiết - Mũi Né - Hòn Rơm - Đồi Cát Bay </p>
                  <p>Nơi khởi hành TP. Hồ Chí Minh</p>
                  <p className="mt-4 text-red-500">499,000 ₫</p>
                  <button
                    type="button"
                    className="text-white mt-3 bg-red-500 hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="w-3.5 h-3.5 mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 21"
                    >
                      <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                    </svg>
                    Đặt ngay
                  </button>
                </div>
              </div>
              <div className="item h-[500px] w-[310px] rounded ">
                <div className="img img-container">
                  <img
                    className="image"
                    style={img1}
                    src="https://media.travel.com.vn/destination/tf_230620051651_690667_Bai%20Bien.jpg"
                    alt=""
                  />
                  <div className="icon-overlay">
                    {/* Chèn icon ở đây */}
                    <a href="">
                      <h2>
                        <FaRegHeart />
                      </h2>
                    </a>
                  </div>
                </div>
                <div className="content ml-[5px] py-3 text-[#2D4271] ">
                  <p> 26/10/2023 - Giờ đi: 05:00</p>
                  <p className="font-semibold">Phan Thiết - Mũi Né - Hòn Rơm - Đồi Cát Bay </p>
                  <p>Nơi khởi hành TP. Hồ Chí Minh</p>
                  <p className="mt-4 text-red-500">499,000 ₫</p>
                  <button
                    type="button"
                    className="text-white mt-3 bg-red-500 hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="w-3.5 h-3.5 mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 21"
                    >
                      <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                    </svg>
                    Đặt ngay
                  </button>
                </div>
              </div>
              <div className="item h-[500px] w-[310px] rounded ">
                <div className="img img-container">
                  <img
                    className="image"
                    style={img1}
                    src="https://media.travel.com.vn/destination/tf_230620051651_690667_Bai%20Bien.jpg"
                    alt=""
                  />
                  <div className="icon-overlay">
                    {/* Chèn icon ở đây */}
                    <a href="">
                      <h2>
                        <FaRegHeart />
                      </h2>
                    </a>
                  </div>
                </div>
                <div className="content ml-[5px] py-3 text-[#2D4271] ">
                  <p> 26/10/2023 - Giờ đi: 05:00</p>
                  <p className="font-semibold">Phan Thiết - Mũi Né - Hòn Rơm - Đồi Cát Bay </p>
                  <p>Nơi khởi hành TP. Hồ Chí Minh</p>
                  <p className="mt-4 text-red-500">499,000 ₫</p>
                  <button
                    type="button"
                    className="text-white mt-3 bg-red-500 hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="w-3.5 h-3.5 mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 21"
                    >
                      <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                    </svg>
                    Đặt ngay
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
