import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IPour } from "../interface/home";

const TestPage = () => {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const displayedTours = searched ? filteredTours : tours; // Chọn danh sách tours để hiển thị

  return (
    <div>
      <div>
        <h2>Home Page</h2>
        <input
          type="text"
          placeholder="Search tours"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Search</button> {/* Thêm nút tìm kiếm */}
        <button onClick={handleResetSearch}>Reset</button> {/* Thêm nút reset */}
      </div>
      <div>
        <ul>
          {displayedTours.map((tour) => (
            <li key={tour.id}>
              <Link to={`/tours/${tour.id}`}>{tour.ten_tour}</Link>
              <p>{tour.gia_tour}</p>
            </li>
          ))}
        </ul>
      </div>
      <footer>
        <p>© 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TestPage;