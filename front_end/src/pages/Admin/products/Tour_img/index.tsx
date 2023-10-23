type Props = {};

// import { IProduct } from "@/interfaces/product";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useGetLoaiTourQuery} from "../../../../api/LoaiTourApi";
import { useEffect } from "react";
const Admin_TourImg = (props: Props) => {

  
  
   
    
    // const dataSource = tourArray.map(({ id, tour_id	, image_id }: I?) => ({
    //     key: id,
    //     tour_id	, image_id

    // }));
    const columns = [
        {
            title: "ID ",
            dataIndex: "key",
            key: "key",
        },

  
        {
            title: "Tour id",
            dataIndex: "tour_id",
            key: "tour_id",
            render: (tour_id: number) => {
              // :))
                
              }
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
                                <Link to={`/admin/tour/diadiem/edit/${id}`}>Sửa</Link>
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
                <h2 className="font-bold text-2xl">Quản lý hình ảnh </h2>
                <Button type="primary" danger>
                    <Link to="tour/image_tour/add" className="flex items-center space-x-2">
                        <AiOutlinePlus />
                        Thêm ảnh mới 
                    </Link>
                </Button>
            </header>
            {/* {isRemoveSuccess && <Alert message="Success Text" type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />} */}
        </div>
    );
};

export default Admin_TourImg;
