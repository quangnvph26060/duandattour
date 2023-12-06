import React from "react";
import { Form, Button, Input, DatePicker, Select, Upload } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAddLoaiTourMutation } from "../../../../api/LoaiTourApi";
import { ILoaiTour } from "../../../../interface/loaiTour";

const { Option } = Select;

type FieldType = {
  id: number;
  image:string;
  ten_loai_tour: string;
};

const Admin_DanhmucADD: React.FC = () => {
  const [addLoaiTour] = useAddLoaiTourMutation();
  const navigate = useNavigate();

  const onFinish = (values: ILoaiTour) => {
    const formData = new FormData();
  
    formData.append("ten_loai_tour", values.ten_loai_tour); // Thêm các trường dữ liệu khác vào formData (nếu cần)
  
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
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Tạo mới danh mục</h2>
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
          label="Tên danh mục tour"
          name="ten_loai_tour"
          rules={[
            { required: true, message: "Vui lòng nhập tên loại tour!" },
            { min: 3, message: "Tên tour ít nhất 3 ký tự" },
          ]}
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
            onClick={() => navigate("/admin/tour/loai_tour")}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin_DanhmucADD;
