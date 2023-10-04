import React from 'react';
import '../page.css'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import logo from '../img/logo.jpg';
import bner from '../img/banner.png';
import bnr from '../img/bnnn.png';
import bh from '../img/bh.webp';
import hh from '../img/hh.webp';
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


const rounded = {
  borderRadius: '25px',
};
const HomePage = () => {
  const sales=[{
    
      id: 1,
      name: 'Vũng Tàu',
      image: sl,
      price: 99.99,
      details: 'Singapore 4 ngày 3 đêm (Một ngày tự do, Tặng vé vườn thực vật Flower Dome và Supertree Observation)- Đã giảm 1.000.000/ khách',
      code:'  Mã tour:vNNSGN192-037-051023QH-V ',
      start:'Nơi khởi hành: TP. Hồ Chí Minh'
    
  },
  {
    
    id: 2,
    name: 'Vịnh Hạ long',
    image: cc,
    price: 99.99,
    details: 'Singapore 4 ngày 3 đêm (Một ngày tự do, Tặng vé vườn thực vật Flower Dome và Supertree Observation)- Đã giảm 1.000.000/ khách',
    code:'  Mã tour:vNNSGN192-037-051023QH-V ',
    start:'Nơi khởi hành: TP. Hồ Chí Minh'
  
}
,
  {
    
    id: 3,
    name: 'Nha Trang',
    image: bh,
    price: 99.99,
    details: 'Singapore 4 ngày 3 đêm (Một ngày tự do, Tặng vé vườn thực vật Flower Dome và Supertree Observation)- Đã giảm 1.000.000/ khách',
    code:'  Mã tour:vNNSGN192-037-051023QH-V ',
    start:'Nơi khởi hành: TP. Hồ Chí Minh'
  
}
]
  const images =[
    {
      id: 1,
      name: 'Product 1',
      imagePath: qq,
    },
    {
      id: 2,
      name: 'Product 1',
      imagePath: ww,
    },   {
      id: 3,
      name: 'Product 1',
      imagePath: ee,
    },   {
      id: 4,
      name: 'Product 1',
      imagePath: rr,
    },   {
      id: 5,
      name: 'Product 1',
      imagePath: tt,}
      ,
{
      id: 6,
      name: 'Product 1',
      imagePath: yy,
    },   {
      id: 7,
      name: 'Product 1',
      imagePath:ee,
    },

  ]
  const destinations=[
    
      {
        id: 1,
        name: 'Vịnh Hạ Long',
        image: sl,
        details: 'Đã có hơn 1.493.499 yêu thích',
       
      },
      {
        id: 2,
        name: 'Đảo Cát Bà',
        image: bb,
    
        details: 'Đã có hơn 1.493.499 yêu thích',
   
      },
      {
        id: 1,
        name: 'Vịnh Hạ Long',
        image: sl,
        details: 'Đã có hơn 1.493.499 yêu thích',
       
      },
      {
        id: 2,
        name: 'Đảo Cát Bà',
        image: bb,
    
        details: 'Đã có hơn 1.493.499 yêu thích',
   
      },
      {
        id: 1,
        name: 'Vịnh Hạ Long',
        image: sl,
        details: 'Đã có hơn 1.493.499 yêu thích',
       
      },
      {
        id: 2,
        name: 'Đảo Cát Bà',
        image: bb,
    
        details: 'Đã có hơn 1.493.499 yêu thích',
   
      },
      {
        id: 1,
        name: 'Vịnh Hạ Long',
        image: sl,
        details: 'Đã có hơn 1.493.499 yêu thích',
       
      },
      {
        id: 2,
        name: 'Đảo Cát Bà',
        image: bb,
    
        details: 'Đã có hơn 1.493.499 yêu thích',
   
      },
    
  ]
  const products = [
    {
      id: 1,
      name: 'Vịnh Hạ Long',
      image: sl,
      price: 99.99,
      details: 'Singapore 4 ngày 3 đêm (Một ngày tự do, Tặng vé vườn thực vật Flower Dome và Supertree Observation)- Đã giảm 1.000.000/ khách',
      code:'  Mã tour:vNNSGN192-037-051023QH-V ',
      start:'Nơi khởi hành: TP. Hồ Chí Minh'
    },
    {
      id: 2,
      name: 'Đảo Cát Bà',
      image: bb,
      price: 149.99,
      details: 'Singapore 4 ngày 3 đêm (Một ngày tự do, Tặng vé vườn thực vật Flower Dome và Supertree Observation)- Đã giảm 1.000.000/ khách     Mã tour:vNNSGN192-037-051023QH-V Nơi khởi hành: TP. Hồ Chí Minh',
      code:'  Mã tour:vNNSGN192-037-051023QH-V ',
      start:'Nơi khởi hành: TP. Hồ Chí Minh'
    },
    {
      id: 3,
      name: 'Quảng Bình',
      image: aa,
      price: 199.99,
      details: 'Singapore 4 ngày 3 đêm (Một ngày tự do, Tặng vé vườn thực vật Flower Dome và Supertree Observation)- Đã giảm 1.000.000/ khách',
      code:'  Mã tour:vNNSGN192-037-051023QH-V ',
      start:'Nơi khởi hành: TP. Hồ Chí Minh'
    },
    {
      id: 4,
      name: 'Sóc Sơn',
      image: bh,
      price: 199.99,
      details: 'Singapore 4 ngày 3 đêm (Một ngày tự do, Tặng vé vườn thực vật Flower Dome và Supertree Observation)- Đã giảm 1.000.000/ khách',
      code:'  Mã tour:vNNSGN192-037-051023QH-V ',
      start:'Nơi khởi hành: TP. Hồ Chí Minh'
    },{
      id: 5,
      name: 'Nha Trang ',
      image: cc,
      price: 199.99,
      details: 'Singapore 4 ngày 3 đêm (Một ngày tự do, Tặng vé vườn thực vật Flower Dome và Supertree Observation)- Đã giảm 1.000.000/ khách',
      code:'  Mã tour:vNNSGN192-037-051023QH-V ',
      start:'Nơi khởi hành: TP. Hồ Chí Minh'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="banner">
        <h1 className="text-2xl text-center font-bold mb-4">Welcome to PolyTour</h1>
      </div>

      <div className="menu flex items-center justify-between">
        <div className="logo">
          <img style={rounded} src={logo} alt="Logo" className=" w-18 h-12 " />
        </div>
        <ul className="flex">
          <li className="mr-4">
            <a href="/">Du lịch</a>
          </li>
          <li className="mr-4">
            <a href="/about">Vận Chuyển</a>
          </li>
          <li className="mr-4">
            <a href="/contact">Vietravel MICE</a>
          </li>
          <li className="mr-4">
            <a href="/about">VietravelPlus </a>
          </li>
          <li className="mr-4">
            <a href="/contact">Tin tức</a>
          </li>
          <li className="mr-4">
            <a href="/contact">Liên hệ</a>
          </li>
        </ul>
        <div className="search flex items-center">
  <input type="text" placeholder="Search..." className="border border-gray-400 px-2 py-1 rounded" />
  <button className="bg-blue-500 text-white py-1 px-3 rounded ml-2">Search</button>

  
<div className="ml-2">
  <Link to="/signup">
    <button className="bg-green-500 text-white py-1 px-3 rounded">
      <i className="fas fa-user"></i>
    </button>
  </Link>
</div>

</div>
      </div>

      <div className='mt-5 mb-5'>
        <img src={bnr} alt="" />
      </div>
      <div className="bg-white rounded-lg shadow p-4 mx-auto" style={{ width: '1100px' }}>
      <div className="tour-form mt-2 flex items-center">
  <div className="flex items-center mr-4">
    <label htmlFor="arrivalDate" className="mr-2 text-gray-600">Ngày đến:</label>
    <input type="date" id="arrivalDate" className="border rounded px-2 py-1 focus:outline-none focus:border-blue-500 transition-colors duration-300" />
  </div>

  <div className="flex items-center mr-4">
    <label htmlFor="departureDate" className="mr-2 text-gray-600">Ngày đi:</label>
    <input type="date" id="departureDate" className="border rounded px-2 py-1 focus:outline-none focus:border-blue-500 transition-colors duration-300" />
  </div>

  <div className="flex items-center mr-4">
    <label htmlFor="destination" className="mr-2 text-gray-600">Nơi đến:</label>
    <input type="text" id="destination" className="border rounded px-2 py-1 focus:outline-none focus:border-blue-500 transition-colors duration-300" />
  </div>

  <div className="flex items-center mr-4">
    <label htmlFor="departure" className="mr-2 text-gray-600">Nơi đi:</label>
    <input type="text" id="departure" className="border rounded px-2 py-1 focus:outline-none focus:border-blue-500 transition-colors duration-300" />
  </div>
  <button className="bg-blue-500 text-white py-1 px-3 rounded ml-2">Search</button>
  </div>
</div>
      <h2 className='mt-5 mb-5 '>CHƯƠNG TRÌNH ƯU ĐÃI!</h2>
      <div className="content">
        <div className="content">
          <Slider
            className="product-list1 grid gap-4 grid-cols-1  "
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={3}
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
            {products.map((product) => (
              <div key={product.id} className="bg-gray-100 p-4 rounded-lg flex flex-col items-center ">
                <img
                  className="mt-4 rounded-lg w-full h-40 object-cover"
                  src={product.image}

                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/*  */}
      <div className="content">
        <div className="content">
          <Slider
            className="product-lista grid gap-4 grid-cols-1  "
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={6}
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
           {images.map((image) => (
              <div key={image.id} className="bg-gray-100 p-4 rounded-lg flex flex-col items-center ">
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
      <h2 className='mt-5 mb-5 '>ƯU ĐÃI TPUR GIỜ CHÓT!</h2>
      <div className="content">
        <div className="product-list grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">

              <img
                className="mt-4 rounded-lg w-full h-40 object-cover"
                src={product.image}
                alt={product.name}
              />
              <div className="product-details mt-4">
          <Link to="/:id/tour"> <h3 className="text-lg font-bold">{product.name}</h3></Link>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                <p>{product.details}</p>
                <p>{product.code}</p>
                <button className="mt-4 text-center bg-blue-500 text-white py-2 px-4 rounded ">
                còn 00 ngày 1:50:40
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
{/*  */}
<h2 className='mt-5 mb-5 '>ƯU ĐÃI TPUR GIỜ CHÓT!</h2>
<div className="content">
  <div className="product-list overflow-x-auto">
    {sales.map((sale) => (
      <div key={sale.id} className="bg-gray-100 p-4 mt-5 rounded-lg flex items-center mx-4">
        <img
          className="rounded-lg w-40 h-40 object-cover"
          src={sale.image}
          alt={sale.name}
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold">{sale.name}</h3>
          <p className="text-gray-600">${sale.price.toFixed(2)}</p>
          <p>{sale.details}</p>
          <p>{sale.code}</p>
          <button className="mt-4 text-center bg-red-500 text-white py-2 px-4 rounded">
            Xem Thêm Về Thông Tin Vé
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

{/*  */}
<h2 className='mt-5 mb-5 '>ĐIỂM ĐẾN CHO CẶP ĐÔI!</h2>
      <div className="content">
        <div className="product-list grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 ">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-#918d8d-100 p-4 rounded-lg flex flex-col items-center">

              <img
                className="mt-4 rounded-lg w-full h-40 object-cover"
                src={destination.image}
                
              />
              <div className="product-details mt-4">
                <h3 className="text-lg font-bold">{destination.name}</h3>
                
                <p>{destination.details}</p>
          
              </div>
            </div>
          ))}
        </div>
      </div>
<footer className="mt-8 text-center text-gray-500">
    &copy; {new Date().getFullYear()} Your Website. All rights reserved.
  </footer>
    </div>
  );
};

export default HomePage;