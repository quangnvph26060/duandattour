import React, { useEffect, useState } from "react";
import { Table, Button, Skeleton, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

import { useGetUserQuery } from "../../../../api/UserApi";
import { IUser, IRole, IPermission } from "../../../../interface/user";

type Props = {};

const Admin_Khachhang: React.FC<Props> = () => {
  const { data: userdata, error, isLoading } = useGetUserQuery();


  const tourArray = userdata?.data || [];
  const [userData, setUserData] = useState<IUser[]>([]);

  useEffect(() => {
    if (!isLoading) {
      setUserData(userdata || []);
    }
  }, [isLoading]);

  const dataSource = tourArray.map(
    ({
      id,
      name,
      image,
      dia_chi,
      email,
      sdt,
      cccd,
      roles,

    }: IUser) => ({
      key: id,
      name,
      image,
      dia_chi,
      email,
      sdt,
      cccd,
      roles: roles.map((role: IRole) => role.name).join(", "),
      permissions: roles
        .map((role: IRole) => role.permissions.map((permission: IPermission) => permission.name))
        .flat()
        .join(", "), // Hiển thị danh sách quyền từ mảng roles
    })
  );
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img
          src={`http://localhost:8000/storage/${image}`}
          alt="img"
          style={{ width: '100px', cursor: 'pointer' }}
        />
    ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "dia_chi",
      key: "dia_chi",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: "Chứng Minh Thư",
      dataIndex: "cccd",
      key: "cccd",
    },
    {
      title: "Vai Trò",
      dataIndex: "roles",
      key: "roles",
    },
    {
      title: "Quyền",
      dataIndex: "permissions",
      key: "permissions",

    },
    {
      title: "Action",
      render: ({ key: id }: any) => (
        localStorage.getItem("role") == 'admin' ? <div className="flex space-x-2">
          <Button type="primary" danger>
            <Link to={`/admin/customer_account/edit/${id}`}>Phân Vai Trò</Link>
          </Button>

          <Button type="primary" danger>
            <Link to={`/admin/customer_account/permissions/${id}`}>Phân Quyền</Link>
          </Button>
          
        </div> : ""
      ),
    },
  ];

  return (
    <div>
      <header className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Quản lý khách hàng</h2>
      </header>

      {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
    </div>
  );
};

export default Admin_Khachhang;