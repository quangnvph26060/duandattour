import React, { useState } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useGetSlidersQuery } from '../../../../api/Slider';

const Banner_logo = () => {
    const navigate = useNavigate();
    const { data: imagesData } = useGetSlidersQuery();
    console.log("123",imagesData);



    const dataSource = imagesData
        ? imagesData.map(({ id, url }) => ({
            key: id,
            image_banner: url,
            image_logo: url,
        }))
        : [];

    const columns = [
        {
            title: 'ID hình ảnh',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Hình ảnh Banner',
            dataIndex: 'image_banner',
            key: 'image_banner',
            render: (image_banner: string) => (
                <img
                    src={`http://localhost:8000${image_banner}`}
                    alt="img"
                    style={{ width: '50px', cursor: 'pointer' }}
                />
            ),
        },
        {
            title: 'Hình ảnh Logo',
            dataIndex: 'image_logo',
            key: 'image_logo',
            render: (image_logo: string) => (
                <img
                    src={`http://localhost:8000${image_logo}`}
                    alt="img"
                    style={{ width: '50px', cursor: 'pointer' }}
                />
            ),
        },
        {
            title: 'Action',
            render: ({ key: id }) => (
                <div className="flex space-x-2">
                    <Popconfirm
                        title="Bạn có muốn xóa?"
                        onConfirm={() => confirm(id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <div className="flex gap-2">
                            <Button type="primary" danger>
                                Xóa
                            </Button>
                            <Button type="primary" className="bg-blue-500">
                                <Link to={''}>Sửa</Link>
                            </Button>
                        </div>
                    </Popconfirm>
                    {/* Add other action buttons or links here */}
                </div>
            ),
        },
    ];

    const confirm = (id: string) => {
        // Implement your confirm logic here
        console.log(`Confirmed deletion for image with ID: ${id}`);
    };

    return (
        <div>
            <h1 className="text-2xl px-5 font-bold">Quản lý Banner & Logo</h1>
            <div className="text-right px-5">
                <button
                    className="px-5 py-2 bg-red-500 rounded-lg font-medium"
                    type="button"
                    onClick={() => navigate('/admin/add_banner')}
                >
                    + Thêm mới Banner & Logo
                </button>
            </div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
};

export default Banner_logo;
