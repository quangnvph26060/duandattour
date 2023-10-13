import React, { useEffect } from 'react';
import { Form, Button, Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditLoaiTourMutation, useGetLoaiTourByIdQuery } from '../../../../api/LoaiTourApi';
import { ILoaiTour } from '../../../../interface/loaiTour';

const AdminLoai_tourEdit: React.FC = () => {
  const { idLoaiTour } = useParams<{ idLoaiTour: any }>();
  const { data: LoaiTourData } = useGetLoaiTourByIdQuery(idLoaiTour || "");
  const LoaiTour = LoaiTourData || {};
  const [updateLoaiTour] = useEditLoaiTourMutation();
  console.log(idLoaiTour);
  
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ten_loai_tour: LoaiTour.ten_loai_tour,
    
    });
  }, [LoaiTour]);

  const navigate = useNavigate();

  const onFinish = (values: ILoaiTour) => {
    updateLoaiTour({ ...values, id: idLoaiTour })
      .unwrap()
      .then(() => navigate("/admin/tour/loai_tour"));
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Chỉnh sửa loại tour</h2>
      </header>
      <Form
        className="tour-form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
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
            Sửa
          </Button>
          <Button
            type="default"
            className="ml-2"
            onClick={() => navigate('/admin/tour')}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminLoai_tourEdit;