import React from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import CalendarIcon from "../StartHiring/CalenderIcon";


const DatePicker = () => {
    return (
         <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    className="date-picker-component"
                    sty
                    slots={{
                      openPickerIcon: CalendarIcon,
                    }}
                    placeholder="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        size: 'small',
                        style: {
                          height: '28px',
                          width: '82%',
                        },
                      },
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        height: '28px',
                        width: '82%',
                      },
                      
                    }}
                  />
                </LocalizationProvider>
    )
}
export default DatePicker;