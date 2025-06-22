import { useState } from "react";
import { Outlet } from "react-router";
import { Logo } from "../components/Icons";
import { Button, Input, Layout, Menu } from "antd";
import {
  AppstoreFilled,
  BellFilled,
  HomeOutlined,
  InboxOutlined,
  TagOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import "./layout.scss";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Inicio", "1", <AppstoreFilled />),
  getItem("Mi tienda", "sub1", <HomeOutlined />, [
    getItem("Contenido", "3"),
    getItem("Ajustes", "4"),
  ]),
  getItem("Productos", "sub2", <TagOutlined />, [
    getItem("Item 1", "6"),
    getItem("Item 2", "8"),
  ]),
  getItem("Ordenes", "sub3", <InboxOutlined />, [
    getItem("Item 1", "6"),
    getItem("Item 2", "8"),
  ]),
  getItem("Clientes", "sub4", <TeamOutlined />, [
    getItem("Item 1", "6"),
    getItem("Item 2", "8"),
  ]),
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="layout">
      <Sider
        collapsible
        className="side-menu"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
      >
        <Logo className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
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
