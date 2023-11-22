
type Props = {};

// import { IProduct } from "@/interfaces/product";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { ITour } from "../../../../interface/tour";
import { useGetTourQuery, useRemoveTourMutation } from "../../../../api/TourApi";
import { useGetLoaiTourQuery } from "../../../../api/LoaiTourApi";
import { useGetHuongDanVienQuery } from "../../../../api/HuongDanVienApi";
import { Modal, Descriptions } from "antd";
import { useState } from "react";
import { Select } from 'antd';

const AdminProduct = (props: Props) => {
    const { Option } = Select;
    const { data: loaitourdata } = useGetLoaiTourQuery();
    const { data: huongdanviendata } = useGetHuongDanVienQuery();
    const { data: tourdata, error, isLoading } = useGetTourQuery();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTour, setSelectedTour] = useState<ITour | null>(null);

    const openModal = (record: ITour) => {
        setSelectedTour(record);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedTour(null);
        setModalVisible(false);
    };
    const currentDate = new Date(); // Ngày hiện tại
    const [removeTour, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
        useRemoveTourMutation();

    const confirm = (id: any) => {
        removeTour(id);
    };

    const tourArray = tourdata?.data || [];
    console.log(tourArray);

    const loaitourArrary = loaitourdata?.data || [];
    const huongdanvienArrary = huongdanviendata?.data || [];
    const dataSource = tourArray.map((
        { id, ten_tour, image_path, gia_nguoilon, gia_treem, mo_ta, soluong, diem_khoi_hanh,
            diem_den, diem_di, lich_khoi_hanh, ngay_ket_thuc,
            trang_thai, ma_loai_tour }: ITour): {
                key: number; soluong: number; ten_tour: string;
                image_path: string;

                diem_khoi_hanh: string; diem_den: string;
                gia_nguoilon: any; gia_treem: any; mo_ta: any; diem_di: string;
                lich_khoi_hanh: Date; ngay_ket_thuc: string,
                trang_thai: number; ma_loai_tour: number; ma_hdv: number;
            } => ({
                key: id,
                soluong,
                ten_tour,
                image_path,
                diem_khoi_hanh,
                diem_den,
                gia_nguoilon, gia_treem,
                mo_ta,
                diem_di,
                lich_khoi_hanh,
                ngay_ket_thuc,
                trang_thai,
                ma_loai_tour,
            }));

        

    const columns = [
        {
            title: "ID",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Tour du lịch",
            dataIndex: "ten_tour",
            key: "ten_tour",
            render: (text: string, record: ITour) => (
                <span
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => openModal(record)}
                >
                    {text}
                </span>
            ),
        },
        {
            title: "Ảnh tour",
            dataIndex: "image_path",
            key: "image_path",
            render: (image_path: string) => (
                <img
                    src={`http://localhost:8000/storage/${image_path}`}
                    alt="img"
                    style={{ width: '200px', cursor: 'pointer' }}
                />
            ),
        },


        // {
        //     title: "Lịch Khởi Hành",
        //     dataIndex: "lich_khoi_hanh",
        //     key: "lich_khoi_hanh",
        //     render: (lich_khoi_hanh: string | number | Date) => {
        //         const departureDate = new Date(lich_khoi_hanh);
        //         return departureDate.toLocaleDateString('en-GB');
        //     },
        // },


        // {
        //     title: "Lịch Kết Thúc",
        //     dataIndex: "ngay_ket_thuc",
        //     key: "ngay_ket_thuc",
        //     render: (ngay_ket_thuc: string | number | Date) => {
        //         const departureDate = new Date(ngay_ket_thuc);
        //         return departureDate.toLocaleDateString('en-GB');
        //     },
        // },
        {
            title: "Giá Người lớn",
            dataIndex: "gia_nguoilon",
            key: "gia_nguoilon",
        },
        {
            title: "Giá Trẻ em",
            dataIndex: "gia_treem",
            key: "gia_treem",
        },
        {
            title: "Số Lượng Còn Nhận ",
            dataIndex: "soluong",
            key: "soluong",
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'trang_thai',
            key: 'trang_thai',
            render: (trang_thai: any, record: { lich_khoi_hanh: string | number | Date; }) => {
                const departureDate = new Date(record.lich_khoi_hanh); // Ngày khởi hành từ dữ liệu

                if (departureDate < currentDate) {
                    return <span style={{}}>Đã Hết Hạn</span>;
                } else {
                    return <span>Vẫn Hoạt Động</span>;
                }
            },
        },

        {
            title: "Khu Vực",
            dataIndex: "ma_loai_tour",
            key: "ma_loai_tour",
            render: (ma_loai_tour: number) => {
                const loaiTour = loaitourArrary.find((item: { id: number; }) => item.id === ma_loai_tour);
                return loaiTour ? loaiTour.ten_loai_tour : "Không xác định";

            }
        },
<<<<<<< HEAD
     
=======

>>>>>>> 24fd2b6cc9fbd1d6b0b0e3ce8c2ced2791ab766b
        {
            title: "Action",
            key: 'action',
            render: ({ key: id }: any) => {
                return (
                    <>

                        {
                            localStorage.getItem("role") == 'admin' ? <div className="flex space-x-2">
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
                                    <Link to={`/admin/tour/edit/${id}`}>Sửa</Link>
                                </Button>
                            </div> : ""
                        }
                    </>
                );
            },
        },
    ];
    const [visibleColumns, setVisibleColumns] = useState(columns.map(column => column.key));
    const handleColumnToggle = (columnKey: string) => {
        if (visibleColumns.includes(columnKey)) {
            setVisibleColumns(visibleColumns.filter(key => key !== columnKey));
        } else {
            setVisibleColumns([...visibleColumns, columnKey]);
        }
    };

    const visibleColumnsData = columns.filter(column => visibleColumns.includes(column.key));
    const tourDetailsColumns = [
        {
            title: 'Điểm Đi',
            dataIndex: 'diem_di',
            key: 'diem_di',
        },
        {
            title: 'Điểm Đến',
            dataIndex: 'diem_den',
            key: 'diem_den',
        },
        {
            title: 'Ngày Khởi Hành',
            dataIndex: 'lich_khoi_hanh',
            key: 'lich_khoi_hanh',
        },
        {
            title: 'Ngày Kết Thúc',
            dataIndex: 'ngay_ket_thuc',
            key: 'ngay_ket_thuc',
        },
        {
            title: 'Giá Người Lớn',
            dataIndex: 'gia_nguoilon',
            key: 'gia_nguoilon',
        },
        {
            title: 'Giá Trẻ Em',
            dataIndex: 'gia_treem',
            key: 'gia_treem',
        },
        {
            title: 'Giá Khuyến Mãi',
            dataIndex: 'gia_khuyen_mai',
            key: 'gia_khuyen_mai',
        },
        {
            title: 'Mô Tả',
            dataIndex: 'mo_ta',
            key: 'mo_ta',
        },
        // Thêm các cột khác tương ứng với thông tin tour
    ];
    return (
        <div>

            <header className="mb-4 flex justify-between items-center">
                <h2 className="font-bold text-2xl">Quản lý tour</h2>
                <Button type="primary" danger>
                    <Link to="/admin/tour/add" className="flex items-center space-x-2">
                        <AiOutlinePlus />
                        Tạo mới tour
                    </Link>
                </Button>
            </header>
            {/* {isRemoveSuccess && <Alert message="Success Text" type="success" />} */}
            {isLoading ? <Skeleton /> : (
                <>
                    <div>
                        <h3>Hiển thị cột</h3>
                        <Select
                            mode="multiple"
                            placeholder="Chọn cột hiển thị"
                            // value={visibleColumns}
                            onChange={setVisibleColumns}
                            style={{ width: '100%' }}
                        >
                            {columns.map(column => (
                                <Option key={column.key} value={column.key}>
                                    {column.title}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    {isRemoveSuccess && <Alert message="Success Text" type="success" />}

                    {isLoading ? <Skeleton /> : <Table dataSource={dataSource} pagination={{ pageSize: 10 }} columns={visibleColumnsData} />}
                </>
            )}
            <Modal
                visible={modalVisible}
                onCancel={closeModal}
                footer={null}
                className="rounded-md"
            >
                {selectedTour && (
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">Thông tin Tour</h2>
                        <table className="w-full table-auto border-collapse border rounded">
                            <tbody>
                                {tourDetailsColumns.map((column) => (
                                    <tr key={column.key} className="border-b">
                                        <td className="py-2 px-4 font-semibold">{column.title}</td>
                                        <td className="py-2 px-4">
                                            {column.dataIndex === 'images' ? (
                                                <img src={selectedTour[column.dataIndex][0]} alt="Tour" className="w-full max-h-32 object-cover" />
                                            ) : (
                                                selectedTour[column.dataIndex]
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default AdminProduct;
