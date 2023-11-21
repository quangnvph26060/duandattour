import React, { useState, useEffect } from "react";
import axios from "axios";
 
import { IPour } from "../../interface/home";
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
 
const rounded = { borderRadius: '25px' };
import logo from '../img/logo.jpg';
const HeaderWebsite = () => {
  const [budget, setBudget] = useState(0);

  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(value);
  };

  const handleBudgetChange = (event) => {
    const newBudget = event.target.value;
    setBudget(newBudget);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [tours, setTours] = useState<IPour[]>([]);
  const [filteredTours, setFilteredTours] = useState<IPour[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false); // Biến flag để theo dõi trạng thái tìm kiếm

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/api/admin/tour/");
        setTours(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Error retrieving tours.");
      }
    };

    fetchTours();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
 
  const handleSearch = () => {
    const filteredTours = tours.filter((tour) =>
      tour.ten_tour.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredTours(filteredTours);
    setSearched(true); // Đánh dấu đã tìm kiếm
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setFilteredTours([]);
    setSearched(false); // Đánh dấu chưa tìm kiếm
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const displayedTours = searched ? filteredTours : tours; // Chọn danh sách tours để hiển thị

  return (
    <div className=''>
      {/*  */}
      <div> <div className="menu flex tours-center justify-between">
        <div className='flex'>
          <a href="/"><img style={rounded} src={logo} alt="logo" width="80px" /></a>

          <nav className='font-semibold p-4 pt-6 pl-18'>
            <ul className='flex text-[#2D4271] gap-12'>
              <a href="/">PolyTour</a>
              <a href="/tour">Tour</a>
              <a href="/news">Tin tức</a>
              <a href="">Khuyến mãi</a>
              <a href="/contact">Liên hệ</a>
            </ul>
          </nav>
        </div>
        <div className="search mt-2   tours-center">
        <input style={{ width: '220px' }} className="border-yellow-300
border-[3px] px- py-2  rounded"
          type="text"
          placeholder="Search...."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="bg-blue-500 text-white py-2 px-3 rounded ml-2" onClick={handleSearch}>Search</button> {/* Thêm nút tìm kiếm */}
        {/* <button onClick={handleResetSearch}>Reset</button> Thêm nút reset */}    
            <Link to="/signup">
              <button className="bg-green-500 text-white py-1 px-3 rounded">
                <i className="fas fa-user"></i>
              </button>
            </Link>
       </div>
      </div>
      </div>
      {/*  */}
      </div>
  );
}

export default HeaderWebsite;