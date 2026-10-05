import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Employee } from "~/types/employeeType";
import { useEmployeesStore } from "./useEmployeesStore";

type AuthState = {
  currentUser: Employee | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateCurrentUser: (employee: Employee) => void;
};
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      updateCurrentUser: (employee) => {
        useEmployeesStore.getState().updateEmployee(employee);
        set({
          currentUser: employee,
        });
      },
      login: (email, password) => {
        const employees = useEmployeesStore.getState().employees;
        const findItem = employees.find(
          (item) =>
            item.email.toLowerCase() === email.trim().toLowerCase() &&
            item.password === password,
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
