import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/homepage";
import TourPage from "./pages/tour";
import News from "./pages/newspage";
// import TitelPage from "./pages/TitelPage";
import Signup from "./auth/signup";
import SignIn from "./auth/signin";
import DetailPage from "./pages/Client/detail";
import BookTour from "./pages/Client/Book_tour";
import Contact from "./pages/Client/contact";
import Info_tour_bocking from "./pages/Client/Info_tour_bocking";
import LayoutAdmin from "./components/layouts/LayoutADmim";
import { Navigate } from "react-router-dom";
import Dashboard from "./pages/Admin/dashboard/dashboard";
import AdminTourAdd from "./pages/Admin/products/tour/add";
import AdminTourEdit from "./pages/Admin/products/tour/edi";
import AdminLoai_tour from "./pages/Admin/products/Danhmuc";
import AdminLoai_tourADD from "./pages/Admin/products/Danhmuc/add";
import AdminLoai_tourEdit from "./pages/Admin/products/Danhmuc/edit";
import AdminDiadiem from "./pages/Admin/products/Diadiem";
import AdminDiadiem_ADD from "./pages/Admin/products/Diadiem/add";
import AdminDiadiem_Edit from "./pages/Admin/products/Diadiem/edit";
import Admin_Lichtrinh from "./pages/Admin/products/Lich_trinh";
import Admin_LichtrinhADD from "./pages/Admin/products/Lich_trinh/add";
import Admin_LichtrinhEDit from "./pages/Admin/products/Lich_trinh/edit";
import ADmin_khachsan from "./pages/Admin/products/Khach_san";
import ADmin_KhachsanADD from "./pages/Admin/products/Khach_san/add";
import ADmin_KhachsanEdit from "./pages/Admin/products/Khach_san/edit";
import ADmin_Phuontien from "./pages/Admin/products/Phuong_tien";
import ADmin_PhuontiengADD from "./pages/Admin/products/Phuong_tien/add";
import ADmin_Phuongtienedit from "./pages/Admin/products/Phuong_tien/edit";
import Admin_Khachhang from "./pages/Admin/user/khach_hang";
import ADmin_ACcountkhachhang_edit from "./pages/Admin/user/khach_hang/edit";
import Admin_Account_huongdanvien from "./pages/Admin/user/huong_dan_vien";
import Admin_Account_huongdanvienEdit from "./pages/Admin/user/huong_dan_vien/edit";
import Admin_Account_huongdanvienAdd from "./pages/Admin/user/huong_dan_vien/add";
import AdminImage from "./pages/Admin/products/Img";
import AdmidImageADD from "./pages/Admin/products/Img/add";
import Admin_ImageEdit from "./pages/Admin/products/Img/edit";
import Admin_TourImg from "./pages/Admin/products/Tour_img";
import Admin_TourImgADD from "./pages/Admin/products/Tour_img/add";
import Admin_TourImgEDit from "./pages/Admin/products/Tour_img/edit";
import ADmin_Hoadon from "./pages/Admin/products/Hoa_don";
import ADmin_DatTour from "./pages/Admin/products/Dat_tour";
import AdminProduct from "./pages/Admin/products/tour";

import QLuser from "./pages/qluser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <HomePage />
      </div>
    ),
  },

  // ,
  //     {path: "/tour",element:<TourPage/>},
  { path: "/news", element: <News /> },
  //     {path: "/title",element:<TitelPage/>},
  //     {path: "/tour",element:<TourPage/>},
  { path: "/tour", element: <TourPage /> },

  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <Signup /> },
  { path: "/tour/:idTour", element: <DetailPage /> },
  { path: "/booktour", element: <BookTour /> },
  { path: "/contact", element: <Contact /> },
  { path: "/booking/:id", element: <Info_tour_bocking /> },

  { path: "/tour", element: <TourPage /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <Signup /> },
  { path: "/:id/tour", element: <DetailPage /> },
  { path: "/booktour", element: <BookTour /> },
  { path: "/contact", element: <Contact /> },
  { path: "/profile", element: <QLuser /> },
  { path: "*", element: "Not Found Page" },

  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "tour",
        element: <AdminProduct />,
      },
      {
        path: "tour/add",
        element: <AdminTourAdd />,
      },
      {
        path: "tour/edit/:idtour",
        element: <AdminTourEdit />,
      },
      {
        path: "tour/loai_tour",
        element: <AdminLoai_tour />,
      },
      {
        path: "tour/loai_tour/add",
        element: <AdminLoai_tourADD />,
      },
      {
        path: "tour/loai_tour/edit/:idLoaiTour",
        element: <AdminLoai_tourEdit />,
      },
      {
        path: "tour/diadiem/",
        element: <AdminDiadiem />,
      },
      {
        path: "tour/diadiem/add",
        element: <AdminDiadiem_ADD />,
      },
      {
        path: "tour/diadiem/edit/:iddiadiem",
        element: <AdminDiadiem_Edit />,
      },
      {
        path: "tour/lich_trinh",
        element: <Admin_Lichtrinh />,
      },
      {
        path: "tour/lich_trinh/add",
        element: <Admin_LichtrinhADD />,
      },
      {
        path: "tour/lich_trinh/edit/:id",
        element: <Admin_LichtrinhEDit />,
      },
      {
        path: "tour/loai_khach_san",
        element: <ADmin_khachsan />,
      },
      {
        path: "tour/loai_khach_san/add",
        element: <ADmin_KhachsanADD />,
      },
      {
        path: "tour/loai_khach_san/edit/:idkhachsan",
        element: <ADmin_KhachsanEdit />,
      },
      {
        path: "tour/loai_phuong_tien",
        element: <ADmin_Phuontien />,
      },
      {
        path: "tour/loai_phuong_tien/add",
        element: <ADmin_PhuontiengADD />,
      },
      {
        path: "tour/loai_phuong_tien/edit/:idPhuongTien",
        element: <ADmin_Phuongtienedit />,
      },
      {
        path: "customer_account",
        element: <Admin_Khachhang />,
      },
      {
        path: "customer_account/add",
        element: <Admin_Khachhang />,
      },
      {
        path: "customer_account/edit/:id",
        element: <ADmin_ACcountkhachhang_edit />,
      },
      {
        path: "account_huongdanvien",
        element: <Admin_Account_huongdanvien />,
      },
      {
        path: "account_huongdanvien/add",
        element: <Admin_Account_huongdanvienAdd />,
      },
      {
        path: "account_huongdanvien/edit/:idhdv",
        element: <Admin_Account_huongdanvienEdit />,
      },
      {
        path: "tour/image_tour",
        element: <Admin_TourImg />,
      },
      {
        path: "tour/image_tour/add",
        element: <Admin_TourImgADD />,
      },
      {
        path: "tour/image_tour/edit/:idtourimage",
        element: <Admin_TourImgEDit />,
      },

      // images
      {
        path: "tour/image/",
        element: <AdminImage />,
      },
      {
        path: "tour/image/add",
        element: <AdmidImageADD />,
      },
      {
        path: "tour/image/edit/:idimage",
        element: <Admin_ImageEdit />,
      },
      {
        path: "tour/hoa_don",
        element: <ADmin_Hoadon />,
      },
      {
        path: "tour/dat_tour",
        element: <ADmin_DatTour />,
      },
    ],
  },
]);
