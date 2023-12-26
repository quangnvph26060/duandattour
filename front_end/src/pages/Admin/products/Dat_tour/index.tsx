type Props = {};

// import { IProduct } from "@/interfaces/product";
import './css.css'
import {
  Table,
  Button,
  Skeleton,
  Popconfirm,
  Alert,
  Switch,
  message,
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

  const success = () => {
    message.success("Trạng thái đã được chuyển đổi thành công");
  };

  // 1 useGetdattour
  const { data: Data, refetch } = useGetQuanlydattourQuery();
  const DataQuanly = Data?.data || [];
  const [dataQuanly, setDataQuanly] = useState<IQuanlyDattour[]>([]);

  const Tourinfo = DataQuanly.length > 0 ? DataQuanly[0].tours : null;
  // const UserInfo = DataQuanly.length>0 ? DataQuanly[0]

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

            navigate("/admin/tour/tour_dathanhtoan");
            refetch()

          } else if (message === "Cập nhập chưa thanh toán thành công!!") {
            // Chuyển hướng đến trang chưa thanh toán
            navigate("/admin/tour/tour_chuathanhtoan");
            refetch()
          }

          success()

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
    // Thêm các cột khác tương ứng với thông tin người đặt
  ];
  // Lấy dữ liệu cho trang hiện tại

  // 2 const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
  // useRemove();

  // const confirm = (id: any) => {
  //     if(!window.confirm('bạn có muốn xóa không ')){
  //         return
  //     }
  //     removeProduct(id);

  // };

  //  const dattour = dattour?.data || [];

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
      so_luong_khach,
      ten_tour,
      tours,
    }: IQuanlyDattour) => ({
      key: id,
      ngay_dat,
      email,
      sdt,
      image_path,
      xac_nhan,
      trang_thai,
      id_tour,
      so_luong_khach,
      ten_khach_hang,
      ten_tour: Tourinfo.ten_tour,
      tours,
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
      dataIndex: "image_path",
      key: "image_path",
      render: (text, record) => (
        <img
          src={`http://localhost:8000/storage/${record.tours.image_path}`}
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
      render: (ten_khach_hang, record) => (
        <span
          style={{ cursor: "pointer", }}
          onClick={() => openUserModal(record)} // Call the function to open the modal
        >
          {ten_khach_hang}
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
      title: <span style={tableStyles}>Trạng thái thanh toán</span>,
      dataIndex: "trang_thai",
      className: "font-medium",
      key: "trang_thai",
      render: (trang_thai) => (
        <span style={{ color: trang_thai === 0 ? "red" : "green" }}>
          {trang_thai === 0 ? "Chưa thanh toán" : "Đã thanh toán"}
        </span>
      ),
    }
    ,
    {
      title: <span style={tableStyles}>Trạng thái</span>,
      dataIndex: "trang_thai",
      className: "font-medium",
      key: "xac_nhan",
      render: (xac_nhan) => (
        <span style={{ color: xac_nhan === 0 ? "red" : "green" }}>
          {xac_nhan === 0 ? "Chờ xác nhận " : "Đã  xác nhận"}
        </span>
      ),
    },
    {
      title: <span style={tableStyles}>Chuyển trạng thái thanh toán </span>,
      dataIndex: "trang_thai",
      key: "trang_thai",
      render: (trang_thai, { key: id }: any) => {
        const check = trang_thai === 0 ? false : true;
        console.log(id);

        return (
          <Switch
            defaultChecked={check}
            onChange={(checked) => {
              updateStatus(id);
            }}
          />
        );
        //   return trang_thai === 0 ? "Chưa thanh toán" : "Đã thanh toán";
      },
    },
    {
      title: <span style={tableStyles}>Xác nhận tour</span>,
      dataIndex: "so_luong_khach",
      key: "so_luong_khach",
      className: "font-medium",
    },
  ];

  console.log(modalVisible);
  const tourDetailsColumns = [
    {
      title: "Ảnh minh họa",
      dataIndex: "image_path",
      key: "image_path",
      render: (image_path) => (
        <img
          src={`http://localhost:8000/storage/${image_path}`}
          alt="Ảnh minh họa"
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

    {
      title: "Mô Tả",
      dataIndex: "mo_ta",
      key: "mo_ta",
    },
    // Thêm các cột khác tương ứng với thông tin tour
  ];

  return (
    <div>
      <header className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Quản lý Đơn </h2>
      </header>
      {/* {isRemoveSuccess && <Alert message="Xóa thành công" type="success" />} */}
      {
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 3 }}
        />
      }

<Modal
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        className="rounded-md ant-modal-content "
      >
        {selectedData && (
          <div className="p-4 ">
            <h2 className="text-xl font-bold mb-4">Thông tin Đặt Tour</h2>
            <table className="w-full  table-auto border-collapse border rounded">
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
                      {column.dataIndex === "image_path" ? (
                        <img
                          src={`http://localhost:8000/storage/${selectedData.tours[column.dataIndex]}`}
                          alt="Tour"
                          className="w-[200px] h-[150px] rounded object-cover"
                        />
                      ) : (
                        selectedData.tours[column.dataIndex]
                      )}
                    </td>
                  ))}
                  {userDetailColumns.map((column) => (
                    <td key={column.key} className="py-2 px-4">
                      {selectedData[column.dataIndex]}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Modal>
   

    </div>
  );
};

export default ADmin_DatTour;