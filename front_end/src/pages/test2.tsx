import { useLocation } from 'react-router-dom';
import React from "react";
import { Link } from 'react-router-dom';
import '../tour.css';

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

const formatCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return formatter.format(value);
};

const TestT: React.FC = () => {
  const location = useLocation();
  const matchedResults: Tour[] = location.state?.matchedResults || [];
  const hasSearchResults = matchedResults.length > 0;

  return (
    <div className="content">
      <h2 className="mt-5 mb-5 home-page__title">ƯU ĐÃI TOUR GIỜ CHÓT!</h2>
      <div className="product-list grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {hasSearchResults ? (
          matchedResults.map((tour) => (
            <div key={tour.id} className="tour-card">
              {tour.images.map((image) => (
                <img
                  key={image.id}
                  className="mt-4 rounded-lg w-full h-60 object-cover"
                  src={`http://localhost:8000/storage/${image.image_path}`}
                  alt={`Ảnh ${tour.ten_tour}`}
                />
              ))}
              <div className="product-details mt-4">
                <div className="info-row data">
                  <p>{tour.lich_khoi_hanh}</p>-
                  <p>{tour.soluong} ngày</p>
                </div>
                <Link to="/:id/tour" className="text-blue-500 hover:underline">
                  <h3 className="text-lg font-bold">{tour.ten_tour}</h3>
                </Link>
                <p className="price">Giá: {formatCurrency(15000000)}</p>
                <p className="price">{formatCurrency(tour.gia_tour)}</p>
                <p className="text mt-2">{tour.mo_ta}</p>
                <p className="text mt-2">Nơi Khởi Hành: {tour.diem_khoi_hanh}</p>
                <button className="button-wrapper py-2 px-2 text-white mt-5">
                  Giảm 6%
                </button>
                <button
                  id="countdown-btn"
                  className="mt-4 w-full text-center bg-blue-400  py-2 px-4 rounded"
                >
                  Đặt Ngay
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="tour-card">
            {/* Hiển thị thông báo khi không có kết quả */}
            <p>Không tìm thấy kết quả.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestT;