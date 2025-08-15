import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../components/Icons";
import { Button, Input, Layout, Menu, Switch } from "antd";
import {
  AppstoreFilled,
  BellFilled,
  HomeOutlined,
  InboxOutlined,
  TagOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "./layout.scss";
import useAuth from "../hooks/useAuth";

const { Header, Content, Sider } = Layout;

const menuItems = [
  {
    label: "Inicio",
    key: "/dashboard",
    icon: <AppstoreFilled />,
  },
  {
    label: "Mi tienda",
    key: "/store",
    icon: <HomeOutlined />,
    children: [
      { label: "Contenido", key: "/store/content" },
      { label: "Ajustes", key: "/store/settings" },
    ],
  },
  {
    label: "Productos",
    key: "/products",
    icon: <TagOutlined />,
  },
  {
    label: "Ordenes",
    key: "/orders",
    icon: <InboxOutlined />,
    children: [
      { label: "Item 1", key: "/orders/item1" },
      { label: "Item 2", key: "/orders/item2" },
    ],
  },
  {
    label: "Clientes",
    key: "/clients",
    icon: <TeamOutlined />,
    children: [
      { label: "Item 1", key: "/clients/item1" },
      { label: "Item 2", key: "/clients/item2" },
    ],
  },
];

const MainLayout = ({ setIsDark, isDark }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const onMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout className={`layout${isDark ? "" : " light"}`}>
      <Sider
        collapsible
        className="side-menu"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
      >
        <Logo className="logo" />
        <Menu
          theme={isDark ? "dark" : "light"}
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={onMenuClick}
        />
        <div style={{ padding: 16, textAlign: "center" }}>
          <Switch
            checked={isDark}
            onChange={setIsDark}
            checkedChildren="🌙"
            unCheckedChildren="☀️"
          />
        </div>
      </Sider>
      <Layout className="content-layout">
        <Header className="layout-header">
          <Input placeholder="Search" />
          <div className="account-n-actions">
            <div className="actions">
              <Button type="text">
                <BellFilled />
              </Button>
            </div>
            <div className="account-info">
              <p>Usuario</p>
            </div>
            <Button
              type="secondary"
              onClick={handleLogout}
              style={{ color: isDark ? "#fff" : "#222", marginLeft: 8 }}
            >
              Logout
            </Button>
          </div>
        </Header>
        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
