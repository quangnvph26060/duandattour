import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Form, Button, Input, DatePicker, Select, Upload, InputNumber, message, Radio, Space } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ITour } from "../../../../interface/tour";
import { useGetLoaiTourQuery } from "../../../../api/LoaiTourApi";
import { useGetTourByIdQuery, useEditTourMutation } from "../../../../api/TourApi";
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const AdminTourEdit = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data: loaitourdata } = useGetLoaiTourQuery();
  const loaitourArray = loaitourdata?.data || [];

  const [provinces, setProvinces] = useState([]);
  const [provinces2, setProvinces2] = useState([]);
  const dateFormat = "DD-MM-YYYY";
  const { idtour } = useParams<{ idtour: any }>();
  const { data: TourData } = useGetTourByIdQuery(idtour || {});
  const Tour = TourData || {};

  const [updateTour] = useEditTourMutation();
  const [mainImageList, setMainImageList] = useState([]);
  const [additionalImageList, setAdditionalImageList] = useState([]);
  const [editorData, setEditorData] = useState('');

  useEffect(() => {
    if (Tour && Tour.data) {
      form.setFieldsValue({
        ten_tour: Tour.data.ten_tour,
        diem_di: Tour.data.diem_di,
        diem_den: Tour.data.diem_den,
        ma_loai_tour: Tour.data.ma_loai_tour,
        ngay_ket_thuc:Tour.data.ngay_ket_thuc,
        lich_khoi_hanh:Tour.data.lich_khoi_hanh,
        soluong: Tour.data.soluong,
        trang_thai: Tour.data.trang_thai === 1 ? 1 : 0,
        gia_nguoilon: Tour.data.gia_nguoilon,
        gia_treem: Tour.data.gia_treem,
        mo_ta: Tour.data.mo_ta,
      });

      const mainFileList = Tour.data.image_path.map((image, index) => ({
        uid: `main-${index}`,
        name: `image-${index}`,
        status: 'done',
        url: `http://localhost:8000/storage/${image}`,
      }));
      setMainImageList(mainFileList);

      const additionalImageArray = Array.isArray(Tour.data.image_dd) ? Tour.data.image_dd : [Tour.data.image_dd];
      const additionalFileList = additionalImageArray.map((image, index) => ({
        uid: `additional-${index}`,
        name: `image-${index}`,
        status: 'done',
        url: `http://localhost:8000/storage/${image}`,
      }));
      setAdditionalImageList(additionalFileList);

      setEditorData(Tour.data.mo_ta);
    }
  }, [Tour, form]);

  const handleMainImageChange = ({ fileList }) => {
    setMainImageList(fileList);
  };

  const handleAdditionalImageChange = ({ fileList }) => {
    setAdditionalImageList(fileList);
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
    form.setFieldsValue({ mo_ta: data });
  };

  const onFinish = async (values: ITour) => {
    try {
      const formattedValues = {
        ...values,
        lich_khoi_hanh: moment(values.lich_khoi_hanh).format("YYYY-MM-DD HH:mm:ss"),
        ngay_ket_thuc: moment(values.ngay_ket_thuc).format("YYYY-MM-DD HH:mm:ss"),
      };

      if (!Array.isArray(mainImageList) || mainImageList.length === 0) {
        message.error("Vui lòng chọn ảnh đại diện");
        return;
      }

      const response = await updateTour({
        ...formattedValues,
        mo_ta: editorData,
        id: idtour,
        main_images: mainImageList.map((file) => file.name),
        additional_images: additionalImageList.map((file) => file.name),
      }).unwrap();

      if (response) {
        navigate("/admin/tour");
      } else {
        console.log('Request failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disabledDate = (current) => {
    const currentDate = new Date();
    return current && current < currentDate.setHours(0, 0, 0, 0);
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl text-center">Chỉnh sửa tour</h2>
      </header>
      <div>
        <Form
          className="tour-form"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="text-center container ">
            <div className="">
              <Form.Item
                label="Tên tour"
                name="ten_tour"
                rules={[
                  {
                    required: true, message: "Vui lòng nhập tên tour!"
                  },
                  { min: 3, message: "Tên tour ít nhất 3 ký tự" },
                ]}
              >
                <Input />
              </Form.Item>
              <div className='flex'>
                <Form.Item
                  label="Ảnh đại diện"
                  name="image"
                  rules={[]}
                >
                  <Upload
                    accept="image/*"
                    listType="picture"
                    multiple
                    beforeUpload={() => false}
                    fileList={mainImageList}
                    onChange={handleMainImageChange}
                  >
                    <Button icon={<UploadOutlined />}>
                      Chọn ảnh
                    </Button>
                  </Upload>
                </Form.Item>

                <Form.Item
                  label="Ảnh mô tả"
                  name="hinh[]"
                  rules={!additionalImageList.length ? [{ required: true, message: "Vui lòng chọn ảnh" }] : undefined}
                >
                  <Upload
                    accept="image/*"
                    listType="picture"
                    multiple
                    beforeUpload={() => false}
                    fileList={additionalImageList}
                    onChange={handleAdditionalImageChange}
                  >
                    <Button icon={<UploadOutlined />}>
                      Chọn ảnh
                    </Button>
                  </Upload>
                </Form.Item>
              </div>

              <Form.Item
                label="Điểm đi"
                name="diem_di"
                rules={[{ required: true, message: "Vui lòng chọn điểm đến!" }]}
              >
                <Select
                  showSearch
                  placeholder="Chọn điểm đi"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
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
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Chọn điểm đến"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {provinces2.map((province) => (
                    <Option key={province.code} value={province.name}>
                      {province.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                className="w-full"
                label="Lịch khởi hành"
                name="lich_khoi_hanh"
                rules={[
                  { required: true, message: "Vui lòng nhập lịch khởi hành!" },
                ]}
              >
                <Input
                  type="date"

                />
              </Form.Item>

              <Form.Item
                className="w-full"
                label="Ngày kết thúc"
                name="ngay_ket_thuc"
                rules={[
                  { required: true, message: "Vui lòng nhập thời gian!" },
                ]}
              >
                <Input

                />
              </Form.Item>
            </div>

            <div className="">
              <Form.Item
                className="w-full"
                label="Giá Người lớn"
                name="gia_nguoilon"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value >= 1000000) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Giá tour phải lớn hơn hoặc bằng 1,000,000")
                      );
                    },
                  }),
                ]}
              >
                <InputNumber
                  min={1000000}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>

              <Form.Item
                className="w-full"
                label="Giá Trẻ em"
                name="gia_treem"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value >= 1000000) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Giá tour phải lớn hơn hoặc bằng 1,000,000")
                      );
                    },
                  }),
                ]}
              >
                <InputNumber
                  min={1000000}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>

              <Form.Item
                className="w-full"
                label="Mô Tả"
                name="mo_ta"
                rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
              >
                <CKEditor
                  editor={ClassicEditor}
                  data={editorData}
                  onChange={handleEditorChange}
                />
              </Form.Item>

              <Form.Item
                className="w-full number-tour"
                label="Số Lượng"
                name="soluong"
                rules={[
                  { required: true, message: "Vui lòng nhập  số lượng !" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                className="w-full"
                label="Trạng thái"
                name="trang_thai"
                rules={[
                  { required: true, message: "Vui lòng chọn trạng thái!" },
                ]}
              >
                <Radio.Group style={{ width: '100%' }} defaultValue={Tour.data?.trang_thai === 1 ? [1] : [0]}>
                  <Space
                    direction="vertical">
                    <Radio value={1}>Kích hoạt</Radio>
                    <Radio value={0}>Vô hiệu hóa</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>

              php
              Copy code
              <Form.Item
                className="w-full"
                label="Loại Tour"
                name="ma_loai_tour"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng Chọn Mã Loại Tour"
                  },
                ]}
              >
                <Select defaultValue="Chọn" style={{ width: "100%" }}>
                  {loaitourArray.map((option) => (
                    <Option key={option.id} value={option.id}>
                      {option.ten_loai_tour}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          <Form.Item className="" wrapperCol={{ offset: 8, span: 16 }}>
            <div className="btn-button-sub">
              <Button className="bg-blue-500" type="primary" htmlType="submit">
                Sửa
              </Button>
              <Button
                type="default"
                className="ml-2"
                onClick={() => navigate("/admin/tour")}
              >
                Quay lại
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminTourEdit;