import { useAuthStore } from "~/stores/useAuthStore";

export default function UserDashboardContent() {
  const currentUser = useAuthStore((state) => state.currentUser);
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:text-2xl font-bold border p-4 text-center text-sm md:px-20 md:py-10 border-gray-500/50 rounded-xl">
      Welcome {currentUser?.firstName} {currentUser?.lastName}
    </div>
  );
}
