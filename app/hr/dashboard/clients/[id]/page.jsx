'use client';
import React, { useEffect, useState } from 'react';
import { Typography, Tabs, Tab, Button } from '@mui/material';
import { Box } from '@mui/system';
import Breadcrumb from '@/src/components/form/step/Breadcrumb';
// import { clientProfileTabs } from '@/src/constants/data/tabs/hr/client-profile';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { renderTable } from './renderComponents';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { useParams } from 'next/navigation';
import HiringRequestModal from './HiringRequestModal';
import AddContractModal from './AddContractModal';
import UploadInvoiceModal from './UploadInvoiceModal';
import AddEmployeeModal from './AddEmployeeModal';
import AddInterviewModal from './AddInterviewModal';
import AddOnboardModal from './AddOnboardModal';

import { CLIENTPROFILE } from '@/src/constants/ClientProfile';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import {
  HR_CLIENT_EMPLOYEES,
  HR_CLIENT_EMPLOYEE_INVOICE,
  HR_CLIENT_EMP_HIRING_REQUEST,
  HR_CLIENT_EMP_INTERVIEW_SCHEDULE,
  HR_CLIENT_EMP_ON_BOARDING,
  HR_CLIENT_OTHER_INVOICE,
  HR_GET_CLIENT_PROFILE,
} from '@/src/services/apiService/apiEndPoints';
import {
  deleteEmpInv,
  deleteHiringRequest,
  deleteOnBoarding,
  deleteOthInv,
  getClientEmpInvoicePaid,
  getClientEmpInvoicePending,
  getClientEmpInvoiceProcessing,
  getClientHiringRequest,
  getClientInterviewSchedule,
  getClientOnboarding,
  getClientOthInvoicePaid,
  getClientOthInvoicePending,
  getClientOthInvoiceProcessing,
  getCurrentClientData,
  getCurrentClientDataFailed,
  getCurrentClientDataSuccess,
  updateEmpInv,
  updateOthInv,
} from '@/src/redux/slices/hrSlices/clientSlice';
import { useDispatch, useSelector } from 'react-redux';
import ClientProfileData from './ClientProfileData';
import {
  hiringRequestColumn,
  interviewScheduleColumn,
  onboardingColumn,
} from '@/src/constants/data/tables/hr/hireOnBoard';
import { a11yProps } from '@/src/utils/tabs';
import {
  invoicePaymentColumn,
  otherPaymentColumn,
} from '@/src/constants/data/tables/hr/invoices';
import { getCamelCapitalized } from '@/src/utils/stringModification';
import UploadOtherInvoiceModal from './UploadOtherInvoiceModal';
import { Toast } from '@/src/components/Toast/Toast';
import ProfileEditSkeleton from '@/src/components/HR/ProfileEditSkeleton';

const AddEmployee = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {
    hireAndOnBoard,
    //  employees,
    employeeInvoices,
    otherInvoices,
  } = useSelector((state) => state?.hr?.clients?.currentClientData);
  const { email } = useSelector((state) => state?.hr?.clients?.currentClient);
  const { client_perms, invoices_perms } = useSelector(
    (state) => state?.hr?.home?.homeData
  );
  const { role } = useSelector((state) => state?.auth?.userData);
  const { isLoading } = useQuery({
    staleTime: 1000,
    queryKey: ['hr-client-info-query'],
    queryFn: () => {
      dispatch(getCurrentClientData());
      // console.log('Calling api');
      return api
        .getData(`${HR_GET_CLIENT_PROFILE}?id=${params.id}`)
        .then(({ data }) => {
          dispatch(getCurrentClientDataSuccess(data));
          return data;
        })
        .catch((err) => {
          // console.log('API Failed');
          dispatch(getCurrentClientDataFailed());
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });

  const ClientHiringReqQuery = useQuery({
    staleTime: 1000,
    queryKey: ['hr-client-hiring-req-query'],
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_EMP_HIRING_REQUEST}?id=${params.id}`)
        .then(({ data }) => {
          const tempData = data?.length
            ? data.map((item) => ({
                ...item,
                salary_range: `${item.salary_range.minimum}$ - ${item.salary_range.maximum}$`,
                action:
                  role === 'super_admin' ||
                  (role !== 'super_admin' && invoices_perms?.[0]?.write)
                    ? ['Delete']
                    : ['-'],
              }))
            : [];
          dispatch(getClientHiringRequest(tempData));
          return tempData;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const ClientInterviewSchedule = useQuery({
    staleTime: 1000,
    queryKey: ['hr-interview-schedule-req-query'],
    queryFn: () => {
      console.log('Calling api');
      return api
        .getData(`${HR_CLIENT_EMP_INTERVIEW_SCHEDULE}?id=${params.id}`)
        .then(({ data }) => {
          dispatch(getClientInterviewSchedule(data || []));
          return data;
        })
        .catch((err) => {
          // console.log('API Failed');
          // dispatch(getCurrentClientDataFailed());
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const ClientOnBoarding = useQuery({
    staleTime: 1000,
    queryKey: ['hr-client-on-board-req-query'],
    queryFn: () => {
      // dispatch(getCurrentClientData());
      // console.log('Calling api');
      return api
        .getData(`${HR_CLIENT_EMP_ON_BOARDING}?id=${params.id}`)
        .then(({ data }) => {
          // console.log('API Success');
          const tempData = data?.length
            ? data.map((item) => ({
                ...item,
                dropdownStatus: true,
                action: ['Delete'],
              }))
            : [];
          dispatch(getClientOnboarding(tempData || []));
          // console.log('API Success1');
          return data;
        })
        .catch((err) => {
          // console.log('API Failed');
          // dispatch(getCurrentClientDataFailed());
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const ClientEmployeesAll = useQuery({
    staleTime: 1000,
    queryKey: ['hr-clients-employees-all'],
    queryFn: () => {
      // dispatch(getCurrentClientData());
      // console.log('Calling api');
      return api
        .getData(`${HR_CLIENT_EMPLOYEES}?c_email=${email}&tab=all`)
        .then(({ data }) => {
          // console.log('API Success');
          // dispatch(getCurrentClientDataSuccess(data));
          // console.log('API Success1');
          return data;
        })
        .catch((err) => {
          // console.log('API Failed');
          // dispatch(getCurrentClientDataFailed());
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const ClientEmployeesActive = useQuery({
    staleTime: 1000,
    queryKey: ['hr-clients-employees-active'],
    queryFn: () => {
      // dispatch(getCurrentClientData());
      // console.log('Calling api');
      return api
        .getData(`${HR_CLIENT_EMPLOYEES}?c_email=${email}&tab=active`)
        .then(({ data }) => {
          // console.log('API Success');
          // dispatch(getCurrentClientDataSuccess(data));
          // console.log('API Success1');
          return data;
        })
        .catch((err) => {
          // console.log('API Failed');
          // dispatch(getCurrentClientDataFailed());
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const ClientEmployeesTerminated = useQuery({
    staleTime: 1000,
    queryKey: ['hr-clients-employees-terminated'],
    queryFn: () => {
      // dispatch(getCurrentClientData());
      // console.log('Calling api');
      return api
        .getData(`${HR_CLIENT_EMPLOYEES}?c_email=${email}&tab=terminated`)
        .then(({ data }) => {
          // console.log('API Success');
          // dispatch(getCurrentClientDataSuccess(data));
          // console.log('API Success1');
          return data;
        })
        .catch((err) => {
          // console.log('API Failed');
          // dispatch(getCurrentClientDataFailed());
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const EmployeeInvoicesPending = useQuery({
    staleTime: 1000,
    queryKey: ['hr-clients-employees-invoices-pending'],
    queryFn: () => {
      // dispatch(getCurrentClientData());
      // console.log('Calling api');
      return api
        .getData(`${HR_CLIENT_EMPLOYEE_INVOICE}?client_id=${email}&tab=pending`)
        .then(({ data }) => {
          const tempData = data?.length
            ? data.map((item) => ({
                ...item,
                dropdownStatus: true,
                action: ['Delete'],
                actionStatus: true,
                download: 'Download',
                payment_status: getCamelCapitalized(item.payment_status),
              }))
            : [];
          dispatch(getClientEmpInvoicePending(tempData || []));
          // console.log('API Success1');
          return data;
        })
        .catch((err) => {
          // console.log('API Failed');
          // dispatch(getCurrentClientDataFailed());
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const EmployeeInvoicesProcessing = useQuery({
    staleTime: 1000,
    queryKey: ['hr-clients-employees-invoices-processing'],
    queryFn: () => {
      return api
        .getData(
          `${HR_CLIENT_EMPLOYEE_INVOICE}?client_id=${email}&tab=processing`
        )
        .then(({ data }) => {
          const tempData = data?.length
            ? data.map((item) => ({
                ...item,
                dropdownStatus: true,
                action: ['Delete'],
                actionStatus: true,
                download: 'Download',
                payment_status: getCamelCapitalized(item.payment_status),
              }))
            : [];
          dispatch(getClientEmpInvoiceProcessing(tempData || []));
          // console.log('API Success1');
          return data;
        })
        .catch((err) => {
          // console.log('API Failed');
          // dispatch(getCurrentClientDataFailed());
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const EmployeeInvoicesPaid = useQuery({
    staleTime: 1000,
    queryKey: ['hr-clients-employees-invoices-paid'],
    queryFn: () => {
      // dispatch(getCurrentClientData());
      // console.log('Calling api');
      return api
        .getData(`${HR_CLIENT_EMPLOYEE_INVOICE}?client_id=${email}&tab=paid`)
        .then(({ data }) => {
          // console.log('API Success');
          const tempData = data?.length
            ? data.map((item) => ({
                ...item,
                dropdownStatus: true,
                action: ['Delete'],
                actionStatus: true,
                download: 'Download',
                payment_status: getCamelCapitalized(item.payment_status),
              }))
            : [];
          dispatch(getClientEmpInvoicePaid(tempData || []));
          // console.log('API Success1');
          return data;
        })
        .catch((err) => {
          // console.log('API Failed');
          // dispatch(getCurrentClientDataFailed());
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const OtherInvoicesPending = useQuery({
    staleTime: 1000,
    queryKey: ['hr-clients-other-invoices-pending'],
    queryFn: () => {
      // dispatch(getCurrentClientData());
      // console.log('Calling api');
      return api
        .getData(`${HR_CLIENT_OTHER_INVOICE}?client_id=${email}&tab=pending`)
        .then(({ data }) => {
          const tempData =
            data?.length &&
            data.map((item) => ({
              ...item,
              dropdownStatus: true,
              action: ['Delete'],
              actionStatus: true,
              download: 'Download',
              payment_status: getCamelCapitalized(item.payment_status),
            }));
          dispatch(getClientOthInvoicePending(tempData || []));
          // console.log('API Success1');
          return data;
        })
        .catch((err) => {
          // console.log('API Failed');
          // dispatch(getCurrentClientDataFailed());
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const OtherInvoicesProcessing = useQuery({
    staleTime: 1000,
    queryKey: ['hr-clients-other-invoices-processing'],
    queryFn: () => {
      // dispatch(getCurrentClientData());
      // console.log('Calling api');
      return api
        .getData(`${HR_CLIENT_OTHER_INVOICE}?client_id=${email}&tab=processing`)
        .then(({ data }) => {
          // console.log('API Success');
          const tempData =
            data?.length &&
            data.map((item) => ({
              ...item,
              dropdownStatus: true,
              action: ['Delete'],
              actionStatus: true,
              download: 'Download',
              payment_status: getCamelCapitalized(item.payment_status),
            }));
          console.log({ tempData });
          dispatch(getClientOthInvoiceProcessing(tempData || []));
          // console.log('API Success1');
          return data;
        })
        .catch((err) => {
          // console.log('API Failed');
          // dispatch(getCurrentClientDataFailed());
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const OtherInvoicesPaid = useQuery({
    staleTime: 1000,
    queryKey: ['hr-clients-other-invoices-paid'],
    queryFn: () => {
      // dispatch(getCurrentClientData());
      // console.log('Calling api');
      return api
        .getData(`${HR_CLIENT_OTHER_INVOICE}?client_id=${email}&tab=paid`)
        .then(({ data }) => {
          // console.log('API Success');
          const tempData =
            data?.length &&
            data.map((item) => ({
              ...item,
              dropdownStatus: true,
              action: ['Delete'],
              actionStatus: true,
              download: 'Download',
              payment_status: getCamelCapitalized(item.payment_status),
            }));
          dispatch(getClientOthInvoicePaid(tempData || []));
          // console.log('API Success1');
          return data;
        })
        .catch((err) => {
          // console.log('API Failed');
          // dispatch(getCurrentClientDataFailed());
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const clientProfileTabs = [
    {
      label: 'Hire & onboard',
      hasNestedTabs: true,
      prop: a11yProps(0),
      nestedTabs: [
        {
          prop: a11yProps(0),
          label: 'Hiring request',
          data: hireAndOnBoard.hiringRequest,
          column: hiringRequestColumn,
        },
        {
          prop: a11yProps(1),
          label: 'Interview schedule',
          data: hireAndOnBoard.interviewSchedule,
          column: interviewScheduleColumn,
        },
        {
          prop: a11yProps(2),
          label: 'Onboarding',
          data: hireAndOnBoard.onBoarding,
          column: onboardingColumn,
        },
      ],
      isTable: true,
    },
    {
      label: 'Employees',
      hasNestedTabs: true,
      prop: a11yProps(1),
      nestedTabs: [
        {
          prop: a11yProps(0),
          label: 'All',
          data: ClientEmployeesAll.data || [],
        },
        {
          prop: a11yProps(1),
          label: 'Active employees',
          data: ClientEmployeesActive.data || [],
        },
        {
          prop: a11yProps(2),
          label: 'Terminated employees',
          data: ClientEmployeesTerminated.data || [],
        },
      ],
      isTable: false,
    },
    {
      label: 'Employee invoices',
      hasNestedTabs: true,
      prop: a11yProps(3),
      nestedTabs: [
        {
          prop: a11yProps(0),
          label: 'Pending',
          data: employeeInvoices?.pending,
          column: invoicePaymentColumn,
        },
        {
          prop: a11yProps(1),
          label: 'Processing',
          data: employeeInvoices?.processing,
          column: invoicePaymentColumn,
        },
        {
          prop: a11yProps(2),
          label: 'Paid',
          data: employeeInvoices?.paid,
          column: invoicePaymentColumn,
        },
      ],
      isTable: true,
    },
    {
      label: 'Other invoices',
      hasNestedTabs: true,
      prop: a11yProps(4),
      nestedTabs: [
        {
          prop: a11yProps(0),
          label: 'Pending',
          data: otherInvoices?.pending,
          column: otherPaymentColumn,
        },
        {
          prop: a11yProps(1),
          label: 'Processing',
          data: otherInvoices?.processing,
          column: otherPaymentColumn,
        },
        {
          prop: a11yProps(2),
          label: 'Paid',
          data: otherInvoices?.paid,
          column: otherPaymentColumn,
        },
      ],
      isTable: true,
    },
  ];
  const [isOpenHiringRequestModal, setIsOpenHiringRequestModal] =
    useState(false);
  const [isOpenAddInterviewModal, setIsOpenAddInterviewModal] = useState(false);
  const [isOpenAddOnboardModal, setIsOpenAddOnboardModal] = useState(false);
  const [isOpenContractModal, setIsOpenContractModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [isOpenUploadInvoiceModal, setIsOpenUploadInvoiceModal] =
    useState(false);
  const [isOpenUploadOthInvoiceModal, setIsOpenUploadOthInvoiceModal] =
    useState(false);
  const [isOpenAddClientModal, setIsOpenAddClientModal] = useState(false);
  const [currentTab, setCurrentTab] = useState({
    label: 'Hire & onboard',
    val: 0,
    nested: {
      label: 'Hiring Request',
      val: 0,
    },
  });
  const [currentTabTable, setCurrentTabTable] = useState({
    data: hireAndOnBoard?.hiringRequest,
    column: clientProfileTabs?.[0].nestedTabs?.[0]?.column,
  });

  useEffect(() => {
    setCurrentTabTable((ps) => ({
      ...ps,
      data: hireAndOnBoard.hiringRequest,
    }));
  }, [hireAndOnBoard.hiringRequest]);
  const handleChangeCurrentTab = (event, newValue) => {
    const current = clientProfileTabs[newValue];
    const { label, nestedTabs, data, column } = current;
    setCurrentTab((ps) => {
      return {
        ...ps,
        label,
        val: newValue,
        nested: {
          label: nestedTabs[0]?.label,
          val: 0,
        },
      };
    });
    console.log({ label, nestedTabs, data, column, currentTab });
    if (data?.length) {
      const filteredData = filterTableRowsWRTTab(data, {
        paymentStatus: nestedTabs[0].label,
      });
      setCurrentTabTable({
        data: filteredData || [],
        column,
      });
    } else if (nestedTabs?.length) {
      setCurrentTabTable({
        data: nestedTabs[0].data || [],
        column: nestedTabs[0].column,
      });
    } else {
      setCurrentTabTable({
        data: [],
        // column: [],
      });
    }
    // if(nestedTabs.length) {
    //   setCurrentTabTable({
    //     data: nestedTabs[0].data || [],
    //     column:nestedTabs[0].column,
    //   });
    // }
  };
  const handleChangeNestedTab = (event, newValue, data, rest) => {
    const current = data[newValue];
    const { label } = current;
    setCurrentTab((ps) => {
      return {
        ...ps,
        nested: {
          label,
          val: newValue,
        },
      };
    });
    console.log({ current });
    if (current?.column?.length) {
      console.log('currentData');
      console.log({ event, newValue, data, rest, current });
      setCurrentTabTable({
        data: current?.data || [],
        column: current?.column,
      });
    } else if (rest?.column?.length) {
      console.log('restData');
      console.log({ event, newValue, data, rest, current });
      setCurrentTabTable({
        data: rest?.data || [],
        column: rest?.column,
      });
    }
  };
  const handleOpenModal = () => {
    setEditModal(true);
  };
  const handleCloseModal = () => {
    setEditModal(false);
  };
  const handleOpenHiringRequestModal = () => {
    setIsOpenHiringRequestModal(true);
  };
  const handleCloseHiringRequestModal = () => {
    setIsOpenHiringRequestModal(false);
  };
  const handleOpenAddInterviewModal = () => {
    setIsOpenAddInterviewModal(true);
  };
  const handleCloseAddInterviewModal = () => {
    setIsOpenAddInterviewModal(false);
  };
  const handleOpenAddOnboardModal = () => {
    setIsOpenAddOnboardModal(true);
  };
  const handleCloseAddOnboardModal = () => {
    setIsOpenAddOnboardModal(false);
  };
  // const handleOpenContractModal = () => {
  //   setIsOpenContractModal(true);
  // };
  const handleCloseContractModal = () => {
    setIsOpenContractModal(false);
  };
  const handleOpenUploadInvoiceModal = () => {
    setIsOpenUploadInvoiceModal(true);
  };
  const handleCloseUploadInvoiceModal = () => {
    setIsOpenUploadInvoiceModal(false);
  };
  const handleOpenUploadOthInvoiceModal = () => {
    setIsOpenUploadOthInvoiceModal(true);
  };
  const handleCloseUploadOthInvoiceModal = () => {
    setIsOpenUploadOthInvoiceModal(false);
  };
  const handleOpenAddClientModal = () => {
    setIsOpenAddClientModal(true);
  };
  const handleCloseAddClientModal = () => {
    setIsOpenAddClientModal(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [deleteRowID, setDeleteRowID] = useState(null);
  const [deleteInvType, setDeleteInvType] = useState(null);
  const [updateRowID, setUpdateRowID] = useState(null);
  const [updateStatusType, setUpdateStatusType] = useState({
    currentVal: null,
    newVal: null,
    currentInvData: null,
  });
  const handleClose = () => setIsOpen(false);
  const handleOpen = (id, row) => {
    console.log({ id, row });
    setDeleteRowID(id);
    if (currentTab?.label !== 'Hire & onboard') {
      setDeleteInvType(row?.payment_status.toLowerCase());
    }
    setIsOpen(true);
  };
  const deleteStartHiringMutation = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_CLIENT_EMP_HIRING_REQUEST}/?id=${id}`);
    },
    onSuccess: () => {
      Toast('success', 'Data deleted successfully');
      dispatch(deleteHiringRequest(deleteRowID));
      setDeleteRowID(null);
      handleClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      handleClose();
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const deleteOnBoardingMutation = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_CLIENT_EMP_ON_BOARDING}/?id=${id}`);
    },
    onSuccess: () => {
      Toast('success', 'Data deleted successfully');
      dispatch(deleteOnBoarding(deleteRowID));
      setDeleteRowID(null);
      handleClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      handleClose();
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const deleteEmpInvMutation = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_CLIENT_EMPLOYEE_INVOICE}/?id=${id}`);
    },
    onSuccess: () => {
      Toast('success', 'Data deleted successfully');
      dispatch(deleteEmpInv({ type: deleteInvType, id: deleteRowID }));
      setDeleteRowID(null);
      setDeleteInvType(null);
      handleClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      handleClose();
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const deleteOthInvMutation = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_CLIENT_OTHER_INVOICE}/?id=${id}`);
    },
    onSuccess: () => {
      Toast('success', 'Data deleted successfully');
      dispatch(deleteOthInv({ type: deleteInvType, id: deleteRowID }));
      setDeleteRowID(null);
      setDeleteInvType(null);
      handleClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      handleClose();
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const updateEmpInvMutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      for (const key in data.data) {
        formData.append(key, data.data[key]);
      }
      return api.updateData(`${data?.url}/?id=${data?.id}`, formData);
    },
    onSuccess: () => {
      Toast('success', 'Data updated successfully');
      if (currentTab?.label === 'Employee invoices') {
        dispatch(
          updateEmpInv({
            currentVal: updateStatusType.currentVal,
            id: updateRowID,
            newVal: updateStatusType.newVal,
            data: updateStatusType?.currentInvData,
          })
        );
      } else {
        dispatch(
          updateOthInv({
            currentVal: updateStatusType.currentVal,
            id: updateRowID,
            newVal: updateStatusType.newVal,
            data: updateStatusType?.currentInvData,
          })
        );
      }
      setDeleteRowID(null);
      setUpdateStatusType({
        currentInvData: null,
        newVal: null,
        currentVal: null,
      });
      handleClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to update data');
      handleClose();
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const handleConfirmDeleteHiringReq = () => {
    console.log({ deleteRowID });
    // deleteStartHiringMutation.mutate(deleteRowID);
    if (currentTab?.label === 'Hire & onboard') {
      if (currentTab?.nested.val === 0) {
        deleteStartHiringMutation.mutate(deleteRowID);
      } else {
        deleteOnBoardingMutation.mutate(deleteRowID);
      }
    } else if (currentTab?.label === 'Employee invoices') {
      deleteEmpInvMutation.mutate(deleteRowID);
    } else {
      deleteOthInvMutation.mutate(deleteRowID);
    }
  };
  const handleConfirmUpdatePayStatus = (data, newVal) => {
    console.log({ data, newVal });
    setUpdateRowID(data.id);
    setUpdateStatusType({
      currentVal: data.payment_status,
      newVal: newVal,
      currentInvData: data,
    });
    const updData = {
      payment_status: newVal?.toLowerCase(),
    };
    updateEmpInvMutation.mutate({
      id: data?.id,
      data: updData,
      url:
        currentTab?.label === 'Employee invoices'
          ? HR_CLIENT_EMPLOYEE_INVOICE
          : HR_CLIENT_OTHER_INVOICE,
    });
  };
  const getCurrentTabData = () => {
    if (currentTab?.label === 'Hire & onboard') {
      if (currentTab?.nested.val === 0) {
        return hireAndOnBoard?.hiringRequest || [];
      } else if (currentTab?.nested.val === 1) {
        return hireAndOnBoard?.interviewSchedule || [];
      } else {
        return hireAndOnBoard?.onBoarding || [];
      }
    } else if (currentTab?.label === 'Employee invoices') {
      if (currentTab?.nested.val === 0) {
        return employeeInvoices?.pending || [];
      } else if (currentTab?.nested.val === 1) {
        return employeeInvoices?.processing || [];
      } else {
        return employeeInvoices?.paid || [];
      }
    } else {
      if (currentTab?.nested.val === 0) {
        return otherInvoices?.pending || [];
      } else if (currentTab?.nested.val === 1) {
        return otherInvoices?.processing || [];
      } else {
        return otherInvoices?.paid || [];
      }
    }
  };

  console.log(
    ClientHiringReqQuery,
    ClientInterviewSchedule,
    ClientOnBoarding,
    EmployeeInvoicesPending,
    EmployeeInvoicesProcessing,
    EmployeeInvoicesPaid,
    OtherInvoicesPending,
    OtherInvoicesProcessing,
    OtherInvoicesPaid
  );
  return (
    <>
      <Box>
        <Breadcrumb root="clients" title="Clients /" currentPage="Profile" />
        <Box mb={'40px'}>
          <Typography
            sx={{
              color: '#171717',
              fontSize: '30px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: 'normal',
            }}
          >
            {CLIENTPROFILE?.profile}
          </Typography>
        </Box>
        <>
          {isLoading ? (
            <ProfileEditSkeleton isClient={true} />
          ) : (
            <ClientProfileData
              isLoading={isLoading}
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
              showEditModal={showEditModal}
            />
          )}
          <Box sx={{ width: '100%' }}>
            <Box
              display={'flex'}
              alignItems={'center'}
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                mt: '40px',
                justifyContent: 'space-between',
              }}
            >
              <Tabs
                value={currentTab.val}
                onChange={handleChangeCurrentTab}
                aria-label="basic tabs example"
                variant="scrollable"
              >
                {clientProfileTabs?.map(({ label, prop }, index) => (
                  <Tab
                    key={index}
                    label={`${label}`}
                    {...prop}
                    disableRipple={true}
                    sx={{
                      marginRight: '30px',
                      color: '#595959',
                      textTransform: 'math-auto',
                    }}
                  />
                ))}
              </Tabs>
            </Box>
            {currentTab?.label !== 'Employees' && (
              <Box
                sx={{
                  marginTop: '10px',
                  marginBottom: '40px',
                  borderBottom:
                    currentTab?.label !== 'Leave Balance' && 'solid 1px #ccc',
                }}
              >
                {clientProfileTabs?.map(({ nestedTabs, ...rest }, index) => (
                  <CustomTabPanel
                    value={currentTab.val}
                    index={index}
                    key={index}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: {
                          xs: 'flex-start',
                          md: 'space-between',
                        },
                        alignItems: { xs: 'flex-start', md: 'center' },
                        flexDirection: { xs: 'column', md: 'row' },
                      }}
                    >
                      <Tabs
                        variant="scrollable"
                        value={currentTab.nested.val}
                        onChange={(ev, newVal) =>
                          handleChangeNestedTab(ev, newVal, nestedTabs, rest)
                        }
                        sx={{ width: { xs: '100%', md: '80%' } }}
                        aria-label="basic tabs example"
                      >
                        {nestedTabs?.map(({ label, prop }, nestedIndex) => (
                          <Tab
                            key={nestedIndex}
                            label={`${label}`}
                            {...prop}
                            disableRipple={true}
                            sx={{ marginRight: '30px', color: '#595959' }}
                          />
                        ))}
                      </Tabs>
                      {currentTab?.label === 'Hire & onboard' ? (
                        <>
                          {currentTab?.nested.val === 0 ? (
                            <>
                              {(role === 'super_admin' ||
                                (role !== 'super_admin' &&
                                  client_perms?.[0]?.write)) && (
                                <Button
                                  onClick={handleOpenHiringRequestModal}
                                  variant="contained"
                                  sx={{
                                    my: { xs: '20px', md: 0 },
                                    textTransform: 'math-auto',
                                    color: '#fff',
                                    background: '#029894',

                                    '&:hover': {
                                      color: '#fff',
                                      background: '#029894',
                                    },
                                  }}
                                >
                                  {CLIENTPROFILE?.addNewRequest}
                                </Button>
                              )}
                            </>
                          ) : currentTab?.nested.val === 1 ? (
                            <>
                              {(role === 'super_admin' ||
                                (role !== 'super_admin' &&
                                  client_perms?.[0]?.write)) && (
                                <Button
                                  onClick={handleOpenAddInterviewModal}
                                  variant="contained"
                                  sx={{
                                    my: { xs: '20px', md: 0 },
                                    textTransform: 'math-auto',
                                    color: '#fff',
                                    background: '#029894',
                                    '&:hover': {
                                      color: '#fff',
                                      background: '#029894',
                                    },
                                  }}
                                >
                                  {CLIENTPROFILE?.setNewInterview}
                                </Button>
                              )}
                            </>
                          ) : (
                            <>
                              {(role === 'super_admin' ||
                                (role !== 'super_admin' &&
                                  client_perms?.[0]?.write)) && (
                                <Button
                                  onClick={handleOpenAddOnboardModal}
                                  variant="contained"
                                  sx={{
                                    my: { xs: '20px', md: 0 },
                                    color: '#fff',
                                    background: '#029894',
                                    '&:hover': {
                                      color: '#fff',
                                      background: '#029894',
                                    },
                                  }}
                                >
                                  {CLIENTPROFILE?.addOnboard}
                                </Button>
                              )}
                            </>
                          )}
                        </>
                      ) : currentTab?.label === 'Employee invoices' ? (
                        currentTab?.nested.val === 0 ? (
                          <>
                            {(role === 'super_admin' ||
                              (role !== 'super_admin' &&
                                invoices_perms?.[0]?.write)) && (
                              <Button
                                onClick={handleOpenUploadInvoiceModal}
                                variant="contained"
                                sx={{
                                  my: { xs: '20px', md: 0 },
                                  color: '#fff',
                                  background: '#029894',
                                  '&:hover': {
                                    color: '#fff',
                                    background: '#029894',
                                  },
                                  // '@media (min-width: 280px) and (max-width: 600px)':
                                  //   {
                                  //     width: '50%',
                                  //   },
                                }}
                              >
                                {CLIENTPROFILE?.uploadVoice}
                              </Button>
                            )}
                          </>
                        ) : null
                      ) : currentTab?.label === 'Other invoices' ? (
                        currentTab?.nested.val === 0 ? (
                          <>
                            {(role === 'super_admin' ||
                              (role !== 'super_admin' &&
                                invoices_perms?.[0]?.write)) && (
                              <Button
                                onClick={handleOpenUploadOthInvoiceModal}
                                variant="contained"
                                sx={{
                                  my: { xs: '20px', md: 0 },
                                  color: '#fff',
                                  background: '#029894',
                                  '&:hover': {
                                    color: '#fff',
                                    background: '#029894',
                                  },
                                }}
                              >
                                {CLIENTPROFILE?.uploadVoice}
                              </Button>
                            )}
                          </>
                        ) : null
                      ) : null}
                    </Box>
                  </CustomTabPanel>
                ))}
              </Box>
            )}
            {renderTable({
              currentTab: currentTab.label,
              data: getCurrentTabData(),
              // data: currentTabTable.data,
              // data:
              //   currentTab.label === 'Hire & onboard' &&
              //   currentTab.nested.label === 'Hiring Request'
              //     ? []
              //     : currentTabTable.data,
              column: currentTabTable.column,
              openModal: handleOpenAddClientModal,
              isOpen: isOpen,
              handleOpen,
              handleClose,
              handleConfirmDelete: handleConfirmDeleteHiringReq,
              updateStatus: handleConfirmUpdatePayStatus,
            })}
          </Box>
        </>
      </Box>
      <HiringRequestModal
        open={isOpenHiringRequestModal}
        onClose={handleCloseHiringRequestModal}
      />
      <AddInterviewModal
        open={isOpenAddInterviewModal}
        onClose={handleCloseAddInterviewModal}
      />
      <AddOnboardModal
        open={isOpenAddOnboardModal}
        onClose={handleCloseAddOnboardModal}
      />
      <AddContractModal
        open={isOpenContractModal}
        onClose={handleCloseContractModal}
      />
      <UploadInvoiceModal
        title="Employee invoice form"
        open={isOpenUploadInvoiceModal}
        onClose={handleCloseUploadInvoiceModal}
      />
      <UploadOtherInvoiceModal
        title="Other invoice form"
        open={isOpenUploadOthInvoiceModal}
        onClose={handleCloseUploadOthInvoiceModal}
      />
      <AddEmployeeModal
        title="Employee invoice form"
        open={isOpenAddClientModal}
        onClose={handleCloseAddClientModal}
      />
    </>
  );
};
export default AddEmployee;
