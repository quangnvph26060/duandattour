import React, { useState, useEffect } from "react";
import { Table, Button, Input, Popconfirm, Alert, Select } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useGetTourQuery, useRemoveTourMutation } from "../../../../api/TourApi";
import { useGetLoaiTourQuery } from "../../../../api/LoaiTourApi";
import axios from "axios";
import "./tour.css";

const { Option } = Select;

const AdminProduct = () => {
  
  const [searchValue, setSearchValue] = useState("");
  const [activeStatus, setActiveStatus] = useState(null);
  const { data: loaitourdata } = useGetLoaiTourQuery();
  const { data: tourdata, error, isLoading } = useGetTourQuery();
  const currentDate = new Date(); // Ngày hiện tại
  const [isSearching, setIsSearching] = useState(false);
  const [removeTour, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] = useRemoveTourMutation();
  const [filteredDataSource, setFilteredDataSource] = useState(null);

  useEffect(() => {
    if (!isSearching) {
      filterDataByStatus(activeStatus); // Lọc dữ liệu theo trạng thái khi activeStatus thay đổi
    }
  }, [tourdata, isSearching, activeStatus]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    if (searchValue === "") {
      setIsSearching(false);
      filterDataByStatus(activeStatus); // Lọc dữ liệu theo trạng thái khi không có tìm kiếm
    } else {
      const filteredData = tourdata?.data.filter((item) =>
        item.ten_tour.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredDataSource(filteredData);
      setIsSearching(true);
    }
  };

  const handleFilter = (status) => {
    setActiveStatus(status);
    filterDataByStatus(status); // Lọc dữ liệu theo trạng thái khi nút lọc được nhấp
  };
  const loaitourArrary = loaitourdata?.data || [];
  const filterDataByStatus = (status) => {
    if (status === "inactive") {
      const inactiveData = tourdata?.data.filter((item) => {
        const departureDate = new Date(item.lich_khoi_hanh);
        const formattedDate = departureDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const ngayhientai = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        
        return formattedDate < ngayhientai;
      });
      setFilteredDataSource(inactiveData);
    } else if (status === "active") {
      const activeData = tourdata?.data.filter((item) => {
        const departureDate = new Date(item.lich_khoi_hanh);
        const formattedDate = departureDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const ngayhientai = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        return formattedDate >= ngayhientai;
      });
      setFilteredDataSource(activeData);
    } else {
      setFilteredDataSource(tourdata?.data || []);
    }
  };

  return (
    <div>
   <div className="flex items-center justify-between  ">
  <h2 className="font-bold text-3xl whitespace-nowrap mr-7">Quản lý tour</h2>
  <div className="table_tour">
  <Button style={{ marginRight: '4px', backgroundColor: '#F6AD55', color: '#FFFFFF' }} onClick={() => handleFilter("inactive")}>
    Không hoạt động
  </Button>
  <Button style={{ backgroundColor: '#63B3ED', color: '#FFFFFF' }} onClick={() => handleFilter("active")}>
    Hoạt động
  </Button>
</div>
</div>
      <div className="flex items-center justify-end mb-4">
      <Input
          style={{ width: "250px" }}
          placeholder="Tìm kiếm lịch trình"
          value={searchValue}
          onChange={handleSearchChange}
        />
         <Button style={{ backgroundColor: "blue", marginLeft: "5px" }} type="primary" onClick={handleSearch}>
          Tìm kiếm
        </Button>
      </div>
      <Table
        dataSource={filteredDataSource || tourdata?.data}
        loading={isLoading || isRemoveLoading}
        rowKey="ID"
        bordered
        pagination={{ pageSize: 10 }}
      >
        <Table.Column title="ID" dataIndex="id" key="id" />
        <Table.Column title="Tên Tour" dataIndex="ten_tour" key="ten_tour" />
        <Table.Column
  title="Mã Loại Tour"
  key="ma_loai_tour"
  render={(text, record) => (
    <span>
      {loaitourArrary?.map((loaiTour: { id: number, ten_loai_tour: string }) => {
        if (loaiTour.id === record.ma_loai_tour) {
          return loaiTour.ten_loai_tour;
        }
      })}
    </span>
  )}
/>
<Table.Column
  title="Ảnh"
  dataIndex="image"
  key="image"
  render={(text, record) => (
    <img
      src={`http://localhost:8000/storage/${record.image_dd}`}
      alt={`Image ${record.index}`}
      style={{ width: '200px', cursor: 'pointer', marginRight: '5px' }}
    />
  )}
/>
        <Table.Column title="Giá Trẻ Em"  dataIndex="gia_treem" key="gia_treem" />
        <Table.Column title="Giá Người Lớn" dataIndex="gia_nguoilon" key="gia_nguoilon" />
        <Table.Column
  title="Trạng thái"
  dataIndex="Trạng thái"
  key="trạng thái"
  render={(text, record) => {
    const departureDate = new Date(record.lich_khoi_hanh);
    const formattedDate = departureDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const ngayhientai = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const isExpired = formattedDate < ngayhientai;
    return (
      <span className={isExpired ? 'expired-text' : 'active-text'}>
        {isExpired ? 'Không Hoạt Động' : 'Hoạt Động'}
      </span>
    );
  }}
/>
        <Table.Column
  title="Sửa"
  key="edit"
  render={(text, record) => (
    localStorage.getItem("role") === 'admin' && (
      <div className="flex space-x-2">
        <button className="edit-button">
          <Link to={`/admin/tour/edit/${record.id}`}>
            <i className="fa fa-wrench"></i>
          </Link>
        </button>
      </div>
    )
  )}
/>
      </Table>
    </div>
  );
};

export default AdminProduct;