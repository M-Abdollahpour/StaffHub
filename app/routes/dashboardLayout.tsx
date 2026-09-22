import { useState } from "react";
import { useAuthStore } from "~/stores/useAuthStore";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate, Outlet } from "react-router";
import { Spin, Menu, Button } from "antd";
import {
  LoadingOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];
type CustomItem = MenuItem & { adminOnly?: true };

const DashboardLayout = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const logOutStore = useAuthStore((state) => state.logout);
  const [isSiderOpen, setIsSiderOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const items: CustomItem[] = [
    { key: "1", icon: <PieChartOutlined />, label: "Profile" },
    {
      key: "2",
      icon: <DesktopOutlined />,
      label: "Employees",
      adminOnly: true,
    },
    // { key: "3", icon: <ContainerOutlined />, label: "Option 3" },
    // {
    //   key: "sub1",
    //   label: "Navigation One",
    //   icon: <MailOutlined />,
    //   children: [
    //     { key: "5", label: "Option 5" },
    //     { key: "6", label: "Option 6" },
    //     { key: "7", label: "Option 7" },
    //     { key: "8", label: "Option 8" },
    //   ],
    // },
  ];
  const itemsProp = items.filter((item) => {
    if (item.adminOnly) {
      return currentUser?.role === "admin";
    } else {
      return true;
    }
  });
  const navigate = useNavigate();
  const toggleSider = () => {
    setIsSiderOpen((prev) => !prev);
  };
  const logOut = () => {
    setLoading(true);
    setTimeout(() => {
      logOutStore();
      navigate("/");
    }, 500);
  };

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] min-h-screen">
        <div
          className={`text-white/50 flex flex-col justify-between  items-center row-span-2 bg-[#000c18] ${isSiderOpen ? "w-64" : "w-20"} transition-all duration-200`}
        >
          <div>
            <div
              className={` w-full bg-[#fff3] rounded-xl mt-3 text-center ${isSiderOpen ? "px-10 py-2" : "p-2 text-sm"}`}
            >
              Hi, {currentUser?.firstName}
            </div>
          </div>
          <div className="w-full">
            <Menu
              defaultSelectedKeys={["1"]}
              // defaultOpenKeys={["sub1"]}
              mode="inline"
              theme="dark"
              inlineCollapsed={!isSiderOpen}
              items={itemsProp}
            />
          </div>
          <div
            onClick={logOut}
            className="p-4  cursor-pointer bg-[#002140] w-full flex justify-center items-center"
          >
            {loading ? (
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            ) : isSiderOpen ? (
              <button className="cursor-pointer" onClick={() => logOut()}>
                Logout
              </button>
            ) : (
              <button className="cursor-pointer" onClick={() => logOut()}>
                <IoLogOutOutline />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <Button
            type="primary"
            className="self-stretch! px-4! py-6! "
            onClick={toggleSider}
          >
            {isSiderOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </Button>
          header
        </div>
        <div className="bg-gray-200">
          <div className="mx-4 my-6 p-4 rounded-xl bg-white">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
