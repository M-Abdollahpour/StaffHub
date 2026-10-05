import { create } from "zustand";
import { persist } from "zustand/middleware";
import { employees as mockEmployees } from "~/mocks/data/data";
import type { Employee } from "~/types/employeeType";

type EmployeesState = {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  removeEmployee: (id: string) => void;
  updateEmployee: (employee: Employee) => void;
  getEmployees: () => Employee[];
};

export const useEmployeesStore = create<EmployeesState>()(
  persist(
    (set, get) => ({
      employees: mockEmployees,
      addEmployee: (employee) => {
        set((state) => ({ employees: [...state.employees, employee] }));
      },
      updateEmployee: (employee) => {
        set((state) => ({
          employees: state.employees.map((item) =>
            item.id === employee.id ? employee : item,
          ),
        }));
      },
      removeEmployee: (id) => {
        set((state) => ({
          employees: state.employees.filter((item) => item.id !== id),
        }));
      },
      getEmployees: () => get().employees,
    }),
    {
      name: "employees",
    },
  ),
);
