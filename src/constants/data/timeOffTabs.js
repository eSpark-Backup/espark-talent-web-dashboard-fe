import { a11yProps } from '@/src/utils/tabs';
import { teamMembersColumn, teamMembersData } from './teamMembers';

export const requestsStatusTab = [
  {
    label: 'All',
    prop: a11yProps(0),
    data: teamMembersData,
    column: teamMembersColumn,
    background:"#CDECF3",
    color:'#006C9C'
  },
  {
    label: 'Pending',
    prop: a11yProps(1),
    data: teamMembersData,
    column: teamMembersColumn,
    background:"#F6E9D0",
    color:'#CB8822'
  },
  {
    label: 'Completed',
    prop: a11yProps(2),
    data: teamMembersData,
    column: teamMembersColumn,
    background:"#D6EDE4",
    color:'#068987'
  },
  {
    label: 'Rejected',
    prop: a11yProps(3),
    data: teamMembersData,
    column: teamMembersColumn,
    background:"#FFD6D6",
    color:'#A72A45'
  },
];


export const requestsTab = [
  {
    label: 'Leave Requests',
    prop: a11yProps(0),
    data: teamMembersData,
    column: teamMembersColumn,
  },
  {
    label: 'Leave Balance',
    prop: a11yProps(1),
    data: teamMembersData,
    column: teamMembersColumn,
  },
  {
    label: 'Clockin/out Requests',
    prop: a11yProps(2),
    data: teamMembersData,
    column: teamMembersColumn,
  },
];
