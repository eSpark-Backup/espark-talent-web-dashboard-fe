import { a11yProps } from "@/src/utils/tabs";
import { employeeTableDataHiringRequest, employeeTableDataInterviewSchedule, employeeTableDataOnBoarding, employeeTableHiringRequestColumn, employeeTableInterviewScheduleColumn, employeeTableOnboardingColumn } from "../../tables/employee";
import { contractSignedColumn, contractSignedData } from "../../tables/contractSigned";
import { invoicePaymentColumn, invoicePaymentData, otherPaymentColumn, otherPaymentData } from "../../tables/paymentData";

export const clientProfileTabs = [
    {
        label: 'Hire & onboard',
        hasNestedTabs: true,
        prop: a11yProps(0),
        nestedTabs: [
            {
                prop: a11yProps(0),
                label: 'Hiring request',
                data:employeeTableDataHiringRequest,
                column:employeeTableHiringRequestColumn
            },
            {
                prop: a11yProps(1),
                label: 'Interview schedule',
                data:employeeTableDataInterviewSchedule,
                column:employeeTableInterviewScheduleColumn
            },
            {
                prop: a11yProps(2),
                label: 'Onboarding',
                data:employeeTableDataOnBoarding,
                column:employeeTableOnboardingColumn
            },
        ],
        isTable:true,
    },
    {
        label: 'Employees',
        hasNestedTabs: false,
        prop: a11yProps(1),
        nestedTabs: [
            {
                prop: a11yProps(0),
                label: 'All',
            },
            {
                prop: a11yProps(1),
                label: 'Active employees',
            },
            {
                prop: a11yProps(2),
                label: 'Terminated employees',
            },
        ],
        isTable:false,
    },
    {
        label: 'Contract signed',
        hasNestedTabs: true,
        prop: a11yProps(2),
        nestedTabs: [
            {
                prop: a11yProps(0),
                label: 'Company contract',
                data:contractSignedData,
                column:contractSignedColumn
            },
            {
                prop: a11yProps(1),
                label: 'Employee contract',
                data:contractSignedData,
                column:contractSignedColumn
            },
        ],
        isTable:true,
    },
    {
        label: 'Employee invoices',
        hasNestedTabs: true,
        prop: a11yProps(3),
        nestedTabs: [
            {
                prop: a11yProps(0),
                label: 'Pending',
            },
            {
                prop: a11yProps(1),
                label: 'Processing',
            },
            {
                prop: a11yProps(2),
                label: 'Paid',
            },
        ],
        isTable:true,
        data:invoicePaymentData,
        column:invoicePaymentColumn
    },
    {
        label: 'Other invoices',
        hasNestedTabs: true,
        prop: a11yProps(4),
        nestedTabs: [
            {
                prop: a11yProps(0),
                label: 'Pending',
            },
            {
                prop: a11yProps(1),
                label: 'Processing',
            },
            {
                prop: a11yProps(2),
                label: 'Paid',
            },
        ],
        isTable:true,
        data:otherPaymentData,
        column:otherPaymentColumn
    },
]