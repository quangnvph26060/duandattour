import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaBeer,
  FaFlag,
  FaCarSide,
  FaLongArrowAltDown,
  FaRegHeart,
  FaStar,
} from "react-icons/fa";
import logo from "./img/logo.jpg";
import {
  useGetTourByIdQuery,
  useGetdetailTourByIdQuery,
} from "../../api/TourApi";
import "../css.css";

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

  const datatourArray = Tourdata?.data || [];
  console.log(datatourArray.images);
  const locationString = datatourArray?.ten_tour || "";
  const locations = locationString.split(" - ");
  const formattedString = locations.join(", ");
  const images = datatourArray?.images || [];
  console.log(images);

  return (
    <div className=" mb-[1900px]">
      <div className=" mx-auto box-border">
        <div className="Menu  h-10 "></div>
        {/* Header trên ội dung dưới*/}
        <div className="Detail  bg-repeat-x h-[1500px]">
          <div className=" ">
            <div className="bg-[#f9f9f9] pb-8">
              <div className="mx-auto container-detail box-border mb-8">
                <div className="Title flex  justify-between py-10">
                  <div className="title">
                    <p className="text-[26px] text-[#2D4271] font-bold">
                      {datatourArray?.ten_tour}
                    </p>
                  </div>

                  <div className="price buy mr-40 flex gap-5 ">
                    <p className="text-[26px] text-red-500 font-bold">
                      {datatourArray?.gia_nguoilon}
                    </p>
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
                      <Link to={`/booktour/${idTour}`}>Đặt ngay</Link>
                    </button>
                  </div>
                </div>
                <div className="rate  mb-5 mt-[-25px] flex gap-2">
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
                <div className="Image  gap-5 flex">
                  {datatourArray.images && datatourArray.images.length > 0 ? (
                    <div>
                      {datatourArray.images.map((image) => (
                        <img
                          key={image.id}
                          src={`http://localhost:8000/storage/${image.image_path}`}
                        />
                      ))}
                    </div>
                  ) : (
                    <p>Không có hình ảnh cho tour này.</p>
                  )}
                  {/* {images && images.length > 0 ? (
            <div>
              {" "}
              <div className="flex gap-5">
                {" "}
                <img
                  style={radius1}
                  src={`http://localhost:8000/storage/${images[1].image_path}`}
                  alt=""
                />
                <img
                  style={radius1}
                  src={`http://localhost:8000/storage/${images[2].image_path}`}
                  alt=""
                />{" "}
              </div>
              <div className="mt-5">
                <img
                  src={`http://localhost:8000/storage/${images[3].image_path}`}
                  style={radius2}
                />
              </div>
            </div>
             ) : (
              <p>Không có hình ảnh cho tour này.</p>
            )}   */}
                </div>
                <div className="Description justify-between flex gap-20   mt-5 py-4">
                  <div className="Desc w-1/3 text-[#2D4271] text-[15px]">
                    <p className="max-w-[500px]">{datatourArray?.mo_ta}</p>
                    <div className="h-[230px] w-[2/3] border rounded-md mt-3 bg-white py-5 px-5">
                      <p className="mt-1 text-[#2D4271] text-[18px] font-medium">
                        Khởi hành {datatourArray?.lich_khoi_hanh}
                      </p>
                      <p className="mt-1 text-[#2D4271] text-[18px] font-medium">
                        Tập trung 05:30 ngày 04/10/2023
                      </p>
                      <p className="mt-1 text-[#2D4271] text-[18px] font-medium">
                        Thời gian
                        {datatourArray?.lich_khoi_hanh && (
                          <>
                            <div>
                              {moment(datatourArray.ngay_ket_thuc).diff(
                                datatourArray.lich_khoi_hanh,
                                "days"
                              )}{" "}
                              ngày
                            </div>
                          </>
                        )}
                      </p>
                      <p className="mt-1 text-[#2D4271] text-[18px] font-medium">
                        Nơi khởi hành {datatourArray?.diem_khoi_hanh}
                      </p>
                      <p className="mt-1   text-[#2D4271] text-[18px] font-medium">
                        Số lượng {datatourArray?.soluong}
                      </p>
                    </div>
                  </div>
                  <div className="grid w-2/3 grid-cols-4 gap-5  border-b-[2px] border-b-black pr-4">
                    <div className="">
                      <h2 className="text-blue-600">
                        <FaFlag />
                      </h2>
                      <p className="font-bold text-[#2d4271] text-base mt-1">
                        Thời gian
                      </p>
                      <p className="text-sm font-normal text-left mt-1">
                        3 ngày 2 đêm
                      </p>
                    </div>
                    <div className="">
                      <h2 className="text-blue-600">
                        <FaFlag />
                      </h2>
                      <p className="whitespace-nowrap font-bold text-[#2d4271] text-base mt-1">
                        Phương tiện di chuyển
                      </p>
                      <p>
                        {datatourArray &&
                          datatourArray.phuong_tien &&
                          datatourArray.phuong_tien.map((item, index) => (
                            <div
                              key={index}
                              className="text-sm font-normal text-left mt-1"
                            >
                              {item.loai_phuong_tien}
                            </div>
                          ))}
                      </p>
                    </div>
                    <div className="">
                      <h2 className="text-blue-600">
                        <FaFlag />
                      </h2>
                      <p className="font-bold text-[#2d4271] text-base mt-1">
                        Điểm tham quan
                      </p>
                      <p className="text-sm font-normal text-left mt-1">
                        {formattedString}
                      </p>
                    </div>
                    <div className="">
                      <h2 className="text-blue-600">
                        <FaFlag />
                      </h2>
                      <p className="font-bold text-[#2d4271] text-base mt-1">
                        Ẩm thực{" "}
                      </p>
                      <p className="text-sm font-normal text-left mt-1">
                        Buffet sáng, Theo thực đơn
                      </p>
                    </div>
                    <div className="">
                      <h2 className="text-blue-600">
                        <FaFlag />
                      </h2>
                      <p className="font-bold text-[#2d4271] text-base mt-1">
                        Khách sạn
                      </p>
                      <p>
                        {datatourArray &&
                          datatourArray.khach_san &&
                          datatourArray.khach_san.map((item, index) => (
                            <div
                              key={index}
                              className="text-sm font-normal text-left mt-1"
                            >
                              Khách Sạn {item.loai_khach_san}
                              <br />
                            </div>
                          ))}
                      </p>
                    </div>
                    <div className="">
                      <h2 className="text-blue-600">
                        <FaFlag />
                      </h2>
                      <p className="font-bold text-[#2d4271] text-base mt-1">
                        Thời gian lý tưởng
                      </p>
                      <p className="text-sm font-normal text-left mt-1">
                        Quanh năm{" "}
                      </p>
                    </div>
                    <div className="">
                      <h2 className="text-blue-600">
                        <FaFlag />
                      </h2>
                      <p className="font-bold text-[#2d4271] text-base mt-1">
                        Đối tượng thích hợp
                      </p>
                      <p className="text-sm font-normal text-left mt-1">
                        Người lớn tuổi, Cặp đôi, Gia đình nhiều thế hệ, Thanh
                        niên
                      </p>
                    </div>
                    <div className="">
                      <h2 className="text-blue-600">
                        <FaFlag />
                      </h2>
                      <p className="font-bold text-[#2d4271] text-base mt-1">
                        Ưu đãi
                      </p>
                      <p className="text-sm font-normal text-left mt-1">
                        Ưu đãi trực tiếp vào giá tour
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white container-detail mx-auto box-border">
              <div className="text-center font-bold text-[#2D4271] text-[25px] py-5">
                <h2>Lịch trình</h2>
              </div>
              <div className=" flex gap-2  lichtring max-h-[2000px] border bg-white rounded-[6px] border-gray-300 ">
                <div className="w-1/3 bg-[#f9f9f9]">
                  <h2 className="mb-4 font-bold text-[#2D4271] text-[16px] py-5 p-8 pt-12">
                    {datatourArray && datatourArray.lich_t_rinh ? (
                      datatourArray.lich_t_rinh.map((tieude) => (
                        <p className="mb-20" key={tieude.id}>
                          {tieude.tieu_de}
                        </p>
                      ))
                    ) : (
                      <p>Không có lịch trình.</p>
                    )}
                  </h2>
                </div>
                <div className="w-2/3">
                  <div className="max-w-full">
                    <ul className="mb-4 font-medium text-[#2D4271] text-[16px] py-5 p-8 pt-12 text-left list-disc">
                      {datatourArray && datatourArray.lich_t_rinh ? (
                        datatourArray.lich_t_rinh.map((tieude) => (
                          <li key={tieude.id}>{tieude.noi_dung}</li>
                        ))
                      ) : (
                        <p>Không có lịch trình.</p>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className=" chitiet mx-auto container-detail box-border mt-10">
                <div className="flex-row gap-[48px] flex justify-between">
                  <div className=" w-1/2">
                    <h2 className="mb-4 font-bold text-[#2D4271] text-[25px] py-5">
                      Chi tiết tour
                    </h2>
                    <div className="h-[350px] bg-slate-100  rounded-[6px] p-4">
                      <p className="font-semibold text-[#2D4271] text-[20px] pt-8 px-4">
                        {" "}
                        Thông tin hãng Xe
                      </p>
                      <div className="flex flex-row gap-4">
                        {" "}
                        <p className="text-red-500 px-4 mt-4 text-base ">
                          <span className="text-base font-semibold text-[#2D4271]">
                            Ngày đi :{" "}
                          </span>{" "}
                          {datatourArray?.lich_khoi_hanh}{" "}
                        </p>{" "}
                        <p className="mt-4">|</p>{" "}
                        <p className="text-red-500 px-4 mt-4 text-base  ">
                          {" "}
                          <span className="text-base font-semibold text-[#2D4271]">
                            Ngày về :{" "}
                          </span>{" "}
                          {datatourArray?.ngay_ket_thuc}{" "}
                        </p>
                      </div>
                      <div className="flex  items-center">
                        <div className="text-blue-700 px-4 mt-4 flex gap-2 ">
                          Điểm đi :<h2 className="mt-1"></h2>{" "}
                          {datatourArray?.diem_khoi_hanh}{" "}
                        </div>
                        <div className="mt-4">
                          <FaCarSide />
                        </div>
                        <div className="text-blue-700 px-4 mt-4 flex gap-2 ">
                          Điểm đến :<h2 className="mt-1"></h2>{" "}
                          {datatourArray?.diem_khoi_hanh}{" "}
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
                  <div className="  w-1/2">
                    <h2 className="mb-4  font-bold text-[#2D4271] text-[25px] py-5">
                      Giá tour & phụ thu phòng đơn
                    </h2>
                    <div className="h-[350px] bg-slate-100  rounded-md p-4">
                      <div className="flex justify-between gap-2">
                        <p className="font-semibold text-[#2D4271] text-[20px] pt-8 px-4">
                          {" "}
                          Loại khách
                        </p>{" "}
                        <p className="font-semibold text-[#2D4271] text-[20px] pt-8 px-4">
                          {" "}
                          Giá tour
                        </p>
                        {/* <p className="font-semibold text-[#2D4271] text-[20px] pt-8 px-4">
                        {" "}
                        Land tour
                      </p> */}
                      </div>
                      <div className="flex justify-between">
                        {" "}
                        <p className="text-[#2D4271] px-4 mt-4 ">
                          Người lớn (Từ 12 tuổi trở lên){" "}
                        </p>{" "}
                        <p className="mt-4 px-4">
                          {datatourArray?.gia_nguoilon}đ
                        </p>{" "}
                        {/* <p className="text-[#2D4271] px-4 mt-4 mr-[150px] ">
                        {" "}
                        499,000 đ
                      </p> */}
                      </div>
                      <div className="flex justify-between">
                        {" "}
                        <p className="text-[#2D4271] px-4 mt-4 ">
                          Trẻ em{" "}
                        </p>{" "}
                        <p className="mt-4 text-red-500 ml-10 px-4">
                          {datatourArray?.gia_treem}đ{" "}
                        </p>{" "}
                        {/* <p className=" px-4 mt-4 mr-[150px] ml-5 text-red-500">
                        {" "}
                        299,000 đ
                      </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[300px] container-detail mx-auto bg-white">
              <p className="title font-bold text-[#2D4271] text-[25px] text-center py-5 px-5 my-4">
                Những thông tin cần lưu ý
              </p>
              <div className="">
                <div className="flex gap-12">
                  <div className="flex flex-col w-1/2">
                    {" "}
                    <button className="bg-gray-300  justify-between hover:bg-gray-400 text-[#2D4271] text-center font-bold py-2 px-4 rounded inline-flex items-center">
                      <span>Giá tour bao gồm</span>
                      <h2>
                        <FaLongArrowAltDown />
                      </h2>
                    </button>
                    <button className="mt-5 bg-gray-300  justify-between hover:bg-gray-400 text-[#2D4271] text-center font-bold py-2 px-4 rounded inline-flex items-center">
                      <span>Giá tour bao gồm</span>
                      <h2>
                        <FaLongArrowAltDown />
                      </h2>
                    </button>
                    <button className="bg-gray-300 mt-5  justify-between hover:bg-gray-400 text-[#2D4271] text-center font-bold py-2 px-4 rounded inline-flex items-center">
                      <span>Giá tour bao gồm</span>
                      <h2>
                        <FaLongArrowAltDown />
                      </h2>
                    </button>
                  </div>
                  <div className="w-1/2 flex flex-col">
                    {" "}
                    <button className=" bg-gray-300 justify-between hover:bg-gray-400 text-[#2D4271] text-center font-bold py-2 px-4 rounded inline-flex items-center">
                      <span>Giá tour bao gồm</span>
                      <h2>
                        <FaLongArrowAltDown />
                      </h2>
                    </button>
                    <button className="bg-gray-300 mt-5  justify-between hover:bg-gray-400 text-[#2D4271] text-center font-bold py-2 px-4 rounded inline-flex items-center">
                      <span>Giá tour bao gồm</span>
                      <h2>
                        <FaLongArrowAltDown />
                      </h2>
                    </button>
                    <button className="bg-gray-300  mt-5 justify-between hover:bg-gray-400 text-[#2D4271] text-center font-bold py-2 px-4 rounded inline-flex items-center">
                      <span>Giá tour bao gồm</span>
                      <h2>
                        <FaLongArrowAltDown />
                      </h2>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="Cate bg-[#f9f9f9] pt-8">
              <p className=" font-bold text-[#2D4271] text-[25px] text-center ">
                Có thể quý khách sẽ thích
              </p>
              <div className="container-detail grid grid-cols-4 py-5 mx-auto">
                <div className="bg-[#ffffff] rounded-lg px-2 item h-[500px] w-[310px] pt-2   ">
                  <div className="img img-container ">
                    <img
                      className="image hover-img"
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
                  <div className=" ml-[5px] py-3 text-[#2D4271] ">
                    <div className="border px-3 py-1 w-2/3 text-sm bg-blue-500 text-white rounded-md mb-2">
                      {" "}
                      26/10/2023 - Giờ đi: 05:00
                    </div>
                    <p className="font-semibold text-base hover:text-blue-500 mb-1">
                      Phan Thiết - Mũi Né - Hòn Rơm - Đồi Cát Bay{" "}
                    </p>
                    <p>Nơi khởi hành TP. Hồ Chí Minh</p>
                    <p className="mt-4 text-red-500 text-lg font-semibold">
                      499,000 ₫
                    </p>
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        className="text-white  bg-red-500 hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                     <div className="border px-5 py-2.5 rounded-lg bg-white">
                      <a href="">Xem chi tiết</a>
                     </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#ffffff] rounded-lg px-2 item h-[500px] w-[310px] pt-2   ">
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
                  <div className=" ml-[5px] py-3 text-[#2D4271] ">
                    <div className="border px-3 py-1 w-2/3 text-sm bg-blue-500 text-white rounded-md mb-2">
                      {" "}
                      26/10/2023 - Giờ đi: 05:00
                    </div>
                    <p className="font-semibold text-base hover:text-blue-500 mb-1">
                      Phan Thiết - Mũi Né - Hòn Rơm - Đồi Cát Bay{" "}
                    </p>
                    <p>Nơi khởi hành TP. Hồ Chí Minh</p>
                    <p className="mt-4 text-red-500 text-lg font-semibold">
                      499,000 ₫
                    </p>
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        className="text-white  bg-red-500 hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                     <div className="border px-5 py-2.5 rounded-lg bg-white">
                      <a href="">Xem chi tiết</a>
                     </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#ffffff] rounded-lg px-2 item h-[500px] w-[310px] pt-2   ">
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
                  <div className=" ml-[5px] py-3 text-[#2D4271] ">
                    <div className="border px-3 py-1 w-2/3 text-sm bg-blue-500 text-white rounded-md mb-2">
                      {" "}
                      26/10/2023 - Giờ đi: 05:00
                    </div>
                    <p className="font-semibold text-base hover:text-blue-500 mb-1">
                      Phan Thiết - Mũi Né - Hòn Rơm - Đồi Cát Bay{" "}
                    </p>
                    <p>Nơi khởi hành TP. Hồ Chí Minh</p>
                    <p className="mt-4 text-red-500 text-lg font-semibold">
                      499,000 ₫
                    </p>
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        className="text-white  bg-red-500 hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                     <div className="border px-5 py-2.5 rounded-lg bg-white">
                      <a href="">Xem chi tiết</a>
                     </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#ffffff] rounded-lg px-2 item h-[500px] w-[310px] pt-2   ">
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
                  <div className=" ml-[5px] py-3 text-[#2D4271] ">
                    <div className="border px-3 py-1 w-2/3 text-sm bg-blue-500 text-white rounded-md mb-2">
                      {" "}
                      26/10/2023 - Giờ đi: 05:00
                    </div>
                    <p className="font-semibold text-base hover:text-blue-500 mb-1">
                      Phan Thiết - Mũi Né - Hòn Rơm - Đồi Cát Bay{" "}
                    </p>
                    <p>Nơi khởi hành TP. Hồ Chí Minh</p>
                    <p className="mt-4 text-red-500 text-lg font-semibold">
                      499,000 ₫
                    </p>
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        className="text-white  bg-red-500 hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                     <div className="border px-5 py-2.5 rounded-lg bg-white">
                      <a href="">Xem chi tiết</a>
                     </div>
                    </div>
                  </div>
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