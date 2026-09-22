import type { Employee } from "~/types/employeeType";
import { employees } from "../data/data";

export const removeEmployees = async (removeItem: Employee) => {
  return new Promise<Employee[]>((resolve) => {
    setTimeout(() => {
      const index = employees.findIndex((item) => item.id === removeItem.id);
      if (index !== -1) {
        employees.splice(index, 1);
      }
      resolve(employees);
    }, 2 * 1000);
  });
};
