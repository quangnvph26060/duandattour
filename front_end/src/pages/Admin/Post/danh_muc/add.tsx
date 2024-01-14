import React from "react";
import { Form, Button, Input, DatePicker, Select, Upload } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAddpostdmMutation } from "../../../../api/postdm";
import { Ipostdm } from "../../../../interface/postdm";

const { Option } = Select;

type FieldType = {
  id: number;
  image: string;

  ten_dm: string;
};

const Admin_DanhmucADD: React.FC = () => {
  const [addLoaiTour] = useAddpostdmMutation();
  const navigate = useNavigate();

  const onFinish = (values: Ipostdm) => {
    const formData = new FormData();
    formData.append("hinh", values.hinh.fileList[0].originFileObj);
    formData.append("ten_dm", values.ten_dm); // Thêm các trường dữ liệu khác vào formData (nếu cần)

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
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md mt-8 justify-center">
      <header className="mb-4 text-center">
        <h2 className="font-bold text-2xl ext-gray-800">Tạo mới danh mục</h2>
      </header>
      <div className="flex items-center justify-center">
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
            label="Tên danh mục"
            name="ten_dm"
            rules={[
              { required: true, message: "Vui lòng nhập tên loại tour!" },
              { min: 3, message: "Tên tour ít nhất 3 ký tự" },
            ]}
            className="py-5"
          >
            <Input className="w-[500px] border-2 border-gray-300 p-2 rounded-md" />
          </Form.Item>
          <Form.Item
            label="Image"
            name="hinh"
            rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
          >
            <Upload
              accept="image/*"
              listType="picture"
              beforeUpload={() => false}
              className="flex w-[500px] items-center justify-between border-2 border-gray-300 p-2 rounded-md"
            >
              <span className="text-gray-600 px-1">Chọn ảnh</span>
              <Button icon={<UploadOutlined />} type="button" />
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="mt-10 py-5">
            <Button type="primary" htmlType="submit" className="mr-2 bg-blue-400">
              Thêm
            </Button>
            <Button
              type="default"
              onClick={() => navigate("/admin/post/danhmuc_post")}
              className="bg-red-500 hover:bg-white text-white"
            >
              Quay lại
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Admin_DanhmucADD;
