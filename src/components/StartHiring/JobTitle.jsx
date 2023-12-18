import React, { useState } from 'react';
import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { GENDER_OPTION, HIRING_FORM_DATA } from '@/app/constants/Hiring';
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
   const [selectedJobTitle, setSelectedJobTitle] = useState(null);
  const [subOptions, setSubOptions] = useState([]);

  const handleJobTitleChange = (event, newValue) => {
    setSelectedJobTitle(newValue);
    const selectedJob = jobTitles.find((job) => job.label === newValue);
    setSubOptions(selectedJob ? selectedJob.subOptions : []);
  };

  const handleSubOptionChange = (event) => {
    const newSubOption = event.target.value;
    setSelectedSubOption(newSubOption);
  };
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
        <Autocomplete
      value={selectedJobTitle}
      onChange={handleJobTitleChange}
      options={jobTitles.map((job) => job.label)}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField {...params} label="Job Title" variant="outlined" fullWidth />
      )}
      renderOption={(props, option, state) => (
        <li {...props}>{option}</li>
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <li key={index} {...getTagProps({ index })}>
            {option}
          </li>
        ))
      }
      isOptionEqualToValue={(option, value) => option === value}
      renderGroup={(params) => [
        <li {...params}>
          <strong>{params.key}</strong>
        </li>,
      ]}
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
