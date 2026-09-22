import type { Employee } from "~/types/employeeType";
import { employees } from "../data/data";

export const updateEmployees = async (updateItem: Employee) => {
  return new Promise<Employee[]>((resolve) => {
    setTimeout(() => {
      const index = employees.findIndex((item) => item.id === updateItem.id);
      if (index !== -1) {
        employees.splice(index, 1, updateItem);
      }
      resolve(employees);
    }, 2 * 1000);
  });
};
