import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import {
    AiOutlineMenuFold,
    AiOutlineMenuUnfold,
    AiOutlineUser,
    AiOutlineVideoCamera,
    AiFillFund,
    AiOutlineMenu
} from "react-icons/ai";
import {FaLuggageCart} from "react-icons/fa"
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div>
           <div className="bg-white border-b-2 border-black">
            <img src="https://img.fcbayern.com/image/upload/t_cms-2x1/f_auto/w_1600,c_fill/q_auto/v1694938726/cms/public/images/fcbayern-com/homepage/Saison-23-24/Gegner/Manchester%20United/160812-manchester-united-logo-ima-169.jpg" height={50} width={50} alt="" />
            </div>
                 <Layout className="h-screen">
       
       <Sider trigger={null} collapsible collapsed={collapsed}>
           <div className="demo-logo-vertical" />
           <Menu
               theme="dark"
               mode="inline"
               defaultSelectedKeys={["1"]}
               items={[
                   {
                       key: "1",
                       icon: <AiFillFund />,
                       label: <Link to="/admin/dashboard">Thống kê</Link>,
                   },
                   {
                       key: "2",
                       icon: <FaLuggageCart />,
                       label: <Link to="/admin/tour">Tour du lịch</Link>,
                   },
               ]}
           />
       </Sider>
       <Layout>
           <Header style={{ padding: 0, background: colorBgContainer }}>
               <Button
                   type="text"
                   icon={collapsed ? <AiOutlineMenu /> : <AiOutlineMenu />}
                   onClick={() => setCollapsed(!collapsed)}
               
                   style={{
                       fontSize: "16px",
                       width: 64,
                       height: 64,
                   }}
               />
        
           </Header>
           <Content
           
               style={{
                   margin: "24px 16px",
                   padding: 24,
                   minHeight: 280,
                   background: colorBgContainer,
               }}
           >
               <Outlet />
           </Content>
       </Layout>
   </Layout>
        </div>
   
    );
};

export default LayoutAdmin;
