type Props = {};

// import { IProduct } from "@/interfaces/product";
import "./css.css";
import {
  Table,
  Button,
  Skeleton,
  Popconfirm,
  Alert,
  Switch,
  message,
  Select,
  DatePicker,
  Input,
} from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { AiOutlinePlus } from "react-icons/ai";
import { IQuanlyDattour } from "../../../../interface/qlytdatour";
import { useEffect, useState } from "react";
import React from "react";
import { useGetQuanlydattourQuery } from "../../../../api/qlydattour";
import { Modal, Descriptions } from "antd";

const ADmin_DatTour = (props: Props) => {
  const [filterStatus, setFilterStatus] = useState("all"); // Mặc định là "all", có thể là "chuathanhtoan" hoặc "dathanhtoan"
  //filter 

  const [sortedData, setSortedData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = (record) => {
    setSelectedData(record);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedData(null);
    setModalVisible(false);
  };
  const navigate = useNavigate();
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    if (checked) {
      success();
    }
  };
  const handleEditStatus = () => {
    return 5 + 5;
  };
  const success = () => {
    message.success("Trạng thái thanh toánđã được chuyển đổi thành công");
  };
  const success1 = () => {
    message.success("Xác nhận tour thành công");
  };

  // 1 useGetdattour
  const { data: Data, refetch } = useGetQuanlydattourQuery();
  const DataQuanly = Data?.data || [];
  const [dataQuanly, setDataQuanly] = useState<IQuanlyDattour[]>([]);

  const Tourinfo = DataQuanly.length > 0 ? DataQuanly[0].tours : null;

  const ThanhToaninfor = DataQuanly.length > 0 ? DataQuanly[0].thanh_toan : null;
  // const UserInfo = DataQuanly.length>0 ? DataQuanly[0]
//  console.log(Tourinfo);
 
  const [selectedId, setSelectedId] = useState("");
  useEffect(() => {
    if (DataQuanly) {
      const sorted = [...DataQuanly].sort((a, b) => {
        const timestampA = new Date(a.created_at).getTime() / 1000;
        const timestampB = new Date(b.created_at).getTime() / 1000;
        return timestampB - timestampA;
      });
      setSortedData(sorted);
    }
  }, [DataQuanly]);
  const updateStatus = (id) => {
    setSelectedId(id);

    axios
      .put(`http://127.0.0.1:8000/api/admin/dattour/updateStatus/${id}`)
      .then((response) => {
        if (response) {
          const message = response.data.message;

          if (message === "Xác nhận đơn đặt tour thành công") {
            // Chuyển hướng đến trang đã thanh toán

       
            refetch();
          } else if (message === "Cập nhập chưa thanh toán thành công!!") {
            // Chuyển hướng đến trang chưa thanh toán
          
            refetch();
          }

          success();
        }
        // Thực hiện các tác vụ sau khi nhận được phản hồi từ API
      })
      .catch((error) => {
        console.error("API error:", error);
        // Xử lý lỗi nếu có
      });
  };
  const updateStatusXacnhan = (id) => {
    setSelectedId(id);

    axios
      .put(`http://127.0.0.1:8000/api/admin/dattour/updateConfirm/${id}`)
      .then((response) => {
        if (response) {
          const message = response.data.message;

          if (message === "Xác nhận đơn hàng thành công!!") {
            
            refetch();
          } else if (message === "Cập nhập chưa thanh toán thành công!!") {
            // Chuyển hướng đến trang chưa thanh toán
            // navigate("/admin/tour/tour_chuathanhtoan");
            refetch();
          }

          success1();
        }
        // Thực hiện các tác vụ sau khi nhận được phản hồi từ API
      })
      .catch((error) => {
        console.error("API error:", error);
        // Xử lý lỗi nếu có
      });
  };
  const userDetailColumns = [
    {
      title: "Tên người đặt",
      dataIndex: "ten_khach_hang",
      key: "ten_khach_hang",
    },
    {
      title: "Email người đặt",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại người đặt",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: <span>Trạng thái thanh toán</span>,
      dataIndex: "trang_thai",
      className: "font-medium",
      key: "trang_thai",
      render: (trang_thai) => (
        <span style={{ color: trang_thai === 0 ? "red" : "green" }}>
          {trang_thai === 0 ? "Chưa thanh toán" : "Đã thanh toán"}
        </span>
      ),
    },
    {
      title: "Xác nhận tour",
      dataIndex: "xac_nhan",
      key: "xac_nhan",
      render: (xac_nhan) => (
        <span style={{ color: xac_nhan === 0 ? "red" : "green" }}>
          {xac_nhan === 0 ? "Chờ xác nhận" : "Đã xác nhận"}
        </span>
      ),
    },
    // Thêm các cột khác tương ứng với thông tin người đặt
  ];

  
  const dataSource = sortedData.map(
    ({
      id,
      ten_khach_hang,
      email,
      sdt,
      image_path,
      ngay_dat,
      xac_nhan,
      trang_thai,
      id_tour,
      image_dd,
      so_luong_khach,
      tong_tien_tt,
      ten_tour,
      tours,
      thanh_toan,
      thanh_toan_deltail
    }
    : IQuanlyDattour) => ({
      key: id,
      ngay_dat,
      email,
      sdt,
      image_dd,
      xac_nhan,
      trang_thai,
      id_tour,
      so_luong_khach,
      // tong_tien_tt: ThanhToaninfor.tong_tien_tt,
      ten_khach_hang,
      ten_tour: Tourinfo.ten_tour,
      tours,
      thanh_toan,
      thanh_toan_deltail
    })
  );

  const tableStyles: React.CSSProperties = {
    fontWeight: "bold",
    textAlign: "center",
  };

  const columns = [
    {
      title: (
        <span style={tableStyles} className="w-[40px]">
          ID
        </span>
      ),
      dataIndex: "key",
      className: "font-medium",
      key: "key",
    },
    {
      title: <span style={tableStyles}>Chi tiết</span>,
      dataIndex: "tours",
      className: "font-medium",
      key: "tours",
      onCell: () => ({
        style: { cursor: "pointer", textDecoration: "" },
      }),
      render: (text, record) => (
        <span onClick={() => openModal(record)}>
          👁
          {record.tours && record.tours.ten_tour}
        </span>
      ),
    },
    {
      title: <span style={tableStyles}>Ảnh minh họa</span>,
      dataIndex: "image_dd",
      key: "image_dd",
      render: (text, record) => (
        <img
          src={`http://localhost:8000/storage/${record.tours.image_dd}`}
          alt="img"
          style={{ width: "200px", cursor: "pointer" }}
        />
      ),
    },
    {
      title: <span style={tableStyles}>Ngày đặt</span>,
      dataIndex: "ngay_dat",
      key: "ngay_dat",
      className: "font-medium",
    },

    {
      title: <span style={tableStyles}>Tên người đặt</span>,
      dataIndex: "ten_khach_hang",
      key: "ten_khach_hang",
      className: "font-medium",
      render: (ten_khach_hang: any, record: any) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => openUserModal(record)} // Call the function to open the modal
        >
          {ten_khach_hang || "Không có tên"}
        </span>
      ),
    },
    {
      title: <span style={tableStyles}>Số lượng đặt tour</span>,
      dataIndex: "so_luong_khach",
      key: "so_luong_khach",
      className: "font-medium",
    },
    {
      title: <span style={tableStyles}>Tổng tiền</span>,
      dataIndex: "tong_tien_tt",
      className: "font-medium",
      key: "tong_tien_tt",
      render: (text, record) => (
        <span>
          {record.thanh_toan && record.thanh_toan.tong_tien_tt ? (
            record.thanh_toan.tong_tien_tt
          ) : (
            record.thanh_toan_deltail && record.thanh_toan_deltail.tong_tien_tt
          )}
        </span>
      ),
    },
    {
      title: <span style={tableStyles}>Trạng thái thanh toán</span>,
      dataIndex: "trang_thai",
      className: "font-medium",
      key: "trang_thai",
      render: (trang_thai) => (
        <span style={{ color: trang_thai === 0 ? "red" : "green" }}>
          {trang_thai === 0 ? "Chưa thanh toán" : "Đã thanh toán"}
        </span>
      ),
    },
    {
      title: <span style={tableStyles}>Trạng thái</span>,
      dataIndex: "xac_nhan",
      className: "font-medium",
      key: "xac_nhan",
      render: (xac_nhan) => (
        <span style={{ color: xac_nhan === 0 ? "red" : "green" }}>
          {xac_nhan === 0 ? "Chờ xác nhận " : "Đã  xác nhận"}
        </span>
      ),
    },
    {
      title: <span style={tableStyles}>Chuyển trạng thái thanh toán</span>,
      dataIndex: "trang_thai",
      key: "trang_thai",
      render: (trang_thai, { key: id }: any) => {
        // Kiểm tra nếu trạng thái là 1 (Đã thanh toán), ẩn Switch
        if (trang_thai === 1) {
          return <CheckOutlined style={{ color: 'green' }} />;
        }

        // Nếu trạng thái là 0 (Chưa thanh toán), hiển thị Switch
        return (
          <Switch
            defaultChecked={trang_thai === 0 ? false : true}
            onChange={(checked) => {
              updateStatus(id);
            }}
          />
        );
      },
    },

    {
      title: <span style={tableStyles}>Xác nhận tour</span>,
      dataIndex: "xac_nhan",
      key: "xac_nhan",
      className: "font-medium",
      render: (xac_nhan, { key: id }: any) => {
        // Kiểm tra nếu trạng thái là 1 (Đã thanh toán), ẩn Switch
        if (xac_nhan === 1) {
          return <CheckOutlined style={{ color: 'green' }} />;
        }

        // Nếu trạng thái là 0 (Chưa thanh toán), hiển thị Switch
        return (
          <Switch
            defaultChecked={xac_nhan === 0 ? false : true}
            onChange={(checked) => {
              updateStatusXacnhan(id);
            }}
          />
        );
      },
    },
  ];

  console.log(modalVisible);
  const tourDetailsColumns = [
    {
      title: <span style={tableStyles}>Ảnh minh họa</span>,
      dataIndex: "image_dd",
      key: "image_dd",
      render: (text, record) => (
        <img
          src={`http://localhost:8000/storage/${record.tours?.image_dd}`}
          alt="img"
          style={{ width: "200px", cursor: "pointer" }}
        />
      ),
    },

    {
      title: "Điểm Đi",
      dataIndex: "diem_di",
      key: "diem_di",
    },
    {
      title: "Điểm Đến",
      dataIndex: "diem_den",
      key: "diem_den",
    },
    {
      title: "Ngày Khởi Hành",
      dataIndex: "lich_khoi_hanh",
      key: "lich_khoi_hanh",
    },
    {
      title: "Ngày Kết Thúc",
      dataIndex: "ngay_ket_thuc",
      key: "ngay_ket_thuc",
    },
    {
      title: "Giá Người Lớn",
      dataIndex: "gia_nguoilon",
      key: "gia_nguoilon",
    },
    {
      title: "Giá Trẻ Em",
      dataIndex: "gia_treem",
      key: "gia_treem",
    },

    // {
    //   title: "Mô Tả",
    //   dataIndex: "mo_ta",
    //   key: "mo_ta",
    // },
    // Thêm các cột khác tương ứng với thông tin tour
  ];
  //loc ngay
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
  };
  const [searchTourName, setSearchTourName] = useState("");

// Thêm hàm để cập nhật giá trị tên tour khi người dùng thay đổi
const handleSearchTourNameChange = (event) => {
  setSearchTourName(event.target.value);
};
  const filteredDataSource = dataSource.filter((record) => {
    if (filterStatus === "chuathanhtoan") {
      return record.trang_thai === 0; // Lọc các tour có trang_thai bằng 0 (Chưa thanh toán)
    } else if (filterStatus === "dathanhtoan") {
      return record.trang_thai === 1; // Lọc các tour có trang_thai bằng 1 (Đã thanh toán)
    }
    return true; // Trả về tất cả các bản ghi nếu filterStatus là "all"
  }
  )
  .filter((record) => {
    // Logic lọc theo ngày
    if (dateRange[0] && dateRange[1]) {
      const orderDate = new Date(record.ngay_dat);
      return orderDate >= dateRange[0] && orderDate <= dateRange[1];
    }
    return true;
  })
  .filter((record) => {
    // Logic lọc theo tên tour
    if (searchTourName) {
      if (
        !record.tours?.ten_tour
          .toLowerCase()
          .includes(searchTourName.toLowerCase())
      ) {
        return false;
      }
    }
    // Các điều kiện lọc khác (trạng thái, ngày) ở đây...

    return true;
  })
  

  return (
    <div>
      <header className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Quản lý Đơn </h2>
      </header>
      <div className="flex justify-between">
      <div className="">
       
      <Input className="h-[40px]"
        placeholder="Tìm kiếm theo tên tour"
        value={searchTourName}
        onChange={handleSearchTourNameChange}
      />
        <DatePicker.RangePicker className="mt-2 h-[40px]" onChange={handleDateChange} />
      </div>
      <div className="flex gap-3">
      <Button className="text-white h-[40px] bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => setFilterStatus("chuathanhtoan")}>
          Tour chưa thanh toán
        </Button>
        <Button className="text-gray-900 bg-gradient-to-r h-[40px] from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => setFilterStatus("dathanhtoan")}>
          Tour đã thanh toán
        </Button>
      </div>
       
      </div>
      {/* {isRemoveSuccess && <Alert message="Xóa thành công" type="success" />} */}
      {
        <Table className="mt-5"
          dataSource={filteredDataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      }

      <Modal
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        className="rounded-md text-center items-center content-center ml-64 ant-modal-content"
      >
        {selectedData && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Thông tin Đặt Tour</h2>
            <table className="w-full table-auto border-collapse border rounded">
              <tbody>
                <tr className="border-b">
                  {tourDetailsColumns.map((column) => (
                    <td key={column.key} className="py-2 px-4 font-semibold">
                      {column.title}
                    </td>
                  ))}
                  {userDetailColumns.map((column) => (
                    <td key={column.key} className="py-2 px-4 font-semibold">
                      {column.title}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  {tourDetailsColumns.map((column) => (
                    <td key={column.key} className="py-2 px-4">
                      {column.dataIndex === "image_dd" ? (
                        <img
                          src={`http://localhost:8000/storage/${
                            selectedData.tours[column.dataIndex]
                          }`}
                          alt="Tour"
                          className="w-[300px] h-[200px] rounded object-cover"
                        />
                      ) : (
                        selectedData.tours[column.dataIndex]
                      )}
                    </td>
                  ))}
                  {userDetailColumns.map((column) => (
                    <td key={column.key} className="py-2 px-4">
                      {column.dataIndex === "trang_thai" ? (
                        <span
                          style={{
                            color:
                              selectedData[column.dataIndex] === 0
                                ? "red"
                                : "green",
                          }}
                        >
                          {selectedData[column.dataIndex] === 0
                            ? "Chưa thanh toán"
                            : "Đã thanh toán"}
                        </span>
                      ) : column.dataIndex === "xac_nhan" ? (
                        <span
                          style={{
                            color:
                              selectedData[column.dataIndex] === 0
                                ? "red"
                                : "green",
                          }}
                        >
                          {selectedData[column.dataIndex] === 0
                            ? "Chờ xác nhận"
                            : "Đã xác nhận"}
                        </span>
                      ) : (
                        selectedData[column.dataIndex]
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>

       
            {/* <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Sửa Trạng thái</h2>
              <div>
                <p>
                  <span className="font-semibold">Trạng thái thanh toán: </span>
                  {selectedData.trang_thai === 0 ? (
                    <Switch
                      defaultChecked={selectedData.trang_thai === 1}
                      onChange={(checked) => {
                  
                        const newTrangThai = checked ? 1 : 0;
                     
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        color: selectedData.trang_thai === 0 ? "red" : "green",
                      }}
                    >
                      {selectedData.trang_thai === 0
                        ? "Chưa thanh toán"
                        : "Đã thanh toán"}
                    </span>
                  )}
                </p>
                <p>
                  <span className="font-semibold">Trạng thái xác nhận: </span>
                  {selectedData.xac_nhan === 0 ? (
                    <Switch
                      defaultChecked={selectedData.xac_nhan === 1}
                      onChange={(checked) => {
                    
                        const newxacnhan = checked ? 1 : 0;
                     
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        color: selectedData.xac_nhan === 0 ? "red" : "green",
                      }}
                    >
                      {selectedData.xac_nhan === 0
                        ? "Chưa xác nhận "
                        : "Đã xác nhận"}
                    </span>
                  )}
                </p>
              </div>

          
              <div className="mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleEditStatus}
                >
                  Lưu
                </button>
              </div>
            </div> */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ADmin_DatTour;
