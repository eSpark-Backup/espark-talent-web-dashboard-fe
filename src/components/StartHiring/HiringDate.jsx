import React from 'react';
import { Box } from '@mui/material';

import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import DatePickerBox from './DatePicker';

const HiringDate = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-around',
          paddingTop: '25px',
          '@media (min-width: 960px) and (max-width: 1200px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <DatePickerBox
            label={HIRING_FORM_DATA.selectStartDate}
            dateKey="startDate"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <DatePickerBox
            label={HIRING_FORM_DATA.selectEndDate}
            dateKey="endDate"
          />
        </Box>
      </Box>
    </Box>
  );
};
// return (
//   <>
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: { xs: 'column', md: 'row' },
//         justifyContent: 'space-around',
//         paddingTop: '25px',
//         '@media (min-width: 960px) and (max-width: 1200px)': {
//           flexDirection: 'column',
//         },
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap:"15px"
//         }}
//       >
//         <Typography>{HIRING_FORM_DATA.startDate}</Typography>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>

//           <DatePicker
//             slots={{
//               openPickerIcon: CalendarIcon,
//             }}
//             label={HIRING_FORM_DATA.selectStartDate}
//             sx={{
//               width: { xs: '100%', md: '300px' },
//               '@media (min-width: 960px) and (max-width: 1200px)': {
//                 width: '100%',
//               },
//               '& .MuiInputLabel-root': {
//         color: '#888888',
//       },
//             }}
//             />

//         </LocalizationProvider>
//       </Box>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//             gap:"15px"
//         }}
//       >
//         <Typography>{HIRING_FORM_DATA.endDate}</Typography>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DatePicker
//             slots={{
//               openPickerIcon: CalendarIcon,
//             }}
//             label={HIRING_FORM_DATA.selectEndDate}
//             sx={{
//               width: { xs: '100%', md: '300px' },
//               '@media (min-width: 960px) and (max-width: 1200px)': {
//                 width: '100%',
//               },
//               '& .MuiInputLabel-root': {
//         color: '#888888', // Replace with your desired color
//       },
//             }}
//           />
//         </LocalizationProvider>
//       </Box>
//     </Box>
//   </>
// );

export default HiringDate;
