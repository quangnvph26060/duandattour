import React, { useEffect, useState } from 'react';
import { Form, Button, Input, DatePicker, Select, InputNumber } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useGetLoaiTourQuery } from "../../../../api/LoaiTourApi";
import { useGetHuongDanVienQuery } from "../../../../api/HuongDanVienApi";
import { ITour } from "../../../../interface/tour";
import { useAddTourMutation } from '../../../../api/TourApi';
const { Option } = Select;
type FieldType = {
  id: number;
  ten_tour: string;
  diem_di: string;
  diem_den: string;
  lich_khoi_hanh: string;
  thoi_gian: string;
  diem_khoi_hanh: string;
  anh: string;
  mo_ta: string;
  gia_tour: number;
  soluong: number;
  trang_thai: number;
  ma_loai_tour: number;
  ma_hdv: number;
};

const AdminTourAdd: React.FC = () => {
  const [addTour] = useAddTourMutation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const onFinish = (values: ITour) => {
   
    addTour(values)
      .unwrap()
      .then(() => navigate("/admin/tour"))
      .catch((error) => {
        setErrors(error.data.message);
        setLoading(false);

      });
  };
  const { data: loaitourdata } = useGetLoaiTourQuery();
  const { data: huongdanviendata } = useGetHuongDanVienQuery();
  const loaitourArrary = loaitourdata?.data || [];
  const huongdanvienArrary = huongdanviendata?.data || [];
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [provinces2, setProvinces2] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

 
  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu từ API');
        }
        return response.json();
      })
      .then((data) => {
        setProvinces(data);
        setProvinces2(data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (value) => {
    setSelectedValue(value);
    const filteredOptions = provinces2.filter((option) => option.name !== value);
    setProvinces2(filteredOptions);
  };


  const disabledDate = (current) => {
    // Get the current date
    const currentDate = new Date();

    // Disable dates before the current date
    return current && current < currentDate.setHours(0, 0, 0, 0);
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Tạo mới tour</h2>
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
          label="Tên tour"
          name="ten_tour"
          rules={[
            { required: true, message: 'Vui lòng nhập tên tour!' },
            { min: 3, message: 'Tên tour ít nhất 3 ký tự' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Điểm khởi hành"
          name="diem_khoi_hanh"
          rules={[{ required: true, message: 'Vui lòng chọn điểm khởi hành!' }]}
        >
          <Select defaultValue="Điểm khởi hành">
            <Option value="" >Chọn điểm đi</Option>
            {provinces.map((province) => (
              <Option key={province.code} value={province.name}>
                {province.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Điểm đi"
          name="diem_di"
          rules={[{ required: true, message: 'Vui lòng chọn điểm đi!' }]}
        >
          <Select defaultValue="Chọn điểm đi " onChange={handleChange}>
            <Option value="" >Chọn điểm đi</Option>
            {provinces.map((province) => (
              <Option key={province.code} value={province.name}>
                {province.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Điểm đến"
          name="diem_den"
          rules={[{ required: true, message: 'Vui lòng chọn điểm đến!' }]}
        >
          <Select defaultValue="Chọn điểm đến "  >
            <Option value="" >Chọn điểm đến</Option>
            {provinces2.map((province) => (
              <Option key={province.code} value={province.name}>
                {province.name}
              </Option>
            ))}
          </Select>


        </Form.Item>
        <Form.Item
          label="Lịch khởi hành"
          name="lich_khoi_hanh"
          rules={[{ required: true, message: 'Vui lòng nhập lịch khởi hành!' }]}
        >
          <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item
          label="Thời gian"
          name="thoi_gian"
          rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá Tour"
          name="gia_tour"
          rules={[
            // { required: true, message: 'Vui lòng nhập giá tour!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value >= 1000000) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Giá tour phải lớn hơn hoặc bằng 1,000,000'));
              },
            }),
          ]}
        >
          <InputNumber min={1000000} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
        </Form.Item>
        <Form.Item
          label="Mô Tả"
          name="mo_ta"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Số Lượng"
          name="soluong"
          rules={[{ required: true, message: 'Vui lòng nhập  số lượng !' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Loại Tour"
          name="ma_loai_tour"
          rules={[
            { required: true, message: 'Vui lòng Chọn Mã Loại Tour' },
          ]}
        >
          <Select defaultValue="Chọn" style={{ width: 400, }}>
            {loaitourArrary.map((option) => (
              <Option key={option.id} value={option.id}>{option.ten_loai_tour}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Mã hướng dẫn viên"
          name="ma_hdv"
          rules={[{ required: true, message: 'Vui lòng nhập mã hướng dẫn viên!' }]}
        >
          <Select defaultValue="Chọn" style={{ width: 400, }}>
            {huongdanvienArrary.map((option) => (
              <Option key={option.id} value={option.id}>{option.ten_hd}</Option>
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
            onClick={() => navigate('/admin/tour')}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminTourAdd;
