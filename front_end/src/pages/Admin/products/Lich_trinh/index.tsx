import { Table, Button, Skeleton, Popconfirm, Input, message, Switch } from "antd";
import { Link } from "react-router-dom";
import { useGetLichTrinhQuery, useRemoveLichTrinhMutation } from "../../../../api/LichTrinhApi";
import { useGetTourQuery } from "../../../../api/TourApi";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";

const Admin_Lichtrinh = () => {
  const { data: lictrinhdata, error, isLoading } = useGetLichTrinhQuery();
  const { data: tourdata } = useGetTourQuery();
  const [searchValue, setSearchValue] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [
    removeLichTrinh,
    { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess },
  ] = useRemoveLichTrinhMutation();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    const filteredData = lictrinhdata?.date.filter((item) =>
      item.noi_dung.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredDataSource(filteredData);
  };

  const confirm = (id) => {
    removeLichTrinh(id);
  };

  const updateStatus = (id) => {
    axios
      .put(`http://127.0.0.1:8000/api/admin/lichtrinh/updateStatusSchedule/${id}`)
      .then((response) => {
        if (response.data) {
          alert("Cập nhật trạng thái thành công");
        }
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };

  const lichtrinhrArray = filteredDataSource.length > 0 ? filteredDataSource : lictrinhdata?.date || [];
  const tourArrary = tourdata?.data || [];
  const dataSource = lichtrinhrArray.map(({ id, noi_dung, thoi_gian, status, id_tour }) => ({
    key: id,
    noi_dung,
    thoi_gian,
    status,
    id_tour,
  }));

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
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
      title: "Trạng thái lịch trình",
      dataIndex: "status",
      key: "status",
      render: (status, { key: id }) => {
        const check = status === 0 ? false : true;

        return (
          <Switch
            defaultChecked={check}
            onChange={(checked) => {
              updateStatus(id);
              console.log(`switch to ${checked}`);
            }}
          />
        );
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
      </header>
      <div>
        {isLoading ? (
          <Skeleton />
        ) : (
          <Table
            dataSource={filteredDataSource.length > 0 ? filteredDataSource : dataSource}
            columns={columns}
            pagination={{ pageSize: 3 }}
          />
        )}
      </div>
      {contextHolder}
    </div>
  );
};

export default Admin_Lichtrinh;