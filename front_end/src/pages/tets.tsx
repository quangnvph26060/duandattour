import React, { useState, useEffect } from 'react';
import '../page.css';
import { Link } from 'react-router-dom';
import logo from '../img/logo.jpg';

const rounded = {
  borderRadius: '25px',
};

const HomePage = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/admin/tour')
      .then(response => response.json())
      .then(result => {
        setdata(result.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="content">
        <h2 className="mt-5 mb-5 home-page__title">ƯU ĐÃI TPUR GIỜ CHÓT!</h2>
        <div className="product-list grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map(item => (
            <div className="product-details mt-4" key={item.id}>
              <p>{item.mo_ta}</p>
              <button style={{ backgroundColor: 'red', float: 'right', borderRadius: '5px' }} className="py-2 px-2 text-white mt-5">
                Giảm 6%
              </button>
              <button className="mt-4 w-full text-center bg-blue-400 text-white py-2 px-4 rounded">
                Còn 00 ngày 1:50:40
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;