import React,{useState} from 'react';
import { Form, Button, Input, DatePicker, Select,message,Alert } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAddKhachSanMutation,useRemoveKhachSanMutation } from '../../../../api/KhachSanApi';
import { IKhachSan } from '../../../../interface/khachsan';
const { Option } = Select;

type FieldType = {
  id: number;
  loai_khach_san: string;
};

const ADmin_KhachsanADD: React.FC = () => {
  const [addKhachsan]=useAddKhachSanMutation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const onFinish = (values: IKhachSan) => {
    addKhachsan(values)
    .unwrap()
    .then(()=>navigate("/admin/tour/loai_khach_san"))
    // Handle form submission logic here
    .catch((error)=>{
        setErrors(error.data.message);
        setLoading(false);
    });
   
    
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Tạo mới khách sạn </h2>
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
          label="Loại khách sạn"
          name="loai_khach_san"
          rules={[
            { required: true, message: 'Vui lòng nhập loại khách sạn!' },
            { min: 3, message: ' Khách sạn ít nhất 3 ký tự' },
          ]}
          validateStatus={errors ? 'error' : ''}
          help={errors}
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
            onClick={() => navigate('/admin/tour/loai_khach_san')}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ADmin_KhachsanADD;
