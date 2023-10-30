type Props = {};

// import { IProduct } from "@/interfaces/product";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link,useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useGetKhachSanQuery,useRemoveKhachSanMutation } from "../../../../api/KhachSanApi";
import { IKhachSan } from "../../../../interface/khachsan";
import { useEffect } from "react";
const ADmin_khachsan = (props: Props) => {

    const { data: khachsandata, error, isLoading } = useGetKhachSanQuery();
   
    const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
    useRemoveKhachSanMutation();

    const confirm = (id: any) => {
        if(!window.confirm('bạn có muốn xóa không ')){
            return 
        }
        removeProduct(id);
        
    };
    const navigate = useNavigate();
    useEffect(()=>{
       
    },[navigate])
   
    const khachsanArray = khachsandata?.data || [];
    
    const dataSource = khachsanArray.map(({ id,loai_khach_san}: IKhachSan) => ({
        key: id,
        loai_khach_san
    }));
    
    const columns = [
        {
            title: "ID",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Loại khách sạn",
            dataIndex:"loai_khach_san",
            key: "loai_khach_san",
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
                                okText="Yes" className="text-black"
                                cancelText="No"
                            >
                                <Button type="primary" danger>
                                    Xóa
                                </Button>
                            </Popconfirm>

                            <Button type="primary" danger>
                                <Link to={`/admin/tour/loai_khach_san/edit/${id}`}>Sửa</Link>
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
                <h2 className="font-bold text-2xl">Quản lý khách sạn</h2>
                <Button type="primary" danger>
                    <Link to="/admin/tour/loai_khach_san/add" className="flex items-center space-x-2">
                        <AiOutlinePlus />
                      Tạo mới loại khách sạn
                    </Link>
                </Button>
            </header>
            {isRemoveSuccess && <Alert message="Success Text" type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
         
        </div>
    );
};

export default ADmin_khachsan;
