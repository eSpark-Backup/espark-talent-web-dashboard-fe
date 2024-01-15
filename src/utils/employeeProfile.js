import { employeeProfileData } from "../constants/employeeProfile";

export const getEmployeeData = (id, allEmployees) => {
  if (id === undefined || id === null) {
    return null;
  }
  // return allEmployees.find((employee) => employee.id === parseInt(id));
  const employee = allEmployees.find((employee) => employee.id === parseInt(id));
  return employee || null;
};
