import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Banner_logo = () => {
    const navigate = useNavigate();
    const [imagesData, setImagesData] = useState([]);

    useEffect(() => {
        const fetchImagesData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/admin/bannerlogo');
                setImagesData(response.data); // Assuming the API response is an array of image data
            } catch (error) {
                console.error('Error fetching image data:', error);
            }
        };

        fetchImagesData();
    }, []);
    console.log(imagesData)

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
            render: () => (
                <img
                    src={`http://localhost:8000/storage/${imagesData[0].image_banner}`}
                    alt="img"
                    style={{ width: '200px', cursor: 'pointer' }}
                />
            ),
        },
        {
            title: 'Hình ảnh Logo',
            dataIndex: 'image_logo',
            key: 'image_logo',
            render: () => (
                <img
                    src={`http://localhost:8000/storage/${imagesData[0].image_logo}`}
                    alt="img"
                    style={{ width: '150px', cursor: 'pointer' }}
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

    const confirm = (id) => {
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
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 4 }} />
        </div>
    );
};

export default Banner_logo;
