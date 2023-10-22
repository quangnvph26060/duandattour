type Props = {};

// import { IProduct } from "@/interfaces/product";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { ITour } from "../../../../interface/tour";
import { useGetHuongDanVienQuery,useRemoveHuongDanVienMutation } from "../../../../api/HuongDanVienApi";
import { IHuongDanVien } from "../../../../interface/huongDanVien";


const Admin_Account_huongdanvien = (props: Props) => {

    const { data: huongDanVienData, error, isLoading } = useGetHuongDanVienQuery();
    const [removeHuongDanVien, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] = useRemoveHuongDanVienMutation();

    const confirm = (id: any) => {
        removeHuongDanVien(id);
        
    };

    const huongDanVienArray = huongDanVienData?.data || [];
    
    const dataSource = huongDanVienArray.map(({ id,ten_hd,email,password ,dia_chi,sdt}: IHuongDanVien) => ({
        key: id,
        ten_hd,
        email,
        password,
        dia_chi,
        sdt
    }));
    
    const columns = [
        {
            
            title: "ID hdv",
            dataIndex: "key",
            key: "key",
        },
        {
            
            title: "Họ tên",
            dataIndex: "ten_hd",
            key: "ten_hd",
        },
        // {
        //     title: "Ảnh đại diện",
        //     dataIndex:"image",
        //     key: "image",
        // },
        
        {
            title: "Email",
            dataIndex:"email",
            key: "email",
        },
        {
            title: "Password",
            dataIndex:"password",
            key: "password",
        },
        {
            title: "Địa chỉ",
            dataIndex:"dia_chi",
            key: "dia_chi",
        },
        {
            title: "Số điện thoại",
            dataIndex:"sdt",
            key: "sdt",
        },

        {
            title: "Action",
            render: ({ key: id }: any) => {
                return (
                    <>
                        <div className="flex space-x-2">
                            <Popconfirm
                                title="Bạn có muốn xóa?"
                                onConfirm={() => confirm(id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="primary" danger>
                                    Xóa
                                </Button>
                            </Popconfirm>

                            <Button type="primary" danger>
                                <Link to={`/admin/account_huongdanvien/edit/${id}`}>Sửa</Link>
                            </Button>
                        </div>
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <header className="mb-4 flex justify-between items-center">
                <h2 className="font-bold text-2xl">Quản lý hướng dẫn viên</h2>
                <Button type="primary" danger>
                    <Link to="/admin/account_huongdanvien/add" className="flex items-center space-x-2">
                        <AiOutlinePlus />
                        Tạo mới hướng dẫn viên
                    </Link>
                </Button>
               
            </header>
            {isRemoveSuccess && <Alert message="Đã xóa hưỡng dẫn viên" type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
          
        </div>
    );
};

export default Admin_Account_huongdanvien;
