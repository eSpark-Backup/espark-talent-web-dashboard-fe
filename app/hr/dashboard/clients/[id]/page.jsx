'use client';
import React, { useEffect, useState } from 'react';
import { Typography, Tabs, Tab, Button } from '@mui/material';
import { Box } from '@mui/system';
import Breadcrumb from '@/src/components/form/step/Breadcrumb';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { renderTable } from './renderComponents';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { useParams, usePathname, useRouter } from 'next/navigation';
import HiringRequestModal from './HiringRequestModal';
import AddContractModal from './AddContractModal';
import UploadInvoiceModal from './UploadInvoiceModal';
import AddEmployeeModal from './AddEmployeeModal';
import AddInterviewModal from './AddInterviewModal';
import AddOnboardModal from './AddOnboardModal';

import { useSearchParams } from 'next/navigation';
import { CLIENTPROFILE } from '@/src/constants/ClientProfile';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import {
  DOWNLOAD_EMP_INV,
  DOWNLOAD_OTH_INV,
  HR_CLIENT_EMPLOYEES,
  HR_CLIENT_EMPLOYEE_INVOICE,
  HR_CLIENT_EMP_HIRING_REQUEST,
  HR_CLIENT_EMP_INTERVIEW_SCHEDULE,
  HR_CLIENT_EMP_ON_BOARDING,
  HR_CLIENT_OTHER_INVOICE,
  HR_GET_CLIENT_PROFILE,
  DOWNLOAD_CLIENT_JOB_DESCRIPTION,
} from '@/src/services/apiService/apiEndPoints';
import {
  deleteEmpInv,
  deleteHiringRequest,
  getClientHiringRequest,
  deleteInterSchedule,
  deleteOnBoarding,
  deleteOthInv,
  getClientEmpInvoicePaid,
  getClientEmpInvoicePending,
  getClientEmpInvoiceProcessing,
  getClientInterviewSchedule,
  getClientOnboarding,
  getClientOthInvoicePaid,
  getClientOthInvoicePending,
  getClientOthInvoiceProcessing,
  getCurrentClientData,
  getCurrentClientDataFailed,
  getCurrentClientDataSuccess,
  removeActiveClientAndData,
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
import dayjs from 'dayjs';
import { genderType } from '@/src/utils/genderType';
import { clientProfileTabsHandler } from '@/src/utils/clientProfileTabHandler';
import { getTimeSheetDataFailed } from '@/src/redux/slices/employeeSlices/timeSheetSlice';
import { formatSalary } from '@/src/utils/salaryFormat';

const AddEmployee = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { hireAndOnBoard, employeeInvoices, otherInvoices } = useSelector(
    (state) => state?.hr?.clients?.currentClientData
  );
  const { email } = useSelector((state) => state?.hr?.clients?.currentClient);
  const { client_perms, invoices_perms } = useSelector(
    (state) => state?.hr?.home?.homeData
  );
  const { role } = useSelector((state) => state?.auth?.userData);
  const router = useRouter();
  const pathname = usePathname();

  const { isLoading, isFetching } = useQuery({
    staleTime: 100000,
    // refetchOnWindowFocus: false,
    queryKey: ['hr-client-info-query'],
    queryFn: () => {
      dispatch(getCurrentClientData());
      return api
        .getData(`${HR_GET_CLIENT_PROFILE}?id=${params.id}`)
        .then(({ data }) => {
          dispatch(getCurrentClientDataSuccess(data));
          return data;
        })
        .catch((err) => {
          dispatch(getCurrentClientDataFailed());
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const ClientHiringReqQuery = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-client-hiring-req-query', email],
    enabled: !!email,
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_EMP_HIRING_REQUEST}?id=${params?.id}`)
        .then(({ data }) => {
          const tempData =
            data !== ''
              ? data?.map((item) => {
                  // const symbol = item?.salary_currency?.split(' ')[0];

                  return {
                    ...item,
                    salary_range: `${formatSalary(item?.salary_range?.minimum, '')} - ${formatSalary(item.salary_range?.maximum, item?.salary_currency)}`,
                    currency: item?.salary_range?.currency || '',
                    gender: genderType(item?.gender),
                    hiring_start_date: dayjs(item?.hiring_start_date)?.format(
                      'DD-MMMM-YYYY'
                    ),
                    hiring_end_date: dayjs(item?.hiring_end_date)?.format(
                      'DD-MMMM-YYYY'
                    ),
                    action: ['Delete'],
                    jobDescription: 'Download',
                    comments: `${(item.comments = item?.comments?.length > 20 ? item?.comments?.substring(0, 20) + '…' : item?.comments)}`,
                  };
                })
              : [];
          dispatch(getClientHiringRequest(tempData));
          return tempData;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const ClientInterviewSchedule = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-interview-schedule-req-query', email],
    enabled: !!email,
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_EMP_INTERVIEW_SCHEDULE}?id=${params.id}`)
        .then(({ data }) => {
          const tempData =
            data !== ''
              ? [...data]?.map((item) => ({
                  ...item,
                  action: ['Delete'],
                  interview_date_time: dayjs(item?.interview_date_time).format(
                    'DD-MMMM-YYYY hh:mm A'
                  ),
                  gender: genderType(item?.gender),
                }))
              : [];

          dispatch(getClientInterviewSchedule(tempData || []));
          return tempData;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const ClientOnBoarding = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-client-on-board-req-query', email],
    enabled: !!email,
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_EMP_ON_BOARDING}?id=${params.id}`)
        .then(({ data }) => {
          const tempData =
            data !== ''
              ? [...data]?.map((item) => {
                  // const symbol = item?.salary_currency?.split(' ')[0];

                  return {
                    ...item,
                    salary: `${formatSalary(item?.salary, item?.salary_currency || '')}`,
                    salary_currency: item?.salary_currency || '',
                    joining_date: dayjs(item?.joining_date).format(
                      'DD-MMMM-YYYY'
                    ),
                    notice_period:
                      item?.notice_period > 0
                        ? `${item?.notice_period} ${item?.notice_period === 1 ? 'day' : 'days'}`
                        : '-',
                    dropdownStatus: true,
                    gender: genderType(item?.gender),
                    action: ['Delete'],
                  };
                })
              : [];
          dispatch(getClientOnboarding(tempData || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const ClientEmployeesAll = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-clients-employees-all', email],
    enabled: !!email,
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_EMPLOYEES}?c_email=${email}&tab=all`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const ClientEmployeesActive = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-clients-employees-active', email],
    enabled: !!email,
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_EMPLOYEES}?c_email=${email}&tab=active`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const ClientEmployeesTerminated = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-clients-employees-terminated', email],
    enabled: !!email,
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_EMPLOYEES}?c_email=${email}&tab=terminated`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const EmployeeInvoicesPending = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-clients-employees-invoices-pending', email],
    enabled: !!email,
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_EMPLOYEE_INVOICE}?client_id=${email}&tab=pending`)
        .then(({ data }) => {
          const tempData = data?.length
            ? data?.map((item) => ({
                ...item,
                dropdownStatus: true,
                invoice_amount: formatSalary(
                  item?.invoice_amount,
                  item?.currency || ''
                ),
                due_date: dayjs(item.due_date).format('DD-MMMM-YYYY'),
                invoice_date: dayjs(item.invoice_date).format('DD-MMMM-YYYY'),
                action: ['Delete'],
                actionStatus: true,
                download: 'Download',
                payment_status: getCamelCapitalized(item.payment_status),
              }))
            : [];
          dispatch(getClientEmpInvoicePending(tempData || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const EmployeeInvoicesProcessing = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-clients-employees-invoices-processing', email],
    enabled: !!email,
    queryFn: () => {
      return api
        .getData(
          `${HR_CLIENT_EMPLOYEE_INVOICE}?client_id=${email}&tab=processing`
        )
        .then(({ data }) => {
          const tempData = data?.length
            ? data?.map((item) => ({
                ...item,
                dropdownStatus: true,
                invoice_amount: formatSalary(
                  item?.invoice_amount,
                  item?.currency || ''
                ),
                due_date: dayjs(item.due_date).format('DD-MMMM-YYYY'),
                invoice_date: dayjs(item.invoice_date).format('DD-MMMM-YYYY'),
                action: ['Delete'],
                actionStatus: true,
                download: 'Download',
                payment_status: getCamelCapitalized(item.payment_status),
              }))
            : [];
          dispatch(getClientEmpInvoiceProcessing(tempData || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const EmployeeInvoicesPaid = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-clients-employees-invoices-paid', email],
    enabled: !!email,
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_EMPLOYEE_INVOICE}?client_id=${email}&tab=paid`)
        .then(({ data }) => {
          const tempData = data?.length
            ? data?.map((item) => ({
                ...item,
                dropdownStatus: true,
                invoice_amount: formatSalary(
                  item?.invoice_amount,
                  item?.currency || ''
                ),
                due_date: dayjs(item.due_date).format('DD-MMMM-YYYY'),
                invoice_date: dayjs(item.invoice_date).format('DD-MMMM-YYYY'),
                action: ['Delete'],
                actionStatus: true,
                download: 'Download',
                payment_status: getCamelCapitalized(item.payment_status),
              }))
            : [];
          dispatch(getClientEmpInvoicePaid(tempData || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const OtherInvoicesPending = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-clients-other-invoices-pending', email],
    enabled: !!email,
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_OTHER_INVOICE}?client_id=${email}&tab=pending`)
        .then(({ data }) => {
          const tempData =
            data?.length &&
            data?.map((item) => ({
              ...item,
              dropdownStatus: true,
              invoice_amount: formatSalary(
                item?.invoice_amount,
                item?.currency || ''
              ),
              due_date: dayjs(item.due_date).format('DD-MMMM-YYYY'),
              invoice_date: dayjs(item.invoice_date).format('DD-MMMM-YYYY'),
              action: ['Delete'],
              actionStatus: true,
              download: 'Download',
              payment_status: getCamelCapitalized(item.payment_status),
            }));
          dispatch(getClientOthInvoicePending(tempData || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const OtherInvoicesProcessing = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-clients-other-invoices-processing', email],
    enabled: !!email,
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_OTHER_INVOICE}?client_id=${email}&tab=processing`)
        .then(({ data }) => {
          const tempData =
            data?.length &&
            data?.map((item) => ({
              ...item,
              dropdownStatus: true,
              invoice_amount: formatSalary(
                item?.invoice_amount,
                item?.currency || ''
              ),
              due_date: dayjs(item.due_date).format('DD-MMMM-YYYY'),
              invoice_date: dayjs(item.invoice_date).format('DD-MMMM-YYYY'),
              action: ['Delete'],
              actionStatus: true,
              download: 'Download',
              payment_status: getCamelCapitalized(item.payment_status),
            }));
          dispatch(getClientOthInvoiceProcessing(tempData || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const OtherInvoicesPaid = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-clients-other-invoices-paid', email],
    enabled: !!email,
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_OTHER_INVOICE}?client_id=${email}&tab=paid`)
        .then(({ data }) => {
          const tempData =
            data?.length &&
            data?.map((item) => ({
              ...item,
              dropdownStatus: true,
              invoice_amount: formatSalary(
                item?.invoice_amount,
                item?.currency || ''
              ),
              due_date: dayjs(item.due_date).format('DD-MMMM-YYYY'),
              invoice_date: dayjs(item.invoice_date).format('DD-MMMM-YYYY'),
              action: ['Delete'],
              actionStatus: true,
              download: 'Download',
              payment_status: getCamelCapitalized(item.payment_status),
            }));
          dispatch(getClientOthInvoicePaid(tempData || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  function ClientProcessColumns(column) {
    const action =
      role === 'super_admin' ||
      (role !== 'super_admin' && client_perms?.[0]?.delete);
    const download =
      role === 'super_admin' ||
      (role !== 'super_admin' && client_perms?.[0]?.download);
    const payment_status =
      role === 'super_admin' ||
      (role !== 'super_admin' && client_perms?.[0]?.write);

    return column?.filter(
      (item) =>
        (action || item.name !== 'action') &&
        (download || item.name !== 'job_description') &&
        (payment_status || item.name !== 'payment_status')
    );
  }

  function InvoiceProcessColumns(column) {
    const action =
      role === 'super_admin' ||
      (role !== 'super_admin' && invoices_perms?.[0]?.delete);
    const download =
      role === 'super_admin' ||
      (role !== 'super_admin' && invoices_perms?.[0]?.download);
    const payment_status =
      role === 'super_admin' ||
      (role !== 'super_admin' && invoices_perms?.[0]?.write);

    return column?.filter(
      (item) =>
        (action || item.name !== 'action') &&
        (download || item.name !== 'download') &&
        (payment_status || item.name !== 'payment_status')
    );
  }

  useEffect(() => {
    ClientHiringReqQuery?.refetch();
    ClientInterviewSchedule?.refetch();
    ClientOnBoarding?.refetch();
    EmployeeInvoicesPending?.refetch();
    EmployeeInvoicesProcessing?.refetch();
    EmployeeInvoicesPaid?.refetch();
    OtherInvoicesPending?.refetch();
    OtherInvoicesProcessing?.refetch();
    OtherInvoicesPaid.refetch();
  }, []);

  const searchParams = useSearchParams();

  const search = searchParams?.get('param');

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
          column: ClientProcessColumns(hiringRequestColumn),
        },
        {
          prop: a11yProps(1),
          label: 'Interview schedule',
          data: hireAndOnBoard.interviewSchedule,
          column: ClientProcessColumns(interviewScheduleColumn),
        },
        {
          prop: a11yProps(2),
          label: 'Onboarding',
          data: hireAndOnBoard.onBoarding,
          column: ClientProcessColumns(onboardingColumn),
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
          column: InvoiceProcessColumns(invoicePaymentColumn),
        },
        {
          prop: a11yProps(1),
          label: 'Processing',
          data: employeeInvoices?.processing,
          column: InvoiceProcessColumns(invoicePaymentColumn),
        },
        {
          prop: a11yProps(2),
          label: 'Paid',
          data: employeeInvoices?.paid,
          column: InvoiceProcessColumns(invoicePaymentColumn),
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
          column: InvoiceProcessColumns(otherPaymentColumn),
        },
        {
          prop: a11yProps(1),
          label: 'Processing',
          data: otherInvoices?.processing,
          column: InvoiceProcessColumns(otherPaymentColumn),
        },
        {
          prop: a11yProps(2),
          label: 'Paid',
          data: otherInvoices?.paid,
          column: InvoiceProcessColumns(otherPaymentColumn),
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

  useEffect(() => {
    if (search === 'hiring_request') {
      clientProfileTabsHandler(
        clientProfileTabs,
        clientProfileTabs[0]?.label,
        clientProfileTabs[0]?.nestedTabs[0]?.label,
        setCurrentTab,
        hireAndOnBoard.hiringRequest,
        ClientProcessColumns,
        hiringRequestColumn,
        setCurrentTabTable,
        0,
        0
      );
    } else if (search === 'employee_invoices_processing') {
      clientProfileTabsHandler(
        clientProfileTabs,
        clientProfileTabs[2]?.label,
        clientProfileTabs[2]?.nestedTabs[1]?.label,
        setCurrentTab,
        employeeInvoices?.pending,
        InvoiceProcessColumns,
        invoicePaymentColumn,
        setCurrentTabTable,
        2,
        1
      );
    } else if (search === 'employee_invoices_paid') {
      clientProfileTabsHandler(
        clientProfileTabs,
        clientProfileTabs[2]?.label,
        clientProfileTabs[2]?.nestedTabs[2]?.label,
        setCurrentTab,
        employeeInvoices?.pending,
        InvoiceProcessColumns,
        invoicePaymentColumn,
        setCurrentTabTable,
        2,
        2
      );
    } else if (search === 'other_invoices_processing') {
      clientProfileTabsHandler(
        clientProfileTabs,
        clientProfileTabs[3]?.label,
        clientProfileTabs[3]?.nestedTabs[1]?.label,
        setCurrentTab,
        otherInvoices?.pending,
        InvoiceProcessColumns,
        otherPaymentColumn,
        setCurrentTabTable,
        3,
        1
      );
    } else if (search === 'other_invoices_paid') {
      clientProfileTabsHandler(
        clientProfileTabs,
        clientProfileTabs[3]?.label,
        clientProfileTabs[3]?.nestedTabs[2]?.label,
        setCurrentTab,
        otherInvoices?.pending,
        InvoiceProcessColumns,
        otherPaymentColumn,
        setCurrentTabTable,
        3,
        2
      );
    }
  }, []);

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
      });
    }
    if (search !== '') {
      const params = new URLSearchParams(searchParams?.toString());
      params?.delete('param');
      router?.replace(`${pathname}?${params?.toString()}`);
    }
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
    if (current?.column?.length) {
      setCurrentTabTable({
        data: current?.data || [],
        column: current?.column,
      });
    } else if (rest?.column?.length) {
      setCurrentTabTable({
        data: rest?.data || [],
        column: rest?.column,
      });
    }
    if (search !== '') {
      const params = new URLSearchParams(searchParams?.toString());
      params?.delete('param');
      router?.replace(`${pathname}?${params?.toString()}`);
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
    setDeleteRowID(id);
    if (currentTab?.label !== 'Hire & onboard') {
      setDeleteInvType(row?.payment_status.toLowerCase());
    }
    setIsOpen(true);
  };
  const deleteStartHiringMutation = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_CLIENT_EMP_HIRING_REQUEST}?id=${id}`);
    },
    onSuccess: ({ data }) => {
      dispatch(deleteHiringRequest(deleteRowID));
      Toast('success', data?.message || 'Deleted successfully');
      setDeleteRowID(null);
      handleClose();
    },
    onError: (err) => {
      Toast('error', err?.response?.data?.message || 'Failed to delete');
      handleClose();
    },
  });
  const deleteInterviewMutation = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_CLIENT_EMP_INTERVIEW_SCHEDULE}?id=${id}`);
    },
    onSuccess: ({ data }) => {
      dispatch(deleteInterSchedule(deleteRowID));
      Toast('success', data?.message || 'Deleted successfully');
      setDeleteRowID(null);
      handleClose();
    },
    onError: (err) => {
      Toast('error', err?.response?.data?.message || 'Failed to delete');
      handleClose();
    },
  });
  const deleteOnBoardingMutation = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_CLIENT_EMP_ON_BOARDING}?id=${id}`);
    },
    onSuccess: ({ data }) => {
      dispatch(deleteOnBoarding(deleteRowID));
      Toast('success', data?.message || 'Deleted successfully');
      setDeleteRowID(null);
      handleClose();
    },
    onError: (err) => {
      Toast('error', err?.response?.data?.message || 'Failed to delete data');
      handleClose();
    },
  });
  const deleteEmpInvMutation = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_CLIENT_EMPLOYEE_INVOICE}?id=${id}`);
    },
    onSuccess: ({ data }) => {
      dispatch(deleteEmpInv({ type: deleteInvType, id: deleteRowID }));
      Toast('success', data?.message || 'Deleted successfully');
      setDeleteRowID(null);
      setDeleteInvType(null);
      handleClose();
    },
    onError: (err) => {
      Toast('error', err?.response?.data?.message || 'Failed to delete');
      handleClose();
    },
  });
  const deleteOthInvMutation = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_CLIENT_OTHER_INVOICE}?id=${id}`);
    },
    onSuccess: ({ data }) => {
      dispatch(deleteOthInv({ type: deleteInvType, id: deleteRowID }));
      Toast('success', data?.message || 'Deleted successfully');
      setDeleteRowID(null);
      setDeleteInvType(null);
      handleClose();
    },
    onError: (err) => {
      Toast('error', err?.response?.data?.message || 'Failed to delete');
      handleClose();
    },
  });
  const updateEmpInvMutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      for (const key in data.data) {
        formData?.append(key, data.data[key]);
      }
      return api.updateData(`${data?.url}?id=${data?.id}`, formData);
    },
    onSuccess: ({ data }) => {
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
      Toast('success', data?.message || 'Updated successfully');
      setDeleteRowID(null);
      setUpdateStatusType({
        currentInvData: null,
        newVal: null,
        currentVal: null,
      });
      handleClose();
    },
    onError: (err) => {
      Toast('error', err?.response?.data?.message || 'Failed to update');
      handleClose();
    },
  });
  const handleConfirmDeleteHiringReq = () => {
    if (currentTab?.label === 'Hire & onboard') {
      if (currentTab?.nested.val === 0) {
        deleteStartHiringMutation.mutate(deleteRowID);
      } else if (currentTab?.nested.val === 1) {
        deleteInterviewMutation.mutate(deleteRowID);
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
  // const symbolSalary = (item) => item?.salary_range?.currency?.split(' ')[0] || null;
  const getCurrentTabData = () => {
    if (currentTab?.label === 'Hire & onboard') {
      if (currentTab?.nested.val === 0) {
        return (
          hireAndOnBoard?.hiringRequest?.map((item) => {
            // salaryRange = JSON.parse(item?.salary_range);
            // const symbol = item?.salary_currency?.split(' ')[0];
            return {
              ...item,
              // salary_range:`${salaryRange.minimum} ${salaryRange.currency} - ${salaryRange.maximum} ${salaryRange.currency}`,
              // salary_currency: salaryRange?.currency || '',
              // salary_range: `${item?.salary_range?.minimum}${hasSymbol(symbol) ? ' ' + symbol : ' '} - ${item?.salary_range?.maximum}${hasSymbol(symbol) ? ' ' + symbol : ''}`,
              // currency: item?.salary_range?.currency || '',
              gender: genderType(item?.gender),
              hiring_start_date: dayjs(item?.hiring_start_date)?.format(
                'DD-MMMM-YYYY'
              ),
              hiring_end_date: dayjs(item?.hiring_end_date)?.format(
                'DD-MMMM-YYYY'
              ),
              jobDescription: 'Download',
              notice_period:
                item?.notice_period > 0
                  ? `${item?.notice_period} ${item?.notice_period === 1 ? 'day' : 'days'}`
                  : '-',
              comments:
                item?.comments && item.comments.length > 20
                  ? item.comments.substring(0, 20) + '…'
                  : item.comments,
            };
          }) || []
        );
      } else if (currentTab?.nested.val === 1) {
        return (
          hireAndOnBoard?.interviewSchedule?.map((item) => ({
            ...item,
            interview_date_time: dayjs(item?.interview_date_time).format(
              'DD-MMMM-YYYY hh:mm A'
            ),
          })) || []
        );
      } else {
        return (
          hireAndOnBoard?.onBoarding?.map((item) => ({
            ...item,
            joining_date: dayjs(item?.joining_date).format('DD-MMMM-YYYY'),
          })) || []
        );
      }
    } else if (currentTab?.label === 'Employee invoices') {
      if (currentTab?.nested.val === 0) {
        return (
          employeeInvoices?.pending?.map((item) => ({
            ...item,
            invoice_date: dayjs(item.invoice_date).format('DD-MMMM-YYYY'),
            due_date: dayjs(item.join_date).format('DD-MMMM-YYYY'),
          })) || []
        );
      } else if (currentTab?.nested.val === 1) {
        return (
          employeeInvoices?.processing?.map((item) => ({
            ...item,
            invoice_date: dayjs(item.invoice_date).format('DD-MMMM-YYYY'),
            due_date: dayjs(item.join_date).format('DD-MMMM-YYYY'),
          })) || []
        );
      } else {
        return (
          employeeInvoices?.paid?.map((item) => ({
            ...item,
            invoice_date: dayjs(item.invoice_date).format('DD-MMMM-YYYY'),
            due_date: dayjs(item.join_date).format('DD-MMMM-YYYY'),
          })) || []
        );
      }
    } else {
      if (currentTab?.nested.val === 0) {
        return (
          otherInvoices?.pending?.map((item) => ({
            ...item,
            invoice_date: dayjs(item.invoice_date).format('DD-MMMM-YYYY'),
            due_date: dayjs(item.join_date).format('DD-MMMM-YYYY'),
          })) || []
        );
      } else if (currentTab?.nested.val === 1) {
        return (
          otherInvoices?.processing?.map((item) => ({
            ...item,
            invoice_date: dayjs(item.invoice_date).format('DD-MMMM-YYYY'),
            due_date: dayjs(item.join_date).format('DD-MMMM-YYYY'),
          })) || []
        );
      } else {
        return (
          otherInvoices?.paid?.map((item) => ({
            ...item,
            invoice_date: dayjs(item.invoice_date).format('DD-MMMM-YYYY'),
            due_date: dayjs(item.join_date).format('DD-MMMM-YYYY'),
          })) || []
        );
      }
    }
  };
  const handleDispatch = () => {
    dispatch(removeActiveClientAndData());
  };
  const resolveURL = (id) => {
    let url;
    if (currentTab.val === 0) {
      url = `${DOWNLOAD_CLIENT_JOB_DESCRIPTION}?id=${id}`;
    } else if (currentTab.val === 2) {
      url = `${DOWNLOAD_EMP_INV}?id=${id}`;
    } else {
      url = `${DOWNLOAD_OTH_INV}?id=${id}`;
    }
    return url;
  };
  const downloadInvoiceMutation = useMutation({
    mutationFn: async (id) => {
      return api.downloadFile(resolveURL(id));
    },
    onSuccess: ({ data }) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      Toast('success', 'File downloaded');
    },
    onError: (err) => {
      Toast('error', err.message || 'File not downloaded');
    },
  });
  const downloadJSMutation = useMutation({
    mutationFn: async (id) => {
      return api.downloadFile(resolveURL(id));
    },
    onSuccess: ({ data }) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'job_description.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      Toast('success', 'File downloaded');
    },
    onError: (err) => {
      dispatch(getTimeSheetDataFailed());
      Toast('error', err.message || 'File not downloaded');
    },
  });
  const downloadInvoice = (id) => {
    downloadInvoiceMutation.mutate(id);
  };
  const downloadJD = (id) => {
    downloadJSMutation.mutate(id);
  };
  const downlaodfile = (id) => {
    if (currentTab.val === 0) {
      return downloadJD(id);
    } else {
      return downloadInvoice(id);
    }
  };

  return (
    <>
      {isFetching ||
      ClientHiringReqQuery?.isFetching ||
      ClientInterviewSchedule?.isFetching ||
      ClientOnBoarding?.isFetching ||
      EmployeeInvoicesPending?.isFetching ||
      EmployeeInvoicesProcessing?.isFetching ||
      EmployeeInvoicesPaid?.isFetching ||
      OtherInvoicesPending?.isFetching ||
      OtherInvoicesProcessing?.isFetching ||
      OtherInvoicesPaid?.isFetching ? (
        <ProfileEditSkeleton isClient={true} />
      ) : (
        <Box>
          <Breadcrumb
            dispatchFunction={handleDispatch}
            root="clients"
            title="Clients /"
            currentPage="Profile"
          />
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
            {isLoading ||
            ClientHiringReqQuery?.isLoading ||
            ClientInterviewSchedule?.isLoading ||
            ClientOnBoarding?.isLoading ||
            EmployeeInvoicesPending?.isLoading ||
            EmployeeInvoicesProcessing?.isLoading ||
            EmployeeInvoicesPaid?.isLoading ||
            OtherInvoicesPending?.isLoading ||
            OtherInvoicesProcessing?.isLoading ||
            OtherInvoicesPaid?.isLoading ? (
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
                  TabIndicatorProps={{ style: { backgroundColor: '#068987' } }}
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
                        '&.Mui-selected': {
                          color: '#068987',
                        },
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
                      value={currentTab?.val}
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
                          value={currentTab?.nested?.val}
                          onChange={(ev, newVal) =>
                            handleChangeNestedTab(ev, newVal, nestedTabs, rest)
                          }
                          sx={{
                            width: { xs: '100%', md: '80%' },
                            borderBottom: { xs: 1, md: 0 },
                            borderColor: { xs: 'divider', md: 'transparent' },
                          }}
                          aria-label="basic tabs example"
                          TabIndicatorProps={{
                            style: { backgroundColor: '#068987' },
                          }}
                        >
                          {nestedTabs?.map(({ label, prop }, nestedIndex) => (
                            <Tab
                              key={nestedIndex}
                              label={`${label}`}
                              {...prop}
                              disableRipple={true}
                              sx={{
                                marginRight: '30px',
                                color: '#595959',
                                '&.Mui-selected': {
                                  color: '#068987',
                                },
                              }}
                            />
                          ))}
                        </Tabs>
                        {currentTab?.label === 'Hire & onboard' ? (
                          <>
                            {currentTab?.nested?.val === 0 ? (
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
                            ) : currentTab?.nested?.val === 1 ? (
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
                                  disabled={
                                    !ClientEmployeesAll.data ||
                                    ClientEmployeesAll.data.length === 0
                                  }
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
                isLoading:
                  isLoading ||
                  ClientHiringReqQuery.isLoading ||
                  ClientInterviewSchedule.isLoading ||
                  ClientOnBoarding.isLoading ||
                  EmployeeInvoicesPending.isLoading ||
                  EmployeeInvoicesProcessing.isLoading ||
                  EmployeeInvoicesPaid.isLoading ||
                  OtherInvoicesPending.isLoading ||
                  OtherInvoicesProcessing.isLoading ||
                  OtherInvoicesPaid.isLoading,
                currentTab: currentTab?.label,
                data: getCurrentTabData(),
                column: currentTabTable?.column,
                openModal: handleOpenAddClientModal,
                isOpen: isOpen,
                handleOpen,
                handleClose,
                minWidth: '1300px',
                handleClickActionDelete: handleOpen,
                handleConfirmDelete: handleConfirmDeleteHiringReq,
                updateStatus: handleConfirmUpdatePayStatus,
                isPending:
                  deleteStartHiringMutation.isPending ||
                  deleteInterviewMutation.isPending ||
                  deleteOnBoardingMutation.isPending ||
                  deleteEmpInvMutation.isPending ||
                  deleteOthInvMutation.isPending,
                handleClickDownload: downlaodfile,
              })}
            </Box>
          </>
        </Box>
      )}

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
        title="Employee Employee form"
        open={isOpenAddClientModal}
        onClose={handleCloseAddClientModal}
      />
    </>
  );
};
export default AddEmployee;
