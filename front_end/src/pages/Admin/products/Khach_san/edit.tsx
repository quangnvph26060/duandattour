import React, { useState, useEffect } from 'react';
import { Form, Button, Input, DatePicker, Select } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTourQuery } from '../../../../api/TourApi';
import { useEditLichTrinhMutation, useGetLichTrinhIdQuery } from '../../../../api/LichTrinhApi';
import { ILichTrinh } from '../../../../interface/lichtrinh';
const { Option } = Select;

type FieldType = {
  id: number;
  tieu_de: string;
  thoi_gian: Date,
  noi_dung: string,
  id_tour: bigint
};

const Admin_LichtrinhEDit: React.FC = () => {
  const navigate = useNavigate();
  const { data: tourdata } = useGetTourQuery();
  const tourArrary = tourdata?.date || [];

  const { idlichtrinh } = useParams<{ idlichtrinh: any }>();
  const { data: LichTrinhData } = useGetLichTrinhIdQuery(idlichtrinh || "");
  const LichTrinh = LichTrinhData || {};
  const [updateLichTrinh] = useEditLichTrinhMutation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    if (LichTrinh.date && LichTrinh.date.tieu_de && LichTrinh.date.noi_dung && LichTrinh.date.thoi_gian && LichTrinh.date.id_tour) {
      form.setFieldsValue({
        tieu_de: LichTrinh.date.tieu_de,
        noi_dung: LichTrinh.data.noi_dung,
        thoi_gian: LichTrinh.data.thoi_gian,
        id_tour: LichTrinh.data.id_tour,
      });
    }
  }, [LichTrinh]);

  const onFinish = (values: ILichTrinh) => {
    updateLichTrinh({ ...values, id: idlichtrinh })
      .unwrap()
      .then(() => navigate("/admin/tour/lichtrinh"))
      .catch((error) => {
        setErrors(error.data.message);
        setLoading(false);
      });
  };


  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Sửa lịch trình lịch trình </h2>
      </header>
      <Form
        className="tour-form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: "100%" }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tiêu đề"
          name="tieu_de"
          rules={[
            { required: true, message: 'Vui lòng nhập tiêu đề ' },
            { min: 3, message: 'Tiêu đề tour ít nhất 3 ký tự' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nội dung"
          name="noi_dung"
          rules={[
            { required: true, message: 'Vui lòng nhập nội dung' },
            { min: 3, message: 'Nội dung ít nhất 3 ký tự' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Thời gian"
          name="thời gian"
          rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="ID Tour"
          name="id_tour"
          rules={[{ required: true, message: 'Vui lòng chọn ID Tour!' }]}
        >
          <Select defaultValue="Chọn" style={{ width: "100%" }}>
            {tourArrary.map((option) => (
              <Option key={option.id} value={option.id}>{option.ten_tour}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div className='btn-button-sub'>
            <Button type="primary" htmlType="submit" className='submit-click'>
              Sửa
            </Button>
            <Button
              type="default"
              className="ml-2"
              onClick={() => navigate('/admin/tour')}
            >
              Quay lại
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin_LichtrinhEDit;