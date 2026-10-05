import { useState } from "react";
import { useAuthStore } from "~/stores/useAuthStore";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate, Outlet, useLocation } from "react-router";
import { Spin, Menu, Button } from "antd";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import {
  LoadingOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
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
    {
      key: "dashboard",
      icon: <MdOutlineDashboardCustomize />,
      label: "Dashboard",
    },
    { key: "profile", icon: <CgProfile />, label: "Profile" },
    {
      key: "employees",
      icon: <DesktopOutlined />,
      label: "Employees",
      adminOnly: true,
    },
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
  const handleMenuClick: MenuProps["onClick"] = (info) => {
    navigate(`/${info.key}`);
  };
  return (
    <div className="min-h-dvh overflow-x-hidden">
      <div className="grid min-h-dvh grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)]">
        <div
          className={`text-white/50 flex flex-col justify-between  items-center row-span-2 bg-[#000c18] ${isSiderOpen ? "w-52" : "w-20"} transition-all duration-200`}
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
              mode="inline"
              theme="dark"
              inlineCollapsed={!isSiderOpen}
              items={itemsProp}
              onClick={handleMenuClick}
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
        <div className="flex min-w-0 items-center overflow-hidden">
          <Button
            type="primary"
            className="self-stretch! px-4! py-6!"
            onClick={toggleSider}
          >
            {isSiderOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </Button>

          <span className="truncate">header</span>
        </div>
        <div className="min-w-0 overflow-x-hidden bg-gray-200 p-2 sm:p-6">
          <div className="relative h-full min-w-0 rounded-xl bg-white p-3 sm:p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
