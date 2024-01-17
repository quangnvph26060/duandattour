import React, { useEffect, useState } from "react";

import { Form,Rate , DatePicker, Button, Table } from "antd";
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
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(value);
  };
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
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    const stars = Array.from({ length: 5 }, (_, index) => (
      <span
      
        className="text-2xl"
        key={index}
        title={desc[index]}
        style={{ color: index < value ? "gold" : "gray" }}
      >
        ★
      </span>
    ));
    return <span>{stars}</span>;
  };
  const columnsRating = [
    {
      title: (
        <span className="font-bold text-xl">
          Tên tour
        </span>
      ),
      dataIndex: "id_tour",
      key: "id_tour",
      render: (text) => <span style={{ fontSize: '18px' }}>{text}</span>,
    },
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
  const colors2 = ["#F38181", "#FCE38A",'EAFFD0','95E1D3']; // Thêm màu nếu cần
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
              {formatCurrency(statistical.totalRevenueToday)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-xl border border-gray-200 py-3 rounded-lg ">
          <div className="flex gap-3 px-3">
            <img
              src="data:image/png;base64,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 "
              className="w-16 rounded-lg"
              alt=""
            />
            <div>
              <p className="text-xl font-medium">Doanh thu tháng này</p>
              <p className="text-xl font-semibold">
               {formatCurrency (statistical.totalRevenueThisMonth)} vnđ
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
             {formatCurrency   (statistical.totalRevenueThisYear)} vnđ
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
            color={(entry, index) => colors2[index % colors.length]}
          >
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} VNĐ`} />
            <Legend />
            <Bar name="Doanh thu" dataKey="revenue" fill="#8884d8"  />
            
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
