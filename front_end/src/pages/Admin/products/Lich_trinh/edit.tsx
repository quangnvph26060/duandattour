import React, { useEffect, useState } from "react";
import { Form, Button, Input, DatePicker, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditLoaiPhuongTienMutation,
  useGetLoaiPhuongTienByIdQuery,
} from "../../../../api/LoaiPhuongTienApi";
import { ILoaiPhuongTien } from "../../../../interface/loaiphuongtien";

const ADmin_Phuongtienedit: React.FC = () => {
  const { idPhuongTien } = useParams<{ idPhuongTien: any }>();
  const { data: LoaiPhuongTienData } = useGetLoaiPhuongTienByIdQuery(
    idPhuongTien || ""
  );
  const LoaiPhuongTien = LoaiPhuongTienData || {};
  const [updateLoaiPhuongTien] = useEditLoaiPhuongTienMutation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (LichTrinh.date && LichTrinh.date.tieu_de && LichTrinh.date.noi_dung && LichTrinh.date.thoi_gian && LichTrinh.date.id_tour) {
      form.setFieldsValue({
        loai_phuong_tien: LoaiPhuongTien.data.loai_phuong_tien,
      });
    }
  }, [LoaiPhuongTien]);

  const navigate = useNavigate();

  const onFinish = (values: ILoaiPhuongTien) => {
    updateLoaiPhuongTien({ ...values, id: idPhuongTien })
      .unwrap()
      .then(() => navigate("/admin/tour/loai_phuong_tien"))
      .catch((error) => {
        setErrors(error.data.message);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Sửa phương tiện </h2>
      </header>
      <Form
        className="tour-form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: "100%" }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Phương tiện"
          name="loai_phuong_tien"
          rules={[
            { required: true, message: "Vui lòng nhập loại phương tiện!" },
            { min: 3, message: " Phương tiện ít nhất 3 ký tự" },
          ]}
          validateStatus={errors ? "error" : ""}
          help={errors}
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
          <Select defaultValue="Chọn" style={{ width: "100%"}}>
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

export default ADmin_Phuongtienedit;
