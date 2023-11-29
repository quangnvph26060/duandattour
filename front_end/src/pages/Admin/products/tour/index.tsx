
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
import { SetStateAction, useEffect, useState } from "react";
import { Select } from 'antd';
import axios from "axios";

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

    const tour = () => {
        const [hdvtour, sethdvtour] = useState([]);
        useEffect(() => {
            axios.get('http://127.0.0.1:8000/api/admin/hdvtour/')
                .then((response) => {
                    sethdvtour(response.data.hdv);


                })
                .catch((error) => {
                    console.log(error);
                });
        }, []);


        const [tourHDVArray, setTourHDVArray] = useState([]);
        useEffect(() => {
            const fetchHDVData = async (a, b) => {
                if (a && b) {
                    try {
                        const response = await axios.post('http://127.0.0.1:8000/api/admin/hdvtour', {
                            start_date: a,
                            end_date: b
                        });
                        const hdvDate = response.data.hdv_abc;

                        return hdvDate;
                    } catch (error) {
                        // Xử lý lỗi
                        console.error(error);
                        return [];
                    }
                }
            };

            const fetchData = async () => {
                const tempArray = [];
                for (let i = 0; i < tourArray.length; i++) {
                    const item = tourArray[i];
                    const hdvData = await fetchHDVData(item.lich_khoi_hanh, item.ngay_ket_thuc);
                    tempArray.push(hdvData);
                }
                setTourHDVArray(tempArray);
            };

            fetchData();
        }, [tourArray]);

        return (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        {/* <th>Ma Loai Tour</th>
                <th>Image Path</th> */}
                        <th>Lich Khoi Hanh</th>
                        <th>Ngay Ket Thuc</th>
                        <th>Hướng dẫn viên</th>
                        <th>Gia Nguoi Lon</th>
                        <th>Gia Tre Em</th>
                        <th>So Luong</th>
                        <th>Trang Thai</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tourArray.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.ten_tour}</td>
                            {/* <td>{item.ma_loai_tour}</td>
                  <td>{item.image_path}</td> */}
                            <td>{item.lich_khoi_hanh}</td>
                            <td>{item.ngay_ket_thuc}</td>
                            <td>
                                <select>
                                    <option value="">Chọn</option>
                                    {tourHDVArray[index]?.map((hdvItem) => {
                                        const selected = hdvtour.filter((itemhdv) => itemhdv.hdv_id == hdvItem.id
                                            && typeof (itemhdv.start_date) == typeof (item.lich_khoi_hanh)
                                            && typeof (itemhdv.end_date) == typeof (item.ngay_ket_thuc)).length > 0;

                                        return (
                                            <option
                                                key={hdvItem.id}
                                                value={hdvItem.id}
                                                selected={selected ? "selected" : ""}
                                            >
                                                {hdvItem.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </td>
                            <td>{item.gia_nguoilon}</td>
                            <td>{item.gia_treem}</td>
                            <td>{item.soluong}</td>
                            <td>{item.trang_thai}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };
    const loaitourArrary = loaitourdata?.data || [];
    const huongdanvienArrary = huongdanviendata?.data || [];
    const dataSource = tourArray?.map(({
        id, ten_tour, image_path, gia_nguoilon, gia_treem, mo_ta, soluong, diem_khoi_hanh,
        diem_den, diem_di, lich_khoi_hanh, ngay_ket_thuc,
        trang_thai, ma_loai_tour
    }: ITour) => ({
        key: id,
        soluong,
        ten_tour,
        image_path,
        diem_khoi_hanh,
        diem_den,
        gia_nguoilon,
        gia_treem,
        mo_ta,
        diem_di,
        lich_khoi_hanh,
        ngay_ket_thuc,
        trang_thai,
        ma_loai_tour,
    }));




    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const columns = [
        {
            title: "ID",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Khu Vực",
            dataIndex: "ma_loai_tour",
            key: "ma_loai_tour",
            render: (ma_loai_tour: number) => {
                const loaiTour = loaitourArrary?.find((item: { id: number }) => item.id === ma_loai_tour);
                return loaiTour ? loaiTour.ten_loai_tour : "Không xác định";
            }
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
        {
            title: "Ngày đi",
            dataIndex: "lich_khoi_hanh",
            key: "lich_khoi_hanh",
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "ngay_ket_thuc",
            key: "ngay_ket_thuc",
        },
        // {
        //     title: "Ngươi Hướng Dẫn Viên",
        //     render: (_: any, record: { lich_khoi_hanh: any, ngay_ket_thuc: any }) => {
        //         return abc(record.lich_khoi_hanh, record.ngay_ket_thuc);
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


    const calculateTotalTours = (dataSource) => {
        return dataSource.length;
    };
    const totalTours = calculateTotalTours(dataSource);
    return (
        <div>

            {tour()}
            <header className="mb-4 flex justify-between items-center">
                <h2 className="font-bold text-3xl">Quản lý tour</h2>

                <Button type="primary" danger>
                    <Link to="/admin/tour/add" className="flex text-lg items-center space-x-2">
                        <AiOutlinePlus />
                        Tạo mới tour
                    </Link>
                </Button>
            </header>
            {/* {isRemoveSuccess && <Alert message="Success Text" type="success" />} */}
            {isLoading ? <Skeleton /> : (
                <>
                    <div>
                        <h3 className="text-lg text-orange-600">Tổng số :  {totalTours} tour</h3>
                        <h3 className=" mt-2 text-lg">Hiển thị cột</h3>
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
