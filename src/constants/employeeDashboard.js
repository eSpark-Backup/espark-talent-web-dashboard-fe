export const Attendance_Summary_Title = 'Attendance Summary';
export const Leave_Summary_Title = 'Leave Summary';
export const Clock_Title = 'Clock';
export const Clock_Dial = '/images/dashboard/clock-dial.svg';
export const Summary_Slider_Breakpoints = {
  300: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  500: {
    slidesPerView: 1.5,
    spaceBetween: 20,
  },
  650: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  800: {
    slidesPerView: 2.5,
    spaceBetween: 20,
  },
  900: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  1000: {
    slidesPerView: 3.5,
    spaceBetween: 20,
  },
  // When window width is >= 480px
  1100: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  // When window width is >= 640px
  1200: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  // When window width is >= 768px
  1350: {
    slidesPerView: 3.5,
    spaceBetween: 20,
  },
  1550: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  1920: {
    slidesPerView: 4.5,
    spaceBetween: 20,
  },
};
export const Summary_Boxes = [
  {
    title: 'Shifts',
    count: `08`,
    horizotalLineColor: '#068987',
    backgroundColor: '#E6F4F4',
  },
  {
    title: 'Expected minutes',
    count: `08`,
    horizotalLineColor: '#7A0916',
    backgroundColor: '#F5ECED',
  },
  {
    title: 'Worked minutes',
    count: `08`,
    horizotalLineColor: '#FFBE3B',
    backgroundColor: '#FFF8EB',
  },
  {
    title: 'Short minutes',
    count: `08`,
    horizotalLineColor: '#006C9C',
    backgroundColor: '#E0F6FA',
  },
  {
    title: 'Leaves',
    count: `08`,
    horizotalLineColor: '#006C9C',
    backgroundColor: '#E0F6FA',
  },
  {
    title: 'Travels',
    count: `08`,
    horizotalLineColor: '#7A0916',
    backgroundColor: '#F5ECED',
  },

  {
    title: 'Absents',
    count: `08`,
    horizotalLineColor: '#FFBE3B',
    backgroundColor: '#FFF8EB',
  },
  {
    title: 'Presents',
    count: `08`,
    horizotalLineColor: '#7A0916',
    backgroundColor: '#F5ECED',
  },
  {
    title: 'Missings',
    count: `08`,
    horizotalLineColor: '#068987',
    backgroundColor: '#E6F4F4',
  },
  {
    title: 'Days Off',
    count: `08`,
    horizotalLineColor: '#7A0916',
    backgroundColor: '#F5ECED',
  },
  {
    title: 'Rest days',
    count: `08`,
    horizotalLineColor: '#FFBE3B',
    backgroundColor: '#FFF8EB',
  },
  {
    title: 'Rexations',
    count: `08`,
    horizotalLineColor: '#006C9C',
    backgroundColor: '#E0F6FA',
  },
  {
    title: 'Early left',
    count: `08`,
    horizotalLineColor: '#068987',
    backgroundColor: '#E6F4F4',
  },
  {
    title: 'Over time',
    count: `08`,
    horizotalLineColor: '#006C9C',
    backgroundColor: '#E0F6FA',
  },
  {
    title: 'Break minutes',
    count: `08`,
    horizotalLineColor: '#7A0916',
    backgroundColor: '#F5ECED',
  },
  {
    title: 'Late arrival',
    count: `08`,
    horizotalLineColor: '#FFBE3B',
    backgroundColor: '#FFF8EB',
  },
  {
    title: 'Short duration',
    count: 15,
    horizotalLineColor: '#006C9C',
    backgroundColor: '#E0F6FA',
  },
];

export const Leave_Summary_Boxes = [
  {
    title: 'Casual Leaves',
    subtitle: '(LRT-00001)',
    leaveType: [
      { title: 'Total:', quantity: 12, circleColor: '' },
      { title: 'Availed:', quantity: 0, circleColor: '#F16E61' },
      { title: 'Pending:', quantity: 0, circleColor: '#F4B844' },
      { title: 'Available:', quantity: 0, circleColor: '#136E91' },
    ],
  },
  {
    title: 'Sick Leaves',
    subtitle: '(LRT-00002)',
    leaveType: [
      { title: 'Total:', quantity: 8, circleColor: '' },
      { title: 'Availed:', quantity: 0, circleColor: '#F16E61' },
      { title: 'Pending:', quantity: 0, circleColor: '#F4B844' },
      { title: 'Available:', quantity: 0, circleColor: '#136E91' },
    ],
  },
  {
    title: 'Annual Leave',
    subtitle: '(LRT-00006)',
    leaveType: [
      { title: 'Total:', quantity: 20, circleColor: '' },
      { title: 'Availed:', quantity: 0, circleColor: '#F16E61' },
      { title: 'Pending:', quantity: 0, circleColor: '#F4B844' },
      { title: 'Available:', quantity: 0, circleColor: '#136E91' },
    ],
  },
  {
    title: 'Unpaid Leaves',
    subtitle: '(LRT-00007)',
    leaveType: [
      { title: 'Total:', quantity: 365, circleColor: '' },
      { title: 'Availed:', quantity: 0, circleColor: '#F16E61' },
      { title: 'Pending:', quantity: 0, circleColor: '#F4B844' },
      { title: 'Available:', quantity: 0, circleColor: '#136E91' },
    ],
  },
  {
    title: 'Paternity Leaves',
    subtitle: '(LRT-00004)',
    leaveType: [
      { title: 'Total:', quantity: 7, circleColor: '' },
      { title: 'Availed:', quantity: 0, circleColor: '#F16E61' },
      { title: 'Pending:', quantity: 0, circleColor: '#F4B844' },
      { title: 'Available:', quantity: 0, circleColor: '#136E91' },
    ],
  },
  {
    title: 'Hajj Leaves',
    subtitle: '(LRT-00005)',
    leaveType: [
      { title: 'Total:', quantity: 20, circleColor: '' },
      { title: 'Availed:', quantity: 0, circleColor: '#F16E61' },
      { title: 'Pending:', quantity: 0, circleColor: '#F4B844' },
      { title: 'Available:', quantity: 0, circleColor: '#136E91' },
    ],
  },
];
