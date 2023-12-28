import React, { useState } from 'react';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LeaveCalendarIcon from './leaveCalenderIcon';
import ActionBarComponent from './actionbarComponent';

const LeaveDatePicker = ({ label }) => {
  // const minDate = dayjs().year(2023).month(0).date(1);
  // const maxDate = dayjs().year(2023).month(11).date(31);
  const [open, setOpen] = useState(false);
  const [currentView, setCurretView] = useState('day');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCurrentView = (view) => {
    setCurretView(view);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label || ''}
        sx={{ width: '600px' }}
        openTo="month"
        views={['year', 'month', 'day']}
        open={open}
        onClose={handleClose}
        onViewChange={handleCurrentView}
        slots={{
          openPickerIcon: () => <LeaveCalendarIcon open={handleOpen} />,
          actionBar: () =>
            currentView === 'day' ? (
              <ActionBarComponent onClose={handleClose} />
            ) : null,
        }}
        // minDate={minDate}
        // maxDate={maxDate}
      />
    </LocalizationProvider>
  );
};
export default LeaveDatePicker;
