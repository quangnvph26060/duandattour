import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Upload } from 'antd';
import { useNavigate } from 'react-router-dom';

const EditLogo = () => {
  const [logoData, setLogoData] = useState({ hinh_logo: '' });
  const [oldImage, setOldImage] = useState('');
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/logo')
      .then(response => {
        setLogoData(response.data);
        setOldImage(response.data.hinh_logo);
        form.setFieldsValue({ hinh_logo: response.data.hinh_logo });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [form]);

  const updateLogoData = (newImageUrl) => {
    axios.put('http://localhost:8000/api/admin/logo/', { hinh_logo: newImageUrl })
      .then(response => {
        console.log('Logo data updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating logo data:', error);
      });
  };

  const onFinish = (values) => {
    const newImageUrl = values.hinh_logo[0]?.response?.url || values.hinh_logo[0]?.url;
    setLogoData({ hinh_logo: newImageUrl });
    setOldImage(newImageUrl);
    updateLogoData(newImageUrl);
  };

  return (
    <div className="container mx-auto mt-10 p-6 bg-white border rounded-md shadow-md max-w-screen-md">
      <h2 className="font-bold text-2xl mb-6">Edit Logo</h2>
      <Form
        form={form}
        name="editLogoForm"
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

        <Form.Item className="py-5" wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="mr-2 bg-blue-500 hover:bg-blue-700">
            Cập nhật
          </Button>
          <Button type="default" onClick={() => navigate('/admin/logo')} className="bg-gray-300 hover:bg-gray-400">
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditLogo;
