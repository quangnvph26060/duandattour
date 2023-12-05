import React from "react";
import { Table, Button, Skeleton, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const Admin_baiviet = () => {
    const dataSource = [
        {
            key: 1,
            ten_bai_viet: "Bài viết cương",
            image: "image_url_1.jpghttps://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/399083074_666738505589224_5550605208199897590_n.jpg?stp=dst-jpg_p843x403&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Z6q--I4u1U4AX-mpVqv&_nc_ht=scontent.fhan14-3.fna&oh=00_AfAhGnPQEVEVOXt_CGOJHdx5C6cGjN-dFNyeuyhTrrPEMA&oe=6566DDAE", // You can use the image URL or any other representation you need
            mo_ta: "Mô tả bài viết 1",
        },
        {
            key: 2,
            ten_bai_viet: "Bài viết thái",
            image: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/399083074_666738505589224_5550605208199897590_n.jpg?stp=dst-jpg_p843x403&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Z6q--I4u1U4AX-mpVqv&_nc_ht=scontent.fhan14-3.fna&oh=00_AfAhGnPQEVEVOXt_CGOJHdx5C6cGjN-dFNyeuyhTrrPEMA&oe=6566DDAE",
            mo_ta: "Mô tả bài viết 2",
        },
        // Add more data objects as needed
    ];

    const columns = [
        {
            title: "ID bài viết",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Tên bài viết",
            dataIndex: "ten_bai_viet",
            key: "ten_bai_viet",
        },
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            render: (image) => (
                <img src={image} alt="Bài viết" style={{ maxWidth: "100px", maxHeight: "100px" }} />
            ),
        },
        {
            title: "Mô tả",
            dataIndex: "mo_ta",
            key: "mo_ta",
        },
        {
            title: "Action",
            render: ({ key: id }) => {
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
                            {/* Add other action buttons or links here */}
                        </div>
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <header className="mb-4 flex justify-between items-center">
                <h2 className="font-bold text-2xl">Quản lý  bài viết</h2>
                <Button type="primary" danger>
                    <Link to="/admin/tour/loai_tour/add" className="flex items-center space-x-2">
                        <AiOutlinePlus />
                        Tạo mới bài viết
                    </Link>
                </Button>
            </header>
            {/* Add your table component here */}
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
};

export default Admin_baiviet;
