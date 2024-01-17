import React, { useState, useEffect } from 'react';
import { Form, Button, Upload, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// ... (your existing imports)

const Edit_banner = () => {
  const navigate = useNavigate();
  const [bannerData, setBannerData] = useState(null);
  const [form] = Form.useForm(); // Get the form instance

  useEffect(() => {
    // Fetch banner data based on the ID or any other identifier
    const fetchBannerData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/banner');
        setBannerData(response.data); // Assuming the API response is an object containing banner details
        // Populate the form fields with the banner data
        form.setFieldsValue({
          hinh_banner: [{ uid: response.data.id, originFileObj: response.data.hinh_banner }],
          link_banner: response.data.link_banner,
        });
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchBannerData();
  }, [form]);

  const onFinish = async (values) => {
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('hinh_banner', values.hinh_banner[0].originFileObj); // Use originFileObj to get the file
      formData.append('link_banner', values.link_banner);

      // Make a PUT request using Axios
      await axios.put(`http://localhost:8000/api/admin/banner/${bannerData.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // If the request is successful, navigate to the desired route
      navigate('/admin/banner_logo');
      message.success('Cập nhật thành công'); // Display success message
    } catch (error) {
      console.error('Error updating banner:', error);
      message.error('Đã xảy ra lỗi. Vui lòng thử lại.'); // Display error message
    }
  };

  if (!bannerData) {
    // Render loading state or redirect to an error page
    return <div></div>;
  }

  return (
    <div className="container mx-auto mt-10 p-6 bg-white border rounded-md shadow-md max-w-screen-md">
      <h2 className="font-bold text-2xl mb-6">Sửa Banner</h2>
      <Form
        form={form}
        name="editBannerForm"
        onFinish={onFinish}
        autoComplete="off"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Upload Image Banner"
          name="hinh_banner"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
          rules={[{ required: true, message: 'Please upload an image for the banner!' }]}
        >
          <Upload beforeUpload={() => false} accept="image/*">
            <Button className="bg-blue-500 text-white hover:bg-blue-700">
              Click to Upload
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Link Banner"
          name="link_banner"
          rules={[
            { required: true, message: 'Please enter a link for the banner!' },
            { type: 'url', message: 'Please enter a valid URL for the banner link!' },
          ]}
        >
          <Input placeholder="Enter link for the banner" />
        </Form.Item>

        <Form.Item className="py-5" wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="mr-2 bg-blue-500 hover:bg-blue-700">
            Cập nhật
          </Button>
          <Button type="default" onClick={() => navigate('/admin/banner_logo')} className="bg-gray-300 hover:bg-gray-400">
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Edit_banner;

