import dayjs from 'dayjs';

export const createLeaveRequestForm = [
  {
    title: 'Leave type',
    placeholder: 'Select leave type',
    name: 'leaveType',
    type: 'select',
    options: [
      {
        label: 'Sick leave',
      },
      {
        label: 'Casual leave',
      },
      {
        label: 'Annual leave',
      },
    ],
    required: true,
  },
  {
    title: 'Start date',
    placeholder: 'Enter Date',
    name: 'startDate',
    suffixIcon: 'CalendarOutline',
    type: 'date',
    required: true,
    minDate: dayjs().subtract(1, 'day'),
  },
  {
    title: 'End date',
    placeholder: 'Enter Date',
    name: 'endDate',
    suffixIcon: 'CalendarOutline',
    type: 'date',
    required: true,
    minDate: dayjs().subtract(1, 'day'),
  },
  {
    title: 'Count',
    placeholder: '1',
    name: 'count',
    disabled: true,
    type: 'static',
  },
  {
    title: 'Available leaves',
    placeholder: '0',
    name: 'availableLeaves',
    disabled: true,
    type: 'static',
  },
  {
    title: 'Attachment',
    placeholder: 'Upload Document',
    name: 'attachment',
    type: 'file',
    suffixIcon: '',
  },
  {
    title: 'Reason',
    placeholder: 'Enter reason',
    name: 'reason',
    type: 'text-area',
    required: true,
  },
];
