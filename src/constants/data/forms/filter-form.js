export const filterStatusForm = [
  {
    title: 'Status',
    placeholder: 'Select',
    name: 'status',
    type: 'select',
    options: [
      {
        label: 'Present',
      },
      {
        label: 'Absent',
      },
      {
        label: 'Missing',
      },
      {
        label: 'Day',
      },
      {
        label: 'Leave',
      },
      {
        label: 'Short Duration',
      },
    ],
    searchable: true,
  },
  {
    title: 'From',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'from',
  },
  {
    title: 'To',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'to',
  },
  {
    title: 'CheckIn Time',
    type: 'timerow',
    name: 'checkIn',
    fieldsName: [
      {
        placeholder: '--:-- --',
        name: 'checkinTime1',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
      {
        placeholder: '--:-- --',
        name: 'checkinTime2',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
    ],
  },
  {
    title: 'CheckOut Time',
    type: 'timerow',
    name: 'checkOut',
    fieldsName: [
      {
        placeholder: '--:-- --',
        name: 'checkoutTime1',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
      {
        placeholder: '--:-- --',
        name: 'checkoutTime2',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
    ],
  },
];

export const filterAttendanceForm = [
  {
    title: 'Attendance Status',
    placeholder: 'Select',
    name: 'status',
    type: 'select',
    options: [
      {
        label: 'Present',
      },
      {
        label: 'Absent',
      },
      {
        label: 'Missing',
      },
      {
        label: 'Day',
      },
      {
        label: 'Leave',
      },
      {
        label: 'Short Duration',
      },
    ],
    searchable: true,
  },
  {
    title: 'From',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'from',
  },
  {
    title: 'To',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'to',
  },

  {
    title: 'CheckIn Time',
    type: 'timerow',
    name: 'checkIn',
    fieldsName: [
      {
        placeholder: '--:-- --',
        name: 'checkinTime1',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
      {
        placeholder: '--:-- --',
        name: 'checkinTime2',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
    ],
  },
  {
    title: 'CheckOut Time',
    type: 'timerow',
    name: 'checkOut',
    fieldsName: [
      {
        placeholder: '--:-- --',
        name: 'checkoutTime1',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
      {
        placeholder: '--:-- --',
        name: 'checkoutTime2',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
    ],
  },
];

export const filterLeaveForm = [
  {
    title: ' Leave Type',
    placeholder: 'Select',
    name: 'leavestatus',
    type: 'select',
    options: [
      {
        label: 'Casual Leave',
      },
      {
        label: 'Sick Leave',
      },
      {
        label: 'Annual Leave',
      },
      {
        label: 'Paid Leave',
      },
      {
        label: 'Unpaid Leave',
      },
      {
        label: 'Hajj Leave',
      },
    ],
    searchable: true,
  },
  {
    title: ' Status',
    placeholder: 'Select',
    name: 'status',
    type: 'select',
    options: [
      {
        label: 'Pending',
      },
      {
        label: 'Completed',
      },
      {
        label: 'Rejected',
      },
      {
        label: 'Cancelled',
      },
    ],
    searchable: true,
  },
  {
    title: 'From',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'from',
  },
  {
    title: 'To',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'to',
  },
  {
    title: 'CheckIn Time',
    type: 'timerow',
    name: 'checkIn',
    fieldsName: [
      {
        placeholder: '--:-- --',
        name: 'checkinTime1',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
      {
        placeholder: '--:-- --',
        name: 'checkinTime2',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
    ],
  },
  {
    title: 'CheckOut Time',
    type: 'timerow',
    name: 'checkOut',
    fieldsName: [
      {
        placeholder: '--:-- --',
        name: 'checkoutTime1',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
      {
        placeholder: '--:-- --',
        name: 'checkoutTime2',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
    ],
  },
];
