import { create } from "zustand";
import { persist } from "zustand/middleware";
import { employees } from "~/mocks/data/data";
import type { Employee } from "~/types/employeeType";

type AuthState = {
  currentUser: Employee | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      login: (email, password) => {
        const findItem = employees.find(
          (item) => item.email === email && item.password === password,
        );
        if (findItem) {
          set(() => ({ currentUser: findItem }));
          return true;
        }
        return false;
      },
      logout: () => {
        set(() => ({ currentUser: null }));
      },
    }),
    { name: "auth" },
  ),
);
