import React, { useState, useEffect } from "react";
import axios from "axios";
import '../tour.css'
import { IPour } from "../interface/home";
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import anh4 from "../img/anh4.jpg"
import anh2 from '../img/anh2.jpg'
import anh3 from '../img/anh3.jpg'
import ticket from "../img/ticket.png"
import shopping from "../img/shopping.png"
import star from "../img/star.png"
import line from "../img/line.png"
import anh5 from "../img/anh5.png"
import anh6 from "../img/anh6.png"
import anh7 from "../img/anh7.png"
import anh8 from "../img/anh8.jpg"
import anh14 from '../img/anh14.jpg'
import anh15 from "../img/anh15.jpg"
import { useGetTourQuery } from '../api/TourApi'
import { data } from 'autoprefixer';
import Item from "antd/es/list/Item";


const rounded = {
  borderRadius: '25px',
};

type Props = {};

const TourPage = (props: Props) => {
  const { data: Tourdata } = useGetTourQuery()
  const tourArray = Tourdata?.data || [];
  const images = tourArray?.images || [];
  // console.log(tourArray)
  const [budget, setBudget] = useState(0);
  const [selectedDeparture, setSelectedDeparture] = useState<string>("");
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState(false); // Thêm state

  const formatCurrency = (value: number | bigint) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(value);
  };

  const handleBudgetChange = (event: { target: { value: any; }; }) => {
    const newBudget = event.target.value;
    setBudget(newBudget);
  };

  const item = [
    { name: 'Item 1', days: 3 },
    { name: 'Item 2', days: 5 },
    { name: 'Item 3', days: 14 },
    { name: 'Item 4', day: 999 },
    // ... các mục khác
  ];

  // State để theo dõi số ngày được chọn
  const [selectedDays, setSelectedDays] = useState(null);

  // Hàm xử lý khi một nút được nhấp
  const handleButtonClick = (days) => {
    console.log(`Button clicked with days: ${days}`);
    setSelectedDays(days);

    // Ở đây, bạn có thể thực hiện các thao tác khác, như lọc dữ liệu hoặc gọi hàm lọc dữ liệu ở đây.
  };

  // Lọc dữ liệu dựa trên số ngày được chọn

  const filteredItems = selectedDays
    ? tourArray?.filter((item) => {
        const numberOfDays = calculateNumberOfDays(item.lich_khoi_hanh, item.ngay_ket_thuc);
        return numberOfDays >= 4 && numberOfDays <= 7;
      })
    : tourArray;

    function calculateNumberOfDays(start, end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
  
      const timeDifference = Math.abs(endDate - startDate);
      const numberOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
      return numberOfDays;
    }
  
  return (
    <div className=''>
      <p className='container mx-auto py-1'>Du lịch -- Tìm kiếm tour du lịch</p>
      <div className='flex container mx-auto px-10 gap-11 pt-5'>
        {/* Conten left*/}
        <aside className='mx-auto container w-1/4 bg-gray-100 h-[1300px]'>
          <h1 className='font-medium text-3xl p-4'>Lọc kết quả</h1>
          <h2 className='bg-blue-600 text-2xl ct font-medium text-white px-4 py-1'>Poly Tour</h2>
          <div className='text-center p-2 py-4 '>
            <select className='rounded-md border border-black'>
              <option value="1">Du lịch</option>
              <option value="2">Trong Nước</option>
            </select>
          </div>
          <div className='text-center'>
            <button className='bg-white px-4 py-2 rounded-lg border border-black'>Trong nước</button>
          </div>
          <p className='px-3 py-1 text-xl font-medium '>Loại Hình Tour</p>
          <div className='px-3 text-center py-1 container mx-auto'>
            <select name="" className='rounded-md border border-black w-72 h-9' id="">
              <option value="1">-- Tất cả --</option>
              <option value="2">Du lịch sinh thái.</option>
              <option value="2">Du lịch văn hóa.</option>
              <option value="2">Du lịch nghỉ dưỡng.</option>
              <option value="2">Du lịch giải trí</option>
              <option value="2">Du lịch thể thao.</option>
              <option value="2">Du lịch khám phá</option>
              <option value="2">Du lịch mạo hiểm</option>
              <option value="2">Du lịch kết hợp</option>
            </select>
          </div>
          <p className='px-3 text-lg font-medium py-1'>Điểm đi</p>
          <div className='px-3 text-center py-1'>
            <select name="" className='rounded-md border border-black w-72 h-9' id="" value={selectedDeparture}
              onChange={(e) => setSelectedDeparture(e.target.value)}>
              <option value="">Chọn Điểm đi</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Hồ Chí Minh">Hồ Chí Minh (TP.HCM)</option>
              <option value="Hải Phòng">Hải Phòng</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Cần Thơ">Cần Thơ</option>
              <option value="An Giang">An Giang</option>
              <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
              <option value="Bắc Giang">Bắc Giang</option>
              <option value="Bắc Kạn">Bắc Kạn</option>
              <option value="Bạc Liêu">Bạc Liêu</option>
              <option value="Bắc Ninh">Bắc Ninh</option>
              <option value="Bến Tre">Bến Tre</option>
              <option value="Bình Định">Bình Định</option>
              <option value="Bình Dương">Bình Dương</option>
              <option value="Bình Phước">Bình Phước</option>
              <option value="Bình Thuận">Bình Thuận</option>
              <option value="Cà Mau">Cà Mau</option>
              <option value="Cao Bằng">Cao Bằng</option>
              <option value="Đắk Lắk">Đắk Lắk</option>
              <option value="Đắk Nông">Đắk Nông</option>
              <option value="Điện Biên">Điện Biên</option>
              <option value="Đồng Nai">Đồng Nai</option>
              <option value="Đồng Tháp">Đồng Tháp</option>
              <option value="Gia Lai">Gia Lai</option>
              <option value="Hà Giang">Hà Giang</option>
              <option value="Hà Nam">Hà Nam</option>
              <option value="Hà Tĩnh">Hà Tĩnh</option>
              <option value="Hải Dương">Hải Dương</option>
              <option value="Hậu Giang">Hậu Giang</option>
              <option value="Hòa Bình">Hòa Bình</option>
              <option value="Hưng Yên">Hưng Yên</option>
              <option value="Khánh Hòa">Khánh Hòa</option>
              <option value="Kiên Giang">Kiên Giang</option>
              <option value="Kon Tum">Kon Tum</option>
              <option value="Lai Châu">Lai Châu</option>
              <option value="Lâm Đồng">Lâm Đồng</option>
              <option value="Lạng Sơn">Lạng Sơn</option>
              <option value="Lào Cai">Lào Cai</option>
              <option value="Long An">Long An</option>
              <option value="Nam Định">Nam Định</option>
              <option value="Nghệ An">Nghệ An</option>
              <option value="Ninh Bình">Ninh Bình</option>
              <option value="Ninh Thuận">Ninh Thuận</option>
              <option value="Phú Thọ">Phú Thọ</option>
              <option value="Phú Yên">Phú Yên</option>
              <option value="Quảng Bình">Quảng Bình</option>
              <option value="Quảng Nam">Quảng Nam</option>
              <option value="Quảng Ngãi">Quảng Ngãi</option>
              <option value="Quảng Ninh">Quảng Ninh</option>
              <option value="Quảng Trị">Quảng Trị</option>
              <option value="Sóc Trăng">Sóc Trăng</option>
              <option value="Sơn La">Sơn La</option>
            </select>
          </div>
          <p className='px-3 text-lg font-medium py-1'>Điểm đến</p>
          <div className='px-3 text-center py-1'>
            <select name="" className='rounded-md border border-black w-72 h-9' id="" value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}>
              <option value="">Chọn Điểm đến</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Hồ Chí Minh">Hồ Chí Minh (TP.HCM)</option>
              <option value="Hải Phòng">Hải Phòng</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Cần Thơ">Cần Thơ</option>
              <option value="An Giang">An Giang</option>
              <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
              <option value="Bắc Giang">Bắc Giang</option>
              <option value="Bắc Kạn">Bắc Kạn</option>
              <option value="Bạc Liêu">Bạc Liêu</option>
              <option value="Bắc Ninh">Bắc Ninh</option>
              <option value="Bến Tre">Bến Tre</option>
              <option value="Bình Định">Bình Định</option>
              <option value="Bình Dương">Bình Dương</option>
              <option value="Bình Phước">Bình Phước</option>
              <option value="Bình Thuận">Bình Thuận</option>
              <option value="Cà Mau">Cà Mau</option>
              <option value="Cao Bằng">Cao Bằng</option>
              <option value="Đắk Lắk">Đắk Lắk</option>
              <option value="Đắk Nông">Đắk Nông</option>
              <option value="Điện Biên">Điện Biên</option>
              <option value="Đồng Nai">Đồng Nai</option>
              <option value="Đồng Tháp">Đồng Tháp</option>
              <option value="Gia Lai">Gia Lai</option>
              <option value="Hà Giang">Hà Giang</option>
              <option value="Hà Nam">Hà Nam</option>
              <option value="Hà Tĩnh">Hà Tĩnh</option>
              <option value="Hải Dương">Hải Dương</option>
              <option value="Hậu Giang">Hậu Giang</option>
              <option value="Hòa Bình">Hòa Bình</option>
              <option value="Hưng Yên">Hưng Yên</option>
              <option value="Khánh Hòa">Khánh Hòa</option>
              <option value="Kiên Giang">Kiên Giang</option>
              <option value="Kon Tum">Kon Tum</option>
              <option value="Lai Châu">Lai Châu</option>
              <option value="Lâm Đồng">Lâm Đồng</option>
              <option value="Lạng Sơn">Lạng Sơn</option>
              <option value="Lào Cai">Lào Cai</option>
              <option value="Long An">Long An</option>
              <option value="Nam Định">Nam Định</option>
              <option value="Nghệ An">Nghệ An</option>
              <option value="Ninh Bình">Ninh Bình</option>
              <option value="Ninh Thuận">Ninh Thuận</option>
              <option value="Phú Thọ">Phú Thọ</option>
              <option value="Phú Yên">Phú Yên</option>
              <option value="Quảng Bình">Quảng Bình</option>
              <option value="Quảng Nam">Quảng Nam</option>
              <option value="Quảng Ngãi">Quảng Ngãi</option>
              <option value="Quảng Ninh">Quảng Ninh</option>
              <option value="Quảng Trị">Quảng Trị</option>
              <option value="Sóc Trăng">Sóc Trăng</option>
              <option value="Sơn La">Sơn La</option>
            </select>
          </div>

          <p className='px-3 text-lg font-medium pt-1'>Số ngày</p>
          <div className='flex gap-2 py-2 container justify-center'>
            <div className=''>
              <button
                className='w-36 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:border-blue-500'
                onClick={() => handleButtonClick(3)}

              >
                1 đến 3 ngày
              </button>
            </div>
            <div className=''>
              <button
                className='w-36 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:border-blue-500'
                onClick={() => handleButtonClick(7)}
              >
                4 đến 7 ngày
              </button>
            </div>
          </div>
          <div className='flex gap-2 py-2 container justify-center'>
            <div className=''>
              <button
                className='w-36 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:border-blue-500'
                onClick={() => handleButtonClick(14)}
              >
                8 đến 14 ngày
              </button>
            </div>
            <div className=''>
              <button
                className='w-36 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:border-blue-500'
                onClick={() => handleButtonClick(999)}
              >
                Trên 14 ngày
              </button>
            </div>
          </div>
          <p className='px-3 text-lg font-medium py-1'>Ngày đi</p>
          <div className='text-center'>
            <input className='pl-7 pr-12 w-56 h-10 rounded-lg' type="date" name="date" id="" />
          </div>
          <p className='px-3 text-lg font-medium py-1'>Số người</p>
          <div className='flex gap-2 py-2 container justify-center'>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:border-blue-500'>1 người</button>
            </div>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:border-blue-500'>2 người</button>
            </div>
          </div>
          <div className='flex gap-2 container justify-center'>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:border-blue-500'>3 - 5 người</button>
            </div>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:border-blue-500'>5+ người</button>
            </div>
          </div>
          <p className='px-3 text-lg font-medium py-1'>Dòng Tour</p>
          <div className='flex gap-2 py-2 container justify-center'>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:border-blue-500'>Cao cấp</button>
            </div>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:border-blue-500'>Tiêu chuẩn</button>
            </div>
          </div>
          <div className='flex gap-2 container justify-center'>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:border-blue-500'>Tiết kiệm</button>
            </div>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:border-blue-500'>Giá tốt</button>
            </div>
          </div>
          <p className='px-3 text-lg font-medium py-2'>Bộ lọc tìm kiếm___________</p>
          <h1 className='font-medium text-3xl p-4'>Lọc kết quả</h1>

          <p className='px-3 text-lg font-medium py-1'>Ngân sách của quý khách:</p>
          <div className='px-3 pt-1'>
            <input className='w-60' type="range" min="0" max="200000000" onChange={handleBudgetChange} />
          </div>
          <p className='px-3'>{formatCurrency(budget)}</p>
          <p className='px-3 text-lg font-medium py-1'>Thông tin vận chuyển</p>
          <div className='flex gap-3 py-1 pt-2 container justify-center'>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black hover:bg-blue-500 hover:border-blue-500'>Máy bay</button>
            </div>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black hover:bg-blue-500 hover:border-blue-500'>Ô tô</button>
            </div>
          </div>
        </aside>

        {/*conten-right*/}
        <article className='w-3/4'>
          <p className='text-center text-2xl font-semibold'>Kết quả tìm kiếm tour du lịch</p>
          <div className='py-5'><hr className='bg-black h-[1.5px]' /></div>

          <div className='grid grid-cols-3 gap-7 container mx-auto'>

            {filteredItems.map((items) => (
              <div key={items.id}>
                <div className='py-4 bg-neutral-100 rounded-lg'>
                  {images && images.length > 0 ? (
                    <div>
                      {/* {images.map((image) => ( */}
                      <img key={images[0].id} src={`http://localhost:8000/storage/${images[0].items.image_path}`} />
                      {/* ))} */}
                    </div>
                  ) : (
                    <p>Không có hình ảnh cho tour này.</p>
                  )}
                  <p className="px-1">{items.lich_khoi_hanh} - {calculateNumberOfDays(items.lich_khoi_hanh, items.ngay_ket_thuc)} ngày - Giờ đi: 05:20</p>
                  <p className='font-bold py-2 px-1'>{items.ten_tour}</p>
                  <p className='px-4'>MÃ TOUR :</p>
                  <div className='flex gap-3 px-4'>
                    <img src={ticket} className='w-10' alt="ticket" />
                    <p className='text-sm pt-3 font-medium'>NDSGN3398-140-220923VU-F</p>
                  </div>
                  <div className='flex gap-2 py-2 px-4'>
                    <p className='text-sm'>Nơi khởi hành: </p>
                    <p className='font-medium text-sm'>{items.diem_khoi_hanh}</p>
                  </div>
                  <p className='text-base font-medium pt-1 px-4'>Giá cũ: 7,990,000₫</p>
                  <div className='flex gap-16 justify-between px-4 p-1'>
                    <p className='text-lg font-semibold text-red-500'>{items.gia_khuyen_mai}₫</p>
                    <div className='bg-red-400 py-2 px-5 rounded-xl text-white'>10% Giảm</div>
                  </div>
                  <div className='flex justify-between px-4 gap-10 pt-3'>
                    <button className=' flex gap-2 hover:bg-teal-500 bg-red-400 py-2 px-3 rounded-xl'>
                      <img src={shopping} alt="shopping" className='w-5' />
                      <a href="booktour"><p className='text-white text-sm'>Đặt ngay</p></a>
                    </button>
                    <button className='border border-sky-500 py-2 px-5 rounded-xl'>
                      <a href="booktour"><p className='text-sm'>Xem chi tiết</p></a>
                    </button>
                  </div>
                </div>
              </div>
            ))}


            <div className='container mx-auto bg-neutral-100 rounded-lg'>
              <div className='relative'>
                <img src={anh2} alt="anh2" className='h-[315px] w-max rounded-lg' />
                <button
                  className={`absolute top-3 left-3 ${isFavorite ? 'bg-red-500' : 'text-blue-600'}`}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  {isFavorite ? (
                    <i className="fa-regular fa-heart border-blue-600"></i>
                  ) : (
                    <i className="fa-regular fa-heart border-red-500"></i>
                  )}
                </button>
              </div>
              <p className='px-1'>22/09/2023 - 5N4Đ - Giờ đi: 05:20</p>
              <p className='font-bold py-2 px-1'>Huế - La Vang - Động Thiên Đường -
                KDL Bà Nà - Cầu Vàng - Hội An - Đà Nẵng - Thưởng Thức Ca Hò Huế trên...</p>
              <p className='px-4'>MÃ TOUR :</p>
              <div className='flex gap-3 px-4'>
                <img src={ticket} className='w-10' alt="ticket" />
                <p className='text-sm pt-3 font-medium'>NDSGN3398-140-225423VU-V</p>
              </div>
              <div className='flex gap-2 py-2 px-4'>
                <p className='text-sm'>Nơi khởi hành: </p>
                <p className='font-medium text-sm'>TP.Hồ Chí Minh</p>
              </div>
              <p className='text-base font-medium px-4 pt-1'>Giá cũ: 7,990,000₫</p>
              <div className='flex gap-16 justify-between px-4 pb-1'>
                <p className='text-lg font-semibold text-red-500'>7,190,000₫</p>
                <div className='bg-red-400 py-2 px-5 rounded-xl text-white'>10% Giảm</div>
              </div>
              <div className='flex justify-between px-4 gap-10 pt-3'>
                <button className=' flex gap-2 hover:bg-teal-500 bg-red-400 py-2 px-3 rounded-xl'>
                  <img src={shopping} alt="shopping" className='w-5' />
                  <p className='text-white text-sm'>Đặt ngay</p>
                </button>
                <button className='border border-sky-500 py-2 px-5 rounded-xl'>
                  <p className='text-sm'>Xem chi tiết</p>
                </button>
              </div>
            </div>

            <div className=' bg-neutral-100 rounded-lg'>
              <div className='relative'>
                <img src={anh3} alt="anh3" className='h-[315px] w-max rounded-lg' />
                <button
                  className={`absolute top-3 left-3 ${isFavorite ? 'bg-red-500' : 'text-blue-600'}`}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  {isFavorite ? (
                    <i className="fa-regular fa-heart border-blue-600"></i>
                  ) : (
                    <i className="fa-regular fa-heart border-red-500"></i>
                  )}
                </button>
              </div>
              <p className='px-1'>23/09/2023 - Trong ngày - Giờ đi: 16:00</p>
              <p className='font-bold py-2 px-1'>Trải nghiệm đặc sản: Tour xuyên rừng - KDL Đất Mũi Cà Mau - Áp dụng cho nhóm 6 khách trở lên </p>
              <p className='px-4'>MÃ TOUR :</p>
              <div className='flex gap-3 px-4'>
                <img src={ticket} className='w-10' alt="ticket" />
                <p className='text-sm pt-3 font-medium'>NDSGN4568-140-220923VU-V</p>
              </div>
              <div className='flex gap-2 py-2 px-4'>
                <p className='text-sm'>Nơi khởi hành: </p>
                <p className='font-medium text-sm'>TP.Hồ Chí Minh</p>
              </div>
              {/* <p className='text-base font-medium pt-1'>Giá cũ: 7,990,000₫</p> */}
              {/* <div className='flex gap-16 pb-1'> */}

              <p className='text-lg font-semibold text-red-500 px-4'>1,190,000₫</p>
              {/* <div className='bg-red-400 py-2 px-5 rounded-xl text-white'>10% Giảm</div> */}
              {/* </div> */}
              <div className='flex justify-between px-4 gap-10 pt-3'>
                <button className=' flex gap-2 hover:bg-teal-500 bg-red-400 py-2 px-3 rounded-xl'>
                  <img src={shopping} alt="shopping" className='w-5' />
                  <a href="tour/:idTour"> <p className='text-white text-sm'>Đặt ngay</p></a>
                </button>
                <button className='border border-sky-500 py-2 px-5 rounded-xl'>
                  <p className='text-sm'>Xem chi tiết</p>
                </button>
              </div>
            </div>
          </div>
          <div className='ml-auto py-4 pt-6'>
            <button className='py-2 px-3 border border-blue-400 rounded-lg hover:bg-teal-500 shadow-lg shadow-slate-400'>Xem tất cả</button>
          </div>
          <div className='py-5'><hr className='bg-black h-[2px]' /></div>

          <div className='py-3'>
            <div className='w-[860px] bg-gray-100 rounded-lg flex'>
              <img src={anh4} alt="anh4" className='w-1/3 rounded-lg' />
              <div className='w-2/3 flex'>
                <div className='w-2/3 px-2'>
                  <div className='py-2'>
                    <p className='w-40 bg-blue-400 rounded-lg hover:bg-red-500 py-2 text-center text-white text-sm'>Vé máy bay - khách sạn</p>
                  </div>
                  <p className='text-sm font-medium'>
                    Đà Nẵng: Dịch vụ vé máy bay + 2 đêm nghỉ dưỡng tại Khách sạn
                    Grand Tourane 5 sao ( Đã bao gồm ăn sáng )
                  </p>
                  <div className='flex gap-1 py-2'>
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                  </div>
                  <p className='text-xs font-normal'>Bay Vietravel Airlines - Phòng Superior city view - Ăn sáng</p>
                  <p className='text-xs font-normal py-2 pt-5'>252 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng</p>
                </div>
                <div className='flex gap-3'>
                  <img src={line} alt="line" className='w-1 h-auto' />
                  <div className='pt-16'>
                    <p>Giá chỉ từ</p>
                    <div className='flex'>
                      <p className='text-xl text-red-500 font-medium'>2,590,000₫</p>
                      <p className='py-1'>/khách
                        Ngày đi 27/09/2023
                      </p>
                    </div>
                    <div className='flex gap-11'>
                      <button className='py-2 px-4 border border-blue-400 text-xs rounded-lg'>
                        Ngày khác
                      </button>
                      <button className='py-2 px-4 bg-red-500 text-xs rounded-lg text-white'>
                        Đặt ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='py-3'>
            <div className='w-[860px] bg-gray-100 rounded-lg flex'>
              <img src={anh14} alt="anh14" className='w-1/3 rounded-lg' />
              <div className='w-2/3 flex'>
                <div className='w-2/3 px-2'>
                  <div className='py-2'>
                    <p className='w-40 bg-blue-400 rounded-lg hover:bg-red-500 py-2 text-center text-white text-sm'>Vé máy bay - khách sạn</p>
                  </div>
                  <p className='text-sm font-medium'>
                    Đà Nẵng: Dịch vụ vé máy bay + 2 đêm nghỉ dưỡng tại Khách sạn
                    Grand Tourane 5 sao ( Đã bao gồm ăn sáng )
                  </p>
                  <div className='flex gap-1 py-2'>
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                  </div>
                  <p className='text-xs font-normal'>Bay Vietravel Airlines - Phòng Superior city view - Ăn sáng</p>
                  <p className='text-xs font-normal py-2 pt-5'>252 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng</p>
                </div>
                <div className='flex gap-3'>
                  <img src={line} alt="line" className='w-1 h-auto' />
                  <div className='pt-16'>
                    <p>Giá chỉ từ</p>
                    <div className='flex'>
                      <p className='text-xl text-red-500 font-medium'>2,590,000₫</p>
                      <p className='py-1'>/khách
                        Ngày đi 27/09/2023
                      </p>
                    </div>
                    <div className='flex gap-11'>
                      <button className='py-2 px-4 border border-blue-400 text-xs rounded-lg'>
                        Ngày khác
                      </button>
                      <button className='py-2 px-4 bg-red-500 text-xs rounded-lg text-white'>
                        Đặt ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='py-3'>
            <div className='w-[860px] bg-gray-100 rounded-lg flex'>
              <img src={anh15} alt="anh15" className='w-1/3 rounded-lg' />
              <div className='w-2/3 flex'>
                <div className='w-2/3 px-2'>
                  <div className='py-2'>
                    <p className='w-40 bg-blue-400 rounded-lg hover:bg-red-500 py-2 text-center text-white text-sm'>Vé máy bay - khách sạn</p>
                  </div>
                  <p className='text-sm font-medium'>
                    Đà Nẵng: Dịch vụ vé máy bay + 2 đêm nghỉ dưỡng tại Khách sạn
                    Grand Tourane 5 sao ( Đã bao gồm ăn sáng )
                  </p>
                  <div className='flex gap-1 py-2'>
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                  </div>
                  <p className='text-xs font-normal'>Bay Vietravel Airlines - Phòng Superior city view - Ăn sáng</p>
                  <p className='text-xs font-normal py-2 pt-5'>252 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng</p>
                </div>
                <div className='flex gap-3'>
                  <img src={line} alt="line" className='w-1 h-auto' />
                  <div className='pt-16'>
                    <p>Giá chỉ từ</p>
                    <div className='flex'>
                      <p className='text-xl text-red-500 font-medium'>2,590,000₫</p>
                      <p className='py-1'>/khách
                        Ngày đi 27/09/2023
                      </p>
                    </div>
                    <div className='flex gap-11'>
                      <button className='py-2 px-4 border border-blue-400 text-xs rounded-lg'>
                        Ngày khác
                      </button>
                      <button className='py-2 px-4 bg-red-500 text-xs rounded-lg text-white'>
                        Đặt ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='py-4'>
            <p className='text-xl font-medium'>Các tour đang tìm phổ biến</p>
            <div className='flex gap-5 py-4'>
              <button className='w-36 px-4 py-2 hover:bg-slate-300 shadow-lg shadow-slate-600 rounded-md'>Đà Lạt</button>
              <button className='w-36 px-4 py-2 hover:bg-slate-300 shadow-lg shadow-slate-600 rounded-md'>Hạ long</button>
              <button className='w-36 px-4 py-2 hover:bg-slate-300 shadow-lg shadow-slate-600 rounded-md'>Phan thiết</button>
              <button className='w-36 px-4 py-2 hover:bg-slate-300 shadow-lg shadow-slate-600 rounded-md'>Du lịch đà nẵng</button>
            </div>
          </div>
          <p className='text-xl font-medium pb-4'>Các điểm đến ưa chuộng</p>
          <div className='grid grid-cols-4 gap-8 py-5'>
            <img src={anh5} alt="anh5" className='w-max rounded-lg' />
            <img src={anh6} alt="anh6" className='w-max rounded-lg' />
            <img src={anh7} alt="anh7" className='w-max rounded-lg' />
            <img src={anh8} alt="anh8" className='w-max rounded-lg' />
          </div>
        </article>
      </div >

      {/* Footer */}
      <footer></footer >
    </div >
  )
}

export default TourPage