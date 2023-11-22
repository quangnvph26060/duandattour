type Props = {};

// import { IProduct } from "@/interfaces/product";


import { Table, Button, Skeleton, Popconfirm, Alert, Switch ,message} from "antd";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { AiOutlinePlus } from "react-icons/ai";
import { IQuanlyDattour } from "../../../../interface/qlytdatour";
import { useEffect, useState } from "react";
import React from "react";
import { useGetListBookingTourPaidQuery, useGetQuanlydattourQuery, useGetQuanlydattourchuathanhtoanQuery } from "../../../../api/qlydattour";
import { Modal, Descriptions } from "antd";

const ADmin_Qlytourdathanhtoan = (props: Props) => {
  
    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
      };
      const [messageApi, contextHolder] = message.useMessage();
      const success = () => {
        messageApi.open({
          type: 'success',
          content: 'This is a success message',
        });
      };

    // 1 useGetdattour
        const {data:Data} = useGetListBookingTourPaidQuery()
        const DataQuanly = Data?.data|| []
      
        const Tourinfo = DataQuanly.length > 0 ? DataQuanly[0].tours : null;
        const [selectedId, setSelectedId] = useState("");
        const updateStatus = (id) => {
            setSelectedId(id);
            axios.put(`http://127.0.0.1:8000/api/admin/dattour/updateStatus/${id}`)
            .then(response => {
              if(response){
                success();
              }
              // Thực hiện các tác vụ sau khi nhận được phản hồi từ API
            })
            .catch(error => {
              console.error('API error:', error);
              // Xử lý lỗi nếu có
            });
          }
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

    const dataSource = DataQuanly.map(({ id,ten_khach_hang,ngay_dat,trang_thai,id_tour,so_luong_khach,ten_tour,tours}: IQuanlyDattour) => ({
     key:  id,ngay_dat,trang_thai,id_tour,so_luong_khach,ten_khach_hang,ten_tour:Tourinfo.ten_tour,tours
      
    }));
 
    const [modalVisible, setModalVisible] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  const openModal = (record) => {
    setSelectedTour(record.tours);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTour(null);
    setModalVisible(false);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

    const columns = [
        {
            title: "Mã đặt tour",
            dataIndex: "key",
            key: "key",
        },
        {
            title: 'Tour được đặt',
            dataIndex: 'tours',
            key: 'tours',
            onCell: () => ({
              style: { cursor: 'pointer', textDecoration: 'underline' },
            }),
            render: (text, record) => {
              console.log("record.tours:", record.tours); // Thêm dòng này
              return (
                <span onClick={() => openModal(record)}>
                  {record.tours && record.tours.ten_tour}
                </span>
              );
            },
          },
        {
            title: "Ngày đặt",
            dataIndex: "ngay_dat",
            key: "ngay_dat",
        },
    
        {
            title: "Tên khách hàng",
            dataIndex: "ten_khach_hang",
            key: "ten_khach_hang",
        },
        {
            title: "Số lượng đặt",
            dataIndex: "so_luong_khach",
            key: "so_luong_khach",
        },
        {
            title: "Trạng thái",
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
                    onChange(checked);
                  }}
                />
              );
           
            },
          },


       
    ];
    
    console.log(modalVisible );
    const tourDetailsColumns = [
        {
            title: 'Điểm Đi',
            dataIndex: 'diem_di',
            key: 'diem_di',
          },
          {
            title: 'Điểm Đến',
            dataIndex: 'diem_den',
            key: 'diem_den',
          },
          {
            title: 'Ngày Khởi Hành',
            dataIndex: 'lich_khoi_hanh',
            key: 'lich_khoi_hanh',
          },
          {
            title: 'Ngày Kết Thúc',
            dataIndex: 'ngay_ket_thuc',
            key: 'ngay_ket_thuc',
          },
          {
            title: 'Giá Người Lớn',
            dataIndex: 'gia_nguoilon',
            key: 'gia_nguoilon',
          },
          {
            title: 'Giá Trẻ Em',
            dataIndex: 'gia_treem',
            key: 'gia_treem',
          },
          {
            title: 'Giá Khuyến Mãi',
            dataIndex: 'gia_khuyen_mai',
            key: 'gia_khuyen_mai',
          },
          {
            title: 'Mô Tả',
            dataIndex: 'mo_ta',
            key: 'mo_ta',
          },
        // Thêm các cột khác tương ứng với thông tin tour
      ];
    
    return (
        <div>
            <header className="mb-4 flex justify-between items-center">
                <h2 className="font-bold text-2xl">Quản lý Đơn </h2>

            </header>
            {/* {isRemoveSuccess && <Alert message="Xóa thành công" type="success" />} */}
            {<Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 10 }} />}
         
            <Modal
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        width={850} // Đặt chiều rộng của Modal theo nhu cầu
      >
        {selectedTour && (
          <div>
            <Descriptions title="Thông tin Tour" bordered>
              <Descriptions.Item label="Tên Tour">{selectedTour.ten_tour}</Descriptions.Item>
              {/* Thêm các thông tin khác từ tours mà bạn muốn hiển thị */}
            </Descriptions>

            <h2 style={{ marginTop: 16 }}>Chi tiết Tour</h2>
            <Table dataSource={[selectedTour]} columns={tourDetailsColumns}  />
          </div>
        )}
      </Modal>
            
        </div>
    );
}

export default ADmin_Qlytourdathanhtoan;