import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/homepage";
import TourPage from "./pages/tour";
// import NewPage from "./pages/NewPage";
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
import AdminProduct from "./pages/Admin/products";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <div><HomePage /></div>,
  },


{path: "/tour",element:<TourPage/>},

    {path: "/signin",element:<SignIn/>},
    {path: "/signup",element:<Signup/>},
   {path:"/:id/tour",element:<DetailPage/>},
   {path:"/booktour",element:<BookTour/>},
   {path:"/contact",element:<Contact/>},
   {path:"/booking/:id",element:<Info_tour_bocking/>},
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
            path: "product",
            element: <AdminProduct />,
        },
   
    ],
},
]);