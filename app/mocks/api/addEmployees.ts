import type { Employee } from "~/types/employeeType";
import { employees } from "../data/data";

export const addEmployees = async (addItem: Employee) => {
  const response = new Promise<Employee[]>((resolve) => {
    setTimeout(() => {
      employees.push(addItem);
      resolve(employees);
    }, 2 * 1000);
  });
  return response;
};
