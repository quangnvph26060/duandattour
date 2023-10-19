import React, { useState } from 'react';
import { Form, Button, Input, DatePicker, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAddImagesMutation } from "../../../../api/ImagesApi";
import { Iimages } from "../../../../interface/images";

const { Option } = Select;

type FieldType = {
  id: number;
  image_path: string;

};

const AdmidImageADD: React.FC = () => {
  const [addimages] = useAddImagesMutation();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const onFinish = (values: Iimages) => {
    addimages(values)
        .unwrap()
        .then(() => navigate("/admin/tour/image/"))
        .catch((error) => {
          setErrors(error.data.message);
          setLoading(false);
          
        });
    console.log('Form values:', values);
    console.log('Uploaded file:', fileList[0]);
  };
  const customRequest = ({ file, onSuccess, onError }) => {
    setTimeout(() => {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        // Tải lên thành công
        onSuccess(file);
      } else {
        // Lỗi tải lên
        onError(new Error('Chỉ cho phép tải lên các tệp ảnh JPEG hoặc PNG.'));
      }
    }, 1000);
  };
  const onChange = (info) => {
    setFileList(info.fileList);
  };

  const onRemove = (file) => {
    setFileList([]);
  };
  
  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Thêm ảnh mới</h2>
      </header>
      <Form
        className="tour-form"
        name="hinh"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
  <Form.Item
        name="image"
        label="Tải lên ảnh"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
      >
        <Upload
          customRequest={customRequest}
          fileList={fileList}
          onChange={onChange}
          onRemove={onRemove}
          accept="image/jpeg, image/png"
        >
          <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
        </Upload>
      </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
          <Button
            type="default"
            className="ml-2"
            onClick={() => navigate('/admin/tour/image/')}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdmidImageADD;
