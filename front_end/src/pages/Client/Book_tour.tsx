import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaStar,
  FaPhoneAlt,
  FaMailBulk,
  FaRegCalendarAlt,
  FaRegCalendarTimes,
  FaQrcode,
  FaMoneyBill,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { useDattourMutation, useGetDattourbyIdQuery } from "../../api/dattour";
import { Tour } from "antd";
import { Dattour } from '../../interface/Dattour';
import logo from "./img/logo.jpg"
import axios from 'axios';
type Props = {};

const img = {
  borderRadius: "10px",
  witdh: "100px",
  height: "66px",
};
const initialFormData = {
  ten_khach_hang: "",
  email: "",
  sdt: "",
  dia_chi: "",
  cccd: "",
  ngay_dat: "",
  so_luong_khach: 1,
  ma_khach_hang: "",

};
const BookTour = () => {
  // check radio content , tiền mặt chuyển khoản
  const [isChecked, setIsChecked] = useState(true); // tiền mặt

  const handleRadioChange = () => {
    setIsChecked(!isChecked);
    setIsChecked(true);
    setIsChecked1(false);
  };


  const [isChecked1, setIsChecked1] = useState(false);// chuyển khoản 

  const handleRadioChange1 = () => {
    setIsChecked1(!isChecked1);
    setIsChecked1(true);
    setIsChecked(false);
  };
  // check điều khoản
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreeToggle = () => {
    setIsAgreed(!isAgreed);
  };
  // gia ng lon
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    } else {
      alert("tối thiểu số hành khách là 1")
      setQuantity(1)
    }
  };


  // gia tre em
  const [quantity2, setQuantity2] = useState(0);

  const handleIncrement2 = () => {
    setQuantity2(quantity2 + 1);
  };

  const handleDecrement2 = () => {
    if (quantity2 > 0) {
      setQuantity2(quantity2 - 1);
    }
  };
  const [soLuongKhach, setSoLuongKhach] = useState(1);
  useEffect(() => {
    const newSoLuongKhach = quantity + quantity2;
    if (newSoLuongKhach !== 1) {
      setSoLuongKhach(newSoLuongKhach);
      setFormData({
        ...formData,
        so_luong_khach: newSoLuongKhach
      });
    }
  }, [quantity, quantity2]);

  const { idTour } = useParams<{ idTour: any }>();
  const { data: Tourdata } = useGetDattourbyIdQuery(idTour || "");

  const datatourArray = Tourdata?.data || [];

  // Lấy token từ localStorage
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [formData, setFormData] = useState({ initialFormData, id_tour: idTour });
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addTour] = useDattourMutation(); // Sử dụng hàm addTour từ API
  useEffect(() => {
    // Lấy thông tin người dùng từ token và điền vào formData
    const token = localStorage.getItem("token");
    if (token) {
      // Gửi yêu cầu API để lấy thông tin người dùng từ token
      fetch("http://localhost:8000/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          setFormData({
            ...formData,
            ten_khach_hang: userData.name,
            email: userData.email,
            sdt: userData.sdt,
            dia_chi: userData.dia_chi,

            ma_khach_hang: userData.id,
            id_tour: idTour
          });
          console.log(userData);

        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setFormData({
        ...formData,
        ma_khach_hang: null, // hoặc có thể là ""
      });
    }
  }, []);

  const calculateTotalPrice = () => {
    const gialon = datatourArray?.gia_nguoilon;
    const ginho = datatourArray?.gia_treem;
    const totalPrice = quantity * gialon + quantity2 * ginho;
    return totalPrice;
  }
  const images = datatourArray?.images || [];
  // console.log(images);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const [paymentResult, setPaymentResult] = useState(null);
  //  khi bấm đặt hàng thì nó thực thi handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isChecked) {
      // tiền mặt 
      try {
        const addTourResponse = await addTour(formData).unwrap();
        setIsLoading(false);
        setResponseMessage(addTourResponse.message);
        // Xử lý kết quả thành công
        const requestData = {
          vnp_Amount: calculateTotalPrice(),
          payment_method: 'cash',
        };
        const paymentResponse = await axios.post('http://localhost:8000/api/cash', requestData);
        setPaymentResult(paymentResponse.data);

        alert('Đặt tour bằng tiền mặt thành công')
        window.location.href = `/bookingtour/${paymentResponse.data.id_dat_tour}`;
      } catch (error) {
        setIsLoading(false);
        setResponseMessage("Lỗi trong quá trình gửi yêu cầu.");
        // Xử lý lỗi
        console.error(error);
      }
    } else if (isChecked1) {
      // thanh toán vnpay
      // vào bảng đặt tour
      const addTourResponse = await addTour(formData).unwrap();
      setIsLoading(false);
      setResponseMessage(addTourResponse.message);
      // lưu vào bảng thanh toán 
      const requestData = {
        redirect: true,
        vnp_TxnRef: Math.floor(Math.random() * 1000000).toString(),
        vnp_OrderInfo: 'mô tả',
        vnp_OrderType: 'atm',
        vnp_Amount: calculateTotalPrice() * 100,
      };
      axios
        .post('http://localhost:8000/api/vnpay_payment', requestData)
        .then(response => {
          window.location.href = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    }

  };

  return (
    <div className="container mx-auto">

      {/* header trên thôn tin dưới */}
      <div className="info mt-14 mx-auto w-10/12 ">
        <div className="max-h-[300px] hh gap-4 flex bg-[#f9f9f9]">
          <div className="img-book w-1/3">
            {images && images.length > 0 ? (
              <div>
                {/* {images.map((image) => ( */}
                <img key={images[0].id} src={`http://localhost:8000/storage/${images[0].image_path}`} />
                {/* ))} */}
              </div>
            ) : (
              <p>Không có hình ảnh cho tour này.</p>
            )}
          </div>
          <div className="infoo">
            <div className="h-[300px] w-[530]  rounded-md mt-3  py-5 px-5">
              <div className="rate   flex gap-2">
                <h2 className="text-yellow-300 text-[20px]">
                  <FaStar />
                </h2>
                <h2 className="text-yellow-300 text-[20px]">
                  <FaStar />
                </h2>
                <h2 className="text-yellow-300 text-[20px]">
                  <FaStar />
                </h2>
                <h2 className="text-yellow-300 text-[20px]">
                  <FaStar />
                </h2>
                <h2 className="text-yellow-300 text-[20px]">
                  <FaStar />
                </h2>
              </div>
              <div className=" font-bold text-[#2D4271] text-[20px] py-5">
                <h2>{datatourArray?.ten_tour}</h2>
              </div>
              <p className="mt-1 text-[#2D4271] text-[16px] font-medium">
                Mã Tour: {datatourArray?.id}
              </p>
              <p className="mt-1 text-[#2D4271] text-[16px] font-medium">
                Khởi hành: {datatourArray?.lich_khoi_hanh}
              </p>
              <p className="mt-1 text-[#2D4271] text-[16px] font-medium">
                Ngày kết thúc {datatourArray?.ngay_ket_thuc}
              </p>
              <p className="mt-1 text-[#2D4271] text-[16px] font-medium">
                Nơi khởi hành {datatourArray?.diem_khoi_hanh}
              </p>
              <p className="mt-1   text-[#2D4271] text-[16px] font-medium">
                Số chỗ còn nhận {datatourArray?.soluong}
              </p>
            </div>
          </div>
        </div>
        <div className="thontin mt-12">
          <div className="tittle phone flex justify-between">
            <h1 className="font-bold text-[#2D4271] text-[28px]">
              Tổng quan về chuyến đi
            </h1>
            <div className="mr-[100px]">
              <p className="text-[#2D4271] text-[16px]">
                Quý khách cần hỗ trợ?
              </p>
              <div className="flex h-[55px] w-[350px] border border-blue-500  rounded ">
                <button className="w-1/2 text-center justify-center items-center text-white bg-blue-500 flex  rounded">
                  {" "}
                  <h2>
                    <FaPhoneAlt />
                  </h2>{" "}
                  <p>Gọi miễn phí qua internet</p>{" "}
                </button>
                <button className="w-1/2 text-center justify-center items-center text-blue-500 bg-white flex  rounded">
                  {" "}
                  <h2>
                    <FaMailBulk />
                  </h2>{" "}
                  <p>Gửi yêu cầu hỗ trợ</p>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-1 text-[#2D4271] text-[22px] font-bold">
          Thông tin liên lạc
        </p>
        <form onSubmit={handleSubmit}>

          <div className="thontin2 flex gap-1 mt-12">
            <div className="ttlienlac  w-2/3  ">
              <input
                className="h-[35px] w-[350px] border border-gray-300 rounded-md"
                type="hidden" value={formData.ma_khach_hang} onChange={handleChange}
              />
              <input
                className="h-[35px] w-[350px] border border-gray-300 rounded-md"
                type="hidden" value={formData.id_tour} name='id_tour' onChange={handleChange}

              />
              <div className="flex justify-center h-[200px] rounded  bg-[#f9f9f9]">
                <div className=" py-10 px-5">
                  <p className="text-[#2D4271] mb-1">Họ tên</p>
                  <input
                    className="h-[35px] w-[350px] border border-gray-300 rounded-md"
                    type="text" value={formData.ten_khach_hang} name='sdt' id='sdt'
                    onChange={handleChange} defaultValue={token ? formData.ten_khach_hang : ""}
                  />

                  <p className="text-[#2D4271] mb-1">Số điện thoại</p>
                  <input
                    className="h-[35px] w-[350px] border border-gray-300 rounded-md"
                    type="number" value={formData.sdt} name='sdt' id='sdt'
                    onChange={handleChange}
                  />
                </div>
                <div className=" py-10 px-5">
                  <p className="text-[#2D4271] mb-1">Email </p>
                  <input
                    className="h-[35px] w-[350px] border border-gray-300 rounded-md"
                    type="text" value={formData.email} name='email' id='email'
                    onChange={handleChange}
                  />
                  <p className="text-[#2D4271] mb-1">Địa chỉ</p>
                  <input
                    className="h-[35px] w-[350px] border border-gray-300 rounded-md"
                    type="text" value={formData.dia_chi} name='dia_chi' id='dia_chi'
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <div>
                  <p className="mt-5 text-[#2D4271] text-[22px] font-bold">
                    Hành khách
                  </p>
                  <div className="text-[#2D4271] flex justify-between">
                    <div className="flex h-[50px] border items-center p-3 rounded-[10px] w-[400px] justify-between">
                      <label htmlFor="quantity">Người lớn</label>
                      <div className="flex gap-3">
                        <button type="button" onClick={handleIncrement} className="icon-button">
                          +
                        </button>
                        <input type="text" className="w-[10px]" name="quantity" id="quantity" value={quantity} readOnly />
                        <button type="button" onClick={handleDecrement} className="icon-button">
                          -
                        </button>
                      </div>
                    </div>
                    <input
                      type="hidden"
                      name="so_luong_khach"
                      className="w-[10px]"
                      id="so_luong_khach"
                      value={soLuongKhach}
                      onChange={handleChange}
                      readOnly
                    />
                    <div className="flex h-[50px] border items-center p-3 rounded-[10px] w-[400px] justify-between">
                      <label htmlFor="quantity2">Trẻ em</label>
                      <div className="flex gap-3">
                        <button type="button" onClick={handleIncrement2} className="icon-button">
                          +
                        </button>
                        <input type="text" className="w-[10px]" name="quantity2" id="quantity2" value={quantity2} readOnly />
                        <button type="button" onClick={handleDecrement2} className="icon-button">
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="thanhstoan mt-10">
                <p className="mt-5 text-[#2D4271] text-[28px] font-bold">
                  Thanh toán
                </p>
                <p className="mt-5 text-[#2D4271] text-[22px] font-bold">
                  Các hình thức thanh toán
                </p>
                <div className="grid grid-cols-2 gap-10">
                  <div className="py-5 flex items-center px-6 w-[400px] max-h-[300px] rounded bg-[#f9f9f9]">
                    <label>
                      <div className="flex items-center gap-2">
                        {" "}
                        <h2 className="text-[40px] text-[#2D4271]">
                          <FaMoneyBill />
                        </h2>{" "}
                        <p className="text-[#2D4271] text-[15px]">Tiền mặt</p>{" "}
                        <input
                          className="r-0"
                          type="radio"
                          // tiền mặt 
                          checked={isChecked}
                          onChange={handleRadioChange}
                        />
                      </div>

                      <span onClick={handleRadioChange}>
                        {isChecked
                          ? "Quý khách vui lòng thanh toán tại bất kỳ văn phòng Vietravel trên toàn quốc và các chi nhánh tại nước ngoài. Xem chi tiết."
                          : ""}
                      </span>
                    </label>
                  </div>
                  <div className="py-5 flex items-center px-6 w-[400px] max-h-[300px] rounded bg-[#f9f9f9]">
                    <label>
                      <div className="flex items-center gap-2">
                        {" "}
                        <h2 className="text-[40px] text-[#2D4271]">
                          <FaMoneyCheckAlt />
                        </h2>{" "}
                        <p className="text-[#2D4271] text-[15px]">
                          Chuyền khoản
                        </p>{" "}
                        <input
                          className="r-0"
                          type="radio"
                          checked={isChecked1}
                          onChange={handleRadioChange1}
                        />
                      </div>

                      <span onClick={handleRadioChange1}>
                        {isChecked1
                          ? "Quý khách sau khi thực hiện việc chuyển khoản vui lòng gửi email đến contactcenter@vietravel.com hoặc gọi tổng đài 19001839 để được xác nhận từ công ty chúng tôi. Tên Tài Khoản : Công ty CP Du lịch và Tiếp thị GTVT Việt Nam – VietravelTên tài khoản viết tắt : VIETRAVELSố Tài khoản : 111 6977 27979Ngân hàng : Vietinbank - Chi nhánh 7"
                          : ""}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              {/* <div className="dieukhoan scroll-text ">
                <p className="mt-5 text-[#2D4271] text-[22px] font-bold">
                  Điều khoản bắt buộc khi đăng ký online
                </p>
                <div className="w-full mt-5 max-h-[200px] overflow-y-auto border rounded">
                  <div className="scrollingText ">
                    <p>
                      This is a long piece of text that will scroll within a
                      fixed height
                    </p>
                  </div>
                </div>
                <div>
                  <label className="flex mt-5">
                    <input
                      type="checkbox"
                      checked={isAgreed}
                      onChange={handleAgreeToggle}
                    />
                    <p className="text-[#2D4271] text-[16px] font-medium">
                      {" "}
                      Tôi đồng ý với các điều kiện trên
                    </p>
                  </label>
                </div>
              </div> */}
            </div>
            <div className="h-[950px] w-1/3 border py-6 px-4 ">
              <p className="mt-1 text-[#2D4271] text-[22px] font-bold">
                Tóm tắt chuyến đi
              </p>
              <p className=" text-[#2D4271] text-base font-semibold">
                Dịch vụ tùy chọn Option 1{" "}
              </p>
              <p className=" text-[#2D4271] text-base font-semibold">
                Tour trọn gói (? khách){" "}
              </p>
              <div className="name flex gap-3 mt-4">
                <img
                  src="https://media.travel.com.vn/tour/tfd_221208112659_971842.jpg"
                  style={img}
                  alt=""
                />
                <p className=" text-[#2D4271] text-base font-semibold">
                  {datatourArray?.ten_tour}
                </p>
              </div>
              <div className="time mt-8 ">
                <div className="flex gap-5 items-center">
                  <h2 className="text-blue-500 text-[24px]">
                    <FaRegCalendarAlt />
                  </h2>
                  <div>
                    <p>Bắt đầu chuyến đi</p>
                    <p className=" text-[#2D4271] text-base font-semibold">
                      {datatourArray?.lich_khoi_hanh}
                    </p>
                  </div>
                </div>
              </div>
              <div className="time mt-8 ">
                <div className="flex gap-5 items-center">
                  <h2 className="text-blue-500 text-[24px]">
                    <FaRegCalendarTimes />
                  </h2>
                  <div>
                    <p>Kết thúc chuyến đi</p>
                    <p className=" text-[#2D4271] text-base font-semibold">
                      {datatourArray?.ngay_ket_thuc}
                    </p>
                  </div>
                </div>
              </div>
              <div className="khach mt-6">
                <p className=" text-[#2D4271] text-base font-semibold">
                  Hành khách
                </p>
                <div className="flex mt-6 justify-between">
                  <p className=" text-[#2D4271] text-base font-normal">
                    Người lớn
                  </p>
                  <p className="text-red-400"> {quantity} x {datatourArray?.gia_nguoilon}</p>
                </div>
                <div className="flex mt-6 justify-between">
                  <p className=" text-[#2D4271] text-base font-normal">
                    Trẻ em
                  </p>
                  <p className="text-red-400">{quantity2} x {datatourArray?.gia_treem} </p>
                </div>
                {/* <div className="flex mt-6 justify-between">
                  <p className=" text-[#2D4271] text-base font-normal">
                    Mã giảm giá
                  </p>
                  <div className="flex gap-1 text-black">
                    <input
                      type="text"
                      placeholder="Thêm mã.."
                      className="text-center text-black h-[35px] w-[100px] rounded border "
                      name=""
                      id=""
                    />
                    <button
                      type="submit"
                      className="h-[35px] text-white w-[100px] rounded hover:bg-green-700 bg-green-600"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div> */}
                <p className="mx-auto mt-5">
                  <hr />
                </p>
                <div className="flex mt-6 justify-between">
                  <p className=" text-[#2D4271] text-[28px] font-semibold">
                    Tổng cộng
                  </p>
                  <p className="text-red-400 text-[28px]   "> {calculateTotalPrice()} VNĐ </p>
                </div>
                {/* <p className="text-[200px] ml-10">
                  <FaQrcode />
                </p> */}

                <button
                  className=" mx-auto text-center hover:bg-red-600 align-middle mt-5 bg-red-500 rounded-[10px] h-[50px] w-[390px] font-medium text-white items-center text-[22px]"
                  type="submit"
                >
                  Đặt ngay
                </button>

              </div>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default BookTour;
