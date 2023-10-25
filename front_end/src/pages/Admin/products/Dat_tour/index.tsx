type Props = {};

// import { IProduct } from "@/interfaces/product";

import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

import { useEffect } from "react";
const ADmin_DatTour = (props: Props) => {

    // 1 useGetdattour

    // 2 const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
    // useRemove();

    // const confirm = (id: any) => {
    //     if(!window.confirm('bạn có muốn xóa không ')){
    //         return 
    //     }
    //     removeProduct(id);

    // };
    const navigate = useNavigate();
    useEffect(() => {

    }, [navigate])

    //  const dattour = dattour?.data || [];

    // const dataSource = dattour.map(({ id_dat_tour,ngay_dat,trang_thai,id_tour,id_khach_hang,so_luong}: TDattour) => ({
    //  key:  id_dat_tour,ngay_dat,trang_thai,id_tour,id_khach_hang,so_luong
    //   
    // }));


    const dataSource = [
        {
            key: '1',
            ma_dat_tour: 'DT001',
            ngay_dat: '2023-10-16',
            trang_thai: 'Chưa thanh toán',
            id_tour: 'T001',
            id_khach_hang: 'KH001',
            so_luong: 2,
        },
        {
            key: '2',
            ma_dat_tour: 'DT002',
            ngay_dat: '2023-10-17',
            trang_thai: 'Chưa thanh toán',
            id_tour: 'T002',
            id_khach_hang: 'KH002',
            so_luong: 3,
        },

    ];


    const columns = [
        {
            title: "Mã đặt tour",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Ngày đặt",
            dataIndex: "ngay_dat",
            key: "ngay_dat",
        },
        {
            title: "Trạng thái",
            dataIndex: "trang_thai",
            key: "trang_thai",
        },
        {
            title: "Tour được đặt",
            dataIndex: "id_tour",
            key: "id_tour",
        },
        {
            title: "Mã khách hàng",
            dataIndex: "id_khach_hang",
            key: "id_khach_hang",
        },
        {
            title: "Số lượng đặt",
            dataIndex: "so_luong",
            key: "so_luong",
        },


        {
            title: "Action",
            render: ({ key: id }: any) => {
                return (
                    <>

                        <div className="flex space-x-2">
                            <Button danger type="primary" >
                                <Link to="/admin/tour/hoa_don">Xác nhận đặt tour</Link>
                            </Button>
                            <Popconfirm
                                title="Bạn có muốn xóa?"
                                onConfirm={() => confirm(id)}
                                okText="Yes" className="text-black"
                                cancelText="No"
                            >
                                <Button type="primary" danger>
                                    Xóa
                                </Button>
                            </Popconfirm>

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
};

export default ADmin_DatTour;
