import React, { useEffect, useState } from "react";

import { Form, DatePicker, Button, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  PieChart,
  LineChart,
  Line,
  Tooltip,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const style: React.CSSProperties = {
  padding: "8px 0",
  border: "2px solid gray",
  height: "90px",
};
const Dashboard = () => {
  //loc
  const [filteredData, setFilteredData] = useState([]);
  const [dailyRevenueData, setDailyRevenueData] = useState([]);
  const fetchDailyRevenueData = async (start, end) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/admin/statistical/getStatisticalDate?start_date=${start.format(
          "YYYY-MM-DD"
        )}&end_date=${end.format("YYYY-MM-DD")}`
      );
      const data = response.data.data;

      // Chuyển đổi dữ liệu thành mảng objects để phù hợp với Recharts
      const chartData = Object.keys(data).map((date) => ({
        date,
        revenue: data[date],
      }));

      setDailyRevenueData(chartData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const onFinish = async (values) => {
    try {
      const { startDate, endDate } = values;
      await fetchDailyRevenueData(startDate, endDate);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // top 5 dat nhieu
  const [results, setResults] = useState([]);
  useEffect(() => {
    // Fetch or set your data here
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/admin/statistical/topAddress"
        );
        const data = await response.json();

        if (Array.isArray(data.result) && data.result.length > 0) {
          setResults(data.result);
          console.log("Fetched Data:", data.result);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Run once on component mount
  //table dat nhieu
  const columnsTopaddress = [
    {
      title: (
        <span className="font-bold text-xl">
          ID
        </span>
      ),
      dataIndex: "id",
      key: "id",
      render: text => <span style={{ fontSize: '18px' }}>{text}</span>
    },
    {  title: (
      <span className="font-bold text-xl">
        Tên tour
      </span>
    ), dataIndex: "ten", key: "ten", render: text => <span style={{ fontSize: '18px' }}>{text}</span> },
  ];

  //top rating
  const [results1, setResults1] = useState([]);
  useEffect(() => {
    // Fetch or set your data here
    const fetchData1 = async () => {
      try {
        const response1 = await fetch(
          "http://localhost:8000/api/admin/statistical/topFiveTours"
        );
        const data1 = await response1.json();

        if (Array.isArray(data1) && data1.length > 0) {
          setResults1(data1);
          console.log("Fetched Data:", data1);
        } else {
          console.error("Invalid data format:", data1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData1();
  }, []); // Run once on component mount
  console.log(results1);
  //bang rateing
  const renderRating = (value) => {
    // Customize the rendering of the rating here
    const stars = Array.from({ length: 5 }, (_, index) => (
      <span
        className="text-2xl"
        key={index}
        style={{ color: index < value ? "gold" : "gray" }}
      >
        ★
      </span>
    ));
    return <span>{stars}</span>;
  };
  const columnsRating = [
    {  title: (
      <span className="font-bold text-xl">
        Tên tour
      </span>
    ), dataIndex: "id_tour", key: "id_tour" , render: text => <span style={{ fontSize: '18px' }}>{text}</span>},
    {
      title: (
        <span className="font-bold text-xl">
          Rating
        </span>
      ),
      dataIndex: "average_rating",
      key: "average_rating",
      render: renderRating,
      
    },
  ];
  console.log(results1);

  //bieu do tron
  const [pieChartSatusTour, setPieChartSatusTour] = useState([]);
  const colors = ["#FFBC2C", "#86B86B"]; // Thêm màu nếu cần
  const fetchData2 = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/statistical/tourStatusStatistics"
      );

      const totalToursPaid =
        response.data.statisticalStatus.totalToursPaid || 0;
      const totalToursUnpaid =
        response.data.statisticalStatus.totalToursUnpaid || 0;
      const totalTours = totalToursPaid + totalToursUnpaid;

      const newData1 = [
        { name: "Đã thanh toán", value: totalToursPaid, color: colors[0] },
        { name: "Chưa thanh toán", value: totalToursUnpaid, color: colors[1] },
      ];

      setPieChartSatusTour(newData1);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchData2();
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const getRandomColor2 = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const monthColors = Array.from({ length: 12 }, getRandomColor);
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
      { name: "Tháng 1" },
      { name: "Tháng 2" },
      { name: "Tháng 3" },
      { name: "Tháng 4" },
      { name: "Tháng 5" },
      { name: "Tháng 6" },
      { name: "Tháng 7" },
      { name: "Tháng 8" },
      { name: "Tháng 9" },
      { name: "Tháng 10" },
      { name: "Tháng 11" },
      { name: "Tháng 12" },
    ];

    axios
      .get(
        `http://127.0.0.1:8000/api/admin/statistical/columnChart/${selectedYear}`
      )
      .then((response) => {
        const newData = dataBar.map((item, index) => ({
          name: item.name,
          doanh_thu: response.data.doanhthu[index],
          fill: monthColors[index],
        }));
        setColumnChart(newData);
      });
  };
  useEffect(() => {
    ColumnChart(selectedYear);
  }, []);

  const [selectedYear, setSelectedYear] = useState(""); // Lưu trữ năm được chọn

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value); // Cập nhật giá trị năm khi người dùng thay đổi
  };

  const handleFilterData = () => {
    console.log(selectedYear);
    ColumnChart(selectedYear); // Lấy giá trị năm đã chọn khi người dùng nhấp vào nút "Lọc dữ liệu"
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
              <p className="text-xl font-medium">Đơn đã đặt</p>
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
      <div className="  p-6">
        <h2 className="text-xl">Doanh thu từ ngày</h2>
        <Form onFinish={onFinish}>
          <div className="flex">
            <Form.Item name="startDate">
              <DatePicker style={{ width: "200px" }} />
            </Form.Item>
            <Form.Item name="endDate">
              <DatePicker style={{ width: "200px" }} />
            </Form.Item>
            <Form.Item className="">
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
              >
                Search
              </Button>
            </Form.Item>
          </div>
        </Form>

        <div className="chart-item mt-10">
          <BarChart
            width={800}
            height={400}
            barSize={70}
            data={dailyRevenueData}
          >
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} VNĐ`} />
            <Legend />
            <Bar name="Doanh thu" dataKey="revenue" fill={getRandomColor()} />
          </BarChart>
        </div>
      </div>

      <div className="flex gap-3 p-6 text-xl font-medium">
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

      <div className="chart-container flex  gap-10">
        <div className="chart-item chart-item-left ">
          <h3 className="text-xl font-medium">
            Biểu đồ doanh thu của năm {selectedYear ? selectedYear : "2024"}
          </h3>
          <br />
          <BarChart width={1000} height={400} data={columnChart}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} VNĐ`} />
            <Legend />
            <Bar
              dataKey="doanh_thu"
              name="Doanh thu"
              fill={getRandomColor2()}
            />

            {/* Thêm các cột khác tương tự */}
          </BarChart>
        </div>
        <div className="chart-item chart-item-right ">
          <h3 className="text-xl font-medium">Biểu đồ tròn</h3>
          <PieChart width={500} height={300}>
            <Pie
              data={pieChartSatusTour}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
              labelLine={false}
            >
              {pieChartSatusTour.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
      <div className="top 5 mt-10 justify-normal gap-40 mx-auto ml-10  flex">
        <div>
          <h2 className="text-2xl font-bold">Top 5 tour hot</h2>
          <Table
            dataSource={results}
            columns={columnsTopaddress}
            pagination={false}
          >
            {" "}
          </Table>
        </div>
        <div className="top5buy ">
          <h2 className="text-2xl font-bold">Top 5 rating</h2>
          <Table
            dataSource={results1}
            columns={columnsRating}
            pagination={false}
          >
            {" "}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
