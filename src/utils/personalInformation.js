import { employeeProfileData } from "../constants/employeeProfile";

export const getEmployeeDetail = (id, employeeProfileDetails) => {
    if (id === undefined || id === null) {
        return employeeProfileData?.noidFound;
    }
    return employeeProfileDetails.find((employee) => employee.id === parseInt(id));
};