import { useAuthStore } from "~/stores/useAuthStore";

export default function UserDashboardContent() {
  const currentUser = useAuthStore((state) => state.currentUser);
  return (
    <div className="md:text-2xl text-black font-bold border-b border-t p-4 md:py-10 text-center text-sm md:w-150 border-gray-500/50 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      Welcome {currentUser?.firstName} {currentUser?.lastName}
    </div>
  );
}
