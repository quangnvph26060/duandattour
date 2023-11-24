import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Props = {};

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

function TestPage({ }: Props) {
  const [searchResults, setSearchResults] = useState<Tour[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDepartureDate, setSelectedDepartureDate] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedDeparture, setSelectedDeparture] = useState('');
  const [matchedResults, setMatchedResults] = useState<Tour[]>([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin/tour/', {
        params: {
          ngayDen: selectedDate,
          lichKhoiHanh: selectedDepartureDate,
          diemDen: selectedDestination,
          diemDi: selectedDeparture
        }
      });

      setSearchResults(response.data.data);

      const filteredResults = response.data.data.filter((tour: Tour) =>
        tour.ngay_ket_thuc.includes(selectedDate) &&
        tour.lich_khoi_hanh.includes(selectedDepartureDate) &&
        tour.diem_den === selectedDestination &&
        tour.diem_di === selectedDeparture
      );

      setMatchedResults(filteredResults);

      if (filteredResults.length > 0) {
        // Chuyển trang khi có kết quả tìm kiếm chính xác
        navigate('/tt', { state: { matchedResults: filteredResults } });
      }
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <div className="bg-white box-shadow rounded-lg p-9 mx-auto" style={{ width: '1200px' }}>
      <h1 className="title">PolyTour Trong Nước</h1>
      <div className="tour-form mt-2 flex items-center">
        <div className="flex items-center mr-4">
          <label htmlFor="departureDate" className="mr-2 text-gray-600">
            Ngày khởi hành:
          </label>
          <div className="relative">
            <label
              htmlFor="departureDate"
              className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
            >
              <span>&#128197;</span>
            </label>
            <input
              style={{ backgroundColor: ' #F0FFF0' }}
              type="date"
              id="departureDate"
              className="custum border-yellow-600 rounded px-3 py-2 pl-8 focus:outline-none transition-colors duration-300"
              value={selectedDepartureDate}
              onChange={(e) => setSelectedDepartureDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center mr-4">
          <label htmlFor="arrivalDate" className="mr-2 text-gray-600">
            Ngày đến:
          </label>
          <div className="relative">
            <label
              htmlFor="arrivalDate"
              className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
            >
              <span>&#128197;</span>
            </label>
            <input
              style={{ backgroundColor: ' #F0FFF0' }}
              type="date"
              id="arrivalDate"
              className="custum border-yellow-600 rounded px-3 py-2 pl-8 focus:outline-none transition-colors duration-300"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center mr-4">
          <label htmlFor="destination" className="mr-2 text-gray-600">
            Điểm Đi:
          </label>
          <select
            style={{ backgroundColor: ' #F0FFF0' }}
            id="depeparture"
            className="custum border-yellow-600 rounded px-3 py-2 focus:outline-none transition-colors duration-300"
            value={selectedDeparture}
            onChange={(e) => setSelectedDeparture(e.target.value)}
          >
            <option value="Hà Nội"> Hà Nội</option>
            <option value="Đà Nẵng">Đà Nẵng</option>

          </select>
        </div>
        <div className="flex items-center mr-4">
          <label htmlFor="destination" className="mr-2 text-gray-600">
            Điểm Đến:
          </label>
          <select
            style={{ backgroundColor: ' #F0FFF0' }}
            id="destination"
            className="custum border-yellow-600 rounded px-3 py-2 focus:outline-none transition-colors duration-300"
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
          >
            <option value="Hà Nội"> Hà Nội</option>
            <option value="Miền Tây">Miền Tây</option>


          </select>
        </div>


        <button
          className="bg-yellow-600 text-white py-3 px-5 rounded ml-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {/* <div>
        {matchedResults.length > 0 ? (
          matchedResults.map((tour) => (
            <div key={tour.id} className="tour-result">
              <div>
                <h2>Tour Details</h2>
                <p><strong>ID:</strong> {tour.id}</p>
                <p><strong>Tên tour:</strong> {tour.ten_tour}</p>
                <p><strong>Điểm đi:</strong> {tour.diem_di}</p>
                <p><strong>Điểm đến:</strong> {tour.diem_den}</p>
                <p><strong>Lịch khởi hành:</strong> {tour.lich_khoi_hanh}</p>
                <p><strong>Ngày kết thúc:</strong> {tour.ngay_ket_thuc}</p>
                <p><strong>Điểm khởi hành:</strong> {tour.diem_khoi_hanh}</p>
                <p><strong>Giá tour:</strong> {tour.gia_tour}</p>
                <p><strong>Mô tả:</strong> {tour.mo_ta}</p>
 
              </div>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div> */}
    </div>
  );
}

export default TestPage;