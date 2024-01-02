import React, { useState, useEffect, useRef } from "react";
import { format, differenceInSeconds, addSeconds } from "date-fns";
import "../page.css";
import "../messenger.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../img/logo.jpg";
import bnr from "../img/huy.webp";
import bh from "../img/bh.webp";
import sl from "../img/sl.webp";
import bb from "../img/bb.jpg";
import aa from "../img/aa.webp";
import cc from "../img/cc.webp";
import qq from "../img/1.webp";
import ww from "../img/2.webp";
import ee from "../img/3.webp";
import rr from "../img/4.webp";
import tt from "../img/5.webp";
import yy from "../img/6.webp";
import he from "../img/bbbbb.webp";
import hq from "../img/aaaaa.webp";
import { BiMap } from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import MessageChatBox from "./Client/Message/Message";
import { useStateContext } from "../context/ContextProvider";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
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

 
 
const rounded = {
  borderRadius: "25px",
};
const Countdown = ({ expiryDate }) => {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const expiryDateTime = new Date(expiryDate);
      const currentDateTime = new Date();
      currentDateTime.setHours(currentDateTime.getHours() + 7); // Điều chỉnh sang múi giờ GMT+7

      const distance = differenceInSeconds(expiryDateTime, currentDateTime);

      if (distance > 0) {
        const adjustedDistance = Math.floor(distance);

        const days = Math.floor(adjustedDistance / (24 * 60 * 60));
        const hours = Math.floor((adjustedDistance % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((adjustedDistance % (60 * 60)) / 60);
        const seconds = Math.floor(adjustedDistance % 60);

        const formattedDays = String(days).padStart(2, "0");
        const formattedHours = String(hours).padStart(2, "0");
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(seconds).padStart(2, "0");

        const timeRemaining = `Còn ${formattedDays} ngày ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        setRemainingTime(timeRemaining);
      } else {
        setRemainingTime("Còn 00 ngày 00:00:00");
        clearInterval(interval);
        performNewTask();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  const performNewTask = () => {
    console.log("Thời gian đếm ngược đã đạt 0. Thực hiện tác vụ mới.");
  };
  return <div>{remainingTime}</div>;
};


const HomePage = () => {
  const [searchResults, setSearchResults] = useState<Tour[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDepartureDate, setSelectedDepartureDate] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedDeparture, setSelectedDeparture] = useState('');
  const [matchedResults, setMatchedResults] = useState<Tour[]>([]);
  const navigate = useNavigate();
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin/tour/', {
        params: {
          ngayDen: selectedDate,
          lichKhoiHanh: selectedDepartureDate,
          diemDen: selectedDestination,
          diemDi: selectedDeparture
        }
      });
 
       console.log('matchedResults:', matchedResults);
      setSearchResults(response.data.data);
     

      let filteredResults = response.data.data || []

      if (selectedDate) {
        filteredResults = filteredResults.filter(tour => tour.ngay_ket_thuc.includes(selectedDate))
      }
      if (selectedDepartureDate) {
        filteredResults = filteredResults.filter(tour => tour.lich_khoi_hanh.includes(selectedDepartureDate))
      }
      if (selectedDestination) {
        filteredResults = filteredResults.filter(tour => tour.diem_den === selectedDestination)
      }
      if (selectedDeparture) {
        filteredResults = filteredResults.filter(tour => tour.diem_di === selectedDeparture)
      }
      setMatchedResults(filteredResults);
     
      if (filteredResults.length > 0) {
        // Chuyển trang khi có kết quả tìm kiếm chính xác
        console.log('filteredResult:', filteredResults);
        navigate('/tour', { state: { matchedResults: filteredResults } });
      } else {
        // Hiển thị thông báo không tìm thấy tour và xác nhận chuyển trang
        const confirmMessage = 'Không tìm thấy tour. Bạn có muốn chuyển trang đến /tour không?';
        const shouldNavigate = window.confirm(confirmMessage);
        
        // Nếu người dùng xác nhận muốn chuyển trang, thực hiện chuyển trang tới `/tour` với trạng thái trống
        if (shouldNavigate) {
          navigate('/tour', { state: {} });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
 
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
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
  function calculateNumberOfDays(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const timeDifference = Math.abs(endDate - startDate);
    const numberOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return numberOfDays;
  }
  const [tourKM, setTourKM] = useState([]);

  const getTourKM = () => {
    axios
      .get("http://127.0.0.1:8000/api/admin/tour")
      .then((response) => {
        console.log(response.data.data);
        const tourKMData = response.data.data.map((tour) => {
          const maxExpiryDate = tour.max_expiry_date
            ? new Date(tour.max_expiry_date)
            : null;
          return {
            ...tour,
            max_expiry_date: maxExpiryDate,
          };
        });

        setTourKM(tourKMData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTourKM();
  }, []);

  const sales = [
    {
      id: 1,
      name: "Combo Vũng Tàu 3N2Đ: Vé máy bay khứ hồi + Khách sạn lusion 4 sao (Bao gồm Ăn sáng)",
      image: sl,
      price: 2000000,
      details:
        "Vũng Tàu 4 ngày 3 đêm (Một ngày tự do, Tặng vé vườn thực vật Flower Dome và Supertree Observation)- Đã giảm 1.000.000/ khách",
      code: " Ngày đi : 15/12/2003",
      start: "Nơi khởi hành: TP. Hồ Chí Minh",
    },
    {
      id: 2,
      name: "Combo Dà Nẵng 4N2Đ: Vé máy bay khứ hồi + Khách sạn Hồng Thanh Boutique 5 sao (Bao gồm ăn uống)",
      image: cc,
      price: 7000000,
      details:
        "Singapore 4 ngày 3 đêm (Một ngày tự do, Tặng vé vườn thực vật Flower Dome và Supertree Observation)- Đã giảm 1.000.000/ khách",
      code: " Ngày đi : 15/12/2003",
      start: "Nơi khởi hành: TP. Hồ Chí Minh",
    },
    {
      id: 3,
      name: "Combo Quy Nhơn 3N2Đ: Vé máy bay khứ hồi + Khách sạn LAmor Boutique 4 sao (Bao gồm Ăn sáng)",
      image: bh,
      price: 9000000,
      details:
        "Singapore 4 ngày 3 đêm (Một ngày tự do, Tặng vé vườn thực vật Flower Dome và Supertree Observation)- Đã giảm 1.000.000/ khách",
      code: " Ngày đi : 15/12/2003",
      start: "Nơi khởi hành: TP. Hồ Chí Minh",
    },
  ];
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
    <div className="bg-white rounded-lg shadow block-all">
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
                  onChange={(event) => setInputValue(event.target.value)}
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
          <div>
            <FontAwesomeIcon
              icon={faFacebookMessenger}
              style={{ color: "blue", fontSize: "30px" }}
            />
          </div>
        </div>
      </div>

      <div
        className="mt-5 mb-5"
        style={{ maxWidth: "100%", overflow: "hidden" }}
      >
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
            <div key={name.id} className="slider-tour">
              <img
                style={{ height: "570px", maxWidth: "1920px" }}
                className="slider-image"
                src={name.image}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div
      className="bg-white box-shadow rounded-lg  p-9 mx-auto hidden lg:block "
      style={{ maxWidth: "1200px", position: "relative", left: 0, top: "-110px" }}
    >
      <h1 className="font-medium text-2xl mb-10 text-blue-500 border-b border-blue-500 pb-4">PolyTour Trong Nước</h1>
      <div className="tour-form mt-2 flex tours-center">
        <div className="flex tours-center mr-4">
          <div className="flex hover:border-blue-500 icon-sheach tours-center  px-4 py-2 border-[#ffc709] rounded-lg border-[4px] form-banner">
            <img
              src="https://cdn-icons-png.flaticon.com/128/61/61469.png"
              alt=""
              width={"20px"}
            />

            <div className="flex flex-col ml-3">
              <label htmlFor="departureDate" className="mr-2 text-[#2d4271] font-medium">
                Ngày đi:
              </label>
              <div className="relative">
                <label
                  htmlFor="departureDate"
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
                </label>
                <input
            
                  type="date"
                  id="departureDate"

                  value={selectedDepartureDate}
                  onChange={(e) => setSelectedDepartureDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex tours-center mr-4">
          <div className="flex icon-sheach tours-center hover:border-blue-500  px-4 py-2 border-[#ffc709] rounded-lg border-[4px] form-banner">
            <img src="https://cdn-icons-png.flaticon.com/128/61/61469.png" alt="" width={"20px"} />

            <div className="flex flex-col ml-3">
              <label htmlFor="arrivalDate" className="mr-2 text-[#2d4271] font-medium">
                Số ngày
              </label>
              <select name="" id="" className="h-[26px] text-[#2d4271] font-bold">
                <option value="1">1 ngày</option>
                <option value="3">3 ngày</option>
                <option value="5">5 ngày</option>
                <option value="7">7 ngày</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex tours-center mr-4">
          <div className="flex icon-sheach tours-center hover:border-blue-500  px-4 py-2 border-[#ffc709] rounded-lg border-[4px] form-banner">
            <img
              src="https://cdn-icons-png.flaticon.com/128/447/447031.png"
              alt=""
              width={"20px"}
            />
            <div className="flex flex-col ml-3">
              <label htmlFor="destination" className="mr-2 text-[#2d4271] font-medium">
                Điểm đi :
              </label>
              <select

            id="depeparture"
             
            value={selectedDeparture}
            onChange={(e) => setSelectedDeparture(e.target.value)}
          >
                <option value="Thành phố Hà Nội"> Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Hcm">Hồ Chí Minh </option>
                <option value="Hải Phòng">Hải Phòng</option>
                <option value="Tỉnh Thanh Hóa">Thanh Hóa</option>
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
          </div>
        </div>
        <div className="tuongduong">
          <img src="https://cdn-icons-png.flaticon.com/128/5519/5519832.png" alt="" />
        </div>

        <div className="flex tours-center mr-4">
          <div className="flex icon-sheach tours-center hover:border-blue-500  px-4 py-2 border-[#ffc709] rounded-lg border-[4px] form-banner">
            <img
              src="https://cdn-icons-png.flaticon.com/128/447/447031.png"
              alt=""
              width={"20px"}
            />

            <div className="flex flex-col ml-3">
              <label htmlFor="destination" className="mr-2 text-[#2d4271] font-medium">
                Điểm đến :
              </label>
              <select
      
            id="destination"

            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
          >
                <option value="Hà Nội"> Hà Nội</option>
                <option value="Miền Tây">MT </option>
                <option value="Hcm">Hồ Chí Minh </option>
                <option value="Hải Phòng">Hải Phòng</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Cần Thơ">Cần Thơ</option>
                <option value="An Giang">An Giang</option>
                <option value="Bà Rịa">Bà Rịa - Vũng Tàu</option>
                <option value="Bắc Giang">Bắc Giang</option>
                <option value="Tỉnh Bắc Kạn">Bắc Kạn</option>
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
                <option value="Tỉnh Điện Biên">Điện Biên</option>
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
          </div>
        </div>

        <button
          className="hover:bg-blue-500 bg-[#ffc709] text-white py-3 px-5 rounded ml-2 max-w-[150px] w-full  h-[72px]"
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>
      </div>
    </div>

      <div className="lg:m-10 m-0">
        <div className="lg:m-10 m-0">
          <h2 className="mt-5 mb-5 home-page__title lg:text-[30px] text-lg p-4 lg:p-0 ">
            CHƯƠNG TRÌNH ƯU ĐÃI!!!
          </h2>
          <div className="product-list1  gap-4 flex md:flex-row flex-col">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md md:w-1/3 w-full"
              >
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

      <div className="lg:m-10 m-0">
        <div className="lg:m-10 m-0">
          <h2 className="mt-5 mb-5 home-page__title lg:text-[30px] text-lg p-4 lg:p-0 ">
            KHÁM PHÁ ƯU ĐÃI POLYTOUR!!!
          </h2>
          <Slider
            className="product-lista grid gap-4 grid-cols-1  "
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={5}
            slidesToScroll={2}
            arrows={false}
            autoplay={true} // Thêm vào đây
            autoplaySpeed={3000} // Tùy chọn: Thiết lập thời gian trễ giữa các lượt chuyển slide (đơn vị là milliseconds)
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 767,
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
                className="bg-gray-100 p-4 rounded-lg flex flex-col tours-center "
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

      <div  className="lg:m-10 m-0 ">
        <h2 className="lg:m-10 mt-5 mb-5 home-page__title lg:text-[30px] text-lg p-4 lg:p-0 ">
          ƯU ĐÃI TOUR GIỜ CHÓT!
        </h2>
        <div className='grid grid-cols-3 gap-7 container mx-auto with-250px'>
        {tourKM.slice(0, 3).map((items) => (
              <div key={items.id} className="relative hover:transform hover:-translate-y-2 hover:transition-transform hover:duration-300">
                
                <div className=' bg-white rounded-t-lg shadow-xl'>
                 
                  <div className="relative">
                    <div className="py-2 absolute top-0 left-1">
                   
                    </div>
                    <div className="relative">
                    <div className="py-2 absolute top-0 left-1">
                      <Link
                        to={``}  // Update the 'to' prop to navigate to the favorite page
                        className='mega-menu-items'
                        onClick={() => addToFavorites(items.id)} // Use items.id directly instead of hoveredItemId
                      // Optionally, you can add additional logic for navigating to the favorite page if needed
                      >
                        {/* Thêm vào sản phẩm yêu thích */}
                        <i className="fa-regular fa-heart text-white"></i>
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
                  </div>

                  <p className="px-2">{items.lich_khoi_hanh} - {calculateNumberOfDays(items.lich_khoi_hanh, items.ngay_ket_thuc)} ngày - Giờ đi: 05:20</p>
                  <Link to={`/tours/${items.id}`}><p className='font-bold py-2 px-2'>{items.ten_tour}</p></Link>
                  <p className='font-bold py-2 px-2'>Số lượng: {items.soluong} </p>
                  <div className='flex gap-2 py-2 px-4'>
                    <p className='text-sm'>Nơi khởi hành: {items.diem_di}</p>
                    <p className='font-medium text-sm'>{items.diem_khoi_hanh}</p>
                  </div>
                  <p className='text-base pt-1 px-4 text-blue-950 font-semibold'>Giá trẻ em: {formatCurrency(items.gia_treem)} </p>
                  <div className='grid grid-cols-2 justify-between px-4 p-1'>
                    <p className=' font-bold '>Giá Người Lớn: {formatCurrency(items.gia_nguoilon)}</p>
                    <div className='bg-yellow-300 mt-10 py-2 text-center font-semibold rounded-xl text-white shadow-xl'>10% Giảm</div>
                  </div>
                  <div className="px-3 py-4 grid grid-cols-2 gap-7">
                    <button className="bg-red-500 hover:bg-red-900 px-4 py-2 rounded-lg text-white shadow-xl">Đặt Ngay</button>
                    <button className="border border-blue-600 px-5 py-2 rounded-lg hover:bg-slate-300 hover:text-white shadow-xl"><a href="" className="text-blue-600">Xem chi tiết</a></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
      {/*  */}
      <div className="lg:m-10 m-0">
        <h2 className="lg:m-10 mt-5 mb-5 home-page__title lg:text-[30px] text-lg p-4 lg:p-0 ">
          VÉ TOUR ƯU ĐÃI ĐẶC BIỆT!
        </h2>
        <div className=" ">
          <div className="flex flex-wrap   overflow-x-auto ">
            {sales.map((sale) => (
              <div
                key={sale.id}
                className="lg:w-full md:w-1/2 bg-gray-100 p-4 mt-5 rounded-lg tours-center flex lg:flex-row flex-col  lg:mx-4 "
              >
                <div className="tour-uudai lg:w-1/4 w-full">
                  <img
                    className="rounded-lg w-60 h-80 object-cover"
                    src={sale.image}
                    alt={sale.name}
                  />
                </div>

                <div className="ml-4 flex-grow lg:w-1/2 w-full pr-5 lg:border-r  border-gray-400">
                  <button
                    style={{ backgroundColor: "#2d4271" }}
                    className="lg:block hidden text-center text-white py-2 mb-3 px-4 rounded "
                  >
                    Vé máy bay + Khách sạn
                  </button>
                  <h3 className=" mt-4 lg:mt-0 text-lg lg:text-base font-bold  hover:text-blue-500 mb-2">
                    {sale.name}
                  </h3>
                  <div className="mb-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                      alt=""
                      width={"16px"}
                      height={"16px"}
                    />
                  </div>

                  <p className="text-[#6c757d] text-[14px] mb-4">
                    Vé máy bay khứ hồi Vietravel Airlines + Phòng KS + Ăn sáng{" "}
                  </p>
                  <div className="flex tours-center mb-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/3272/3272491.png"
                      alt=""
                      width={"40px"}
                      height={"52px"}
                    />
                    <div className="font-bold pl-2 text-[#2d4271] ">
                      Tuyệt vời
                    </div>
                  </div>
                  <div className="flex tours-center ">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/12348/12348181.png"
                      alt=""
                      width={"16px"}
                      height={"16px"}
                    />
                    <p className="text-[14px] text-blue-400 ml-2">
                      {sale.details}
                    </p>
                  </div>
                </div>
                <div className="lg:w-1/4 w-full flex flex-col  pl-5 lg:tours-end">
                  <p className="price-c mb-2">Giá chỉ từ : </p>
                  <p className=" price-t mb-2 ">{formatCurrency(sale.price)}</p>

                  <p className="mb-2">{sale.code}</p>
                  <div className="flex justify-between tours-center mt-4 mb-2">
                    <button className="mr-2 text-center bg-white text-blue-500 py-2 px-4 rounded hover:bg-red-500 hover:text-white">
                      Ngày Khác
                    </button>
                    <div className="flex">
                      <button className="text-center bg-red-500 text-white py-2 px-4 rounded hover:bg-white hover:text-blue-500">
                        Đặt Ngay
                      </button>
                    </div>
                  </div>
                  <p className="text-base text-blue-500 mt-2 lg:block hidden">
                    Đã bao gồm trong giá
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*  */}
      <div className="content">
        <h2 className="mt-5 home-page__title mb-5">ĐIỂM ĐẾN CHO CẶP ĐÔI!</h2>
        <div className="product-list hover-image grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-gray-100 bg-opacity-75 p-4 rounded-lg flex flex-col "
            >
              <img
                style={{ height: "160px" }}
                className="mt-4 rounded-lg w-full h-40 object-cover"
                src={destination.image}
                alt={destination.name}
              />
              <div className="product-details mt-4 ">
                <h3 className="text-[#2d4271] text-lg font-bold hover:text-blue-500">
                  {destination.name}
                </h3>
                <p>{destination.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:m-10 m-0">
        <div>
          <p className="font-bold text-[30px] text-[#2d4271]">
            Vì sao chọn Poly tour
          </p>
          <div className="flex flex-wrap">
            <div className="lg:w-1/3 text-base w-full md:w-1/2 icon-select flex flex-col tours-center gap-2 py-4">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2953/2953363.png"
                alt=""
                width={"80px"}
                height={"80px"}
              />
              <h5 className="font-bold text-[#2d4271] text-lg">
                Mạng bán tour
              </h5>
              <p>Đầu tiên tại việt nam </p>
              <p>Ứng dụng công nghệ mới nhất</p>
            </div>
            <div className="lg:w-1/3 text-base w-full md:w-1/2 icon-select flex flex-col tours-center gap-2 py-4">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2953/2953363.png"
                alt=""
                width={"80px"}
                height={"80px"}
              />
              <h5 className="font-bold text-[#2d4271] text-lg">
                Mạng bán tour
              </h5>
              <p>Đầu tiên tại việt nam </p>
              <p>Ứng dụng công nghệ mới nhất</p>
            </div>
            <div className="lg:w-1/3 text-base w-full md:w-1/2 icon-select flex flex-col tours-center gap-2 py-4">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2953/2953363.png"
                alt=""
                width={"80px"}
                height={"80px"}
              />
              <h5 className="font-bold text-[#2d4271] text-lg">
                Mạng bán tour
              </h5>
              <p>Đầu tiên tại việt nam </p>
              <p>Ứng dụng công nghệ mới nhất</p>
            </div>
            <div className="lg:w-1/3 text-base w-full md:w-1/2 icon-select flex flex-col tours-center gap-2 py-4">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2953/2953363.png"
                alt=""
                width={"80px"}
                height={"80px"}
              />
              <h5 className="font-bold text-[#2d4271] text-lg">
                Mạng bán tour
              </h5>
              <p>Đầu tiên tại việt nam </p>
              <p>Ứng dụng công nghệ mới nhất</p>
            </div>
            <div className="lg:w-1/3 text-base w-full md:w-1/2 icon-select flex flex-col tours-center gap-2 py-4">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2953/2953363.png"
                alt=""
                width={"80px"}
                height={"80px"}
              />
              <h5 className="font-bold text-[#2d4271] text-lg">
                Mạng bán tour
              </h5>
              <p>Đầu tiên tại việt nam </p>
              <p>Ứng dụng công nghệ mới nhất</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;