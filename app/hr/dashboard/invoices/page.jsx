'use client';
import { Button, Grid } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React from 'react';
import Image from 'next/image';
import AppTable from '@/src/components/appTable/AppTable';
import {
  invoicePageColumn,
  invoicePageData,
} from '@/src/constants/data/tables/hr/invoicesPageData';

const Page = () => {
  const theme = useTheme();

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid
          container
          sx={{
            marginTop: '20px',
            [theme.breakpoints.down('md')]: {
              paddingLeft: '0px',
            },
            [theme.breakpoints.up('md')]: {
              paddingLeft: '20px',
            },
          }}
          spacing={3}
        >
          {/* <Grid item xs={12} md={6} lg={3}>
            <Input
              value={id}
              width={'100%'}
              handleChange={(e) => setId(e)}
              placeHolder={'Client name'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'id'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Input
              value={name}
              width={'100%'}
              handleChange={(e) => setName(e)}
              placeHolder={'Employee name'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'name'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Input
              value={designation}
              width={'100%'}
              handleChange={(e) => setDesignation(e)}
              placeHolder={'Select designation'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'designation'}
            />
          </Grid> */}
          <Grid item xs={12} md={6} lg={1}>
            <Button
              // onClick={() => setSearch(true)}
              style={{
                backgroundColor: '#029894',
                color: '#FFF',
                height: '40px',
                width: '100%',
              }}
            >
              <Image
                width={24}
                height={24}
                alt="Refresh"
                src={`/icons/searchIconWhite.svg`}
              />
            </Button>
          </Grid>
        </Grid>
        <Box
          sx={{
            maxWidth: '100%',
            overflowX: 'auto',
            my: '20px',
          }}
        >
          <AppTable column={invoicePageColumn} data={invoicePageData} />
        </Box>
      </Box>
    </>
  );
};

export default Page;
