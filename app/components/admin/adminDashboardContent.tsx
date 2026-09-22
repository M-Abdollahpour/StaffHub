import { useAuthStore } from "~/stores/useAuthStore";

export default function AdminDashboardContent() {
  const user = useAuthStore((state) => state.currentUser);
  return <div>{user?.firstName}</div>;
}
