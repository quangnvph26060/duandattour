type Props = {};

// import { IProduct } from "@/interfaces/product";
import { useEffect } from "react";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import  useNavigate  from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useGetImagesQuery,useRemoveImagesMutation } from "../../../../api/ImagesApi";
import { Iimages } from "../../../../interface/images";
const AdminImage = (props: Props) => {

   
    const { data: imagesdata, error, isLoading } = useGetImagesQuery();
    const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
    useRemoveImagesMutation();

    const confirm = (id: any) => {
        removeProduct(id);
        
    };
    // const navigate = useNavigate();
    const tourArray = imagesdata || [];
    const dataSource = tourArray.map((imagePath, index) => ({
        key: index + 1,
        image_path: imagePath,
      }));
    const columns = [
        {
            title: "ID ảnh",
            dataIndex: "key",
            key: "key",
          },
          {
            title: "Ảnh",
            dataIndex: "image_path",
            key: "image_path",
            render: (imagePath: any) => <img src={`http://localhost:8000${imagePath}`} alt="img" style={{ width: '50px' }} />,
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
                                <Link to={`/admin/tour/loai_tour/edit/${id}`}>Sửa</Link>
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
                <h2 className="font-bold text-2xl">Quản lý ảnh tour</h2>
                <Button type="primary" danger>
                    <Link to="/admin/tour/image/add" className="flex items-center space-x-2">
                        <AiOutlinePlus />
                        Thêm Ảnh Mới 
                    </Link>
                </Button>
            </header>
            {isRemoveSuccess && <Alert message="Success Text" type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default AdminImage;
