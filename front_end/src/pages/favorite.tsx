import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
  };
  return (
    <div className='mx-auto container flex gap-5'>
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

     
      <div className="tour-container" style={{display:"flex", gap:"10px"}}>
        {tourfavorite.map((item) => (
          <div key={item.id} className="tour-item">
            <div className="tour-image">
              <img
                src={`http://localhost:8000/storage/${item.image_path}`}
                alt="Tour Image"
                style={{ width: "200px", cursor: "pointer" }}
              />
            </div>
            <div className="tour-details">
              <p className="tour-name">Tên tour: {item.ten_tour}</p>
              {/* Thêm các chi tiết khác về tour tại đây */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite