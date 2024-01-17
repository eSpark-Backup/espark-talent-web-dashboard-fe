import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  ListSubheader,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import {
  MARITAL_STATUS,
  employeeProfileData,
} from '@/src/constants/employeeProfile';
import Image from 'next/image';
import { FILTER, STATUS } from '@/src/constants/filter';
import { LEAVE_TYPE } from '@/src/constants/requestviewModal';
import dayjs from 'dayjs';
import ActionBarComponent from '../requestview/actionbarComponent';

const FilterModal = ({ open, onClose }) => {
  const [selectedValue, setSelectedValue] = useState(MARITAL_STATUS[0].label);
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const handleCloseDatePicker = () => setIsOpenDatePicker(false);
  const [isInputLabelVisible, setIsInputLabelVisible] = useState(true);
  const containsText = (text, searchText) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  const [searchText, setSearchText] = useState('');

  const displayedOptions = useMemo(
    () => LEAVE_TYPE?.filter((option) => containsText(option, searchText)),
    [searchText]
  );
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setIsInputLabelVisible(selectedValue === '');
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
      }}
    >
      <Box
        sx={{
          bgcolor: '#fff',
          width: { xs: '90%', md: '20%' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          height: { xs: '600px', md: '900px' },
          position: 'absolute',
          top: '2%',
          right: '20px',
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #E4E4E4',
            borderTopLeftRadius: '10px',
            p: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            background: '#029E9C',
          }}
        >
          <Box
            sx={{
              width: { xs: '35px', md: '50px' },
              height: { xs: '35px', md: '50px' },
            }}
            src="/images/filter/back.svg"
            component={'img'}
            onClick={onClose}
          />
          <Typography
            sx={{
              fontSize: '25px',
              fontWeight: 600,
              marginLeft: '20px',
              color: '#fff',
            }}
          >
            {FILTER?.filter}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: '20px', md: '20px' },
              width: '100%',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                {FILTER?.leaveType}
              </Typography>
              <FormControl fullWidth>
                <InputLabel
                  shrink={false}
                  disabled
                  sx={{ display: isInputLabelVisible ? 'block' : 'none' }}
                >
                  {employeeProfileData?.select}
                </InputLabel>

                <Select
                  sx={{
                    '&:focus': {
                      borderColor: 'teal',
                    },
                    width: '100%',
                    padding: '0px',
                    height: '45px',
                  }}
                  value={selectedValue}
                  onChange={handleChange}
                  IconComponent={() => (
                    <InputAdornment
                      sx={{
                        marginRight: '10px',
                      }}
                    >
                      <Image
                        src={'/images/hiring/rightarrow.png'}
                        width={25}
                        height={25}
                        alt="Dropdown"
                      />
                    </InputAdornment>
                  )}
                >
                  <ListSubheader>
                    <TextField
                      size="small"
                      placeholder="Search here...."
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Image
                              width={20}
                              height={22}
                              alt="Refresh"
                              src={`/images/filter/searchgray.svg`}
                            />
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key !== 'Escape') {
                          e.stopPropagation();
                        }
                      }}
                    />
                  </ListSubheader>
                  {displayedOptions?.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                {FILTER?.status}
              </Typography>
              <FormControl fullWidth>
                <InputLabel
                  shrink={false}
                  disabled
                  sx={{ display: isInputLabelVisible ? 'block' : 'none' }}
                >
                  {employeeProfileData?.select}
                </InputLabel>
                <Select
                  sx={{
                    '&:focus': {
                      borderColor: 'teal',
                    },
                    width: '100%',
                    padding: '0px',
                    height: '45px',
                  }}
                  value={selectedValue}
                  onChange={handleChange}
                  IconComponent={() => (
                    <InputAdornment
                      sx={{
                        marginRight: '10px',
                      }}
                    >
                      <Image
                        src={'/images/hiring/rightarrow.png'}
                        width={25}
                        height={25}
                        alt="Dropdown"
                      />
                    </InputAdornment>
                  )}
                >
                  {STATUS?.map((option, index) => (
                    <MenuItem key={index} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                {FILTER?.from}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className="custom-date-time-picker"
                  open={isOpenDatePicker}
                  slots={{
                    openPickerIcon: () => (
                      <Image
                        src={'/icons/CalendarOutline.svg'}
                        width={20}
                        height={20}
                        alt="Date"
                        onClick={() => setIsOpenDatePicker((ps) => !ps)}
                      />
                    ),
                    actionBar: () => (
                      <ActionBarComponent onClose={handleCloseDatePicker} />
                    ),
                  }}
                  sx={{ width: '100%', borderRadius: '50%' }}
                  defaultValue={dayjs('2022-04-17')}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                {FILTER?.to}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className="custom-date-time-picker"
                  open={isOpenDatePicker}
                  slots={{
                    openPickerIcon: () => (
                      <Image
                        src={'/icons/CalendarOutline.svg'}
                        width={20}
                        height={20}
                        alt="Date"
                        onClick={() => setIsOpenDatePicker((ps) => !ps)}
                      />
                    ),
                    actionBar: () => (
                      <ActionBarComponent onClose={handleCloseDatePicker} />
                    ),
                  }}
                  sx={{ width: '100%', borderRadius: '50%' }}
                  defaultValue={dayjs('2022-04-17')}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                {FILTER?.checkIn}
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  type="time"
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                ></TextField>
                <Box
                  sx={{
                    background: ' #E4E4E4',
                    width: '15%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography>-</Typography>
                </Box>
                <TextField
                  type="time"
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                ></TextField>
              </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                {FILTER?.checkOut}
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  type="time"
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                ></TextField>
                <Box
                  sx={{
                    background: '#E4E4E4',
                    width: '15%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography>-</Typography>
                </Box>
                <TextField
                  type="time"
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                ></TextField>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                //   justifyContent: 'space-between',
                paddingTop: '100px',
              }}
            >
              <Button
                sx={{
                  width: { xs: '100px', sm: '120px' },
                  height: '40px',
                  fontSize: '16px',
                  fontWeight: 600,
                  background: '#F23F3A',
                  color: '#fff',
                }}
                startIcon={
                  <Image
                    width={20}
                    height={22}
                    alt="Refresh"
                    src={`/images/filter/reset.svg`}
                    style={{ color: '#fff' }}
                  />
                }
              >
                {FILTER?.Reset}
              </Button>
              <Button
                variant="primary"
                sx={{
                  width: { xs: '100px', sm: '120px' },
                  height: '40px',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
                startIcon={
                  <Image
                    width={20}
                    height={22}
                    alt="Refresh"
                    src={`/images/filter/search.svg`}
                  />
                }
              >
                {FILTER?.search}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default FilterModal;
