import React ,{useState}from 'react';
import { Form, Button, Input, DatePicker, Select } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useGetLoaiTourQuery } from "../../../../api/LoaiTourApi";
import { useAddDiaDiemMutation, useRemoveDiaDiemMutation } from "../../../../api/DiaDiemApi";
import { IDiaDiem } from "../../../../interface/diadiem";
const { Option } = Select;

type FieldType = {
  id: number;
  ten_dia_diem: string;
  mo_ta: string;
  ma_loai_tour: number
};



const AdminDiadiem_ADD: React.FC = () => {

  const navigate = useNavigate();
  const { data: loaitourdata } = useGetLoaiTourQuery();
  const loaitourArrary = loaitourdata?.data || [];
 

  const [addDiaDiem] = useAddDiaDiemMutation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const onFinish = (values: IDiaDiem) => {
    addDiaDiem(values)
        .unwrap()
        .then(() => navigate("/admin/tour/diadiem"))
        .catch((error) => {
          setErrors(error.data.message);
          setLoading(false);
         
        });
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Tạo mới địa điểm </h2>
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
          label="Tên địa điểm"
          name="ten_dia_diem"
          rules={[
            { required: true, message: 'Vui lòng nhập tên địa điểm!' },
            { min: 3, message: 'Đại điểm tour ít nhất 3 ký tự' },
          ]}
          validateStatus={errors ? 'error' : ''}
          help={errors}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="mo_ta"
          rules={[
            { required: true, message: 'Vui lòng mô tả' },
            { min: 3, message: 'Mô tả ít nhất 3 ký tự' },
          ]}
        >
           <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
        </Form.Item>
        <Form.Item
          label="Loại Tour"
          name="ma_loai_tour"
          rules={[
            { required: true, message: 'Vui lòng Chọn Mã Loại Tour' },
          ]}
        >
        <Select defaultValue="Chọn" style={{ width: 400,}}>
          {loaitourArrary.map((option) => (
              <Option key={option.id} value={option.id}>{option.ten_loai_tour}</Option>
          ))}
        </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
          <Button
            type="default"
            className="ml-2"
            onClick={() => navigate('/admin/tour/diadiem')}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminDiadiem_ADD;
