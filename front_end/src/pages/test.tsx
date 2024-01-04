import React, { useState } from 'react';
import axios from 'axios';

const TestPage = () => {
  const [tours, setTours] = useState([]);

  const handleButtonClick = () => {
    axios
      .get('http://127.0.0.1:8000/api/getToursByDestination?diem_den')
      .then(response => {
        // Xử lý phản hồi từ API và cập nhật danh sách tour
        const toursData = response.data;
        setTours(toursData);
      })
      .catch(error => {
        console.error('Lỗi khi gửi yêu cầu API:', error);
      });
  };

  return (
    <div>
      <button
        className='py-2 px-3 border border-blue-400 rounded-lg hover:bg-teal-500 shadow-lg shadow-slate-400'
        onClick={handleButtonClick}
      >
        Xem tất cả
      </button>

      {tours.length > 0 ? (
        <ul>
          {tours.map(tour => (
            <li key={tour.id}>{tour.ten_tour}</li>
          ))}
        </ul>
      ) : (
        <p>Không có tour để hiển thị.</p>
      )}
    </div>
  );
};

export default TestPage;