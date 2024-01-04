import React, { useState } from 'react'
import { Table, Button, Skeleton, Popconfirm, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';



const Banner_logo = () => {
    const navigate = useNavigate();
    // const { data: imagesdata, error, isLoading } = useGetSliderQuery();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    
    const openModal = (imagePath: string) => {
        setSelectedImage(imagePath);
        setIsModalVisible(true);
      };

    //   const tourArray = imagesdata || [];

    //   const dataSource = tourArray.map(({ id, url }) => ({
    //     key: id,
    //     image_banner: url,
    //     image_logo: url,
    //   }));

    const dataSource = [
        {
            key: '1',
            image_banner: 'hình ảnh banner',
            image_logo: 'hình ảnh logo'
        },
    ];

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
            render: (imagePath: string) => (
                <img
                  src={`http://localhost:8000${imagePath}`}
                  alt="img"
                  style={{ width: '50px', cursor: 'pointer' }}
                  onClick={() => openModal(imagePath)}
                />
              ),
        },
        {
            title: 'Hình ảnh Logo',
            dataIndex: 'image_logo',
            key: 'image_logo',
        },
        {
            title: 'Action',
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
                                <div className='flex gap-2'>
                                    <Button type="primary" danger>
                                        Xóa
                                    </Button>
                                    <Button type='primary' className='bg-blue-500'>
                                        <Link to={''}>Sửa</Link>
                                    </Button>
                                </div>
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
            <h1 className='text-2xl px-5 font-bold'>Quản lý Banner & Logo</h1>
            <div className='text-right px-5'>
                <button
                    className='px-5 py-2 bg-red-500 rounded-lg font-medium'
                    type="button"
                    onClick={() => navigate('/admin/add_banner')}
                >+ Thêm mới Banner & Logo</button>
            </div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}

export default Banner_logo

function useGetSliderQuery(): { data: any; error: any; isLoading: any; } {
    throw new Error('Function not implemented.');
}
