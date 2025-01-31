import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employeeSlice',
  initialState: {
    data: [],
    isLoading: false,
    addEmployeeForm: {},
    assets: [],
    attendance: [],
    currentEmployee: {},
    currentEmployeeClients: {
      active: [],
      inActive: [],
    },
    timeAndLeaves: {
      time: [],
      leaves: [],
    },
    letters: [],
    benefits: [],
    salary: [],
    requests: {
      leave: [],
      whf: [],
      punch: [],
    },
  },
  reducers: {
    getEmpData: (state) => {
      state.isLoading = true;
    },
    getEmpDataSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = true;
    },
    getEmpDataFailed: (state) => {
      state.isLoading = true;
    },
    addEmployeeFormData: (state, action) => {
      state.addEmployeeForm = {
        ...state.addEmployeeForm,
        ...action.payload,
      };
    },
    clearEmployeeFormData: (state) => {
      state.addEmployeeForm = {};
    },
    getEmpAssetRequest: (state) => {
      state.isLoading = true;
    },
    getEmpAssetRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.assets = action.payload;
    },
    getEmpAssetRequestFailed: (state) => {
      state.isLoading = false;
    },
    addEmpAsset: (state, action) => {
      const tempAssets = state.assets;
      tempAssets.push(action.payload);
      state.assets = tempAssets;
    },
    getAttendanceRequest: (state) => {
      state.isLoading = true;
    },
    getAttendanceRequestSuccess: (state, action) => {
      state.attendance = action.payload;
      state.isLoading = false;
    },
    getAttendanceRequestFailed: (state) => {
      state.isLoading = false;
    },
    getCurrentEmpData: (state) => {
      state.isLoading = true;
    },
    getCurrentEmpDataSuccess: (state, action) => {
      state.currentEmployee = action.payload;
      state.isLoading = false;
    },
    getCurrentEmpDataFailed: (state) => {
      state.isLoading = false;
    },
    deleteCurrentEmpData: (state) => {
      state.isLoading = true;
    },
    deleteCurrentEmpDataSuccess: (state, action) => {
      const tempData = state?.data?.filter((el) => el.id !== action.payload);
      state.data = tempData;
      state.isLoading = false;
    },
    deleteCurrentEmpDataFailed: (state) => {
      state.isLoading = false;
    },
    getHrEmpTime: (state, action) => {
      state.timeAndLeaves.time = action.payload;
      state.isLoading = false;
    },
    getHrEmpLeaves: (state, action) => {
      state.timeAndLeaves.leaves = action.payload;
      state.isLoading = false;
    },
    updateEmpTimeRequest: (state) => {
      state.isLoading = true;
    },
    updateEmpTime: (state, action) => {
      state.timeAndLeaves.time = action.payload;
      state.isLoading = false;
    },
    updateEmpLeavesRequest: (state) => {
      state.isLoading = true;
    },
    updateEmpLeaves: (state, action) => {
      state.timeAndLeaves.leaves = action.payload;
      state.isLoading = false;
    },
    updateCurrentEmployeeImage: (state, action) => {
      state.currentEmployee.image_path = action.payload;
    },
    deleteEmpAsset: (state, action) => {
      const tempData = state?.assets?.filter((el) => el.id !== action.payload);
      state.assets = tempData;
    },
    getEmpLetterRequest: (state) => {
      state.isLoading = true;
    },
    getEmpLetterRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.letters = action.payload;
    },
    getEmpLetterRequestFailed: (state) => {
      state.isLoading = false;
    },
    addEmpLetter: (state, action) => {
      const tempLetters = state.letters;
      tempLetters.push(action.payload);
      state.letters = tempLetters;
    },
    deleteEmpLetter: (state, action) => {
      const tempLetters = state?.letters?.filter(
        (el) => el.id !== action.payload
      );
      state.letters = tempLetters;
    },
    editEmpLetter: (state, action) => {
      const tempLetters = state.letters.map((letter) => {
        if (letter.id === action.payload.id) {
          return action.payload;
        }
        return letter;
      });
      state.letters = tempLetters;
    },
    getEmpBenefitRequest: (state) => {
      state.isLoading = true;
    },
    getEmpBenefitRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.benefits = action.payload;
    },
    getEmpBenefitRequestFailed: (state) => {
      state.isLoading = false;
    },
    addEmpBenefit: (state, action) => {
      const tempBenefits = state.benefits;
      tempBenefits.push(action.payload);
      state.benefits = tempBenefits;
    },
    deleteEmpBenefit: (state, action) => {
      const tempBenefits = state?.benefits?.filter(
        (el) => el.id !== action.payload
      );
      state.benefits = tempBenefits;
    },
    editEmpBenefit: (state, action) => {
      const tempBenefits = state.benefits.map((benefit) => {
        if (benefit.id === action.payload.id) {
          return action.payload;
        }
        return benefit;
      });
      state.benefits = tempBenefits;
    },
    getEmpSalaryRequest: (state) => {
      state.isLoading = true;
    },
    getEmpSalaryRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.salary = action.payload;
    },
    getEmpSalaryRequestFailed: (state) => {
      state.isLoading = false;
    },
    getEmpRequest: (state) => {
      state.isLoading = true;
    },
    getEmpRequestSuccess: (state, action) => {
      const { type, data } = action.payload;
      state.isLoading = false;

      if (state?.requests[type]) {
        state.requests[type] = data;
      } else {
        console.warn(`Invalid request type: ${type}`);
      }
    },
    getEmpRequestFailed: (state) => {
      state.isLoading = false;
    },
    addEmpSalary: (state, action) => {
      const tempSalary = state.salary;
      tempSalary.push(action.payload);
      state.salary = tempSalary;
    },
    deleteEmpSalary: (state, action) => {
      const tempSalary = state?.salary?.filter(
        (el) => el.id !== action.payload
      );
      state.salary = tempSalary;
    },
    editEmpSalary: (state, action) => {
      const tempSalary = state.salary.map((salary) => {
        if (salary.id === action.payload.id) {
          return action.payload;
        }
        return salary;
      });
      state.salary = tempSalary;
    },
    getEmpLeaveRequest: (state) => {
      state.isLoading = true;
    },
    getEmpLeaveRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.leaves = action.payload;
    },
    getEmpLeaveRequestFailed: (state) => {
      state.isLoading = false;
    },
    getEmpPunchRequest: (state) => {
      state.isLoading = true;
    },
    getEmpPunchRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.punches = action.payload;
    },
    getEmpPunchRequestFailed: (state) => {
      state.isLoading = false;
    },
    getEmpWfhRequest: (state) => {
      state.isLoading = true;
    },
    getEmpWfhRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.wfhRequests = action.payload;
    },
    getEmpWfhRequestFailed: (state) => {
      state.isLoading = false;
    },
    acceptEmpWfhRequest: (state, action) => {
      state.wfhRequests = state.wfhRequests.map((request) =>
        request.id === action.payload
          ? { ...request, status: 'accepted' }
          : request
      );
    },
    rejectEmpWfhRequest: (state, action) => {
      state.wfhRequests = state.wfhRequests.map((request) =>
        request.id === action.payload
          ? { ...request, status: 'rejected' }
          : request
      );
    },
    removeHrEmployeeData: (state) => {
      state.isLoading = false;
      state.assets = [];
      state.attendance = [];
      state.currentEmployee = {};
      state.currentEmployeeClients = {
        active: [],
        inActive: [],
      };
      state.timeAndLeaves = {
        time: [],
        leaves: [],
      };
      state.letters = [];
      state.benefits = [];
      state.salary = [];
      state.requests = {
        leave: [],
        whf: [],
        punch: [],
      };
    },
    removeCurrentEmployee: (state) => {
      state.currentEmployee = {};
    },
    removeAddEmpForm: (state) => {
      state.addEmployeeForm = {};
    },
  },
});

export const {
  getEmpData,
  getEmpDataSuccess,
  getEmpDataFailed,
  addEmployeeFormData,
  getEmpAssetRequest,
  getEmpAssetRequestSuccess,
  getEmpAssetRequestFailed,
  addEmpAsset,
  getAttendanceRequest,
  getAttendanceRequestSuccess,
  getAttendanceRequestFailed,
  getCurrentEmpData,
  getCurrentEmpDataSuccess,
  getCurrentEmpDataFailed,
  deleteCurrentEmpData,
  deleteCurrentEmpDataSuccess,
  deleteCurrentEmpDataFailed,
  getHrEmpTime,
  getHrEmpLeaves,
  clearEmployeeFormData,
  updateEmpTimeRequest,
  updateEmpTime,
  updateEmpLeavesRequest,
  updateEmpLeaves,
  updateCurrentEmployeeImage,
  deleteEmpAsset,
  getEmpLetterRequest,
  getEmpLetterRequestSuccess,
  getEmpLetterRequestFailed,
  addEmpLetter,
  deleteEmpLetter,
  editEmpLetter,
  getEmpBenefitRequest,
  getEmpBenefitRequestSuccess,
  getEmpBenefitRequestFailed,
  addEmpBenefit,
  deleteEmpBenefit,
  editEmpBenefit,
  getEmpSalaryRequest,
  getEmpSalaryRequestSuccess,
  getEmpSalaryRequestFailed,
  addEmpSalary,
  deleteEmpSalary,
  editEmpSalary,
  getEmpRequest,
  getEmpRequestSuccess,
  getEmpRequestFailed,
  getEmpLeaveRequest,
  getEmpLeaveRequestFailed,
  getEmpLeaveRequestSuccess,
  getEmpPunchRequest,
  getEmpPunchRequestFailed,
  getEmpPunchRequestSuccess,
  getEmpWfhRequest,
  getEmpWfhRequestFailed,
  getEmpWfhRequestSuccess,
  rejectEmpWfhRequest,
  acceptEmpWfhRequest,
  removeHrEmployeeData,
  removeCurrentEmployee,
  removeAddEmpForm,
} = employeeSlice.actions;
export default employeeSlice.reducer;
