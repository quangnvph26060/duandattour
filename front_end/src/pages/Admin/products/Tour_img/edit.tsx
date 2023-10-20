import React,{useState,useEffect} from 'react';
import { Form, Button, Input, DatePicker, Select } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate ,useParams} from 'react-router-dom';
import { useGetLoaiTourQuery } from "../../../../api/LoaiTourApi";
import { useGetDiaDiemByIdQuery, useEditDiaDiemMutation } from "../../../../api/DiaDiemApi";
import { IDiaDiem } from "../../../../interface/diadiem";
const { Option } = Select;



const Admin_TourImgEDit: React.FC = () => {
  const navigate = useNavigate();
  const { data: loaitourdata } = useGetLoaiTourQuery();
  const loaitourArrary = loaitourdata?.data || [];

  const { iddiadiem } = useParams<{ iddiadiem: any }>();
  const { data: DiaDiemData } = useGetDiaDiemByIdQuery(iddiadiem || "");
  const DiaDiem = DiaDiemData || {};
  const [updateDiaDiem] = useEditDiaDiemMutation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    if (DiaDiem.data && DiaDiem.data.ten_dia_diem && DiaDiem.data.mo_ta && DiaDiem.data.ma_loai_tour) {
    form.setFieldsValue({
      ten_dia_diem: DiaDiem.data.ten_dia_diem,
      mo_ta: DiaDiem.data.mo_ta,
      ma_loai_tour: DiaDiem.data.ma_loai_tour,
    });
  }
  }, [DiaDiem]);

  const onFinish = (values: IDiaDiem) => {
    updateDiaDiem({ ...values, id: iddiadiem })
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
        <h2 className="font-bold text-2xl">Chỉnh sửa img </h2>
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
          label="Image_id"
          name="image_id"
          rules={[
            { required: true, message: 'Vui lòng chọn image_id' },
          ]}
        >
        <Select defaultValue="Chọn" style={{ width: 400,}}>
          {loaitourArrary.map((option) => (
              <Option key={option.id} value={option.id}>{option.image_id}</Option>
          ))}
        </Select>
        </Form.Item>
        <Form.Item
          label="Tour_id"
          name="tour_id"
          rules={[
            { required: true, message: 'Vui lòng tour id' },
          ]}
        >
        <Select defaultValue="Chọn" style={{ width: 400,}}>
          {loaitourArrary.map((option) => (
              <Option key={option.id} value={option.id}>{option.tour_id}</Option>
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

export default Admin_TourImgEDit;
