import React, { useEffect, useState } from 'react';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LeaveCalendarIcon from './leaveCalenderIcon';
import ActionBarComponent from './actionbarComponent';
import PreviousDateModal from './PreviousDateModal';
import dayjs from 'dayjs';

const LeaveDatePicker = ({ label, view }) => {
  const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(true);

  const [currentView, setCurretView] = useState('day');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenModal=()=>setOpenModal(true)
  const [selectedDate, setSelectedDate] = useState(null)
    const handleDateChange = (date) => {
    setSelectedDate(date);
  
      if (date.isBefore(dayjs(),'day')) {
        console.log('Selected date is before the current date');
        handleOpenModal();
    }
  };
  const handleCurrentView = (view) => {
    setCurretView(view);
  };
  useEffect(() => {
    if (!open) {
      setOpenModal(false);
    }
  }, [open]);
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label || ''}
        sx={{ width: '600px' }}
        openTo="month"
        views={['year', 'month', 'day']}
        open={open}
        disabled={view}
        value={selectedDate}
        onChange={handleDateChange}
        onClose={handleClose}
        onViewChange={handleCurrentView}
        slots={{
          openPickerIcon: () => <LeaveCalendarIcon open={handleOpen} />,
          actionBar: () =>
            currentView === 'day' ? (
              <ActionBarComponent onClose={handleClose} />
            ) : null,
        }}
       
      />
      {/* <PreviousDateModal/> */}
    </LocalizationProvider>
      {openModal && <PreviousDateModal />} 
      </>
  );
};
export default LeaveDatePicker;
