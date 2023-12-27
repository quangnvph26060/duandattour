import React, { useEffect, useState } from 'react';
import '../promo.css';
import dl from '../img/DL.jpg';
import qn from '../img/qn.jpg';
import dn from '../img/dn.jpg';

const PromotionPage = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin/tour');
        if (!response.ok) {
          throw new Error('Failed to fetch promotions');
        }
        const data = await response.json();
        setPromotions(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPromotions();
  }, []);

  return (
    <div className="promotion-page">
      <h2 style={{ color: 'red', fontWeight: '600' }} className="promotion-page__title">
        Khuyến Mãi Fpoly
      </h2>
      <p className="promotion-page__description">Đón nhận những ưu đãi hấp dẫn từ chúng tôi!</p>
      <div className="promotion-list">
        {promotions.slice(0, 3).map((promotion) => (
          <div
            key={promotion.id}
            className="promotion-item"
            style={{
              backgroundImage: `url(http://localhost:8000/storage/${promotion.image_dd})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="promotion-item__overlay">
              <h3 className="promotion-item__title">{promotion.diem_den}</h3>
              <p className="promotion-item__description">{promotion.mo_ta}</p>
              <a href="#" className="promotion-item__button">
                Xem chi tiết
              </a>
            </div>
          </div>
        ))}
      </div>
      <h3>Khuyến mãi PolyTour:</h3>
  <ul>
    <li>PolyTour & Sacombank: Quẹt thẻ liền tay - Giảm ngay 1 triệu đồng</li>
    <li>Khuyến mại Hè 2023 “Hè vui như hội – Gấp bội yêu thương”: PolyTour ưu đãi “Thanh toán thẻ JCB – Tặng vali cao cấp”</li>
    <li>PolyTour triển khai chương trình ưu đãi cùng VNPAY “Trúng deal to – Du lịch chẳng lo”</li>
    <li>PolyTour & JCB tung ưu đãi “Thanh toán liền tay - Nhận ngay deal xịn”</li>
    <li>Deal hot tour Hè tại PolyTour cùng VPBank x Mastercard với ưu đãi lên tới 500.000 đồng</li>
    <li>PolyTour & Sacombank tung ưu đãi “Tiền về đầy ví - Du hí thả ga”</li>
    <li>Du lịch thật dễ dàng và tiết kiệm cùng PolyTour - BIDV</li>
    <li>Cùng PolyTour “Thanh toán tiện lợi – Du lịch giá hời” nhận ngay ưu đãi hấp dẫn qua App Mb bank</li>
  </ul>
</div>
   
  );
};

export default PromotionPage;
 
 