import { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router";
import { Spin, Menu, Button } from "antd";
import type { MenuProps } from "antd";
import {
  LoadingOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaChartPie } from "react-icons/fa";
import { useAuthStore } from "~/stores/useAuthStore";
import { useTimerStore } from "~/stores/useTimerStore";
import TimeOut from "~/components/timeOut/timeOut";

type MenuItem = Required<MenuProps>["items"][number];
type CustomItem = MenuItem & { adminOnly?: true };
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
  { key: "charts", icon: <FaChartPie />, label: "Charts", adminOnly: true },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentUser = useAuthStore((state) => state.currentUser);
  const logOutStore = useAuthStore((state) => state.logout);
  const endTime = useTimerStore((state) => state.endTime);
  const [isSiderOpen, setIsSiderOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const itemsProp = items
    .filter((item) => !item.adminOnly || currentUser?.role === "admin")
    .map(({ adminOnly, ...menuItem }) => menuItem);

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
  useEffect(() => {
    if (endTime === null) return;
    const remaining = endTime - Date.now();
    if (remaining <= 0) {
      setIsExpired(true);
      return;
    }
    const id = setTimeout(() => setIsExpired(true), remaining);
    return () => clearTimeout(id);
  }, [endTime]);
  useEffect(() => {
    if (!isExpired) return;
    const id = setTimeout(() => {
      logOutStore();
      navigate("/login");
    }, 2000);
    return () => clearTimeout(id);
  }, [isExpired, logOutStore, navigate]);
  const handleMenuClick: MenuProps["onClick"] = (info) => {
    navigate(`/${info.key}`);
  };

  return (
    <div className="min-h-dvh overflow-x-hidden">
      <div className="grid min-h-dvh grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)]">
        <aside
          className={`row-span-2 flex flex-col overflow-hidden bg-[#000c18] text-white/50 transition-all duration-200 ${isSiderOpen ? "w-52" : "w-20"}`}
        >
          <div className="px-3 pt-3">
            <div
              className={`truncate rounded-xl bg-[#fff3] py-2 text-center ${isSiderOpen ? "px-4" : "px-1 text-sm"}`}
            >
              Hi, {currentUser?.firstName}
            </div>
          </div>
          <div className="flex flex-1 relative items-center">
            <div
              className={`fixed left-0 top-1/2 -translate-y-1/2 ${isSiderOpen ? "w-52" : "w-20"}`}
            >
              <Menu
                mode="inline"
                theme="dark"
                inlineCollapsed={!isSiderOpen}
                items={itemsProp}
                selectedKeys={[pathname.split("/")[1]]}
                onClick={handleMenuClick}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={logOut}
            disabled={loading}
            className="flex w-full cursor-pointer items-center justify-center bg-[#002140] p-4 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            ) : isSiderOpen ? (
              "Logout"
            ) : (
              <IoLogOutOutline />
            )}
          </button>
        </aside>
        <header className="flex min-w-0 items-center justify-between overflow-hidden bg-white pr-4">
          <Button
            type="primary"
            className="self-stretch! px-4! py-6!"
            onClick={toggleSider}
          >
            {isSiderOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </Button>
          <TimeOut />
        </header>
        {isExpired && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/70 text-white backdrop-blur-sm">
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
            />
            <p className="text-lg">Your session has expired</p>
          </div>
        )}
        <main className="min-w-0 overflow-x-hidden bg-gray-200 p-2 sm:p-6">
          <div className="relative h-full min-w-0 rounded-xl bg-white p-3 sm:p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
