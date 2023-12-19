import React, { useEffect, useState } from "react";
import { Col, Divider, Row } from "antd";
import axios from "axios";
const style: React.CSSProperties = {
  padding: "8px 0",
  border: "2px solid gray",
  height: "90px",
};
const Dashboard = () => {
    const [statistical, setStatistical] = useState([]);
  const Statistical = () => {
    axios
      .get("http://127.0.0.1:8000/api/admin/statistical")
      .then((response) => {
        setStatistical(response.data.statistical)
        console.log(response.data);
      });
  };
  useEffect(() => {
    Statistical();
  }, []);

  return (
    <>
      <Divider orientation="left">Quản lý du lịch</Divider>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={6}>
          <div style={style}>Tổng số tour:  <span  style={{ fontWeight: "bold" }}>{statistical.totalTours}</span> </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>Tour đã đặt: <span  style={{ fontWeight: "bold" }}>{statistical.totalToursbooked}</span>  </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>Tổng số thành viên: <span  style={{ fontWeight: "bold" }}>{statistical.totalUser}</span> </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>Tổng số bài viết: <span  style={{ fontWeight: "bold" }}>{statistical.totalNews}</span> </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>Doanh thu hôm nay:  <span  style={{ fontWeight: "bold" }}>{statistical.totalRevenueToday} vnđ</span></div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>Doanh thu tháng này: <span  style={{ fontWeight: "bold" }}>{statistical.totalRevenueThisMonth} vnđ</span> </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>Doanh thu năm nay: <span  style={{ fontWeight: "bold" }}>{statistical.totalRevenueThisYear} vnđ</span> </div>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
