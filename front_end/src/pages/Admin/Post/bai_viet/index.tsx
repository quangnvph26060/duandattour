import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Ipost } from "../../../../interface/post";
import { useGetpostQuery, useRemovepostMutation } from "../../../../api/post";

const Admin_baiviet = () => {
  const { data: tourdata } = useGetpostQuery();
  const [removePost, { isSuccess: isRemoveSuccess }] = useRemovepostMutation();
  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    if (tourdata?.data) {
      const modifiedData = tourdata.data.map(({ id, ten_post, image, mo_ta, ngay_dang }: Ipost) => ({
        key: id,
        ten_post,
        image,
        mo_ta,
        ngay_dang,
        expand: false, // Initially set expand to false for all rows
      }));
      setDataSource(modifiedData);
    }
  }, [tourdata]);

  useEffect(() => {
    if (isRemoveSuccess) {
      setTimeout(() => {
        navigate("/admin/post/bai_viet", { replace: true });
        window.location.reload(); // Reload the page after 1 second
      }, 1000);
    }
  }, [isRemoveSuccess, navigate]);

  const handleExpand = (key) => {
    const updatedDataSource = dataSource.map((item) =>
      item.key === key ? { ...item, expand: !item.expand } : item
    );
    setDataSource(updatedDataSource);
  };

  const handleClose = (key) => {
    setExpandedDescriptions({
      ...expandedDescriptions,
      [key]: false, // Đặt expand về false khi đóng nội dung
    });
  };

  const columns = [
    {
      title: "ID bài viết",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên bài viết",
      dataIndex: "ten_post",
      key: "ten_post",
    },
    {
      title: "Ảnh bài viết",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img
          src={`http://localhost:8000/storage/${image}`}
          alt="img"
          style={{ width: '200px', cursor: 'pointer' }}
        />
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "mo_ta",
      key: "mo_ta",
      render: (text, record) => {
        const isExpanded = expandedDescriptions[record.key];
        const truncatedText = text.slice(0, 100); // Điều chỉnh giới hạn ký tự theo ý muốn

        return (
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: isExpanded ? text : truncatedText + (text.length > 100 ? "..." : ""),
              }}
            />
            {!isExpanded && text.length > 100 && (
              <Button
                type="link"
                onClick={() =>
                  setExpandedDescriptions({
                    ...expandedDescriptions,
                    [record.key]: true,
                  })
                }
              >
                Xem thêm
              </Button>
            )}
            {isExpanded && (
              <Button
                type="link"
                onClick={() => handleClose(record.key)}
              >
                Đóng lại
              </Button>
            )}
          </div>
        );
      },
    },
    {
      title: "Ngày đăng",
      dataIndex: "ngay_dang",
      key: "ngay_dang",
    },
    {
      title: "Action",
      render: ({ key: id }) => (
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
          <Button type="primary" danger>
            <Link to={`/admin/post/edit_baiviet/${id}`}>Sửa</Link>
          </Button>
        </div>
      ),
    },
  ];

  const confirm = (id) => {
    removePost(id);
  };

  return (
    <div>
      <header className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Quản lý  bài viết</h2>
        <Button type="primary" className="bg-blue-500 p-5 flex justify-center items-center hover:bg-blue-600">
          <Link to="/admin/post/add_baiviet" className="flex items-center space-x-2">
            <AiOutlinePlus />
            Tạo mới bài viết
          </Link>
        </Button>
      </header>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Admin_baiviet;
