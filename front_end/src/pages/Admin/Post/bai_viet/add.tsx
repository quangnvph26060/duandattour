import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Select, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { useAddpostMutation } from "../../../../api/post";
import { useGetpostdmQuery } from "../../../../api/postdm";
import { Ipost } from "../../../../interface/post";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from 'moment';
const { Option } = Select;

type FieldType = {
  id: number;
  ten_post: string;
  image: string;
  mo_ta: string;
  ngay_dang: string;
  id_postdm: string;
};

const Admin_DanhmucADD: React.FC = () => {
  const [addLoaiTour] = useAddpostMutation();
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState('');
  const { data: postdmdata } = useGetpostdmQuery();
  const postdmArrary = postdmdata?.data || [];

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  const onFinish = (values: Ipost) => {
    const formData = new FormData();
    formData.append("hinh", values.hinh.fileList[0].originFileObj);
    formData.append("ten_post", values.ten_post);

    values.mo_ta = editorData;
    formData.append("mo_ta", values.mo_ta);
    formData.append("ngay_dang", moment().format()); // Sử dụng ngày hiện tại
    formData.append("id_postdm", values.id_postdm);

    addLoaiTour(formData)
      .unwrap()
      .then(() => navigate("/admin/post/bai_viet"))
      .catch((error) => {
        console.log(error);
        // Xử lý lỗi (nếu có)
      });

    console.log(values);
  };

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

export default Admin_DanhmucADD;
