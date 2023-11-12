type Props = {};

// import { IProduct } from "@/interfaces/product";

import { Table, Button, Skeleton, Popconfirm, Alert, } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons"
import { AiOutlinePlus } from "react-icons/ai";
import { IQuanlyDattour } from "../../../../interface/qlytdatour";
import { useEffect, useState } from "react";
import React from "react";
import { useGetQuanlydattourQuery } from "../../../../api/qlydattour";
import { Modal, Descriptions } from 'antd';
const ADmin_DatTour = (props: Props) => {
  

    // 1 useGetdattour
        const {data:Data} = useGetQuanlydattourQuery()
        const DataQuanly = Data?.data|| []
      
        const Tourinfo = DataQuanly.length > 0 ? DataQuanly[0].tours : null;
      
        console.log(Tourinfo);
  
    // 2 const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
    // useRemove();

    // const confirm = (id: any) => {
    //     if(!window.confirm('bạn có muốn xóa không ')){
    //         return 
    //     }
    //     removeProduct(id);

    // };


    //  const dattour = dattour?.data || [];

    const dataSource = DataQuanly.map(({ id,ten_khach_hang,ngay_dat,trang_thai,id_tour,so_luong_khach,ten_tour}: IQuanlyDattour) => ({
     key:  id,ngay_dat,trang_thai,id_tour,so_luong_khach,ten_khach_hang,ten_tour:Tourinfo.ten_tour,
      
    }));




    const columns = [
        {
            title: "Mã đặt tour",
            dataIndex: "key",
            key: "key",
        },
        {
            title: 'Tour được đặt đặt',
            dataIndex: 'ten_tour',
            key: 'ten_tour',
            onCell: () => ({
              style: { cursor: 'pointer', textDecoration: 'underline' },
            }),
            render: (text, record) => (
              <span onClick={() => openModal(record)}>
                {text}
              </span>
            ),
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
            render: (trang_thai) => {
              return trang_thai === 0 ? "Chưa thanh toán" : "Đã thanh toán";
            },
          },


        {
            title: "Action",
            render: ({ key: id }: any) => {
                return (
                    <>

                        <div className="">
                            <div className="space-x-2 py-1">
                                <Button>
                                    <Link to="/admin/tour/hoa_don"><CheckOutlined type="primary" style={{ color: "blue" }} /></Link>
                                </Button>
                            </div>
                            <div className="space-x-2">
                                <Popconfirm
                                    title="Bạn có muốn xóa?"
                                    onConfirm={() => confirm(id)}
                                    okText="Yes" className="text-black"
                                    cancelText="No"
                                >
                                    <Button danger>
                                        <DeleteOutlined type="primary" style={{ color: "red" }} />
                                    </Button>

                                </Popconfirm>
                                <Button>
                                    <Link to={`/admin/Dat_tour/edit/${id}`}><EditOutlined /></Link>
                                </Button>
                            </div>

                        </div>
                    </>
                );
            },
        },
    ];
    
    
    return (
        <div>
            <header className="mb-4 flex justify-between items-center">
                <h2 className="font-bold text-2xl">Quản lý Đơn </h2>

            </header>
            {/* {isRemoveSuccess && <Alert message="Xóa thành công" type="success" />} */}
            {<Table dataSource={dataSource} columns={columns} />}
       
            
        </div>
    );
}

export default ADmin_DatTour;