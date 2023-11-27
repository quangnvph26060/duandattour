import React, { useState, useEffect, useRef } from 'react';
import '../page.css'
import '../messenger.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import logo from '../img/logo.jpg';
import bnr from '../img/huy.webp';
import bh from '../img/bh.webp';
import sl from '../img/sl.webp';
import bb from '../img/bb.jpg';
import aa from '../img/aa.webp';
import cc from '../img/cc.webp';
import qq from '../img/1.webp';
import ww from '../img/2.webp';
import ee from '../img/3.webp';
import rr from '../img/4.webp';
import tt from '../img/5.webp';
import yy from '../img/6.webp';
import he from '../img/bbbbb.webp'
import hq from '../img/aaaaa.webp'
import { BiMap } from 'react-icons/bi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

const HomePage = () => {
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(value);
  };
  const [messageHistory, setMessageHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isChatVisible, setIsChatVisible] = useState(false);
  const messageListRef = useRef(null);
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messageHistory]);
  const handleToggleChat = () => {
    setIsChatVisible(prevState => !prevState);
  };
  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        text: inputValue,
        sender: 'user',
        timestamp: new Date().getTime(),
      };
      setMessageHistory(prevHistory => [...prevHistory, newMessage]);
      setInputValue('');
      sendAutoReply(inputValue);
    }
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const sendAutoReply = userMessage => {
    let autoReply;
    if (userMessage.includes('loại tour')) {
      autoReply =
        'Chúng tôi cung cấp nhiều loại tour khác nhau như tour tham quan thành phố, tour du lịch tự nhiên, tour văn hóa... Bạn có muốn biết thêm về loại tour nào?';
    } else {
      autoReply =
        'Cảm ơn vì tin nhắn của bạn. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.';
    }
    const newMessage = {
      text: autoReply,
      sender: 'assistant',
      timestamp: new Date().getTime(),
    };
    setMessageHistory(prevHistory => [...prevHistory, newMessage]);
  };

  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };
  // boxchat
  const [remainingTime, setRemainingTime] = useState(15 * 3600); // 5 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Chuyển đổi giây thành chuỗi định dạng "hh:mm:ss"
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  const [data, settour] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/admin/tour/")
      .then((response) => response.json())
      .then((result) => {
        settour(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sales = [{

    id: 1,
    name: 'Combo Vũng Tàu 3N2Đ: Vé máy bay khứ hồi + Khách sạn lusion 4 sao (Bao gồm Ăn sáng)',
    image: sl,
    price: 2000000,
    details: 'Vũng Tàu 4 ngày 3 đêm (Một ngày tự do, Tặng vé vườn thực vật Flower Dome và Supertree Observation)- Đã giảm 1.000.000/ khách',
    code: ' Ngày đi : 15/12/2003',
    start: 'Nơi khởi hành: TP. Hồ Chí Minh'

  },
  {

    id: 2,
    name: 'Combo Dà Nẵng 4N2Đ: Vé máy bay khứ hồi + Khách sạn Hồng Thanh Boutique 5 sao (Bao gồm ăn uống)',
    image: cc,
    price: 7000000,
    details: 'Singapore 4 ngày 3 đêm (Một ngày tự do, Tặng vé vườn thực vật Flower Dome và Supertree Observation)- Đã giảm 1.000.000/ khách',
    code: ' Ngày đi : 15/12/2003',
    start: 'Nơi khởi hành: TP. Hồ Chí Minh'

  }
    ,
  {

    id: 3,
    name: 'Combo Quy Nhơn 3N2Đ: Vé máy bay khứ hồi + Khách sạn LAmor Boutique 4 sao (Bao gồm Ăn sáng)',
    image: bh,
    price: 9000000,
    details: 'Singapore 4 ngày 3 đêm (Một ngày tự do, Tặng vé vườn thực vật Flower Dome và Supertree Observation)- Đã giảm 1.000.000/ khách',
    code: ' Ngày đi : 15/12/2003',
    start: 'Nơi khởi hành: TP. Hồ Chí Minh'

  }
  ]
  const names = [
    {
      id: 1,
      image: bnr,
    },
    {
      id: 1,

      image: hq,
    },
    {
      id: 1,

      image: he,
    },
  ];
  const images = [
    {
      id: 1,
      name: "Product 1",
      imagePath: qq,
    },
    {
      id: 2,
      name: "Product 1",
      imagePath: ww,
    },
    {
      id: 3,
      name: "Product 1",
      imagePath: ee,
    },
    {
      id: 4,
      name: "Product 1",
      imagePath: rr,
    },
    {
      id: 5,
      name: "Product 1",
      imagePath: tt,
    },
    {
      id: 6,
      name: "Product 1",
      imagePath: yy,
    },
    {
      id: 7,
      name: "Product 1",
      imagePath: ee,
    },
  ];
  const destinations = [
    {
      id: 1,
      name: "Vịnh Hạ Long",
      image: sl,
      details: "Đã có hơn 1.493.499 yêu thích",
    },
    {
      id: 2,
      name: "Đảo Cát Bà",
      image: bb,

      details: "Đã có hơn 1.493.499 yêu thích",
    },
    {
      id: 1,
      name: "Vịnh Hạ Long",
      image: sl,
      details: "Đã có hơn 1.493.499 yêu thích",
    },
    {
      id: 2,
      name: "Đảo Cát Bà",
      image: bb,

      details: "Đã có hơn 1.493.499 yêu thích",
    },
    {
      id: 1,
      name: "Vịnh Hạ Long",
      image: sl,
      details: "Đã có hơn 1.493.499 yêu thích",
    },
    {
      id: 2,
      name: "Đảo Cát Bà",
      image: bb,

      details: "Đã có hơn 1.493.499 yêu thích",
    },
    {
      id: 1,
      name: "Vịnh Hạ Long",
      image: sl,
      details: "Đã có hơn 1.493.499 yêu thích",
    },
    {
      id: 2,
      name: "Đảo Cát Bà",
      image: bb,

      details: "Đã có hơn 1.493.499 yêu thích",
    },
  ];
  const products = [
    {
      id: 1,
      image: sl,
    },
    {
      id: 2,
      image: bb,
    },
    {
      id: 3,
      image: aa,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="  ">
        {isChatVisible && (
          <div className="chat-box">
            <div className="chat-header">
              <img src={logo} alt="logo" width="30px" />
              <h3 className="chat-title">PolyTour</h3>
            </div>
            <div className="message-list" ref={messageListRef}>
              {messageHistory.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  <div className="message-text">{message.text}</div>
                  <div className="message-timestamp">
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>
              ))}
            </div>

            <div className="input-area">
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  className="message-input"
                  value={inputValue}
                  onChange={event => setInputValue(event.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button className="send-button" onClick={handleSendMessage}>
                  Gửi
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="icon" onClick={handleToggleChat}>
          <div  >
            <FontAwesomeIcon icon={faFacebookMessenger} style={{ color: 'blue', fontSize: '30px' }} />
          </div>
        </div>
      </div>

      <div className="mt-5 mb-5" style={{ maxWidth: '100%', overflow: 'hidden' }}>
        <Slider
          className="product-list1 grid gap-4 grid-cols-1"
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {names.map((name) => (
            <div key={name.id} className="slider-item">
              <img
                style={{ height: "400px" }}
                className="slider-image"
                src={name.image}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="bg-white box-shadow rounded-lg  p-9 mx-auto" style={{ width: '1200px' }}>
        <h1 className="title">PolyTour Trong Nước</h1>
        <div className="tour-form mt-2 flex items-center">
          <div className="flex items-center mr-4">
            <label htmlFor="arrivalDate" className="mr-2 text-gray-600">Ngày đi:</label>
            <div className="relative">
              <label htmlFor="arrivalDate" className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
                <span>&#128197;</span>
              </label>
              <input style={{ backgroundColor: '  #F0FFF0' }}
                type="date"
                id="arrivalDate"
                className="custum border-yellow-600 rounded px-3 py-2 pl-8 focus:outline-none transition-colors duration-300"
              />
            </div>

          </div>
          <div className="flex items-center mr-4">
            <div className="flex items-center mr-4">
              <label htmlFor="arrivalDate" className="mr-2 text-gray-600">Ngày đến:</label>
              <div className="relative">
                <label htmlFor="arrivalDate" className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
                  <span>&#128197;</span>
                </label>
                <input style={{ backgroundColor: '  #F0FFF0' }}
                  type="date"
                  id="arrivalDate"
                  className="custum border-yellow-600 rounded px-3 py-2 pl-8 focus:outline-none transition-colors duration-300"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center mr-4">
            <label htmlFor="destination" className="mr-2 text-gray-600">Nơi đến:</label>
            <select style={{ backgroundColor: '  #F0FFF0' }} id="destination"
              className="custum border-yellow-600 rounded px-3 py-2 focus:outline-none transition-colors duration-300">
              <option value="Hà Nội"> Hà Nội</option>
              <option value="Hcm">Hồ Chí Minh </option>
              <option value="Hải Phòng">Hải Phòng</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Cần Thơ">Cần Thơ</option>
              <option value="An Giang">An Giang</option>
              <option value="Bà Rịa">Bà Rịa - Vũng Tàu</option>
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
          <div className="flex items-center mr-4">
            <label htmlFor="departure" className="mr-2 text-gray-600">Nơi đi:</label>
            <select style={{ backgroundColor: '  #F0FFF0' }} id="departure" className="custum border-yellow-600 rounded px-3 py-2 focus:outline-none transition-colors duration-300">
              <option value="Hà Nội">Hà Nội</option>
              <option value="Hcm">Hồ Chí Minh </option>
              <option value="Hải Phòng">Hải Phòng </option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Cần Thơ">Cần Thơ</option>
              <option value="An Giang">An Giang</option>
              <option value="Bà Rịa">Bà Rịa - Vũng Tàu</option>
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

          <div className="flex items-center gap-2">
            <div>
              <img
                src="/../img/calendar.png"
                alt=""
                className="w-6 h-6 object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="departure" className="mr-2 text-gray-600">
                Nơi đi:
              </label>
              <select
                id="departure"
                className="custum border-yellow-600 rounded px-3 py-2 focus:outline-none transition-colors duration-300"
              >
                <option value="">Chọn nơi đi</option>
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
          </div>

          <button className="bg-yellow-600 text-white py-3 px-5 rounded ml-2">
            Search
          </button>
        </div>
      </div>

      <div className="content">
        <div className="content">
          <h2 className='mt-5 mb-5 home-page__title'>CHƯƠNG TRÌNH ƯU ĐÃI!!!</h2>
          <div className="product-list1 grid gap-4 grid-cols-3">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  className="rounded-lg w-full h-40 object-cover mb-4"
                  src={product.image}
                  alt={product.name}
                />

              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="content">
        <div className="content">
          <h2 className="mt-5 mb-5 home-page__title ">
            KHÁM PHÁ ƯU ĐÃI POLYTOUR!!!
          </h2>
          <Slider
            className="product-lista grid gap-4 grid-cols-1  "
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={5}
            slidesToScroll={2}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {images.map((image) => (
              <div
                key={image.id}
                className="bg-gray-100 p-4 rounded-lg flex flex-col items-center "
              >
                <img
                  className="mt-4 rounded-lg w-full h-50 object-cover"
                  src={image.imagePath}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/*  */}

      <div className="content">
        <h2 className="mt-5 mb-5 home-page__title">ƯU ĐÃI TOUR GIỜ CHÓT!</h2>
        <div className="product-list grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-gray-100 p-4 rounded-lg flex flex-col items-center"
            >
              {item.images.map((image) => (
                <img
                  key={image.id}
                  className="mt-4 rounded-lg w-full h-60 object-cover"
                  src={`http://localhost:8000/storage/${image.image_path}`}
                  alt={`Ảnh ${item.ten_tour}`}
                />
              ))}
              <div className="product-details mt-4">
                <div className="info-row data">
                  <p>{item.lich_khoi_hanh}</p>-<p>{item.soluong} ngày</p>
                </div>
                <Link to={`/booktour/${item.id}`} className="text-blue-500 hover:underline">
                  <h3 className="text-lg font-bold">{item.ten_tour}</h3>
                </Link>
                <p className='price'>Giá: {formatCurrency(15000000)}</p>
                <p style={{ color: '#fd5056', fontSize: '18px', fontWeight: '700' }}>
                  {formatCurrency(item.gia_tour)}
                </p>
                <p className='text mt-2'>{item.mo_ta}</p>

                <p className="text mt-2">
                  Nơi Khởi Hành: {item.diem_khoi_hanh}
                </p>

                <button
                  style={{
                    backgroundColor: "#fd5056",
                    float: "right",
                    borderRadius: "5px",
                  }}
                  className="button-wrapper py-2 px-2 text-white mt-5"
                >
                  Giảm 6%
                </button>
                <button
                  id="countdown-btn"
                  style={{ color: "#4D4AEF" }}
                  className="mt-4 w-full text-center bg-blue-400  py-2 px-4 rounded"
                >
                  Còn 00 ngày {formatTime(remainingTime)}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/*  */}
      <div className="content">
        <h2 className="mt-5 mb-5 home-page__title">VÉ TOUR ƯU ĐÃI ĐẶC BIỆT!</h2>
        <div className="product-list overflow-x-auto">
          {sales.map((sale) => (
            <div
              key={sale.id}
              className="bg-gray-100 p-4 mt-5 rounded-lg flex items-center mx-4"
            >
              <img
                className="rounded-lg w-60 h-80 object-cover"
                src={sale.image}
                alt={sale.name}
              />
              <div className="ml-4 flex-grow">
                <button
                  style={{ backgroundColor: "#2d4271" }}
                  className="ml-2 text-center text-white py-2 mb-3 px-4 rounded"
                >
                  Vé máy bay + Khách sạn
                </button>
                <h3 className="text-lg font-bold">{sale.name}</h3>
                <p className='price-c'>Giá chỉ từ</p>
                <p className="price-t ">{formatCurrency(sale.price)}</p>
                <p>{sale.details}</p>
                <p>{sale.code}</p>
                <div className="flex justify-between mt-4">
                  <button className="mr-2 text-center bg-white text-blue-500 py-2 px-4 rounded">
                    Ngày Khác
                  </button>
                  <div className="flex">
                    <button className="text-center bg-red-500 text-white py-2 px-4 rounded">
                      Đặt Ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*  */}
      <div className="content">
        <h2 className="mt-5 home-page__title mb-5">ĐIỂM ĐẾN CHO CẶP ĐÔI!</h2>
        <div className="product-list grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-gray-100 bg-opacity-75 p-4 rounded-lg flex flex-col items-center"
            >
              <img
                style={{ height: "160px" }}
                className="mt-4 rounded-lg w-full h-40 object-cover"
                src={destination.image}
                alt={destination.name}
              />
              <div className="product-details mt-4">
                <h3 style={{ color: "#2d4271" }} className="text-lg font-bold">
                  {destination.name}
                </h3>
                <p>{destination.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="mt-15  text-center bg-gray-100">
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 lg:w-1/5">
            <h3
              style={{ color: "#2d4271" }}
              className="mt-5 text-lg font-semibold mb-4 "
            >
              Điểm đến
            </h3>
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
            <h3
              style={{ color: "#2d4271" }}
              className="mt-5 text-lg font-semibold mb-4"
            >
              Liên hệ
            </h3>
            <p>Email: Polytour@gmail.com</p>
            <p>Tìm kiếm thông tin</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5">
            <h3
              style={{ color: "#2d4271" }}
              className="mt-5 text-lg font-semibold mb-4"
            >
              Hỗ trợ
            </h3>
            <p>Mạng xã hội</p>
            <p>037 763 8662</p>
            <p>Từ 8:00 - 22:00 hàng ngày</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5">
            <h3
              style={{ color: "#2d4271" }}
              className="mt-5 text-lg font-semibold mb-4"
            >
              Thông tin
            </h3>
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
            <h3
              style={{ color: "#2d4271" }}
              className="mt-5 text-lg font-semibold mb-4"
            >
              Dòng tour
            </h3>
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
            <h3
              style={{ color: "#2d4271" }}
              className="text-lg font-semibold mb-4"
            >
              Liên kết
            </h3>
            <ul className="list-disc pl-4">
              <li>
                <a href="/">Trang chủ</a>
              </li>
              <li>
                <a href="/about">Giới thiệu</a>
              </li>
              <li>
                <a href="/services">Dịch vụ</a>
              </li>
              <li>
                <a href="/contact">Liên hệ</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3
              style={{ color: "#2d4271" }}
              className="text-lg font-semibold mb-4"
            >
              Theo dõi chúng tôi
            </h3>
            <ul className="flex justify-center mb-4">
              <li className="mr-4">
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li className="mr-4">
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="mr-4">
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li className="mr-4">
                <a href="#">
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
            </ul>
            <p className="text-sm">
              Theo dõi chúng tôi để cập nhật thông tin mới nhất về du lịch.
            </p>
          </div>
          <div className="w-fullmd:w-1/2 lg:w-1/3">
            <h3
              style={{ color: "#2d4271" }}
              className="text-lg font-semibold mb-4"
            >
              Đăng ký nhận tin
            </h3>
            <p>
              Đăng ký để nhận thông tin du lịch, khuyến mãi và tin tức mới nhất.
            </p>
            <form className="mt-4 mr-5">
              <input
                type="email"
                placeholder="Nhập địa chỉ email"
                className="w-full py-2 px-4  rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
              >
                Đăng ký
              </button>
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
  );
};

export default HomePage;
