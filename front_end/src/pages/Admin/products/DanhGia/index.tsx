import { useEffect, useState } from "react";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import useNavigate from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import React from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./danhgia.css";

const AdminDanhGia = () => {
  const [showdanhgia, setShowDanhGia] = useState([]);

  useEffect(() => {
    show();
  }, []);

  const show = () => {
    axios.get('http://127.0.0.1:8000/api/admin/evaluate')
      .then(response => {
        setShowDanhGia(response.data.danhgia);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa?');
    if (confirmed) {
      axios.delete(`http://127.0.0.1:8000/api/admin/evaluate/${id}`)
        .then(response => {
          console.log('Xóa thành công');
          show();
        })
        .catch(error => {
          console.error('Lỗi khi xóa:', error);
        });
    }
  };

  return (
    <div>
      <header className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Quản lý đánh giá</h2>
      </header>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên khách hàng</th>
            <th>Sao</th>
            <th>Tên tour</th>
            <th>Nội dung</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {showdanhgia.length > 0 ? (
            showdanhgia.map(danhgia => (
              <tr key={danhgia.id}>
                <td>{danhgia.id}</td>
                <td>{danhgia.id_user}</td>
                <td className="center-content">
                  <div className="rate ml-[120px] mb-5 mt-[-25px] flex gap-2">
                    <h2 className={`text-${danhgia.so_sao >= 1 ? 'yellow' : 'gray'}-300 text-[25px]`}>
                      <FaStar />
                    </h2>
                    <h2 className={`text-${danhgia.so_sao >= 2 ? 'yellow' : 'gray'}-300 text-[25px]`}>
                      <FaStar />
                    </h2>
                    <h2 className={`text-${danhgia.so_sao >= 3 ? 'yellow' : 'gray'}-300 text-[25px]`}>
                      <FaStar />
                    </h2>
                    <h2 className={`text-${danhgia.so_sao >= 4 ? 'yellow' : 'gray'}-300 text-[25px]`}>
                      <FaStar />
                    </h2>
                    <h2 className={`text-${danhgia.so_sao >= 5 ? 'yellow' : 'gray'}-300 text-[25px]`}>
                      <FaStar />
                    </h2>
                  </div>
                </td>
                <td>{danhgia.id_tour}</td>
                <td>{danhgia.noi_dung}</td>
                <td>
                  <Button type="primary" danger onClick={() => handleDelete(danhgia.id)}>
                    Xóa
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDanhGia;