import React, { useState } from "react";
import logo from "./img/logo.jpg";
import { IContact } from '../../interface/contact';
type Props = {};
import { Link } from "react-router-dom";
import axios from "axios";

const Contact = (props: Props) => {

  const onFinish = async (values: IContact) => {
    try {
      const formData = new FormData();
      formData.append('loai_thong_tin', values.loai_thong_tin);
      formData.append('ho_ten', values.ho_ten);
      formData.append('email', values.email);
      formData.append('sdt', values.sdt);
      formData.append('so_khach', values.so_khach);
      formData.append('ten_cong_ty', values.ten_cong_ty);
      formData.append('dia_chi', values.dia_chi);
      formData.append('tieu_de', values.tieu_de);
      formData.append('noi_dung', values.noi_dung);
      const response = await axios.post(
        'http://127.0.0.1:8000/api/contact',
        formData,
      );
  
      if (response.status === 200) {
        console.log('Thành công');
        console.log(response);
        alert("Cảm ơn quý khách đã liên lạc. Chúng tôi sẽ liên lạc với quý khách trong thời gian sớm nhất")
        window.location.href = 'http://localhost:5173';
      } else {
        console.log('Yêu cầu thất bại');
      }
    } catch (error) {
      console.log(error);
    }
  };
  //select
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  //text
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  //capcha
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
   // Lấy nội dung bên trong trường loai_thong_tin
   const loaiThongTin = event.target.loai_thong_tin.value;
   // Tạo đối tượng values từ các giá trị của các trường biểu mẫu
   const values: IContact = {
     loai_thong_tin: loaiThongTin,
     ho_ten: event.target.ho_ten.value,
     email: event.target.email.value,
     sdt: event.target.sdt.value,
     so_khach: event.target.so_khach.value,
     ten_cong_ty: event.target.ten_cong_ty.value,
     dia_chi: event.target.dia_chi.value,
     tieu_de: event.target.tieu_de.value,
     noi_dung: event.target.noi_dung.value,
   };
   onFinish(values);
    setIsSubmitted(true);
    if (isChecked) {
      alert('Submit successful!');
    } else {
      alert('bạn chưa xác nhận');
    }
  };

  
  return (
    <div className="w-[85%] h-[1000px] bg-white mx-auto">
     
      <div className="container tittle ml-[100px]">
        <p className="text-[26px] px-5 py-5 text-red-500 font-semibold">
          Liên hệ
        </p>
        <p className="text-[#6c757d] ml-[15px] text-base">
          Để có thể đáp ứng được các yêu cầu và các ý kiến đóng góp của quý vị
          một cách nhanh chóng xin vui lòng liên hệ
        </p>
      </div>

      <div className="w-full mt-6 flex gap-3">
        <div className="w-2/3 max-h-max ">
          <p className="text-[26px] px-5 py-5 text-red-500 font-semibold">
            Gửi thông tin
          </p>
          <form onSubmit={handleSubmit} action="">
            <div className="grid grid-cols-3 gap-2">
              <div className="select mt-[4px]">
                <p className="text-[#2D4271]">Loại thông tin(*) </p>
                <select className="border h-11 w-[230px] rounded" value={selectedOption} onChange={handleSelectChange} name="loai_thong_tin">
                  <option value="">Chọn một lựa chọn</option>
                  <option value="Du lịch">Du lịch</option>
                  <option value="Chăm sóc khách hàng">Chăm sóc khách hàng</option>
                  <option value="Liên hệ thông tin khác">Liên hệ thông tin khác</option>
                </select>
              </div>
              <div className="">
                <p className="text-[#2D4271] mb-1">Họ tên</p>
                <input
                  className="h-11 w-[230px] border border-gray-300 rounded-md"
                  type="text" name="ho_ten"
                />


              </div>
              <div className="">
                <p className="text-[#2D4271] mb-1">Email(*)</p>
                <input
                  className="h-11 w-[230px] border border-gray-300 rounded-md"
                  type="text" name="email"
                />


              </div>
              <div className="">
                <p className="text-[#2D4271] mb-1">Điện thoại(*)</p>
                <input
                  className="h-11 w-[230px] border border-gray-300 rounded-md"
                  type="text" name="sdt"
                />


              </div>
              <div className="">
                <p className="text-[#2D4271] mb-1">Số khách</p>
                <input
                  className="h-11 w-[230px] border border-gray-300 rounded-md"
                  type="text" name="so_khach"
                />


              </div>
              <div className="">
                <p className="text-[#2D4271] mb-1">Tên công ty</p>
                <input
                  className="h-11 w-[230px] border border-gray-300 rounded-md"
                  type="text" name="ten_cong_ty"
                />
              </div>


            </div>
            <div>
              <p className="text-[#2D4271] mb-1">Địa chỉ</p>
              <input
                className="h-11 w-[94%] border border-gray-300 rounded-md"
                type="text" name="dia_chi"
              />
              <p className="text-[#2D4271] mb-1">Tiêu đề(*)</p>
              <input
                className="h-11 w-[94%] border border-gray-300 rounded-md"
                type="text" name="tieu_de"
              />
              <p className="text-[#2D4271] mt-2">Nội dung(*)</p>
              <textarea className="border mt-5"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Nhập văn bản..."
                style={{ width: '94%', height: '100px' }} name="noi_dung"
              />
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                Tôi không phải người máy
              </label>

            </div>
            <div className="text-center mt-4" >   <button className="bg-red-500 text-center items-center justify-center rounded-md w-[100px] text-white h-10" type="submit">Gửi đi</button></div>


          </form>
        </div>

        <div className="w-1/3 max-h-max">
          <p className="text-[26px] px-5 py-5 text-red-500 font-semibold">
            Mạng lưới chi nhánh    </p>
          <div className="max-h-max bg-[#f9f9f9] ">
            <p className="text-[28px] px-5 py-5 text-[#2D4271] font-medium">
              Khu vực Hà Nội  </p>
            <p className="text-[28px] px-5 py-5 text-[#2D4271] font-medium">
              TRỤ SỞ CHÍNH </p>
            <p className=" px-5 py-5">Cao đẳng Fpt</p>
          </div>

        </div>
      </div>

    </div>

  );
};

export default Contact;
