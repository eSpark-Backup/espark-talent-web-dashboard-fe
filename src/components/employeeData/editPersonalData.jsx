import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';

import { EDIT_MODAL, MARITAL_STATUS } from '@/src/constants/employeeProfile';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import JobTitle from '../StartHiring/JobTitle';
import CalendarIcon from '../StartHiring/CalenderIcon';
import { GENDER_OPTION } from '@/src/constants/Hiring';

const EditPersonalModal = ({ onClose, handleEditProfileModal }) => {
  const [selectedValue, setSelectedValue] = useState(MARITAL_STATUS[0].label);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const SelectOpen = () => {
    setOpen(true);
  };
  const SelectClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const showRoleType = false;
  console.log(open);
  return (
    <Modal
      open={handleEditProfileModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          bgcolor: '#fff',
          width: { xs: '90%', sm: '90%', md: '55%' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          height: { xs: '900px', md: '715px' },
          position: 'absolute',
          top: '10%',
          maxHeight: '80%',
          overflow: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: 'transparent transparent',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #E4E4E4',
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              fontSize: '25px',
              fontWeight: 600,
              marginLeft: '20px',
            }}
          >
            {EDIT_MODAL?.editPersonalDetails}
          </Typography>

          <Box
            sx={{
              width: { xs: '35px', md: '25px' },
              height: { xs: '35px', md: '25px' },
            }}
            src="/images/leave-request/close.svg"
            component={'img'}
            onClick={onClose}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '95%',
              padding: '15px',
              marginLeft: { xs: '0px', md: '70px' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                padding: '20px',
                gap: '100px',
                flexDirection: { xs: 'column', md: 'row' },
                '@media (min-width: 280px) and (max-width: 450px)': {
                  flexDirection: 'column',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '30px',
                  width: { xs: '100%', md: '100%' },
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                    {EDIT_MODAL?.employeeName}
                  </Typography>
                  <TextField
                    sx={{ width: '82%' }}
                    inputProps={{
                      style: {
                        height: '10px',
                      },
                    }}
                    placeholder={EDIT_MODAL?.namePlaceholder}
                  />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                    {EDIT_MODAL?.birthDate}
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      className="date-picker-component"
                      sty
                      slots={{
                        openPickerIcon: CalendarIcon,
                      }}
                      placeholder="DD/MM/YYYY"
                      slotProps={{ textField: { size: 'small ' } }}
                      sx={{
                        width: '82%',
                      }}
                    />
                  </LocalizationProvider>
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                    {EDIT_MODAL?.email}
                  </Typography>
                  <TextField
                    sx={{
                      width: '82%',
                    }}
                    inputProps={{
                      style: {
                        height: '10px',
                      },
                    }}
                    placeholder={EDIT_MODAL?.emailPlaceholder}
                  />
                </Box>
                <JobTitle
                  title={'Job title'}
                  gap={'0px'}
                  showRoleType={showRoleType}
                />
                <Box sx={{ width: '100%', marginTop: '-40px' }}>
                  <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                    {EDIT_MODAL?.maritalStatus}
                  </Typography>

                  <Select
                    sx={{
                      '&:focus': {
                        borderColor: 'teal',
                      },
                      width: '82%',
                      padding: '0px',
                      height: '45px',
                    }}
                    value={selectedValue}
                    onChange={(event) => setSelectedValue(event.target.value)}
                    IconComponent={() => (
                      <InputAdornment
                        sx={{
                          marginRight: '10px',
                        }}
                      >
                        <Image
                          src={
                            isOpen
                              ? '/images/hiring/icon-down.svg'
                              : '/images/hiring/rightarrow.png'
                          }
                          width={25}
                          height={25}
                          alt="Dropdown"
                          onClick={handleClick}
                        />
                      </InputAdornment>
                    )}
                    onOpen={SelectOpen}
                    onClose={SelectClose}
                  >
                    {MARITAL_STATUS?.map((option) => (
                      <MenuItem key={option?.value} value={option?.label}>
                        {option?.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'column' },
                  gap: '30px',
                  width: { xs: '100%', md: '100%' },
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                    {EDIT_MODAL?.employeeId}
                  </Typography>
                  <TextField
                    sx={{ width: '82%' }}
                    inputProps={{
                      style: {
                        height: '10px',
                      },
                    }}
                    placeholder={EDIT_MODAL?.id}
                  />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                    {EDIT_MODAL?.gender}
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select
                    </InputLabel>
                    <Select
                      sx={{
                        '&:focus': {
                          borderColor: 'teal',
                        },
                        width: '82%',
                        padding: '0px',
                        height: '45px',
                      }}
                      placeholder="Select"
                      IconComponent={() => (
                        <InputAdornment
                          sx={{
                            marginRight: '10px',
                          }}
                        >
                          <Image
                            src={
                              isOpen
                                ? '/images/hiring/icon-down.svg'
                                : '/images/hiring/rightarrow.png'
                            }
                            width={25}
                            height={25}
                            alt="Dropdown"
                            onClick={handleClick}
                          />
                        </InputAdornment>
                      )}
                      onOpen={SelectOpen}
                      onClose={SelectClose}
                    >
                      {GENDER_OPTION?.map((option) => (
                        <MenuItem key={option?.value} value={option?.label}>
                          {option?.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ width: '100%' }}>
                  <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                    {EDIT_MODAL?.team}
                  </Typography>
                  <TextField
                    sx={{ width: '82%' }}
                    inputProps={{
                      style: {
                        height: '10px',
                      },
                    }}
                    placeholder={EDIT_MODAL?.emailPlaceholder}
                  />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                    {EDIT_MODAL?.joiningDate}
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      className="date-picker-component"
                      slots={{
                        openPickerIcon: CalendarIcon,
                      }}
                      slotProps={{ textField: { size: '30px ' } }}
                      placeholder="DD/MM/YYYY"
                      sx={{
                        width: '82%',
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>
            </Box>
            <Button
              variant="primary"
              sx={{
                width: { xs: '100px', sm: '120px' },
                height: '40px',
                fontSize: '16px',
                fontWeight: 600,
                marginLeft: '20px',
                marginBottom: '15px',
              }}
            >
              {EDIT_MODAL?.save}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default EditPersonalModal;
