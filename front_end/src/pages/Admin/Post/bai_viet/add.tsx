import React, { useEffect, useState } from "react";
import { Form, Button, Input, DatePicker, Select, InputNumber, Popconfirm, Table } from "antd";
import { AiOutlineLoading3Quarters, AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useGetLoaiTourQuery } from "../../../../api/LoaiTourApi";
import { useGetHuongDanVienQuery } from "../../../../api/HuongDanVienApi";
import { ITour } from "../../../../interface/tour";
import { useAddTourMutation } from "../../../../api/TourApi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
type FieldType = {
  id: number;
  ten: string;

  mo_ta: string;
  loai_danh_muc: string;
};

const ADmin_postADD: React.FC = () => {
  const [editorData, setEditorData] = useState("");

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };
  //   const [addTour] = useAddTourMutation();
  //   const [loading, setLoading] = useState(false);
  //   const [errors, setErrors] = useState(null);

  const onFinish = (values: FieldType) => {
    const formData = new FormData();

    // Kiểm tra nếu có hình ảnh được chọn

    formData.append("ten_tour", values.ten_tour);

    values.mo_ta = editorData;
    formData.append("mo_ta", values.mo_ta);

    // addTour(formData) // Sử dụng formData chứa hình ảnh
    //   .unwrap()
    //   .then(() => navigate("/admin/tour"))
    //   .catch((error) => {
    //     setErrors(error.data.message);
    //   });
  };

  const { data: loaitourdata } = useGetLoaiTourQuery();
  const { data: huongdanviendata } = useGetHuongDanVienQuery();
  const loaitourArrary = loaitourdata?.data || [];
  const huongdanvienArrary = huongdanviendata?.data || [];
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [provinces2, setProvinces2] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const dataSource = [
    {
      key: 1,
      ten_bai_viet: "Bài viết cương",
      image: "image_url_1.jpghttps://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/399083074_666738505589224_5550605208199897590_n.jpg?stp=dst-jpg_p843x403&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Z6q--I4u1U4AX-mpVqv&_nc_ht=scontent.fhan14-3.fna&oh=00_AfAhGnPQEVEVOXt_CGOJHdx5C6cGjN-dFNyeuyhTrrPEMA&oe=6566DDAE", // You can use the image URL or any other representation you need
      mo_ta: "Mô tả bài viết 1",
    },
    {
      key: 2,
      ten_bai_viet: "Bài viết thái",
      image: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/399083074_666738505589224_5550605208199897590_n.jpg?stp=dst-jpg_p843x403&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Z6q--I4u1U4AX-mpVqv&_nc_ht=scontent.fhan14-3.fna&oh=00_AfAhGnPQEVEVOXt_CGOJHdx5C6cGjN-dFNyeuyhTrrPEMA&oe=6566DDAE",
      mo_ta: "Mô tả bài viết 2",
    },
    // Add more data objects as needed
  ];

  const columns = [

    {
      title: "Tên bài viết",
      dataIndex: "ten_bai_viet",
      key: "ten_bai_viet",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Bài viết" style={{ maxWidth: "100px", maxHeight: "100px" }} />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "mo_ta",
      key: "mo_ta",
    },
    {
      title: "Action",
      render: ({ key: id }) => {
        return (
          <>
            <div className="flex space-x-2">
              <Popconfirm
                title="Bạn có muốn xóa?"
                onConfirm={() => confirm(id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger>
                  Xóa
                </Button>
              </Popconfirm>
              {/* Add other action buttons or links here */}
            </div>
          </>
        );
      },
    },
  ];
  return (
    <div className="container mx-auto justify-center flex gap-4 p-5">
      <div className="w-1/3 bg-slate-100 p-6 shadow-2xl rounded-xl">
        <header className="mb-4">
          <h2 className="font-bold text-2xl text-gray-800 text-center">Tạo mới bài viết</h2>
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
              label="Tên bài viết"
              name="ten"
              rules={[
                { required: true, message: "Vui lòng nhập tên tour!" },
                { min: 3, message: "Tên tour ít nhất 3 ký tự" },
              ]}
              className="py-7"
            >
              <Input className="w-[350px] mx-auto" />
            </Form.Item>


            <Form.Item
              label="Mô tả bài viết"
              name="mo_ta"
              rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
              className=""
            >
              <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={handleEditorChange}
              />
            </Form.Item>

            <Form.Item
              label="Loại bài viết"
              name="ma_loai_tour"
              rules={[
                { required: true, message: "Vui lòng chọn Mã Loại bài viết" },
              ]}
              className="pt-2"
            >
              <Select defaultValue="Chọn" style={{ width: 150 }}>
                {/* {loaitourArrary.map((option) => (
            <Option key={option.id} value={option.id}>{option.ten_loai_tour}</Option>
          ))} */}
              </Select>
            </Form.Item>

            <div className="py-6">
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Thêm
                </Button>
                <Button
                  type="default"
                  className="ml-2 "
                  onClick={() => navigate("/admin/tour")}
                >
                  Quay lại
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>

  );
};

export default ADmin_postADD;