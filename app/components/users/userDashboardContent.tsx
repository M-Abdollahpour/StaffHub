import { useAuthStore } from "~/stores/useAuthStore";

export default function UserDashboardContent() {
  const currentUser = useAuthStore((state) => state.currentUser);
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      Welcome {currentUser?.firstName} {currentUser?.lastName}
    </div>
  );
}
