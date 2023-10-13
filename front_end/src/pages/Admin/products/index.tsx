type Props = {};
// import { useGetProductsQuery, useRemoveProductMutation } from "@/api/product";
// import { IProduct } from "@/interfaces/product";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const AdminProduct = (props: Props) => {
    // const { data: productData, error, isLoading } = useGetProductsQuery();
    // const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
    //     useRemoveProductMutation();

    // const confirm = (_id: number) => {
    //     removeProduct(_id);
    // };
    // const dataSource = productData?.map(({ _id, name, price,desc,quantily }: IProduct) => ({
    //     key: _id,
    //     name,
    //     price,
    //     desc,
    // quantily

    // }));
    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Miêu tả",
            dataIndex: "desc",
            key: "desc",
        },
        {
            title: "Số lượng",
            dataIndex: "quantily",
            key: "quantily",
        },
        {
            title: "Action",
            render: ({ key: _id }: any) => {
                return (
                    <>
                        <h2>quang gánhtemea</h2>
                        <div className="flex space-x-2">
                            <Popconfirm
                                title="Are you fucking sure?"
                                onConfirm={() => confirm(_id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="primary" danger>
                                    Xóa
                                </Button>
                            </Popconfirm>

                            <Button type="primary" danger>
                                <Link to={`/admin/products/${_id}`}>Sửa</Link>
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
                <h2 className="font-bold text-2xl">Quản lý sản phẩm</h2>
                
                <Button type="primary" danger>
                    <Link to="/admin/product/add" className="flex items-center space-x-2">
                        <AiOutlinePlus />
                    Thêm sản phẩm
                    </Link>
                </Button>
            </header>
            {/* {isRemoveSuccess && <Alert message="Success Text" type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />} */}
             <Table dataSource={columns} columns={columns} />;
        </div>
    );
};

export default AdminProduct;
