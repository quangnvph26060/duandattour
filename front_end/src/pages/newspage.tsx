import logo from "../img/logo.jpg"
import anh16 from "../img/anh16.png"
import anh5 from "../img/anh5.png"
import anh18 from "../img/anh18.png"
import anh6 from "../img/anh6.png"
import anh20 from "../img/anh20.jpg"
import anh21 from "../img/anh21.jpg"
import anh22 from "../img/anh22.jpg"
import anh10 from "../img/ảnh 10.jpg"
import anh23 from "../img/anh23.png"
import anh24 from "../img/anh24.png"
import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Ipostdm } from "../interface/postdm";
import { Ipost } from "../interface/post"
import { useGetpostdmQuery, useRemovepostdmMutation } from "../api/postdm";
import { useGetpostQuery, useRemovepostMutation } from "../api/post";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../style.css";
import "../page.css";
const rounded = {
  borderRadius: '25px',
};

const News = () => {
  const { data: tourdata } = useGetpostQuery();
  const [removePost, { isSuccess: isRemoveSuccess }] = useRemovepostMutation();
  const navigate = useNavigate();
  const maxToursToShow = 4;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imagesData.length) % imagesData.length);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
  };

  const tourArray = tourdata?.data || [];
  const dataSource = tourArray.map(({ id,
    ten_post,
    image,
    mo_ta,
    ngay_dang, }: Ipost) => ({
      key: id,
      ten_post,
      image,
      mo_ta,
      ngay_dang,
    }));
  return (
    <div>


      <div>
        <article className=' container mx-auto px-20 gap-11 pt-5'>
          <h1 className='text-center text-red-500 font-semibold text-3xl py-3'>Tin tức PolyTour</h1>
          <div className='flex gap-72 py-2 container justify-center'>
            <p className='font-medium'>Tin tức du lịch</p>
            <p className='font-medium'>Cẩm nang du lịch</p>
            <p className='font-medium'>Kinh nghiệm du lịch</p>
          </div>


          <div className='flex gap-5'>
            <div className='w-3/5'>
              <h1 className='text-xl font-medium py-3 '>TIN TỨC DU LỊCH</h1>

              {dataSource.length > 0 && (
                <>
                  <Slider
                    className="main-image-slider"
                    dots={true}
                    infinite={true}
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    arrows={false}
                    autoplay={true}
                    autoplaySpeed={3000}
afterChange={(index) => setCurrentImageIndex(index)}
                  >
                    {dataSource.map((image) => (
                      <div key={image.id}>
                        <Link to={`/post/${image.key}`} className='w-auto rounded-xl'>
                          <img
                            src={`http://localhost:8000/storage/${image.image}`}
                            className='w-[1100px] h-[550px] rounded-xl'
                            alt={image.alt}
                          />
                        </Link>
                        <div className="aslut">
                          <Link to={`/post/${image.key}`}>
                            <p className='font-medium py-4 text-lg postname lddssss'>
                              {image.ten_post.split(' ').slice(0, 10).join(' ')}{image.ten_post.split(' ').length > 10 ? ' ...' : ''}
                            </p>
                          </Link>
                          <p className='font-mediums'>{image.ngay_dang}</p>
                        </div>
                      </div>
                    ))}
                  </Slider>

                  <Slider
                    className="additional-images-slider grid gap-4 grid-cols-1"
                    dots={true}
                    infinite={true}
                    speed={500}
                    slidesToShow={3}
                    slidesToScroll={2}
                    arrows={false}
                    autoplay={true}
                    autoplaySpeed={3000}
                    initialSlide={currentImageIndex} // Set the initial slide to the current main image index
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
                    {dataSource.map((image) => (
                      <div
                        key={image.id}
                        className="bg-gray-100 p-4 rounded-lg flex flex-col tours-center postnew"
                      >
                        <img
                          className="mt-4 rounded-lg w-full h-20 object-cover"
                          src={`http://localhost:8000/storage/${image.image}`}
                        />
                        <Link to={`/post/${image.key}`}>
                          <p className='font-medium py-4 text-lg postname'>
                            {image.ten_post.split(' ').slice(0, 10).join(' ')}{image.ten_post.split(' ').length > 10 ? ' ...' : ''}
                          </p>
                        </Link>
<p className='font-mediums'>{image.ngay_dang}</p>
                      </div>
                    ))}
                  </Slider>
                </>
              )}
            </div>



            <div className='w-2/5'>
              <h1 className='text-xl font-medium py-3 '>CẨM NANG DU LỊCH</h1>
              {dataSource.slice(1, maxToursToShow + 1).map(item => (
                <div className='flex gap-3 pb-3' key={item.key}>
                  <Link to={`/post/${item.key}`} className='image_bv'>
                    <img src={`http://localhost:8000/storage/${item.image}`} alt={`Image ${item.key}`} className='w-[250px] h-[175px] rounded-lg' />
                  </Link>
                  <div style={{ width: '160%', textAlign: 'left' }}>
                    {/* Find the corresponding category based on id_postdm */}
                    {/* {postdmArrary
                      .filter(option => option.id_postdm === item.id_postdm)
                      .map(filteredOption => (
                        <p key={filteredOption.id_postdm} className='text-red-500 font-medium text-lg'>
                          {filteredOption.ten_dm}
                        </p>
                      ))} */}
                    <Link to={`/post/${item.key}`}>
                      <p className='font-medium py-4 text-lg namepost'>{item.ten_post}</p>
                    </Link>
                    <p className='font-mediums'>{item.ngay_dang}</p>
                  </div>
                </div>
              ))}

            </div>

          </div>
          <div className='container'>
            <div className='container flex mb-3 px-5 justify-between align-items-center'>
              <h2 className='py-4 text-xl font-semibold'>Cẩm nang du lịch</h2>
              <a href="" className='fw-bold py-4 font-medium'>Xem tất cả</a>
            </div>
            <div className='grid grid-cols-3 gap-14'>
              <img src={anh20} alt="anh20" className='rounded-xl w-auto' />
              <img src={anh21} alt="anh21" className='rounded-xl w-auto' />
              <img src={anh22} alt="anh22" className='rounded-xl w-auto' />
            </div>
          </div>
          <div>
            <div className='container flex mb-3 px-5 py-3 justify-between align-items-center'>
              <h2 className='py-4 text-xl font-semibold'>Cẩm nang du lịch</h2>
              <a href="" className='fw-bold py-4 font-medium'>Xem tất cả</a>
            </div>
            <div className='grid grid-cols-3 gap-14'>
              <div>
                <img src={anh10} alt="anh10" className='rounded-xl w-auto' />
                <p className='text-red-500 py-3 px-1 font-medium'>Kinh nghiệm du lịch</p>
              </div>
              <div>
                <img src={anh23} alt="anh23" className='rounded-xl w-auto' />
                <p className='text-red-500 py-3 px-1 font-medium'>Kinh nghiệm du lịch</p>
              </div>
              <div>
<img src={anh24} alt="anh24" className='rounded-xl w-auto' />
                <p className='text-red-500 py-3 px-1 font-medium'>Kinh nghiệm du lịch</p>
              </div>
            </div>
          </div>
        </article>
      </div>


    </div>
  )
}

export default News
