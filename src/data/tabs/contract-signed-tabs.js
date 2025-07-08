import { a11yProps } from '@/src/utils/tabs';
import {
  companyContractColumn,
  contractSignedColumn,
  contractSignedEmployeeColumn,
  contractSignedEmployeeData,
  contractSignedNestClientColumn,
  contractSignedNestClientData,
  contractSignedNestEmployeeColumn,
  contractSignedNestEmployeeData,
  contractSignedOffshoreColumn,
  contractSignedOffshoreData,
  employeeContractColumn,
} from '../tables/contract-signed';

import { contractSignedData } from '../tables/hr/contract-signed';

const contractSignedTabs = [
  {
    label: 'Company contracts',
    prop: a11yProps(0),
    data: contractSignedData,
    columns: employeeContractColumn,
  },
  {
    label: 'Employee contracts',
    prop: a11yProps(1),
    data: contractSignedEmployeeData,
    columns: companyContractColumn,
  },
];

const contractHrSignedTabs = [
  {
    label: 'Company contracts',
    prop: a11yProps(0),
    nested: [
      {
        label: 'Clients',
        prop: a11yProps(0),
        data: contractSignedNestClientData,
        columns: contractSignedNestClientColumn,
      },
      {
        label: 'Employees',
        prop: a11yProps(1),
        data: contractSignedNestEmployeeData,
        columns: contractSignedNestEmployeeColumn,
      },
    ],
  },
  {
    label: 'Offshore contracts',
    prop: a11yProps(1),
    data: contractSignedOffshoreData,
    columns: contractSignedOffshoreColumn,
  },
];

const contractSignedEmployeeTabs = [
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

export { contractSignedTabs, contractHrSignedTabs, contractSignedEmployeeTabs };
