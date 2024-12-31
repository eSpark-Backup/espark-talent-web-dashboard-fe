import dayjs from 'dayjs';

export const createWFHRequestForm = [
  {
    title: 'Start date',
    placeholder: 'Enter Date',
    name: 'startDate',
    suffixIcon: 'CalendarOutline',
    type: 'date',
    required: true,
    minDate: dayjs().subtract(1, 'week'),
  },
  {
    title: 'End date',
    placeholder: 'Enter Date',
    name: 'endDate',
    suffixIcon: 'CalendarOutline',
    type: 'date',
    required: true,
    minDate: dayjs().subtract(8, 'days'),
  },
  {
    title: 'Count',
    placeholder: '1',
    name: 'count',
    disabled: true,
    type: 'static',
  },
  {
    title: 'Reason',
    placeholder: 'Enter reason',
    name: 'reason',
    type: 'text-area',
    required: true,
  },
];
