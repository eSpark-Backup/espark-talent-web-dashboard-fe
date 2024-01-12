import { allEmployees } from '../constants/AllEmployee';

export const getEmployeeData = (id) => {
  if (id === undefined || id === null) {
    return 'No Employee Id Found';
  }
  return allEmployees.find((employee) => employee.id === parseInt(id));
};
