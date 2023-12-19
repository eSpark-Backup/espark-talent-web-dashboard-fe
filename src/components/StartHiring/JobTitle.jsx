import React, { useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
// import {
//   Dropdown,
//   DropdownMenuItem,
//   DropdownNestedMenuItem,
// } from './dropdown/Dropdown';

import { HIRING_FORM_DATA, JOBTITLE } from '@/src/constants/Hiring';
import RoleType from './RoleType';

const JobTitle = ({ open, SelectOpen, SelectClose }) => {

  const handleSubOptionChange = (event) => {
    const newSubOption = event.target.value;
    setSelectedSubOption(newSubOption);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-around',
        paddingTop: '15px',
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
        <Typography>{HIRING_FORM_DATA.jobTitle}</Typography>
        {/* <Dropdown
          trigger={
            <TextField
              placeholder={HIRING_FORM_DATA.selectJob}
              required={true}
              variant="outlined"
              fullWidth
              sx={{
                width: { xs: '100%', md: '300px' },
                '@media (min-width: 960px) and (max-width: 1200px)': {
                  width: '100%',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    sx={{
                      marginRight: '10px',
                    }}
                  >
                    {open ? (
                      <img src="/images/hiring/icon-down.svg" alt="ArrowDown" />
                    ) : (
                      <img
                        src="/images/hiring/rightarrow.png"
                        alt="ArrowRight"
                      />
                    )}
                  </InputAdornment>
                ),
              }}
              onFocus={SelectOpen}
              onBlur={SelectClose}
            />
          }
          menu={[
            <DropdownNestedMenuItem
              label="Frond-End Developer"
              rightIcon={
                <Image
                  src="/images/hiring/icon-right.svg"
                  width={20}
                  height={20}
                  alt="rightarrow"
                />
              }
              menu={[
                <DropdownMenuItem
                  onClick={() => {
                    console.log('clicked');
                  }}
                >
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    {' '}
                    Angular JS Developer
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    React JS Developer
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.md`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    Vue JS Developer
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.html`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    Javascript Developer
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.html`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    NextJS Developer
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.html`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
              ]}
            />,
            <DropdownNestedMenuItem
              label="Back-End Developer"
              rightIcon={
                <Image
                  src="/images/hiring/icon-right.svg"
                  width={20}
                  height={20}
                  alt="rightarrow"
                />
              }
              menu={[
                <DropdownMenuItem
                  onClick={() => {
                    console.log('clicked');
                  }}
                >
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    {' '}
                    ASP.NET Developer
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    PHP Developer
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.md`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    Java Developer
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.html`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    Python Developer
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.html`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    NodeJS Developer
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.html`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    ExpressJS Developer
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.html`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
              ]}
            />,
            <DropdownNestedMenuItem
              label="Mobile App Developer"
              rightIcon={
                <Image
                  src="/images/hiring/icon-right.svg"
                  width={20}
                  height={20}
                  alt="rightarrow"
                />
              }
              menu={[
                <DropdownMenuItem
                  onClick={() => {
                    console.log('clicked');
                  }}
                >
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    {' '}
                    iOS Developer
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    Andriod Developer
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.md`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    Flutter Developer
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.html`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    React Native Developer
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.html`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
              ]}
            />,
            <DropdownNestedMenuItem
              label="Embedded Developer"
              rightIcon={
                <Image
                  src="/images/hiring/icon-right.svg"
                  width={20}
                  height={20}
                  alt="rightarrow"
                />
              }
              menu={[
                <DropdownMenuItem
                  onClick={() => {
                    console.log('clicked');
                  }}
                >
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    {' '}
                    Fireware Developer
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    PCB Designer
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.md`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    Emebedded System Engineer
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.html`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
              ]}
            />,
            <DropdownNestedMenuItem
              label="Ecommerce Developer"
              rightIcon={
                <Image
                  src="/images/hiring/icon-right.svg"
                  width={20}
                  height={20}
                  alt="rightarrow"
                />
              }
              menu={[
                <DropdownMenuItem
                  onClick={() => {
                    console.log('clicked');
                  }}
                >
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    {' '}
                    WordPress Developer
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    Shopify Developer
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.md`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
              ]}
            />,
            <DropdownNestedMenuItem
              label="Digital Marketer"
              rightIcon={
                <Image
                  src="/images/hiring/icon-right.svg"
                  width={20}
                  height={20}
                  alt="rightarrow"
                />
              }
              menu={[
                <DropdownMenuItem
                  onClick={() => {
                    console.log('clicked');
                  }}
                >
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    {' '}
                    Social Media Expert
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    PPC Specialist
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.md`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    SEO Expert
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.md`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    Performance Marketer
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.md`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
              ]}
            />,
            <DropdownNestedMenuItem
              label="Sale Development Representative"
              rightIcon={
                <Image
                  src="/images/hiring/icon-right.svg"
                  width={20}
                  height={20}
                  alt="rightarrow"
                />
              }
              menu={[
                <DropdownMenuItem
                  onClick={() => {
                    console.log('clicked');
                  }}
                >
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    {' '}
                    Lead Generation Specialist
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    PPC Specialist
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.md`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem>
                  <Button
                    component="label"
                    sx={{
                      color: '#000',
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                    variant="text"
                  >
                    Sales Representative
                    <input
                      id="mdInput"
                      type="file"
                      accept={`.md`}
                      hidden
                      onChange={(e) => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
              ]}
            />,
          ]}
        /> */}
         <FormControl>
      <InputLabel  sx={{ color: '#888888' }}>{HIRING_FORM_DATA.selectRole}</InputLabel>
        <Select
            label={HIRING_FORM_DATA.selectJob}
          sx={{
            height: '50px',
            width: { xs: '100%', md: '300px' },
            '@media (min-width: 960px) and (max-width: 1200px)': {
              width: '100%',
            },
          }}
            IconComponent={() => (
                <InputAdornment sx={{
                  marginRight:"10px"
                }}>
                  {open ?
                    (
                      <img src="/images/hiring/icon-down.svg" alt="ArrowDown" />
                    ) : (
                  
                      <img src="/images/hiring/rightarrow.png" alt="ArrowRight" />
                    )}
                </InputAdornment>
            )}
            onOpen={SelectOpen}
            onClose={SelectClose}
          >
            {JOBTITLE.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
      </Box>
      <RoleType open={open} SelectOpen={SelectOpen} SelectClose={SelectClose} />
    </Box>
  );
};

export default JobTitle;
