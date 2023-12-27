type Props = {};
import { Table, Button, Skeleton, Input, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useGetTourQuery, useRemoveTourMutation } from "../../../../api/TourApi";
import { useGetLoaiTourQuery } from "../../../../api/LoaiTourApi";
import { useState } from "react";
import "./tour.css";
const AdminProduct = (props: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleSearch = () => {
    const filteredData = tourArray.filter((item) =>
      item.ten_tour.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredDataSource(filteredData);
  };
  const { data: loaitourdata } = useGetLoaiTourQuery();
  const { data: tourdata, error, isLoading } = useGetTourQuery();
  const currentDate = new Date(); // Ngày hiện tại
  const [isSearching, setIsSearching] = useState(false);
  const [removeTour, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
    useRemoveTourMutation();
  const confirm = (id: any) => {
    removeTour(id);
  };
  const loaitourArrary = loaitourdata?.data || [];
  const tourArray = tourdata?.data || [];
  console.log(tourArray);
  const tour = () => {
    const [isreadloang, setisreadloang] = useState(false);
   
    return (
      <table className="table_tour">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Tour</th>
            <th>Ma Loai Tour</th>
            <th>Ảnh Đại diện</th>
            <th>Lich Khoi Hanh</th>
            <th>Ngay Ket Thuc</th>
            <th>Giá người lớn</th>
            <th>Giá trẻ em</th>
            <th>Số lượng</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody className="font-semibold">
          {(filteredDataSource.length > 0 ? filteredDataSource : tourArray).map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.ten_tour}</td>
              <td>
                {loaitourArrary?.map((loaiTour: { id: number, ten_loai_tour: string }) => {
                  if (loaiTour.id === item.ma_loai_tour) {
                    return loaiTour.ten_loai_tour;
                  }
                })}
              </td>
              <td>
                <img
                  src={`http://localhost:8000/storage/${item.image_dd}`}
                  alt={`Image ${index}`}
                  style={{ width: '200px', cursor: 'pointer', marginRight: '5px' }}
                />
              </td>
              <td>{item.lich_khoi_hanh}</td>
              <td>{item.ngay_ket_thuc}</td>
              <td>{item.gia_nguoilon} VNĐ </td>
              <td>{item.gia_treem} VNĐ</td>
              <td>{item.soluong}</td>
              <td>
                {(() => {
                  const departureDate = new Date(item.lich_khoi_hanh);
                  const formattedDate = departureDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                  const ngayhientai = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                  const isExpired = formattedDate < ngayhientai;
                  return (
                    <span className={isExpired ? 'expired-text' : 'active-text'}>
                      {isExpired ? 'Không Hoạt Động' : 'Hoạt Động'}
                    </span>
                  );
                })()}
              </td>
              <td>
                {localStorage.getItem("role") === 'admin' && (
                  <div className="flex space-x-2">
                    <button className="edit-button">
                      <Link to={`/admin/tour/edit/${item.id}`}>
                        <i className="fa fa-wrench"></i>
                      </Link>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <header className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-3xl">Quản lý tour</h2>

        <Button type="primary" danger>
          <Link to="/admin/tour/add" className="flex text-lg items-center space-x-2">
            <AiOutlinePlus />
            Tạo mới tour
          </Link>
        </Button>
      </header>
      <div className="flex items-center justify-end mb-4">
        <Input
          style={{ width: "250px" }}
          placeholder="Tìm kiếm lịch trình"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <Button style={{ backgroundColor: "blue", marginLeft: "5px" }} type="primary" onClick={handleSearch}>
          Tìm kiếm
        </Button>
      </div>
      {tour()}
    </div>
  );
};

export default AdminProduct;