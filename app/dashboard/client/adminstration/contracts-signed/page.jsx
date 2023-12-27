'use client';
import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Modal, Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Input from '@/src/components/dashboard/input';
import AppTable from '@/src/components/dashboard/appTable';
import { employeeTableDataHiringRequest } from '@/src/constants/data/employee';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterDataByKeyword } from '@/src/utils/search';
import { a11yProps, changeTab } from '@/src/utils/tabs';
import { empTabs } from '@/src/constants/data/empTabs';
import TopNavNavbar from '@/src/components/global/topNavbar';
import Image from 'next/image';
import AppSearchableDropdown from '@/src/components/dashboard/appSearchableDropdown';
import {
  contractSignedColumn,
  contractSignedData,
} from '@/src/constants/data/contractSigned';

const ContractSigned = () => {
  const [value, setValue] = useState(0);
  const [currentTab, setCurrentTab] = useState('Hiring Request');
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [empData, setEmpData] = useState(employeeTableDataHiringRequest);
  const [isOpenViewDetails, setIsOpenViewDetails] = useState(false);
  const [isOpenAddMemberModal, setIsOpenAddMemberModal] = useState(false);
  // Searchable States
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const listItems = [
    'Arman Khan',
    'Bilal Ahmed Khan',
    'Areeba Shakeel',
    'Saad Zafar',
    'Muhammad Ali',
    'Sohaib-Xtreme',
    'Faizan-ur-Rehman',
    'Faisal Hanif',
    'Faraz Shah',
    'Abdul Rehman',
    'Abdul Mannan',
    'Hassan',
    'Muzammil',
    'Nauman',
    'Abdullah Zaidi',
  ];

  const fetchDataFake = async () => {
    return true;
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await fetchDataFake();
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  const handleChange = (event, newValue) => {
    changeTab({
      isSingular: true,
      tabs: empTabs,
      event,
      newValue,
      setSearch,
      setCurrentTab,
      setValue,
      setData: setEmpData,
    });
  };

  useEffect(() => {
    const data = empTabs[value].data;
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(data, search || '', setEmpData);
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, value]);

  const handleViewDetails = () => {
    setIsOpenViewDetails((ps) => !ps);
  };
  const handleClickRenderMessageButton = () => {
    setIsOpenAddMemberModal(true);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
  };
  const handleClose = () => setIsOpenAddMemberModal(false);

  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
            width: '100%',
          }}
        >
          <Box
            marginBottom={4}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box display={'flex'} flexDirection={'column'}>
              <Typography variant="h3">Contract signed</Typography>
              <Box display={'flex'} flexDirection={'column'} marginY={'20px'}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    letterSpacing: '0em',
                    textAlign: 'left',
                  }}
                  variant="caption"
                >
                  Visualise team details & manage members
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {[{ label: 'Active contracts', prop: a11yProps(0) }]?.map(
                  ({ label, prop }, i) => (
                    <Tab key={i} label={`${label}`} {...prop} />
                  )
                )}
              </Tabs>
            </Box>
            <Box my={4}>
              <Input
                setIsLoading={setIsLoading}
                handleChange={setSearch}
                value={search}
                prefixIcon="SearchIcon.svg"
                suffixIcon="QuestionMarkIcon.svg"
              />
            </Box>
            {empTabs?.map((_, i) => (
              <CustomTabPanel value={value} key={i} index={i}>
                {isLoading ? (
                  <Box>Loading...</Box>
                ) : (
                  <AppTable
                    currentTab={currentTab}
                    column={contractSignedColumn}
                    testData={empData}
                    data={contractSignedData}
                    handleClick={handleViewDetails}
                    handleClickRenderMessageButton={
                      handleClickRenderMessageButton
                    }
                  />
                )}
              </CustomTabPanel>
            ))}
          </Box>
        </Box>
      </Grid>
      {isOpenViewDetails && (
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            backgroundColor: '#fff',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1200,
          }}
        >
          <TopNavNavbar />
          <Box sx={{ margin: '50px' }}>
            <Box
              mb={'30px'}
              onClick={handleViewDetails}
              sx={{
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              display="flex"
              alignItems={'center'}
            >
              <Image
                src={'/icons/Back.svg'}
                width={10}
                height={10}
                alt="Back"
              />
              <Typography
                ml={'15px'}
                fontSize="14px"
                textAlign={'center'}
                variant="caption"
              >
                Back to team management.
              </Typography>
            </Box>
            <Typography mb={'30px'} textAlign={'center'} variant="h3">
              Team Arman Khan
            </Typography>
            <Typography mb={'30px'} textAlign={'center'}>
              All team members are assigned to Arman Khan
            </Typography>
            <AppTable
              currentTab={currentTab}
              column={contractSignedColumn}
              handleClick={handleViewDetails}
              renderMessage="You haven't added any members yet"
              renderMessageButton="Add members"
              handleClickRenderMessageButton={handleClickRenderMessageButton}
            />
          </Box>
        </Box>
      )}
      <Modal
        open={isOpenAddMemberModal}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} className="modal-wrapper">
          <Box
            sx={{
              borderBottom: 'solid 1px #ccc',
            }}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            p={'20px 30px'}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '19px',
                letterSpacing: '0em',
                textAlign: 'left',
              }}
            >
              Add team member(s) to Team Arman Khan
            </Typography>
            <Image
              onClick={handleClose}
              src={'/icons/CloseIcon.svg'}
              width={30}
              height={30}
              alt="Close"
            />
          </Box>
          <Box
            p={'20px 30px 40px 30px'}
            sx={{ borderBottom: 'solid 1px #ccc' }}
          >
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '17px',
                letterSpacing: '0em',
                textAlign: 'left',
                marginBottom: '20px',
              }}
            >
              Search for a name or email
            </Typography>
            <AppSearchableDropdown
              setIsLoadingList={setIsLoadingEmployee}
              isLoadingList={isLoadingEmployee}
              selectedItem={selectedEmployee}
              data={listItems}
              setSelectedItem={setSelectedEmployee}
            />
          </Box>
          <Box
            p={'20px 30px'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-end'}
          >
            <Button
              onClick={handleClose}
              sx={{ marginRight: '15px' }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button onClick={handleClose} variant="contained">
              Start hiring
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default ContractSigned;
