import React, { useState, useEffect } from 'react';
import { Button, Popconfirm, Table, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Logo = () => {
  const [imagesData, setImagesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/logo');
        setImagesData(response.data);
      } catch (error) {
        console.error('Error fetching logo data:', error.message);
      }
    };

    fetchData();
  }, []);

  const confirmDelete = async (id, index) => {
    try {
      await axios.delete(`http://localhost:8000/api/admin/logo/${id}`);
      message.success('Xóa thành công');
      const updatedImagesData = imagesData.slice();
      updatedImagesData.splice(index, 1);
      setImagesData(updatedImagesData);
    } catch (error) {
      console.error('Error deleting image:', error);
      message.error('Xóa thất bại');
    }
  };

  const columns = [
    {
      title: 'ID hình ảnh',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Hình ảnh Logo',
      dataIndex: 'image_logo',
      key: 'image_logo',
      render: (image_logo) => (
        <img
          src={`http://localhost:8000/storage/${image_logo}`}
      
          style={{ width: '100px', cursor: 'pointer' }}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <span>
          <Popconfirm
            title="Bạn có muốn xóa?"
            onConfirm={() => confirmDelete(record.id, index)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Xóa
            </Button>
          </Popconfirm>
          <Button type="primary" className="bg-blue-500" style={{ marginLeft: '8px' }}>
            <Link to={`/admin/logo/edit/${record.id}`}>Sửa</Link>
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl py-4 px-3 font-medium">Quản lý Logo</h1>
      <div className="text-right px-5">
        <button
          className="px-5 py-2 bg-red-500 rounded-lg font-medium"
          type="button"
          onClick={() => navigate('/admin/add_logo')}
        >
          + Thêm mới Logo
        </button>
      </div>
      <Table dataSource={imagesData} columns={columns} pagination={{ pageSize: 4 }} />
    </div>
  );
};

export default Logo;
