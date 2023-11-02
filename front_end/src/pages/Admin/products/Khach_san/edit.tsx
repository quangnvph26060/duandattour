import React,{useEffect,useState} from 'react';
import { Form, Button, Input, DatePicker, Select } from 'antd';

import { useNavigate,useParams } from 'react-router-dom';
import { useEditKhachSanMutation,useGetKhachSanByIdQuery } from '../../../../api/KhachSanApi';
import { IKhachSan } from '../../../../interface/khachsan';


const ADmin_KhachsanEdit: React.FC = () => {
  const {idkhachsan}=useParams<{
    idkhachsan:any
  }>();
  const {data:LoaiKhachSanData} =useGetKhachSanByIdQuery(idkhachsan || "");
  const LoaiKhachSan=LoaiKhachSanData || {};
  const[updateLoaiKhachSan]=useEditKhachSanMutation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [form] = Form.useForm();
  useEffect(()=>{
    if(LoaiKhachSan.data && LoaiKhachSan.data.loai_khach_san){
      form.setFieldsValue({
        loai_khach_san: LoaiKhachSan.data.loai_khach_san,
      });
    }
  },[LoaiKhachSan]);
  const navigate = useNavigate();

  const onFinish = (values: IKhachSan) => {

    updateLoaiKhachSan({ ...values, id: idkhachsan })
    .unwrap()
    .then(() => navigate("/admin/tour/loai_khach_san"))
    .catch((error) => {
      setErrors(error.data.message);
      setLoading(false);
      
    });
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Sửa loại khách sạn </h2>
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
            onClick={() => navigate('/admin/tour/loai_khach_san')}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ADmin_KhachsanEdit;
