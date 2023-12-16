import React, { useState } from "react";
import { Table, Button, Input, Popconfirm, Skeleton } from "antd";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGetLichTrinhQuery, useRemoveLichTrinhMutation } from "../../../../api/LichTrinhApi";
import { useGetTourQuery } from "../../../../api/TourApi";

const Admin_Lichtrinh = () => {
  const { data: lictrinhdata, error, isLoading } = useGetLichTrinhQuery();
  const { data: tourdata } = useGetTourQuery();
  const [removeLichTrinh, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
    useRemoveLichTrinhMutation();

  const [searchValue, setSearchValue] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    const filteredData = lictrinhdata?.date.filter((item) =>
      item.tieu_de.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredDataSource(filteredData);
  };

  const confirm = (id) => {
    removeLichTrinh(id);
  };

  const dataSource = filteredDataSource.length > 0 ? filteredDataSource : lictrinhdata?.date || [];
  const tourArrary = tourdata?.data || [];

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "tieu_de",
      key: "tieu_de",
    },
    {
      title: "Nội dung",
      dataIndex: "noi_dung",
      key: "noi_dung",
    },
    {
      title: "Thời gian",
      dataIndex: "thoi_gian",
      key: "thoi_gian",
    },
    {
      title: "Tour tương ứng",
      dataIndex: "id_tour",
      key: "id_tour",
      render: (id_tour) => {
        const Tour = tourArrary.find((item) => item.id === id_tour);
        return Tour ? Tour.ten_tour : "Không xác định";
      },
    },
    {
      title: "Action",
      render: ({ key: id }) => {
        return (
          <>
            {localStorage.getItem("role") === "admin" && (
              <div className="flex space-x-2">
                <Popconfirm
                  title="Bạn có muốn xóa?"
                  onConfirm={() => confirm(id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" danger>Xóa</Button>
                </Popconfirm>
                <Button type="primary" danger>
                  <Link to={`/admin/tour/lich_trinh/edit/${id}`}>Sửa</Link>
                </Button>
              </div>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div>
      <header className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Quản lý lịch trình</h2>
        <Button type="primary" danger>
          <Link to="/admin/tour/lich_trinh/add" className="flex items-center space-x-2">
            <AiOutlinePlus />Tạo mới lịch trình
          </Link>
        </Button>
      </header>

      <div className="flex items-center space-x-2 mb-4">
        <Input 
          placeholder="Tìm kiếm lịch trình"
          value={searchValue}
          onChange={handleSearchChange}
          
        />
        <Button style={{backgroundColor:"blue"}} type="primary" onClick={handleSearch}>
           Tìm kiếm
        </Button>
      </div>

      {isLoading ? (
        <Skeleton />
      ) : (
        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 2 }} />
      )}
    </div>
  );
};

export default Admin_Lichtrinh;