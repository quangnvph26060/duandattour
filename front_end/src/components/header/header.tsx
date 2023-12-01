import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { IPour } from "../../interface/home";
import logo from '../img/logo.jpg';
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
const HeaderWebsite = () => {
  const [budget, setBudget] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [tours, setTours] = useState<IPour[]>([]);
  const [filteredTours, setFilteredTours] = useState<IPour[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Tour[]>([]);
  const [matchedResults, setMatchedResults] = useState<Tour[]>([]);

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
  
  const handleSearch = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/admin/tour/");
      setSearchResults(response.data.data);
      const filteredTours = response.data.data.filter((tour: Tour) =>
        tour.ten_tour.toLowerCase().includes(searchTerm.toLowerCase())
      );  
      setMatchedResults(filteredTours);
  
      setFilteredTours(filteredTours);
      setSearched(true);
      navigate('/tour', { state: { matchedResults: filteredTours } });
    } catch (error) {
      setError("Error searching tours.");
    }
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setFilteredTours([]);
    setSearched(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const displayedTours = searched ? filteredTours : tours;

  return (
    <div>
      <div className="menu flex tours-center justify-between">
        <div className='flex'>
          <a href="/"><img  src={logo} alt="logo" width="80px" /></a>
          <nav className='font-semibold p-4 pt-6 pl-18'>
            <ul className='flex text-[#2D4271] gap-12'>
              <a href="/">PolyTour</a>
              <a href="/tour">Tour</a>
              <a href="/news">Tin tức</a>
              <a href="/promo">Khuyến mãi</a>
              <a href="/contact">Liên hệ</a>
            </ul>
          </nav>
        </div>
        <div className="search mt-2   tours-center">
          <input style={{ width: '220px' }} className="border-yellow-300 border-[3px] px- py-2 rounded"
            type="text"
            placeholder="Search...."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="bg-blue-500 text-white py-2 px-3 rounded ml-2" onClick={handleSearch}>Search</button>
          <Link to="/signup">
            <button className="bg-green-500 text-white py-1 px-3 rounded">
              <i className="fas fa-user"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderWebsite;