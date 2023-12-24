import React, { useState } from 'react';
import { Table, Button, Skeleton, Popconfirm, Input } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';

const Admin_baiviet = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    if (searchValue) {
      const filteredData = dataSource.filter((item) =>
        item.ten_bai_viet.toLowerCase().includes(searchValue.toLowerCase())
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
      ten_bai_viet: 'Bài viết cương',
      image: 'image_url_1.jpg',
      mo_ta: 'Mô tả bài viết 1',
    },
    {
      key: 2,
      ten_bai_viet: 'Bài viết thái',
      image: 'image_url_2.jpg',
      mo_ta: 'Mô tả bài viết 2',
    },
    // Add more data objects as needed
  ];

  const baivietArray = filteredDataSource.length > 0 ? filteredDataSource : dataSource;

  const columns = [
    {
      title: 'ID bài viết',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Tên bài viết',
      dataIndex: 'ten_bai_viet',
      key: 'ten_bai_viet',
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img src={image} alt="Bài viết" style={{ maxWidth: '100px', maxHeight: '100px' }} />
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'mo_ta',
      key: 'mo_ta',
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
        <h2 className="font-bold text-2xl">Quản lý  bài viết</h2>
        <Button type="primary" danger>
          <Link to="/admin/tour/loai_tour/add" className="flex items-center space-x-2">
            <AiOutlinePlus />
            Tạo mới bài viết
          </Link>
        </Button>
      </header>
      <div className="flex items-center justify-end mb-4">
  <Input
    style={{ width: "250px" }}
    placeholder="Tìm kiếm lịch trình"
    value={searchValue}
    onChange={handleSearchChange}
  />
  <Button style={{ backgroundColor: "blue" , marginLeft:"5px"}} type="primary" onClick={handleSearch}>
    Tìm kiếm
  </Button>
</div>
      <Table dataSource={baivietArray} columns={columns} />
    </div>
  );
};

export default Admin_baiviet;