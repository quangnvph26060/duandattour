import React, { useEffect, useState } from "react";
import { Col, Divider, Row } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  PieChart,
  Pie,
} from "recharts";
import axios from "axios";
import Chart from "./ChartComponent";
const style: React.CSSProperties = {
  padding: "8px 0",
  border: "2px solid gray",
  height: "90px",
};
const Dashboard = () => {
  const dataBar = [
    { name: "Tháng 1", react: 32 },
    { name: "Tháng 2", react: 42 },
    { name: "Tháng 3", react: 51 },
    { name: "Tháng 4", react: 60 },
    { name: "Tháng 5", react: 51 },
    { name: "Tháng 6", react: 95 },
    { name: "Tháng 7", react: 32 },
    { name: "Tháng 8", react: 42 },
    { name: "Tháng 9", react: 51 },
    { name: "Tháng 10", react: 60 },
    { name: "Tháng 11", react: 51 },
    { name: "Tháng 12", react: 950 },
  ];

  // const dataPie = [
  //   { name: "React", value: 75 },
  //   { name: "Angular", value: 50 },
  // ];
  const colors = ["red", "blue"]; // Mảng các màu cho từng loại dữ liệu
  const [statistical, setStatistical] = useState([]);
  const Statistical = () => {
    axios
      .get("http://127.0.0.1:8000/api/admin/statistical")
      .then((response) => {
        setStatistical(response.data.statistical);
        console.log(response.data);
      });
  };
  useEffect(() => {
    Statistical();
  }, []);

  const [years, setYears] = useState([]);
  const Years = () => {
    axios
      .get("http://127.0.0.1:8000/api/admin/statistical/years")
      .then((response) => {
        setYears(response.data.years);
        console.log(response.data);
      });
  };
  useEffect(() => {
    Years();
  }, []);

  const [columnChart, setColumnChart] = useState([]);
  const ColumnChart = (selectedYear) => {
    const dataBar = [
      { name: "Tháng 1", doanh_thu: 32 },
      { name: "Tháng 2", doanh_thu: 42 },
      { name: "Tháng 3", doanh_thu: 51 },
      { name: "Tháng 4", doanh_thu: 60 },
      { name: "Tháng 5", doanh_thu: 51 },
      { name: "Tháng 6", doanh_thu: 95 },
      { name: "Tháng 7", doanh_thu: 32 },
      { name: "Tháng 8", doanh_thu: 42 },
      { name: "Tháng 9", doanh_thu: 51 },
      { name: "Tháng 10", doanh_thu: 60 },
      { name: "Tháng 11", doanh_thu: 51 },
      { name: "Tháng 12", doanh_thu: 950 },
    ];

    axios
      .get( `http://127.0.0.1:8000/api/admin/statistical/columnChart/${selectedYear}`)
      .then((response) => {
        const newData = dataBar.map((item, index) => ({
          name: item.name,
          doanh_thu: response.data.doanhthu[index],
        }));
        setColumnChart(newData);

        console.log(newData);
      });
  }
  useEffect(() => {
    ColumnChart(selectedYear);
  }, []);

  const [selectedYear, setSelectedYear] = useState(""); // Lưu trữ năm được chọn

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value); // Cập nhật giá trị năm khi người dùng thay đổi
  };

  const handleFilterData = () => {
    console.log(selectedYear);
    ColumnChart(selectedYear) // Lấy giá trị năm đã chọn khi người dùng nhấp vào nút "Lọc dữ liệu"
    // Thực hiện xử lý dữ liệu dựa trên năm đã chọn
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl p-5 font-semibold">Quản lý du lịch</h1>
        <hr />
      </div>
      <div className=" grid grid-cols-4 gap-5 p-5">
        <div className="bg-white shadow-xl border border-gray-200 py-3 rounded-lg ">
          <div className="flex gap-3 px-3">
            <img
              src="https://scontent.xx.fbcdn.net/v/t1.15752-9/385534289_1385099105726563_7202978512542700304_n.png?_nc_cat=105&ccb=1-7&_nc_sid=510075&_nc_ohc=2k0zQxYxaBwAX_P2WLI&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSUaqp7fCIHf_SCER6PfU5H2mZlcdzTV_roRQm1o5RmwQ&oe=65A117F9"
              className="w-16"
              alt=""
            />
            <div>
              <p className="text-xl font-medium">Tổng số tour</p>
              <p className="text-xl font-semibold">{statistical.totalTours}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-xl border border-gray-200 py-3 rounded-lg ">
          <div className="flex gap-3 px-3">
            <img
              src="https://scontent.xx.fbcdn.net/v/t1.15752-9/385533905_908868327422906_7273629610028145116_n.png?_nc_cat=105&ccb=1-7&_nc_sid=510075&_nc_ohc=ibbrJYuTxBsAX_zqTmz&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRB61dhpw0rcmlgyNpXr8KUAy16C6Cu5lXep9htJknA7w&oe=65A13743"
              className="w-16"
              alt=""
            />
            <div>
              <p className="text-xl font-medium">Tour đã đặt</p>
              <p className="text-xl font-semibold">
                {statistical.totalToursbooked}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-xl border border-gray-200 py-3 rounded-lg ">
          <div className="flex gap-3 px-3">
            <img
              src="https://scontent.xx.fbcdn.net/v/t1.15752-9/398400718_2009708176076693_7630933159929245995_n.png?stp=dst-png_s206x206&_nc_cat=109&ccb=1-7&_nc_sid=510075&_nc_ohc=fo0v19u1ErAAX--uZnC&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSdG5zBXa5hYM1VtGrNfgvFPQDVhnWkVec_6N94nG07Mg&oe=65A149BC"
              className="w-[60px]"
              alt=""
            />
            <div>
              <p className="text-xl font-medium">Tổng số thành viên</p>
              <p className="text-xl font-semibold">{statistical.totalUser}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-xl border border-gray-200 py-3 rounded-lg ">
          <div className="flex gap-3 px-3">
            <img
              src="https://scontent.xx.fbcdn.net/v/t1.15752-9/371529705_301750632844046_7549824121759822145_n.png?stp=cp0_dst-png&_nc_cat=102&ccb=1-7&_nc_sid=510075&_nc_ohc=vTgUg8fmB1EAX_gp79n&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTQ8w2OKddQ87WKhgeNg5VG4L2Ke_qWtuzLXFdnD6Nrnw&oe=65A14D9C"
              className="w-16 rounded-lg"
              alt=""
            />
            <div>
              <p className="text-xl font-medium">Tổng số bài viết</p>
              <p className="text-xl font-semibold">{statistical.totalNews}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5 p-5">
        <div className="bg-white shadow-xl border border-gray-200 py-3 rounded-lg ">
          <div className="flex gap-3 px-3">
            <img
              src="https://scontent.xx.fbcdn.net/v/t1.15752-9/401031020_3123968161231722_8290839021829255965_n.png?stp=dst-png_p206x206&_nc_cat=104&ccb=1-7&_nc_sid=510075&_nc_ohc=b9RUqjuali8AX-7-9xF&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQf5_Igt-PuLz4cFgK90WdkcL12Emk1QcccM0Kpphse4A&oe=65A139F4"
              className="w-16 rounded-lg"
              alt=""
            />
            <div>
              <p className="text-xl font-medium">Doanh thu hôm nay</p>
              <p className="text-xl font-semibold">
                {statistical.totalRevenueToday} vnđ
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-xl border border-gray-200 py-3 rounded-lg ">
          <div className="flex gap-3 px-3">
            <img
              src="https://scontent.xx.fbcdn.net/v/t1.15752-9/401031020_3123968161231722_8290839021829255965_n.png?stp=dst-png_p206x206&_nc_cat=104&ccb=1-7&_nc_sid=510075&_nc_ohc=b9RUqjuali8AX-7-9xF&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQf5_Igt-PuLz4cFgK90WdkcL12Emk1QcccM0Kpphse4A&oe=65A139F4"
              className="w-16 rounded-lg"
              alt=""
            />
            <div>
              <p className="text-xl font-medium">Doanh thu tháng này</p>
              <p className="text-xl font-semibold">
                {statistical.totalRevenueThisMonth} vnđ
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-xl border border-gray-200 py-3 rounded-lg ">
          <div className="flex gap-3 px-3">
            <img
              src="https://scontent.xx.fbcdn.net/v/t1.15752-9/401031020_3123968161231722_8290839021829255965_n.png?stp=dst-png_p206x206&_nc_cat=104&ccb=1-7&_nc_sid=510075&_nc_ohc=b9RUqjuali8AX-7-9xF&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQf5_Igt-PuLz4cFgK90WdkcL12Emk1QcccM0Kpphse4A&oe=65A139F4"
              className="w-16 rounded-lg"
              alt=""
            />
            <div>
              <p className="text-xl font-medium">Doanh thu năm nay</p>
              <p className="text-xl font-semibold">
                {statistical.totalRevenueThisYear} vnđ
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 p-6">
        <div>
          <input
            className="border border-gray-400 lg:w-72 md:w-64 h-10 text-2xl rounded-md"
            type="number"
            name=""
            id=""
          />
        </div>
        <div>
          <input
            className="border border-gray-400 lg:w-72 md:w-64 h-10 text-2xl rounded-md"
            type="number"
            name=""
            id=""
          />
        </div>
        <div>
          <button className="px-5 py-[6px] bg-green-600 rounded-md text-white text-lg">
            Lọc dữ liệu
          </button>
        </div>
      </div>

      <div className="flex gap-3 p-6">
        <label htmlFor="">Lọc dữ liệu theo năm:</label>
        <div>
          <select name="" id="" onChange={handleYearChange}>
            {years.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            className="px-5 py-[6px] bg-green-600 rounded-md text-white text-lg"
            onClick={handleFilterData}
          >
            Lọc dữ liệu
          </button>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-item chart-item-left">
        <h3>Biểu đồ doanh thu của năm {selectedYear ? selectedYear : "2023"}</h3>
          <br />
          <BarChart width={1000} height={400} data={columnChart}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} VNĐ`} />
            <Legend />
            <Bar dataKey="doanh_thu" fill="#2196F3" />
          </BarChart>
        </div>
        {/* <div className="chart-item chart-item-right">
          <h3>Biểu đồ tròn</h3>
          <PieChart width={500} height={300}>
            <Pie
              data={dataPie}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
              labelLine={false}
              fill={colors}
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;