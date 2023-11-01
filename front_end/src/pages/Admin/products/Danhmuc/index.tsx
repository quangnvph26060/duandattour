type Props = {};

// import { IProduct } from "@/interfaces/product";
import { useEffect } from "react";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import useNavigate from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useGetLoaiTourQuery, useRemoveLoaiTourMutation } from "../../../../api/LoaiTourApi";
import { ILoaiTour } from "../../../../interface/loaiTour";



const AdminLoai_tour = (props: Props) => {
    const { data: tourdata, error, isLoading } = useGetLoaiTourQuery();
    const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
        useRemoveLoaiTourMutation();
    const confirm = (id: any) => {
        removeProduct(id);
    };
    // const navigate = useNavigate();
    const tourArray = tourdata?.data || [];

    const dataSource = tourArray.map(({ id, ten_loai_tour }: ILoaiTour) => ({
        key: id,
        ten_loai_tour
    }));



    const columns = [
        {
            title: "ID loại tour",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Tên loại tour",
            dataIndex: "ten_loai_tour",
            key: "ten_loai_tour",
        },
        {
            title: "Action",
            render: ({ key: id }: any) => {
                return (
                    <>
                     {  localStorage.getItem("role") == 'admin' ? <div className="flex space-x-2">
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
                                <Link to={`/admin/tour/loai_tour/edit/${id}`}>Sửa</Link>
                            </Button>
                        </div>:""}   
                    </>
                );
            },
        },
    ];
    // useEffect(()=>{
    //     if(isRemoveSuccess){
    //         // navigator("/admin/tour/loai_tour")
    //         // Navigator
    //         useNavigate("/admin/tour/loai_tour");
    //     }
    // }, [])
    return (
        <div>
            <header className="mb-4 flex justify-between items-center">
                <h2 className="font-bold text-2xl">Quản lý loại tour</h2>
                <Button type="primary" danger>
                    <Link to="/admin/tour/loai_tour/add" className="flex items-center space-x-2">
                        <AiOutlinePlus />
                        Tạo mới loại tour
                    </Link>
                </Button>
            </header>
            {isRemoveSuccess && <Alert message="Success Text" type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default AdminLoai_tour;
