import React, { useState, useEffect } from "react";
import axios from "axios";

// import { IPour } from "../interface/home";
import { Link, Route, useParams } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import star from "../img/star.png"
import line from "../img/line.png"
import anh5 from "../img/anh5.png"
import ticket from "../img/ticket.png"
import shopping from "../img/shopping.png"
import anh6 from "../img/anh6.png"
import anh7 from "../img/anh7.png"
import anh8 from "../img/anh8.jpg"
import anh14 from '../img/anh14.jpg'
import anh15 from "../img/anh15.jpg"
import { useNavigate } from 'react-router-dom';

const rounded = { borderRadius: '25px' };

import { useLocation } from "react-router-dom"
import image from "antd/es/image";
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

const TourPage: React.FC = () => {
  const location = useLocation();
  const matchedResults: Tour[] = location.state?.matchedResults || [];

  useEffect(() => {
    // Thực hiện bất kỳ tác vụ nào bạn muốn với matchedResults
  }, [matchedResults]);
  const [budget, setBudget] = useState(0);


  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(value);
  };

  const handleBudgetChange = (event) => {
    const newBudget = event.target.value;
    setBudget(newBudget);
  };

  function calculateNumberOfDays(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const timeDifference = Math.abs(endDate - startDate);
    const numberOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return numberOfDays;
  }

  const [tourdiemden, setTour] = useState([]);
  const { diem_den } = useParams<{ diem_den: any }>();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/getToursByDestination?diem_den=${diem_den}`)
      .then((response) => {
        console.log(response.data.tourdiemden);
        setTour(response.data.tourdiemden);
      })
    if (diem_den === undefined) {
      axios
        .get(`http://127.0.0.1:8000/api/getToursByDestination?diem_den`)
        .then((response) => {
          console.log('123jhgkjg', response.data.tourdiemden);
          setTour(response.data.tourdiemden);
        })
    }
    console.log(`Tham số diem_den đã thay đổi thành: ${diem_den}`);
    // Cập nhật nội dung tương ứng với tham số mới
  }, [diem_den]);


  const [filteredTours, setFilteredTours] = useState([]);

  //SẢN PHẨM YÊU THÍCH
  //Thêm tour vào yêu thích
  const addToFavorites = (tourId) => {
    const token = localStorage.getItem('token');

    axios.post('http://127.0.0.1:8000/api/favorites', { tour_id: tourId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        // Xử lý kết quả thành công
        console.log(response.data);
      })
      .catch(error => {
        // Xử lý lỗi
        console.error(error);
        alert("Bạn chưa đăng nhập!");
      });
  };

  // const reloadTour = (e) => {
  //   e.preventDefault();
  //   window.location.reload();
  // };

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalResults = (filteredTours.length > 0 ? filteredTours : matchedResults).length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };



  return (
    <div className=''>
      <div className='container mx-auto px-10 gap-11 pt-5'>
        {/*content*/}
        <article>
          <p className='text-center text-2xl font-semibold'>Kết quả tìm kiếm tour du lịch</p>
          <div className='py-5 mb-3'><hr className='bg-black h-[1px]' /></div>
          <div className="flex gap-3 bg-white shadow-xl rounded-sm py-5">
            <p>Xếp theo : </p>
            <input type="radio" name="" id="" />
            <p>Tên A - Z</p>
            <input type="radio" name="" id="" />
            <p>Tên Z - A</p>
            <input type="radio" name="" id="" />
            <p>Giá tăng dần</p>
            <input type="radio" name="" id="" />
            <p>Giá Giảm dần</p>
          </div>
          <div className='py-5 mb-3'><hr className='bg-black h-[1px] shadow-xl' /></div>
          <div className='grid grid-cols-4 gap-7 container mx-auto'>
            {(filteredTours.length > 0 ? filteredTours : matchedResults).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((items) => (
              <div key={items.id} className="relative hover:transform hover:-translate-y-2 hover:transition-transform hover:duration-300">
                <div className='bg-white rounded-t-lg shadow-xl'>
                  <div className="relative">
                    <div className="py-2 absolute top-0 left-1">
                      <Link
                        to={``}
                        className='mega-menu-items flex items-center'
                        onClick={() => addToFavorites(items.id)}
                      >
                        <i className="far text-2xl mr-2 text-white bg-transparent hover:text-red-500 transition duration-300">&#xf004;</i>
                      </Link>
                    </div>
                  </div>
                  {items.image_dd && (
                    <img
                      className="mt-4 rounded-lg w-full h-60 object-cover"
                      src={`http://localhost:8000/storage/${items.image_dd}`}
                      alt={`Ảnh ${items.ten_tour}`}
                    />
                  )}
                  <p className="px-2">{items.lich_khoi_hanh} - {calculateNumberOfDays(items.lich_khoi_hanh, items.ngay_ket_thuc)} ngày - Giờ đi: 05:20</p>
                  <Link to={`/tours/${items.id}`}><p className='font-bold py-2 px-2'>{items.ten_tour}</p></Link>
                  <p className='font-bold py-2 px-2'>Số lượng: {items.soluong} </p>
                  <div className='flex gap-2 py-2 px-4'>
                    <p className='text-sm'>Nơi khởi hành: </p>
                    <p className='font-medium text-sm'>{items.diem_di}</p>
                  </div>
                  <p className='text-base pt-1 px-4 text-blue-950 font-semibold'>Giá trẻ em: {formatCurrency(items.gia_treem)} </p>
                  <div className='grid grid-cols-2 justify-between px-4 p-1'>
                    <p className='text-xl font-bold text-red-500'>{formatCurrency(items.gia_nguoilon)} </p>
                    <div className='bg-yellow-300 py-2 text-center font-semibold rounded-xl text-white shadow-xl'>10% Giảm</div>
                  </div>
                  <div className="px-3 py-4 grid grid-cols-2 gap-7">
                    <button
                      className="bg-red-500 hover:bg-red-900 px-4 py-2 rounded-lg text-white shadow-xl"
                      onClick={() => {
                        // Add logic for booking
                        alert('Booking logic goes here');
                      }}
                    >
                      Đặt Ngay
                    </button>
                    <button className="border border-blue-600 px-5 py-2 rounded-lg hover:bg-slate-300 hover:text-white shadow-xl">
                      <a href="" className="text-blue-600">Xem chi tiết</a>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-5">
            <button
              className={`mx-2 px-3 py-1 rounded-md border font-bold hover:bg-blue-500 hover:text-white ${currentPage === 1 ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
              onClick={handlePrevPage}
            >
              &lt;&lt;
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`mx-2 px-3 py-1 rounded-md border font-bold hover:bg-blue-500 hover:text-white ${currentPage === index + 1 ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`mx-2 px-3 py-1 rounded-md border font-bold hover:bg-blue-500 hover:text-white ${currentPage === totalPages ? 'bg-gray-300' : 'hover:bg-blue-200'}`}
              onClick={handleNextPage}
            >
              &gt;&gt;
            </button>
          </div>
        </article>
      </div>
    </div>
  )
}

export default TourPage