import React, { useState, useEffect } from "react";
import axios from "axios";
import '../tour.css'
import { IPour } from "../interface/home";
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import anh4 from "../img/anh4.jpg"
import star from "../img/star.png"
import line from "../img/line.png"
import anh5 from "../img/anh5.png"
import anh6 from "../img/anh6.png"
import anh7 from "../img/anh7.png"
import anh8 from "../img/anh8.jpg"
import anh14 from '../img/anh14.jpg'
import anh15 from "../img/anh15.jpg"
const rounded = { borderRadius: '25px' };
import logo from '../img/logo.jpg';
const TourPage = () => {
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

  const [searchTerm, setSearchTerm] = useState("");
  const [tours, setTours] = useState<IPour[]>([]);
  const [filteredTours, setFilteredTours] = useState<IPour[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false); // Biến flag để theo dõi trạng thái tìm kiếm

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/api/admin/tour/");
        setTours(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Error retrieving tours.");
      }
    };

    fetchTours();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
 
  const handleSearch = () => {
    const filteredTours = tours.filter((tour) =>
      tour.ten_tour.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredTours(filteredTours);
    setSearched(true); // Đánh dấu đã tìm kiếm
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setFilteredTours([]);
    setSearched(false); // Đánh dấu chưa tìm kiếm
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const displayedTours = searched ? filteredTours : tours; // Chọn danh sách tours để hiển thị

  return (
    <div className=''>
      {/*  */}
      <div> <div className="menu flex tours-center justify-between">
        <div className='flex'>
          <a href="/"><img style={rounded} src={logo} alt="logo" width="80px" /></a>

          <nav className='font-semibold p-4 pt-6 pl-18'>
            <ul className='flex text-[#2D4271] gap-12'>
              <a href="/">PolyTour</a>
              <a href="/tour">Tour</a>
              <a href="/news">Tin tức</a>
              <a href="">Khuyến mãi</a>
              <a href="/contact">Liên hệ</a>
            </ul>
          </nav>
        </div>
        <div className="search mt-5   tours-center">
        <input className="border-yellow-300
border-[3px] px-2 py-2  rounded"
          type="text"
          placeholder="Search tours"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="bg-blue-500 text-white py-2 px-3 rounded ml-2" onClick={handleSearch}>Search</button> {/* Thêm nút tìm kiếm */}
        {/* <button onClick={handleResetSearch}>Reset</button> Thêm nút reset */}    
            <Link to="/signup">
              <button className="bg-green-500 text-white py-1 px-3 rounded">
                <i className="fas fa-user"></i>
              </button>
            </Link>
       </div>
      </div>
      </div>
      {/*  */}

      <div className='flex container mx-auto px-10 gap-11 pt-5'>
        {/* Conten left*/}
        <aside  style={{ borderRadius: '10px' }} className=' left w-1/4 bg-gray-100 h-[1400px]'>
          <h1 className='font-medium text-3xl p-4'>Lọc kết quả</h1>
          <h2 className='bg-blue-600 text-2xl ct font-medium text-white px-4 py-1'>Tour</h2>
          <div className='text-center p-2 py-4 '>
            <select className='rounded-md border border-black'>
              <option value="1">Du lịch</option>
              <option value="2">Trong Nước</option>
            </select>
          </div>
          <div className='text-center'>
            <button className='bg-white px-4 py-2 rounded-lg border border-black'>Trong nước</button>
          </div>
          <p className='px-3 py-1 text-xl font-medium'>Loại Hình Tour</p>
          <div className='px-3 text-center py-1'>
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
            <select name="" className='rounded-md border border-black w-72 h-9' id="">
            <option value="">Chọn Điểm đi</option>
              <option value="">Hà Nội</option>
              <option value="male">Hải Phòng</option>
              <option value="female">Nam Định</option>
              <option value="female">Vũng Tàu</option>
              <option value="female">Tp. HCM</option>
              <option value="female">Bà Rịa </option>
              <option value="female">Ba Vì</option>
              <option value="female">Đà Lạt</option>
              <option value="female">Huế</option>
              <option value="female">Quảng Bình</option>
              <option value="female">Tây nguyên </option>
              <option value="female">Bình Định</option>
              <option value="female">Quảng Nam</option>
              <option value="female">Hà Tĩnh</option>
            </select>
          </div>
          <p className='px-3 text-lg font-medium py-1'>Điểm đến</p>
          <div className='px-3 text-center py-1'>
            <select name="" className='rounded-md border border-black w-72 h-9' id="">
            <option value="">Chọn Điểm đến</option>
              <option value="">Hà Nội</option>
              <option value="male">Hải Phòng</option>
              <option value="female">Nam Định</option>
              <option value="female">Vũng Tàu</option>
              <option value="female">Tp. HCM</option>
              <option value="female">Bà Rịa </option>
              <option value="female">Ba Vì</option>
              <option value="female">Đà Lạt</option>
              <option value="female">Huế</option>
              <option value="female">Quảng Bình</option>
              <option value="female">Tây nguyên </option>
              <option value="female">Bình Định</option>
              <option value="female">Quảng Nam</option>
              <option value="female">Hà Tĩnh</option>
            </select>
          </div>
          <p className='px-3 text-lg font-medium pt-1'>Số ngày</p>

          <div className='flex gap-2 py-2 container justify-center'>
            <div className=''>
              <button className='w-36 bg-white px-4 py-2 rounded-lg border border-black'>1 đến 3 ngày</button>
            </div>
            <div className=''>
              <button className='w-36 bg-white px-4 py-2 rounded-lg border border-black'>4 đến 7 ngày</button>
            </div>
          </div>
          <div className='flex gap-2 py-2 container justify-center'>
            <div className=''>
              <button className='w-36 bg-white px-4 py-2 rounded-lg border border-black'>8 đến 14 ngày</button>
            </div>
            <div className=''>
              <button className='w-36 bg-white px-4 py-2 rounded-lg border border-black'>trên 14 ngày</button>
            </div>
          </div>
          <p className='px-3 text-lg font-medium py-1'>Ngày đi</p>
          <div className='text-center'>
            <input className='pl-7 pr-12 w-56 h-10 rounded-lg' type="date" name="date" id="" />
          </div>
          <p className='px-3 text-lg font-medium py-1'>Số người</p>
          <div className='flex gap-2 py-2 container justify-center'>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>1 người</button>
            </div>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>2 người</button>
            </div>
          </div>
          <div className='flex gap-2 container justify-center'>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>3 - 5 người</button>
            </div>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>5+ người</button>
            </div>
          </div>
          <p className='px-3 text-lg font-medium py-1'>Dòng Tour</p>
          <div className='flex gap-2 py-2 container justify-center'>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>Cao cấp</button>
            </div>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>Tiêu chuẩn</button>
            </div>
          </div>
          <div className='flex gap-2 container justify-center'>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>Tiết kiệm</button>
            </div>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>Giá tốt</button>
            </div>
          </div>
          <p className='px-3 text-lg font-medium py-2'>Bộ lọc tìm kiếm__________________</p>
          <h1 className='font-medium text-3xl p-4'>Lọc kết quả</h1>
  
      <p className='px-3 text-lg font-medium py-1'>Ngân sách của quý khách: {formatCurrency(budget)}</p>
      <div className='px-3 pt-1'>
        <input className='w-60' type="range" min="0" max="200000000" onChange={handleBudgetChange} />
      </div>
      <p className='px-3'>0đ - {formatCurrency(200000000)}</p>
          <p className='px-3 text-lg font-medium py-1'>Thông tin vận chuyển</p>
          <div className='flex gap-3 py-1 pt-2 container justify-center'>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>Máy bay</button>
            </div>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>Ô tô</button>
            </div>
          </div>
          <button className="bt mt-4 mb-6 ml-7">Hiển thị những chuyến đi có</button>
        
        </aside>

        {/*conten-right*/}
        <article className='w-3/4'>
          <p className='text-center text-2xl font-semibold'>Kết quả tìm kiếm tour du lịch</p>
            <div className="content">
              <h2 className="mt-5 mb-5 home-page__title">ƯU ĐÃI TOUR GIỜ CHÓT!</h2>
              <div className="product-list grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {displayedTours.map((tour) => (

                  <div key={tour.id} className="bg-gray-100 p-4 rounded-lg flex flex-col tours-center">

                    {tour.images.map((image) => (
                      <img
                        key={image.id}
                        className="mt-4 rounded-lg w-full h-60 object-cover"
                        src={`http://localhost:8000/storage/${image.image_path}`}
                        alt={`Ảnh ${tour.ten_tour}`}
                      />
                    ))}
                    <div className="product-details mt-4">
                      <div className="info-row data">
                        <p>{tour.lich_khoi_hanh}</p>-
                        <p>{tour.soluong} ngày</p>
                      </div>
                      <Link to="/:id/tour" className="text-blue-500 hover:underline">
                        <h3 className="text-lg font-bold">{tour.ten_tour}</h3>
                      </Link>
                      <p className='price'>Giá :1500000đ</p><p style={{ color: '#fd5056', fontSize: "18px", fontWeight: '700' }}>{tour.gia_tour}đ</p>
                      <p className='text mt-2'>{tour.mo_ta}</p>

                      <p className='text mt-2'>Nơi Khởi Hành: {tour.diem_khoi_hanh}</p>

                      <button style={{ backgroundColor: '#fd5056', float: 'right', borderRadius: '5px' }} className="button-wrapper py-2 px-2 text-white mt-5">
                        Giảm 6%
                      </button>
                      <button
                        id="countdown-btn" style={{ color:'revert' }}
                        className="mt-4 w-full text-center bg-blue-400  py-2 px-4 rounded"
                      >
                        Đặt Ngay
                      </button>

                    </div>
                  </div>
                ))}
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
      </div>

      {/* Footer */}
      <footer className="mt-15  text-center bg-gray-100">
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 lg:w-1/5">
            <h3 style={{ color: '#2d4271' }} className="mt-5 text-lg font-semibold mb-4 ">Điểm đến</h3>
            <ul className="list-disc pl-4">
              <li>Hà Nội</li>
              <li>Hồ Chí Minh</li>
              <li>Đà Nẵng</li>
              <li>Hội An</li>
              <li>Nha Trang</li>
              <li>Phú Quốc</li>
              <li>Đà Lạt</li>
              <li>Sapa</li>
              <li>Phan Thiết</li>
              <li>Hạ Long</li>
              <li>Vũng Tàu</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5">
            <h3 style={{ color: '#2d4271' }} className="mt-5 text-lg font-semibold mb-4">Liên hệ</h3>
            <p>Email: Polytour@gmail.com</p>
            <p>Tìm kiếm thông tin</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5">
            <h3 style={{ color: '#2d4271' }} className="mt-5 text-lg font-semibold mb-4">Hỗ trợ</h3>
            <p>Mạng xã hội</p>
            <p>037 763 8662</p>
            <p>Từ 8:00 - 22:00 hàng ngày</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5">
            <h3 style={{ color: '#2d4271' }} className="mt-5 text-lg font-semibold mb-4">Thông tin</h3>
            <ul className="list-disc pl-4">
              <li>Tạp chí du lịch</li>
              <li>Cẩm nang du lịch</li>
              <li>Tin tức</li>
              <li>Sitemap</li>
              <li>FAQs</li>
              <li>Chính sách riêng tư</li>
              <li>Thỏa thuận sử dụng</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5">
            <h3 style={{ color: '#2d4271' }} className="mt-5 text-lg font-semibold mb-4">Dòng tour</h3>
            <ul className="list-disc pl-4">
              <li>Cao cấp</li>
              <li>Tiêu chuẩn</li>
              <li>Tiết kiệm</li>
              <li>Giá tốt</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap mt-8">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3 style={{ color: '#2d4271' }} className="text-lg font-semibold mb-4">Liên kết</h3>
            <ul className="list-disc pl-4">
              <li><a href="/">Trang chủ</a></li>
              <li><a href="/about">Giới thiệu</a></li>
              <li><a href="/services">Dịch vụ</a></li>
              <li><a href="/contact">Liên hệ</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3 style={{ color: '#2d4271' }} className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h3>
            <ul className="flex justify-center mb-4">
              <li className="mr-4"><a href="#"><i className="fab fa-facebook-f"></i></a></li>
              <li className="mr-4"><a href="#"><i className="fab fa-twitter"></i></a></li>
              <li className="mr-4"><a href="#"><i className="fab fa-instagram"></i></a></li>
              <li className="mr-4"><a href="#"><i className="fab fa-youtube"></i></a></li>
            </ul>
            <p className="text-sm">Theo dõi chúng tôi để cập nhật thông tin mới nhất về du lịch.</p>
          </div>
          <div className="w-fullmd:w-1/2 lg:w-1/3">
            <h3 style={{ color: '#2d4271' }} className="text-lg font-semibold mb-4">Đăng ký nhận tin</h3>
            <p>Đăng ký để nhận thông tin du lịch, khuyến mãi và tin tức mới nhất.</p>
            <form className="mt-4 mr-5">
              <input type="email" placeholder="Nhập địa chỉ email" className="w-full py-2 px-4  rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" />
              <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none">Đăng ký</button>
            </form>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Website. All rights reserved
          </p>
        </div>
      </footer>
    </div>
  )
}

export default TourPage