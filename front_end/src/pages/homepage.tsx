import React, { useState, useEffect, useRef } from "react";
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
import network from "../img/networking.png";
import { BiMap } from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";

const HomePage = () => {
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(value);
  };
  const [messageHistory, setMessageHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(false);
  const messageListRef = useRef(null);
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messageHistory]);
  const handleToggleChat = () => {
    setIsChatVisible((prevState) => !prevState);
  };
  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        text: inputValue,
        sender: "user",
        timestamp: new Date().getTime(),
      };
      setMessageHistory((prevHistory) => [...prevHistory, newMessage]);
      setInputValue("");
      sendAutoReply(inputValue);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const sendAutoReply = (userMessage) => {
    let autoReply;
    if (userMessage.includes("loại tour")) {
      autoReply =
        "Chúng tôi cung cấp nhiều loại tour khác nhau như tour tham quan thành phố, tour du lịch tự nhiên, tour văn hóa... Bạn có muốn biết thêm về loại tour nào?";
    } else {
      autoReply =
        "Cảm ơn vì tin nhắn của bạn. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.";
    }
    const newMessage = {
      text: autoReply,
      sender: "assistant",
      timestamp: new Date().getTime(),
    };
    setMessageHistory((prevHistory) => [...prevHistory, newMessage]);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
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
            <div key={name.id} className="slider-item">
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
        <div className="tour-form mt-2 flex items-center">
          <div className="flex items-center mr-4">
            <div className="flex hover:border-blue-500 icon-sheach items-center  px-4 py-2 border-[#ffc709] rounded-lg border-[4px] form-banner">
              <img
                src="https://cdn-icons-png.flaticon.com/128/61/61469.png"
                alt=""
                width={"20px"}
              />

              <div className="flex flex-col ml-3">
                <label htmlFor="arrivalDate" className="mr-2 text-[#2d4271] font-medium">
                  Ngày đi:
                </label>
                <input
                  style={{ backgroundColor: "  #ffffff" }}
                  type="date"
                  id="arrivalDate"
                  className="w-[180px] max-w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center mr-4">
            <div className="flex icon-sheach items-center hover:border-blue-500  px-4 py-2 border-[#ffc709] rounded-lg border-[4px] form-banner">
              <img
                src="https://cdn-icons-png.flaticon.com/128/61/61469.png"
                alt=""
                width={"20px"}
              />

              <div className="flex flex-col ml-3">
                <label htmlFor="arrivalDate" className="mr-2 text-[#2d4271] font-medium">
                  Số ngày
                </label>
                <select name="" id="" className="h-[26px] text-[#2d4271] font-bold">
                  <option value="">1 ngày</option>
                  <option value="">3 ngày</option>
                  <option value="">5 ngày</option>
                  <option value="">7 ngày</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex items-center mr-4">
            <div className="flex icon-sheach items-center hover:border-blue-500  px-4 py-2 border-[#ffc709] rounded-lg border-[4px] form-banner">
              <img
                src="https://cdn-icons-png.flaticon.com/128/447/447031.png"
                alt=""
                width={"20px"}
              />

              <div className="flex flex-col ml-3">
                <label htmlFor="arrivalDate" className="mr-2 text-[#2d4271] font-medium">
                  Điểm đi :
                </label>
                <select id="destination" className="h-[26px] text-[#2d4271] font-bold">
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
            </div>
          </div>
          <div className="tuongduong">
            <img src="https://cdn-icons-png.flaticon.com/128/5519/5519832.png" alt="" />
          </div>

          <div className="flex items-center mr-4">
            <div className="flex icon-sheach items-center hover:border-blue-500  px-4 py-2 border-[#ffc709] rounded-lg border-[4px] form-banner">
              <img
                src="https://cdn-icons-png.flaticon.com/128/447/447031.png"
                alt=""
                width={"20px"}
              />

              <div className="flex flex-col ml-3">
                <label htmlFor="arrivalDate" className="mr-2 text-[#2d4271] font-medium">
                  Điểm đến :
                </label>
                <select id="destination" className="h-[26px] text-[#2d4271] font-bold">
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
            </div>
          </div>

          <button className="hover:bg-blue-500 bg-[#ffc709] text-white py-3 px-5 rounded ml-2 max-w-[150px] w-full  h-[72px]">
            Search
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

      <div className="lg:m-10 m-0 ">
        <h2 className="lg:m-10 mt-5 mb-5 home-page__title lg:text-[30px] text-lg p-4 lg:p-0 ">
          ƯU ĐÃI TOUR GIỜ CHÓT!
        </h2>
        <div className="product-list grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:m-10 m-0">
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
                <Link to="/:id/tour" className="text-blue-500 hover:underline">
                  <h3 className="text-lg font-bold">{item.ten_tour}</h3>
                </Link>
                <p className="price">Giá: {formatCurrency(15000000)}</p>
                <p
                  style={{
                    color: "#fd5056",
                    fontSize: "18px",
                    fontWeight: "700",
                  }}
                >
                  {formatCurrency(item.gia_tour)}
                </p>
                <p className="text mt-2">{item.mo_ta}</p>

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
      <div className="lg:m-10 m-0">
        <h2 className="lg:m-10 mt-5 mb-5 home-page__title lg:text-[30px] text-lg p-4 lg:p-0 ">
          VÉ TOUR ƯU ĐÃI ĐẶC BIỆT!
        </h2>
        <div className=" ">
          <div className="flex flex-wrap   overflow-x-auto ">
            {sales.map((sale) => (
              <div
                key={sale.id}
                className="lg:w-full md:w-1/2 bg-gray-100 p-4 mt-5 rounded-lg items-center flex lg:flex-row flex-col  lg:mx-4 "
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
                  <div className="flex items-center mb-4">
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
                  <div className="flex items-center ">
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
                <div className="lg:w-1/4 w-full flex flex-col  pl-5 lg:items-end">
                  <p className="price-c mb-2">Giá chỉ từ : </p>
                  <p className=" price-t mb-2 ">{formatCurrency(sale.price)}</p>

                  <p className="mb-2">{sale.code}</p>
                  <div className="flex justify-between items-center mt-4 mb-2">
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
            <div className="lg:w-1/3 text-base w-full md:w-1/2 icon-select flex flex-col items-center gap-2 py-4">
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
            <div className="lg:w-1/3 text-base w-full md:w-1/2 icon-select flex flex-col items-center gap-2 py-4">
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
            <div className="lg:w-1/3 text-base w-full md:w-1/2 icon-select flex flex-col items-center gap-2 py-4">
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
            <div className="lg:w-1/3 text-base w-full md:w-1/2 icon-select flex flex-col items-center gap-2 py-4">
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
            <div className="lg:w-1/3 text-base w-full md:w-1/2 icon-select flex flex-col items-center gap-2 py-4">
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