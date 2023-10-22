import React from 'react';
import { Form, Button, Input, DatePicker, Select } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAddLoaiTourMutation } from '../../../../api/LoaiTourApi';
import { ILoaiTour } from '../../../../interface/loaiTour';

const { Option } = Select;

type FieldType = {
  id: number;
  ten_loai_tour: string;

};

const AdminLoai_tourADD: React.FC = () => {
  const [addLoaiTour] = useAddLoaiTourMutation();
  const navigate = useNavigate();

  const onFinish = (values: ILoaiTour) => {
    addLoaiTour(values)
        .unwrap()
        .then(() => navigate("/admin/tour/loai_tour"));
};
  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Tạo mới tour</h2>
      </header>
      <Form
        className="tour-form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tên loại tour"
          name="ten_loai_tour"
          rules={[
            { required: true, message: 'Vui lòng nhập tên loại tour!' },
            { min: 3, message: 'Tên tour ít nhất 3 ký tự' },
          ]}
        >
          <Input />
        </Form.Item>
       
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
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

export default AdminLoai_tourADD;
