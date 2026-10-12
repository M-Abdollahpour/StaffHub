import AdminDashboardContent from "~/components/admin/adminDashboardContent";
import UserDashboardContent from "~/components/users/userDashboardContent";
import { useAuthStore } from "~/stores/useAuthStore";

const Dashboard = () => {
  const currentUser = useAuthStore((state) => state.currentUser);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center items-center">
        {currentUser?.role === "admin" ? (
          <AdminDashboardContent />
        ) : (
          <UserDashboardContent />
        )}
      </div>
    </div>
  );
};
export default Dashboard;
