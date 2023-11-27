import React, { useEffect, useState } from 'react';
import { Form, Button, Input, DatePicker, Select, InputNumber } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useGetLoaiTourQuery } from "../../../../api/LoaiTourApi";
import { useGetHuongDanVienQuery } from "../../../../api/HuongDanVienApi";
import { ITour } from "../../../../interface/tour";
import { useAddTourMutation } from '../../../../api/TourApi';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Upload } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
// import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';


const { Option } = Select;
type FieldType = {
  id: number;
  ten_tour: string;
  image_path: string;
  diem_di: string;
  diem_den: string;
  lich_khoi_hanh: string;
  ngay_ket_thuc: string;
  diem_khoi_hanh: string;
  mo_ta: string;
  gia_nguoilon: number;
  gia_treem: number;
  soluong: number;
  trang_thai: number;
  ma_loai_tour: number;

};

const AdminTourAdd: React.FC = () => {
  const [editorData, setEditorData] = useState('');

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };
  const [addTour] = useAddTourMutation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);



  const onFinish = (values: FieldType) => {
    const formData = new FormData();

    // Kiểm tra nếu có hình ảnh được chọn
    if (values.hinh && values.hinh.fileList.length > 0) {
      // Lưu hình ảnh vào formData
      formData.append("hinh", values.hinh.fileList[0].originFileObj);
    }
    formData.append("ten_tour", values.ten_tour);
    formData.append("diem_di", values.diem_di);
    formData.append("diem_den", values.diem_den);
    formData.append("diem_khoi_hanh", values.diem_khoi_hanh);
    formData.append("gia_nguoilon", values.gia_nguoilon);
    formData.append("gia_treem", values.gia_treem);
    formData.append("soluong", values.soluong);
    formData.append("ma_loai_tour", values.ma_loai_tour);
    values.mo_ta = editorData;
    formData.append("mo_ta", values.mo_ta);

    addTour(formData) // Sử dụng formData chứa hình ảnh
      .unwrap()
      .then(() => navigate("/admin/tour"))
      .catch((error) => {
        setErrors(error.data.message);
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


  // test chọn ngày đi và kết thúc 
  const [HDVArrary, setHDVArrary] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const handleStartDateChange = (date: any, dateString: any) => {
    setStartDate(dateString);
  };

  const handleEndDateChange = (date: any, dateString: any) => {
    setEndDate(dateString);
  };
  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);
  const fetchData = () => {
    axios.post('http://127.0.0.1:8000/api/admin/hdvtour', { start_date: startDate, end_date: endDate })
      .then(response => {
        let hdvDate = response.data;


        axios.get('http://127.0.0.1:8000/api/admin/user')
          .then(response => {
            let ShowUserAll = response.data;
            const matchingRecords = [];
            ShowUserAll.data.map((item) => {
              hdvDate.map((itemhdv) => {
                // kiểm tra nếu thành công 
                if (item.id === itemhdv.hdv_id) {
                  const isDuplicate = matchingRecords.some((record) => record.id === item.id);
                  if (!isDuplicate) {
                    matchingRecords.push(item);
                  }
                }
              });
            });
            

          })
          .catch(error => {
            // Xử lý lỗi
            console.error(error);
          });

      })
      .catch(error => {
        // Xử lý lỗi
        console.error(error);
      });
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
          label="Hình ảnh"
          name="hinh"
          rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
        >
          <Upload
            accept="image/*" // Chỉ chấp nhận các định dạng ảnh
            listType="picture"
            beforeUpload={() => false} // Ngăn chặn việc tự động tải lên trước đó
          >
            <Button icon={<UploadOutlined />} type="button">
              Chọn ảnh
            </Button>
          </Upload>
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
          <DatePicker style={{ width: '100%' }} disabledDate={disabledDate}

            onChange={handleStartDateChange} />
        </Form.Item>
        <Form.Item
          label="Ngày kết thúc"
          name="ngay_ket_thuc"
          rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
        >
          <DatePicker style={{ width: '100%' }} disabledDate={disabledDate}
            onChange={handleEndDateChange} />
        </Form.Item>
        <Form.Item
          label="Giá Người lớn"
          name="gia_nguoilon"
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
          label="Giá Trẻ em"
          name="gia_treem"
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
          <CKEditor
            editor={ClassicEditor}
            // config={{
            //   extraPlugins: [EasyImage],
            //   // Cấu hình thêm plugin Easy Image

            // }}
            data={editorData}
            onChange={handleEditorChange}
          />

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
