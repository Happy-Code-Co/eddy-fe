import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../components/Icons";
import { Button, Layout, Menu, Switch } from "antd";
import {
  AppstoreFilled,
  BellFilled,
  HomeOutlined,
  InboxOutlined,
  SearchOutlined,
  SettingOutlined,
  TagOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import useAuth from "../hooks/useAuth";
import MainInput from "../components/MainInput";
import ProfilePill from "./_components/ProfilePill";

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
    <Layout className="min-h-screen h-screen bg-[#181A1B]">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        trigger={null}
        width={250}
        className="!bg-[#181A1B] border-r border-[#232323]"
      >
        <div className="flex flex-col justify-between h-full p-[36px_24px_24px_24px]">
          <div className="flex flex-col gap-11">
            <Logo className="w-auto h-10 self-start" />
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[location.pathname]}
              items={menuItems}
              onClick={onMenuClick}
              className="bg-transparent text-white [&_.ant-menu-item-selected]:!bg-[#49513B] [&_.ant-menu-item-selected]:!text-[#D6E3B3] [&_.ant-menu-item]:!rounded-md"
            />
          </div>
          <Button
            type="text"
            icon={<SettingOutlined />}
            className="h-auto p-3 justify-start !text-gray-400 hover:text-[#D6E3B3]"
          >
            <span className="ml-2 hidden md:inline">Settings</span>
          </Button>
        </div>
      </Sider>
      <Layout className="bg-[#181A1B]">
        <Header className="grid grid-cols-[9fr_auto] gap-6 px-8 py-6 h-auto bg-[#181A1B] border-b border-[#232323]">
          <MainInput placeholder="Buscar" prefix={<SearchOutlined />} />
          <div className="flex items-center justify-end gap-4">
            {/* <Switch
              checked={isDark}
              onChange={setIsDark}
              checkedChildren="🌙"
              unCheckedChildren="☀️"
              className="bg-[#232323]"
            /> */}
            <Button
              type="text"
              className="text-gray-400 border-2 border-[#383838] h-full hover:!bg-[#383838] hover:!text-white"
            >
              <BellFilled />
            </Button>
            <ProfilePill />
          </div>
        </Header>
        <Content className="p-8 overflow-auto bg-[#242424]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
