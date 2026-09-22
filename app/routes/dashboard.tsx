import AdminDashboardContent from "~/components/admin/adminDashboardContent";
import UserDashboardContent from "~/components/users/userDashboardContent";
import { useAuthStore } from "~/stores/useAuthStore";

const Dashboard = () => {
  const currentUser = useAuthStore((state) => state.currentUser);

  return (
    <div>
      {currentUser?.role === "admin" ? (
        <AdminDashboardContent />
      ) : (
        <UserDashboardContent />
      )}
    </div>
  );
};
export default Dashboard;
