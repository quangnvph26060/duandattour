import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Upload } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from 'react-router-dom';
import { useEditLoaiTourMutation, useGetLoaiTourByIdQuery } from '../../../../api/LoaiTourApi';
import { ILoaiTour } from '../../../../interface/loaiTour';
import axios from 'axios';
import "../../../css.css";

const AdminLoai_tourEdit: React.FC = () => {
  const { idLoaiTour } = useParams<{ idLoaiTour: any }>();
  const { data: LoaiTourData } = useGetLoaiTourByIdQuery(idLoaiTour || "");
  const LoaiTour = LoaiTourData || {};
  const [updateLoaiTour] = useEditLoaiTourMutation();

type FieldType = {
  id: number;
  image: string;
  ten_loai_tour: string;
};

  const navigate = useNavigate();

  const onFinish = (values: ILoaiTour) => {
    const formData = new FormData();

    formData.append("ten_loai_tour", values.ten_loai_tour); // Thêm các trường dữ liệu khác vào formData (nếu cần)

    addLoaiTour(formData)
      .unwrap()
      .then(() => navigate("/admin/post/danhmuc_post"))
      .catch((error) => {
        console.log(error);
        // Xử lý lỗi (nếu có)
      });

    console.log(values);
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
        style={{ maxWidth: "100%" }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Image"
          name="image"
          rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
        >
          <div className='upload-image'>
            <Upload
              accept="image/*"
              listType="picture"
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />} type="button">
                Chọn ảnh
              </Button>
            </Upload>
          </div>

        </Form.Item>
        <Form.Item
          label="Tên loại tour"
          name="ten_loai_tour"
          rules={[
            { required: true, message: 'Vui lòng nhập tên loại tour!' },
            { min: 3, message: 'Tên tour ít nhất 3 ký tự' },
          ]}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div className="btn-button-sub-pt">
            <Button type="primary" htmlType="submit" className="submit-click">
              Thêm
            </Button>
            <Button
              type="default"
              className="ml-2"
              onClick={() => navigate("/admin/tour/loai_tour")}
            >
              Quay lại
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminLoai_tourEdit;