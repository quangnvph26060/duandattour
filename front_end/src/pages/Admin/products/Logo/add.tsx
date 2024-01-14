import { Button, Upload, Form } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add_logo = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('hinh_logo', values.hinh_logo[0].originFileObj);

    try {
      await axios.post('http://localhost:8000/api/admin/logo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // If the request is successful, navigate to the desired route
      navigate('/admin/logo');
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error adding logo:', error.message);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6 bg-white border rounded-md shadow-md max-w-screen-md">
      <h2 className="font-bold text-2xl mb-6">Thêm Logo mới</h2>
      <Form
        name="addLogoForm"
        onFinish={onFinish}
        autoComplete="off"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Upload Image Logo"
          name="hinh_logo"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
          rules={[{ required: true, message: 'Please upload an image for the logo!' }]}
        >
          <Upload beforeUpload={() => false} accept="image/*">
            <Button className="bg-blue-500 text-white hover:bg-blue-700">
              Click to Upload
            </Button>
          </Upload>
        </Form.Item>

        <div className='py-4'>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="mr-2 bg-blue-500 hover:bg-blue-700">
              Thêm
            </Button>
            <Button type="default" onClick={() => navigate('/admin/logo')} className="bg-gray-300 hover:bg-gray-400">
              Quay lại
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Add_logo;
