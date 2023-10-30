type Props = {};

// import { IProduct } from "@/interfaces/product";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useGetLichTrinhQuery, useRemoveLichTrinhMutation } from "../../../../api/LichTrinhApi";
import { ILichTrinh } from "../../../../interface/lichtrinh";
import { ITour } from "../../../../interface/tour";
import { useGetTourQuery } from "../../../../api/TourApi";

import { useEffect } from "react";

const Admin_Lichtrinh = (props: Props) => {

    const { data: lictrinhdata, error, isLoading } = useGetLichTrinhQuery();
    const { data: tourdata } = useGetTourQuery();


    const [removeLichTrinh, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
        useRemoveLichTrinhMutation();

    const confirm = (id: any) => {
        removeLichTrinh(id);
    };
    // const navigate = useNavigate();
    const lichtrinhrArray = lictrinhdata?.date || [];
    const tourArrary = tourdata?.data || [];
    const dataSource = lichtrinhrArray.map(({ id, tieu_de, noi_dung, thoi_gian, id_tour }: ILichTrinh) => ({
        key: id,
        tieu_de, noi_dung, thoi_gian, id_tour
    }));




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
            render: (id_tour: number) => {
                const Tour = tourArrary.find((item) => item.id === id_tour);
                return Tour ? Tour.ten_tour : "Không xác định";

            }
        },

        {
            title: "Action",
            render: ({ key: id }: any) => {
                return (
                    <>
                     {  localStorage.getItem("role") == 'admin' ?  <div className="flex space-x-2">
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

                            <Button type="primary" danger>
                                <Link to={`/admin/tour/lich_trinh/edit/${id}`}>Sửa</Link>
                            </Button>

                        </div>:""}  
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
                        <AiOutlinePlus />
                        Tạo mới lịch trình
                    </Link>
                </Button>

            </header>
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default Admin_Lichtrinh;
