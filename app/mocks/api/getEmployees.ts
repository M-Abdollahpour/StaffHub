import type { Employee } from "~/types/employeeType";
import { employees } from "../data/data";

export const getEmployees = async () => {
  const response = new Promise<Employee[]>((resolve) => {
    setTimeout(() => {
      resolve(employees);
    }, 2 * 1000);
  });
  return response;
};
