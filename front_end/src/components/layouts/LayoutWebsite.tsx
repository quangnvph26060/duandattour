import { Outlet } from "react-router-dom";
import HeaderWebsite from "../header/header";
const LayoutWebsite = () => {
    return <div>   <HeaderWebsite/> <Outlet /></div>;
};

export default LayoutWebsite;
