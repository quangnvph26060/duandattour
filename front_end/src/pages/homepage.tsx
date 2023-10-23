import React from 'react';
import '../page.css'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import logo from '../img/logo.jpg';
import bner from '../img/banner.png';
import bnr from '../img/huy.webp';
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
import he from '../img/bbbbb.webp'
import hq from '../img/aaaaa.webp'


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
const names =[
  {
    id: 1,
      image: bnr,
      
  }, {
    id: 1,
      
      image: hq,
      
  }, {
    id: 1,
      
      image: he,
      
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
      name: 'Đà Nẵng - Huế - Đầm Lập An - La Vang - Động Phong Nha & Thiên Đường - KDL Bà Nà - Cầu Vàng -Sơn Trà - Hội An - Đà Nẵng (Khách sạn 4* trọn tour) ',
      image: sl,
      price: 99.99,
      details: 'Singapore 4 ngày 3 đêm (Một ngày tự do, Tặng vé vườn thực vật Flower Dome và Supertree Observation)- Đã giảm 1.000.000/ khách',
      code:'  Mã tour:vNNSGN192-037-051023QH-V ',
      start:'Nơi khởi hành: TP. Hồ Chí Minh'
    },
    {
      id: 2,
      name: 'Đà Nẵng - Huế - Đầm Lập An - La Vang - Động Phong Nha & Thiên Đường - KDL Bà Nà - Cầu Vàng -Sơn Trà - Hội An - Đà Nẵng (Khách sạn 4* trọn tour) ',
      image: bb,
      price: 149.99,
      details: 'Singapore 4 ngày 3 đêm (Một ngày tự do, Tặng vé vườn thực vật Flower Dome và Supertree Observation)- Đã giảm 1.000.000/ khách    ',
      code:'  Mã tour:vNNSGN192-037-051023QH-V ',
      start:'Nơi khởi hành: Hà Nội'
    },
    {
      id: 3,
      name: 'Trung Quốc: Côn Minh - Đại Lý - Shangrila - Lệ Giang - Thạch Lâm - Côn Minh',
      image: aa,
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
      <div className='flex'>
          <img style={rounded} src={logo} alt="logo" width="70px" />
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
        <img style={{height:'400px'}}
          className="slider-image"
          src={name.image}
          
        />
      </div>
    ))}
  </Slider>
</div>
      <div  className="bg-white rounded-lg shadow p-4 mx-auto" style={{ width: '1100px' }}>
      <div  className="tour-form mt-2 flex items-center">
  <div className="flex items-center mr-4">
    <label htmlFor="arrivalDate" className="mr-2 text-gray-600">Ngày đến:</label>
    <input style={{borderColor:'red '}} type="date" id="arrivalDate" className="border rounded px-2 py-1 focus:outline-none focus:border-blue-500 transition-colors duration-300" />
  </div>

  <div className="flex items-center mr-4">
    <label htmlFor="departureDate" className="mr-2 text-gray-600">Ngày đi:</label>
    <input style={{borderColor:'red '}} type="date" id="departureDate" className="border rounded px-2 py-1 focus:outline-none focus:border-blue-500 transition-colors duration-300" />
  </div>

  <div className="flex items-center mr-4">
    <label htmlFor="destination" className="mr-2 text-gray-600">Nơi đến:</label>
    <input style={{borderColor:'red '}} type="text" id="destination" className="border rounded px-2 py-1 focus:outline-none focus:border-blue-500 transition-colors duration-300" />
  </div>

  <div className="flex items-center mr-4">
    <label htmlFor="departure" className="mr-2 text-gray-600">Nơi đi:</label>
    <input style={{borderColor:'red '}} type="text" id="departure" className="border rounded px-2 py-1 focus:outline-none focus:border-blue-500 transition-colors duration-300" />
  </div>
  <button  className="bg-blue-500 text-white py-1 px-3 rounded ml-2">Search</button>
  </div>
</div>
      
      <div className="content">
        <div className="content">
        <h2 className='mt-5 mb-5 home-page__title '>CHƯƠNG TRÌNH ƯU ĐÃI!!!</h2>
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
        <h2 className='mt-5 mb-5 home-page__title '>CHƯƠNG TRÌNH PolyyTour!!!</h2>
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
      <div className="content">
  <h2 className="mt-5 mb-5 home-page__title">ƯU ĐÃI TPUR GIỜ CHÓT!</h2>
  <div className="product-list grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {products.map((product) => (
      <div key={product.id} className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
        <img
          className="mt-4 rounded-lg w-full h-60 object-cover"
          src={product.image}
          alt={product.name}
        />
        <div className="product-details mt-4">
          <Link to="/:id/tour" className="text-blue-500 hover:underline">
            <h3 className="text-lg font-bold">{product.name}</h3>
          </Link>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
          <p>{product.details}</p>
          <p>{product.code}</p>
          <p>{product.start}</p>
          <button style={{ backgroundColor: 'red', float: 'right', borderRadius: '5px' }} className="py-2 px-2 text-white mt-5">
            Giảm 6%
          </button>
          <button className="mt-4 w-full text-center bg-blue-400 text-white py-2 px-4 rounded">
            Còn 00 ngày 1:50:40
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
{/*  */}
<div className="content">
  <h2 className="mt-5 mb-5 home-page__title">ƯU ĐÃI TOUR GIỜ CHÓT!</h2>
  <div className="product-list overflow-x-auto">
    {sales.map((sale) => (
      <div key={sale.id} className="bg-gray-100 p-4 mt-5 rounded-lg flex items-center mx-4">
        <img
          className="rounded-lg w-60 h-80 object-cover"
          src={sale.image}
          alt={sale.name}
        />
        <div className="ml-4 flex-grow">
          <button style={{ backgroundColor: '#2d4271' }} className="ml-2 text-center text-white py-2 mb-3 px-4 rounded">
            Vé máy bay + Khách sạn
          </button>
          <h3 className="text-lg font-bold">{sale.name}</h3>
          <p className="text-gray-600">${sale.price.toFixed(2)}</p>
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
      <div key={destination.id} className="bg-gray-100 bg-opacity-75 p-4 rounded-lg flex flex-col items-center">
        <img
          style={{ height: '160px' }}
          className="mt-4 rounded-lg w-full h-40 object-cover"
          src={destination.image}
          alt={destination.name}
        />
        <div className="product-details mt-4">
          <h3 style={{ color: '#2d4271' }} className="text-lg font-bold">{destination.name}</h3>
          <p>{destination.details}</p>
        </div>
      </div>
    ))}
  </div>
</div>
      <footer className="mt-15  text-center bg-gray-100">
  <div className="flex flex-wrap justify-center">
    <div className="w-full md:w-1/2 lg:w-1/5">
      <h3 style={{color:'#2d4271'}} className="mt-5 text-lg font-semibold mb-4 ">Điểm đến</h3>
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
      <h3 style={{color:'#2d4271'}} className="mt-5 text-lg font-semibold mb-4">Liên hệ</h3>
      <p>Email: example@gmail.com</p>
      <p>Tìm kiếm thông tin</p>
    </div>
    <div  className="w-full md:w-1/2 lg:w-1/5">
      <h3 style={{color:'#2d4271'}} className="mt-5 text-lg font-semibold mb-4">Hỗ trợ</h3>
      <p>Mạng xã hội</p>
      <p>1900 1839</p>
      <p>Từ 8:00 - 22:00 hàng ngày</p>
    </div>
    <div className="w-full md:w-1/2 lg:w-1/5">
      <h3 style={{color:'#2d4271'}} className="mt-5 text-lg font-semibold mb-4">Thông tin</h3>
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
      <h3 style={{color:'#2d4271'}} className="mt-5 text-lg font-semibold mb-4">Dòng tour</h3>
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
      <h3 style={{color:'#2d4271'}} className="text-lg font-semibold mb-4">Liên kết</h3>
      <ul className="list-disc pl-4">
        <li><a href="/">Trang chủ</a></li>
        <li><a href="/about">Giới thiệu</a></li>
        <li><a href="/services">Dịch vụ</a></li>
        <li><a href="/contact">Liên hệ</a></li>
      </ul>
    </div>
    <div className="w-full md:w-1/2 lg:w-1/3">
      <h3 style={{color:'#2d4271'}} className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h3>
      <ul className="flex justify-center mb-4">
        <li className="mr-4"><a href="#"><i className="fab fa-facebook-f"></i></a></li>
        <li className="mr-4"><a href="#"><i className="fab fa-twitter"></i></a></li>
        <li className="mr-4"><a href="#"><i className="fab fa-instagram"></i></a></li>
        <li className="mr-4"><a href="#"><i className="fab fa-youtube"></i></a></li>
      </ul>
      <p  className="text-sm">Theo dõi chúng tôi để cập nhật thông tin mới nhất về du lịch.</p>
    </div>
    <div className="w-fullmd:w-1/2 lg:w-1/3">
      <h3 style={{color:'#2d4271'}} className="text-lg font-semibold mb-4">Đăng ký nhận tin</h3>
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
  );
};

export default HomePage;