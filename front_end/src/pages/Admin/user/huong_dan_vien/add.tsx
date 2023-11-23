import React, { useEffect } from 'react';
import { Form, Button, Input, DatePicker, Select, Upload } from 'antd';
import { AiOutlineLoading3Quarters, AiOutlineUpload } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddHuongDanVienMutation } from '../../../../api/HuongDanVienApi';
import { IHuongDanVien } from '../../../../interface/huongDanVien';
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

type FieldType = {
  id: number;
  ten_hd: string;
  email: string;
  dia_chi: string;
  sdt: string;
  // image:File | null
};

const Admin_Account_huongdanvienAdd: React.FC = () => {
  const [addHuongDanVien] = useAddHuongDanVienMutation();
  const navigate = useNavigate();

  const onFinish = (values: IHuongDanVien) => {
    addHuongDanVien(values)
      .unwrap()
      .then(() => navigate("/admin/account_huongdanvien"));
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Update hướng dẫn viên</h2>
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
          label="Hướng dẫn viên"
          name="ten_hd"
          rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ' },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          label="Ảnh"
          name="image"
          rules={[{ required: true, message: 'Vui lòng chọn ảnh!' }]}
          valuePropName="fileList"
          getValueFromEvent={(event) => {
            if (Array.isArray(event)) {
              return event;
            }
            return event && event.fileList;
          }}
        >
          <Upload
            name="image"
            listType="picture"
            beforeUpload={() => false}
          >
            <Button icon={<AiOutlineUpload />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item> */}
        <Form.Item
          label="image"
          name="hinh"
          rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
        >
          <Upload
            accept="image/*"
            listType="picture"
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />} type="button">
              Chọn ảnh
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="dia_chi"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="sdt"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại!' },
            { pattern: /^[0-9]+$/, message: 'Số điện thoại chỉ gồm các chữ số' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Thêm hướng dẫn viên
          </Button>
          <Button
            type="default"
            className="ml-2"
            onClick={() => navigate('/admin/product')}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin_Account_huongdanvienAdd;
