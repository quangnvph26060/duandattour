import React from 'react';
import { Form, Button, Input, DatePicker, Select,Upload,message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAddLoaiTourMutation } from '../../../../api/LoaiTourApi';
import { ILoaiTour } from '../../../../interface/loaiTour';

const { Option } = Select;

type FieldType = {
  id: number;
  image_path: string;

};

const AdmidImageADD: React.FC = () => {
  const [addLoaiTour] = useAddLoaiTourMutation();
  const navigate = useNavigate();

  const onFinish = (values: "") => {
    console.log('Received values of form: ', values);
};
  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Tạo mới tour</h2>
      </header>
      <Form
        className="tour-form"
        name="image_upload"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
   <Form.Item
        name="image"
        label="Upload Image"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
        rules={[
          { required: true, message: 'Hãy chọn ảnh' },
        ]}
      >
        <Upload maxCount={1} accept="image/*">
          <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>
      </Form.Item>
       
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary"  htmlType="submit">
            Thêm
          </Button>
          <Button
            type="default"
            className="ml-2"
            onClick={() => navigate('/admin/tour/loai_tour')}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdmidImageADD;
