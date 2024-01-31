import { a11yProps } from '@/src/utils/tabs';
import {
  contractSignedColumn,
  contractSignedData,
  contractSignedEmployeeColumn,
  contractSignedEmployeeData,
} from '../tables/contractSigned';

export const contractSignedTabs = [
  {
    label: 'Company contracts',
    prop: a11yProps(0),
    data: contractSignedData,
    columns: contractSignedColumn,
  },
  {
    label: 'Employee contracts',
    prop: a11yProps(1),
    data: contractSignedEmployeeData,
    columns: contractSignedEmployeeColumn,
  },
];

export const contractSignedEmployeeTabs = [
  {
    label: 'Company contracts',
    prop: a11yProps(0),
    data: contractSignedEmployeeData,
    columns: contractSignedEmployeeColumn,
  },
  {
    label: 'Client contracts',
    prop: a11yProps(1),
    data: contractSignedData,
    columns: contractSignedColumn,
  },
];
