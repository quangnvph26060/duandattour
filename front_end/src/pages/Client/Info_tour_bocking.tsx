import React from "react";

type Props = {};

const Info_tour_bocking = (props: Props) => {
  return (
    <div className="w-[80%] max-h-max  mx-auto ">
      <div className="flex">
      <div className="w-2/3 ">   <div className="thongtinlienlac border py-5 px-5  max-h-[1000px] bg-white rounded">
        <p className="text-[22px]  text-red-500 font-bold">
          THÔNG TIN LIÊN LẠC
          <p className="mt-5">
            <hr />
          </p>
        </p>
        <div className="grid grid-cols-3 mt-5   ">
          <div className="py-5">
            <p className="text-gray-400 text-[16px]">Họ tên</p>
            <p className="text-[16px] text-[#2D4271] font-bold">Name</p>
          </div>
          <div className="py-5">
            <p className="text-gray-400 text-[16px]">Email</p>
            <p className="text-[16px] text-[#2D4271] font-bold">aa@gmail.com</p>
          </div>
          <div className="py-5">
            <p className="text-gray-400 text-[16px]">Địa chỉ</p>
            <p className="text-[16px] text-[#2D4271] font-bold">hà nội</p>
          </div>
          <div>
            <p className="text-gray-400 text-[16px]">Di động</p>
            <p className="text-[16px] text-[#2D4271] font-bold">0*********0</p>
          </div>
          <div>
            <p className="text-gray-400 text-[16px]">Điện thoại</p>
            <p className="text-[16px] text-[#2D4271] font-bold">0*********0</p>
          </div>
          <div>
            <p className="text-gray-400 text-[16px]">Ghi chú</p>
            <p className="text-[16px] text-[#2D4271] font-bold">
              Booking từ travel.com.vn.
            </p>
          </div>
        </div>
      </div>
      <div className="thongtinlienlac border mt-5 py-5 px-5  max-h-[1000px] bg-white rounded-lg">
        <p className="text-[22px]  text-red-500 font-bold">
          CHI TIẾT BOOKING
          <p className="mt-5">
            <hr />
          </p>
        </p>
        <div className="chitiet mt-5">
          <div className="flex gap-5 mt-5">
            <p className="text-[16px] text-[#2D4271] font-bold">Số booking</p>
            <p>
              231007399973 (Quý khách vui lòng nhớ số booking để thuận tiện cho
              các giao dịch sau này)
            </p>
          </div>
          <div className="flex gap-5 mt-5">
            <p className="text-[16px] text-[#2D4271] font-bold">
              Trị giá booking
            </p>
            <p>7,290,000₫</p>
          </div>
          <div className="flex gap-5 mt-5">
            <p className="text-[16px] text-[#2D4271] font-bold">
              Số tiền đã thanh toán
            </p>
            <p>0₫</p>
          </div>
          <div className="flex gap-5 mt-5">
            <p className="text-[16px] text-[#2D4271] font-bold">
              Số tiền còn lại
            </p>
            <p>7,290,000₫</p>
          </div>
          <div className="flex gap-5 mt-5">
            <p className="text-[16px] text-[#2D4271] font-bold">Ngày đăng ký</p>
            <p>07/10/2023 16:59:12</p>
          </div>
          <div className="flex gap-5 mt-5">
            <p className="text-[16px] text-[#2D4271] font-bold">
              Hình thức thanh toán
            </p>
            <p>Tiền mặt</p>
          </div>
          <div className="flex gap-5 mt-5">
            <p className="text-[16px] text-[#2D4271] font-bold">Tình trạng</p>
            <p>Booking của quý khách đã được chúng tôi xác nhận thành công</p>
          </div>
          <div className="flex gap-5 mt-5">
            <p className="text-[16px] text-[#2D4271] font-bold">Thời hạn thanh toán</p>
            <p>07/10/23 17:59:12 (Theo giờ Việt Nam. Booking sẽ tự động hủy nếu quá thời hạn thanh toán trên)</p>
          </div>
        </div>
      </div></div>
   
      <div className="w-1/3 ">
        a
      </div>
    </div>
    </div>
  );
};

export default Info_tour_bocking;
