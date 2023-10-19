import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditImagesMutation, useGetImagesByIdQuery } from '../../../../api/ImagesApi';
import { Iimages } from '../../../../interface/images';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Admin_ImageEdit: React.FC = () => {
  const { idimage } = useParams<{ idimage: any }>();
  const { data: LoaiPhuongTienData } = useGetImagesByIdQuery(idimage || "");
  const LoaiPhuongTien = LoaiPhuongTienData || {};
  const [updateLoaiPhuongTien] = useEditImagesMutation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [form] = Form.useForm();
  console.log(LoaiPhuongTien.data?.image_path);

  useEffect(() => {
    if (LoaiPhuongTien.data?.image_path) {
      form.setFieldsValue({
        image_path: LoaiPhuongTien.data.image_path,
      });
    }
  }, [LoaiPhuongTien]);

  const navigate = useNavigate();

  const onFinish = (values: Iimages) => {
    updateLoaiPhuongTien({ ...values, id: idimage })
      .unwrap()
      .then(() => navigate("/admin/tour/image"))
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
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Upload Image"
          name="hinh"
        >
          <Upload>
            <Button icon={<UploadOutlined />}>Chọn tệp</Button>
          </Upload>
        </Form.Item>

        {LoaiPhuongTien.data?.image_path && (
          <img  src={`http://localhost:8000/storage/${LoaiPhuongTien.data.image_path}`} alt="Hình ảnh" style={{ width: '100%', marginTop: '10px' }} />
        )}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Sửa
          </Button>
          <Button
            type="default"
            className="ml-2"
            onClick={() => navigate('/admin/tour/image')}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin_ImageEdit;