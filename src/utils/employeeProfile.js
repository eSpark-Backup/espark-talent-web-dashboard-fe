import { employeeProfileData } from '../constants/employeeProfile';

export const getEmployeeData = (id, allEmployees) => {
  if (id === undefined || id === null) {
    return employeeProfileData?.noidFound;
  }
  return allEmployees.find((employee) => employee.id === parseInt(id));
};
