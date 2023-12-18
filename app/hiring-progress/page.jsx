'use client';
import React from 'react';
import { Grid, Box, Typography, Button, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Input from '@/src/components/dashboard/input';
import AppTable from '@/src/components/dashboard/appTable';
import { employeeTableColumn, employeeTableDataInterviewSchedule, employeeTableDataHiringRequest, employeeTableDataOnBoarding } from '@/src/constants/data/employee';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulating asynchronous data fetching
      resolve([1, 2, 3, 4, 5]);
    }, 1000); // Resolve after 5 seconds
  });
};

const getFilteredData = (data, filterBy) => {
  if (!filterBy) return data
  else {
    const tempData = [...data].filter(({ status }) => status === filterBy)
    return tempData
  }
}
const Dashboard = () => {
  const [value, setValue] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [data, setData] = React.useState(null);
  const [empData, setEmpData] = React.useState(employeeTableDataHiringRequest);
 

  React.useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  const tabs = [
    {
      label: 'Hiring Request',
      prop: a11yProps(0),
      data: employeeTableDataHiringRequest
    },
    {
      label: 'Interview Schedule',
      prop: a11yProps(1),
      data: employeeTableDataInterviewSchedule
    },
    {
      label: 'Onboarding',
      prop: a11yProps(2),
      data: employeeTableDataOnBoarding
    },
  ]

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setEmpData(tabs[newValue].data)
  };

  function filterData(data, keyword) {
    const tempData = data.filter(employee => {
        const lowerKeyword = keyword.toLowerCase();
        return Object.values(employee).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(lowerKeyword)
        );
    });
    setEmpData(tempData)
}

React.useEffect(() => {
  const data = tabs[value].data
  const timeoutId = setTimeout(() => {
    filterData(data, search || "")
    setIsLoading(false)
  }, 500); 
  return () => {
    clearTimeout(timeoutId);
  };
},[search])


  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '60px',
            gap: '20px',
            width: '100%',
          }}
        >
          <div>
            <Box marginY={5} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              <Typography variant='h3'>
                Hire a team member
              </Typography>
              <Button style={{
                background: "#029894"
              }} variant="contained">Contained</Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  {
                    tabs?.map(({ label, prop }, i) => (
                      <Tab label={label} {...prop} />
                    ))
                  }
                </Tabs>
              </Box>
              <Input setIsLoading={setIsLoading} handleChange={setSearch} value={search} prefixIcon="SearchIcon.svg" suffixIcon="QuestionMarkIcon.svg" />
              {
                tabs?.map(({ data }, i) => (
                  <CustomTabPanel value={value} index={i}>
                    {isLoading ? (
                      <div>Loading...</div>
                    ) : <AppTable column={employeeTableColumn}
                      data={empData} />
                    }

                  </CustomTabPanel>
                ))
              }
            </Box>
          </div>
        </Box >
      </Grid >
    </>
  );
};
export default Dashboard;
