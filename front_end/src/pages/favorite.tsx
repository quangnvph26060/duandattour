import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useGetTourByIdQuery } from '../api/TourApi';
import { MdDeleteOutline } from "react-icons/md"

const Favorite = () => {

  const handleLogout = async (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Bạn chắc chắn muốn đăng xuất?");

    if (!confirmLogout) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.delete('http://127.0.0.1:8000/api/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('role');
      // Display a success message
      alert("Đăng xuất thành công!");
      window.location.href = 'http://localhost:5173';
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };

  const token = localStorage.getItem("token");
  const [usersId, setUserId] = useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idCccd, setIdCccd] = useState('');
  const [address, setAddress] = useState('');
  const role = localStorage.getItem('role');
  useEffect(() => {

    if (token) {
      // Gửi yêu cầu API để lấy thông tin người dùng từ token
      fetch("http://localhost:8000/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          setUserId(userData);

          setName(userData.name);
          setEmail(userData.email);
          setPhoneNumber(userData.sdt);
          setIdCccd(userData.cccd);
          setAddress(userData.dia_chi);

        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token])

  const [tourfavorite, setTourfavorite] = useState([]);
  useEffect(() => {
    addToFavorites();
  }, []);
  const addToFavorites = () => {
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:8000/api/favorites', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setTourfavorite(response.data);

        console.log(response.data);
      })
      .catch(error => {
        // Xử lý lỗi
        console.error(error);
      });
    console.log('123', tourfavorite)
  };

  const tourIds = tourfavorite.map(item => item.tour_id);
  // console.log('sdfdsf',tourIds);
  const { data: postData, error, isLoading } = useGetTourByIdQuery(tourIds);
  // console.log('2323',postData)
  useEffect(() => {
    // Dòng log này chỉ được gọi khi postData đã được cập nhật
    console.log('2323', postData);
  }, [postData]);

  const [deletingItemId, setDeletingItemId] = useState(null);

  const removeFromFavorites = (tourId) => {
    const token = localStorage.getItem('token');
    console.log('Removing tourId:', tourId);

    axios
      .delete(`http://127.0.0.1:8000/api/favorites/${tourId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Update the state to remove the deleted item
        setTourfavorite((prevFavorites) =>
          prevFavorites.filter((item) => item.tour_id !== tourId)
        );
        console.log('Item removed successfully:', response.data);
      })
      .catch((error) => {
        // Handle error
        console.error('Error removing item:', error);
      });
  };

  return (
    <div className='mx-auto container flex gap-10 py-8'>
      <aside className='w-1/5 container mx-auto'>
        <div className='border border-gray-300 rounded-lg container mx-auto'>
          <div className='px-4 py-7 flex gap-1'>
            <img
              src={`http://localhost:8000/storage/${usersId.image}`}
              alt="img"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%', // Đặt border-radius thành 50% để làm cho hình ảnh tròn
                border: '2px solid #fff', // Đặt border với màu và độ rộng tùy chọn
              }}
            />
            <div className='p-2'>
              <h1 className='font-medium p-1'>{usersId.name}</h1>
              <p className='text-sm px-1 text-left'>{usersId.email}</p>
            </div>
          </div>
          <hr className='mx-5 h-[2px] bg-slate-900' />
          <div className='py-3'>
            <h2 className='px-5 font-medium py-2'>Tài khoản</h2>
            <div className='px-10'>
              {(role === 'admin' || role === 'huong_dan_vien' || role === 'nhan_vien') && (
                <a href="/admin"><p className='text-sm text-red-500 py-1'>Quản lý Website</p></a>
              )}
              <a href="/profile"><p className='text-sm text-red-500 py-1'>Thông tin cá nhân</p></a>
              <a href="/changeMk"> <p className='text-gray-500 text-sm py-1 hover:text-red-500'>Đổi mật khẩu</p></a>
              <a href="#" onClick={handleLogout}>
                <p className='text-gray-500 text-sm py-1 hover:text-red-500'>Đăng xuất</p>
              </a>

            </div>
          </div>
          <a href="/giohanguser"><h3 className='px-5 py-1 font-medium hover:text-red-500'>Tour đã đặt</h3></a>
          <a href=""><h3 className='px-5 py-1 font-medium hover:text-red-500'>Đánh giá của quý khách</h3></a>
          <a href="/favorite"><h3 className='px-5 py-1 pb-10 font-medium hover:text-red-500'>Yêu thích đã lưu</h3></a>
        </div>
      </aside>


      <div className="container mx-auto w-4/5" style={{ display: "flex", gap: "10px" }}>
        <div>
          <div className='container mx-auto border border-gray-400 rounded-lg text-center lg:w-[1200px] md:w-[700px] mb:w-[300px]'><h1 className='text-xl font-semibold pb-5 py-4'>Các Tour Đã Lưu</h1></div>
          <div className='flex gap-4 py-4 container mx-auto'>
            {tourfavorite.map((item) => (
              <div key={item.id} className="tour-item bg-white rounded-t-lg w-[330px] shadow-lg">
                {/* <div className="tour-image">
                  <img
                    src={`http://localhost:8000/storage/${item.image_path}`}
                    alt="Tour Image"
                    style={{ width: "200px", cursor: "pointer" }}
                  />
                </div> */}
                <img src="https://media.travel.com.vn/destination/tf_220222113311_677514.jpg" className='w-[320px] h-[240px] rounded-t-lg' alt="" />
                <div className="tour-details">
                  <p className='py-2 px-3'>Ngày khởi hành: {item.lich_khoi_hanh}</p>
                  <p className="tour-name text-lg font-semibold px-3 text-blue-950 text-left">{item.ten_tour}</p>
                  <p className='px-4 text-sm text-left pb-5 py-2'>Nơi khởi hành:{item.diem_khoi_hanh}</p>

                  <div className='px-4 pb-4 flex gap-10 justify-between'>
                    <button
                      onClick={() => removeFromFavorites(item.tour_id)}
                      className='py-2 px-6 bg-red-500 rounded-lg text-white font-semibold text-lg flex gap-1'
                    >
                      <img src="" alt="" />
                      Xóa
                    </button>
                    <p className='px-5 text-red-500 font-semibold py-3 text-2xl'>{item.gia_nguoilon}₫</p>
                  </div>
                  {/* Thêm các chi tiết khác về tour tại đây */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorite