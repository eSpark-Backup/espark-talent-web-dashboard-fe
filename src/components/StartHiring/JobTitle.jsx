import React, { useState } from 'react';
import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import RoleType from './RoleType';

export const jobTitles = [
    {
        label: 'Frontend Developer',
        options: ['Angular Js Developer', 'React Js Developer', 'Vue Js Developer', 'Javascript Developer', 'NextJS Developer'],
    },
    {
        label: 'Back-End',
        options: ['UI Designer', 'UX Designer', 'Graphic Designer'],
    },
    {
        label: 'Manager',
        options: ['Project Manager', 'Team Lead', 'Product Manager'],
    },
];
const JobTitle = () => {


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
          >
                      <Typography>{HIRING_FORM_DATA.jobTitle}</Typography>

           <Autocomplete
          sx={{ width: '100%' }}
          options={jobTitles}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              sx={{ width: '250px' }}
              {...params}
              label={HIRING_FORM_DATA.selectJob}
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Box>
     <RoleType/>
    </Box>
  );
};
export default JobTitle;
// import React, { useState } from 'react';
// import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// const JobTitle = () => {
//   const [age, setAge] = useState('');

//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };

//   return (
//     <FormControl fullWidth>
//       <InputLabel id="demo-simple-select-label">Age</InputLabel>
//       <Select
//         labelId="demo-simple-select-label"
//         id="demo-simple-select"
//         value={age}
//         label="Age"
//         onChange={handleChange}
//       >
//         <MenuItem value={10}>Ten</MenuItem>
//         <MenuItem value={20}>Twenty</MenuItem>
//         <MenuItem value={30}>Thirty</MenuItem>
//         {/* Nested MenuItems */}
//         <MenuItem value={40}>
//           Forty
//           <MenuItem value={41}>Nested 1</MenuItem>
//           <MenuItem value={42}>Nested 2</MenuItem>
//         </MenuItem>
//       </Select>
//     </FormControl>
//   );
// };

// export default JobTitle;
