import React, { useState } from 'react';
import { Table, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { Popconfirm } from 'antd';
const Admin_Danhmuc_baiviet = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    if (searchValue) {
      const filteredData = dataSource.filter((item) =>
        item.ten_danh_muc.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredDataSource(filteredData);
    } else {
      setFilteredDataSource([]);
    }
  };

  const confirm = (id) => {
    // Handle delete action here
  };

  const dataSource = [
    {
      key: 1,
      ten_danh_muc: 'Danh Mục Giải Trí',
    },
    {
      key: 2,
      ten_danh_muc: 'Danh Mục Tin Tức',
    },
    {
      key: 3,
      ten_danh_muc: 'Danh Mục Khuyến Mãi',
    },
    {
      key: 4,
      ten_danh_muc: 'Danh Mục Biến Động',
    }
    // Add more data objects as needed
  ];

  const danhMucArray = filteredDataSource.length > 0 ? filteredDataSource : dataSource;

  const columns = [
    {
      title: 'ID loại bài viết',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'ten_danh_muc',
      key: 'ten_danh_muc',
    },
    {
      title: 'Action',
      render: ({ key: id }) => {
        return (
          <>
            <div className="flex space-x-2">
              <Popconfirm
                title="Bạn có muốn xóa?"
                onConfirm={() => confirm(id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger>
                  Xóa
                </Button>
              </Popconfirm>
              {/* Add other action buttons or links here */}
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <header className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Quản lý danh mục bài viết</h2>

        {localStorage.getItem("role") === 'admin' ? (
          <Button type="primary" danger>
            <Link to="/admin/post/add_danhmuc" className="flex items-center space-x-2">
              <AiOutlinePlus />
              Tạo mới danh mục bài viết
            </Link>
          </Button>
        ) : null}
      </header>
      <div className="flex items-center space-x-2 mb-4">
        <Input
          placeholder="Tìm kiếm danh mục"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <Button style={{ backgroundColor: "blue" }} type="primary" onClick={handleSearch}>
          Tìm kiếm
        </Button>
      </div>
      <Table dataSource={danhMucArray} columns={columns} />
    </div>
  );
};

export default Admin_Danhmuc_baiviet;