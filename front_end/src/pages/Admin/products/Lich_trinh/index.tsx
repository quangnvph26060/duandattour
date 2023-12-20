type Props = {};

// import { IProduct } from "@/interfaces/product";
import { Table, Button, Skeleton, Popconfirm, Alert , message, Switch} from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import {
  useGetLichTrinhQuery,
  useRemoveLichTrinhMutation,
} from "../../../../api/LichTrinhApi";
import { ILichTrinh } from "../../../../interface/lichtrinh";
import { ITour } from "../../../../interface/tour";
import { useGetTourQuery } from "../../../../api/TourApi";

import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'; // Import the icons
import axios from "axios";

const Admin_Lichtrinh = (props: Props) => {
  const { data: lictrinhdata, error, isLoading } = useGetLichTrinhQuery();
  const { data: tourdata } = useGetTourQuery();
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };
  const [
    removeLichTrinh,
    { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess },
  ] = useRemoveLichTrinhMutation();

  const confirm = (id: any) => {
    removeLichTrinh(id);
  };
  // const navigate = useNavigate();
  const lichtrinhrArray = lictrinhdata?.date || [];
  const tourArrary = tourdata?.data || [];
  const dataSource = lichtrinhrArray.map(
    ({ id, noi_dung, thoi_gian,status, id_tour }: ILichTrinh) => ({
      key: id,
      noi_dung,
      thoi_gian,
      status,
      id_tour,
    })
  );

  const tableStyles: React.CSSProperties = {
    fontWeight: "bold",
    textAlign: "center",
  };

  const [selectedId, setSelectedId] = useState("");
  const updateStatus = (id) => {
    setSelectedId(id);
    console.log(id);
    axios
      .put(
        `http://127.0.0.1:8000/api/admin/lichtrinh/updateStatusSchedule/${id}`)
      .then((response) => {
        if (response.data) {
          alert("cập nhật trạng thái thành công");
        }
        // Thực hiện các tác vụ sau khi nhận được phản hồi từ API
      })
      .catch((error) => {
        console.error("API error:", error);
        // Xử lý lỗi nếu có
      });
  };
  const columns = [
    {
      title: (
        <span style={tableStyles} className="w-[40px]">
          ID
        </span>
      ),
      dataIndex: "key",
      key: "key",
    },
    {
      title: (
        <span style={tableStyles} className="w-[40px]">
        Nội dung
        </span>
      ),
      dataIndex: "noi_dung",
      key: "noi_dung",
    },
    {
      title: (
        <span style={tableStyles} className="w-[40px]">
       Thời gian
        </span>
      ),
      dataIndex: "thoi_gian",
      key: "thoi_gian",
    },
    {
      title: (
        <span style={tableStyles} className="w-[40px]">
          Tour tương ứng
        </span>
      ),
      dataIndex: "id_tour",

      key: "id_tour",
      render: (id_tour: number) => {
        const Tour = tourArrary.find((item) => item.id === id_tour);
        return Tour ? Tour.ten_tour : "Không xác định";
      },
    },
    {
      title: (
        <span style={tableStyles} className="w-[40px]">
          Trạng thái lịch trình
        </span>
      ),
      dataIndex: "status",
      key: "status",
      render: (status, {key: id }) => {
        const check = status === 0 ? false : true;

        return (
          <Switch
            defaultChecked={check}
            onChange={(checked) => {
              updateStatus(id); // Lấy giá trị id từ record
              onChange(checked);
            }}
          />
        );
      },
    },

    {
      title:  (
        <span style={tableStyles} className="w-[40px]">
        Hành động
        </span>
      ),
      render: ({ key: id }: any) => {
        return (
          <>
            {localStorage.getItem("role") == "admin" ? (
              <div className="flex space-x-2">
                <Popconfirm
                  title="Bạn có muốn xóa?"
                  onConfirm={() => confirm(id)}
                  okText="Yes"
                  className="text-black"
                  cancelText="No"
                >
               <Button type="primary" danger icon={<DeleteOutlined />}>
               
                  </Button>
                </Popconfirm>

                <Button className="bg-green" type="primary">
                  <Link to={`/admin/tour/lich_trinh/edit/${id}`}>  <EditOutlined /></Link>
                </Button>
              </div>
            ) : (
              ""
            )}
          </>
        );
      },
    },
  ];

  return (
    <div>
      <header className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Quản lý lịch trình</h2>
        <Button type="primary" danger>
          <Link
            to="/admin/tour/lich_trinh/add"
            className="flex items-center space-x-2"
          >
            <AiOutlinePlus />
            Tạo mới lịch trình
          </Link>
        </Button>
      </header>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 2 }}
        />
      )}
    </div>
  );
};

export default Admin_Lichtrinh;
