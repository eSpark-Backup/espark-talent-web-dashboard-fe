'use client';
import { Button, Grid, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React, { useState } from 'react';
import Image from 'next/image';

import AppTable from '@/src/components/appTable/AppTable';
import {
  invoicePageColumn,
  invoicePageData,
} from '@/src/constants/data/tables/hr/invoicesPageData';
import Input from '@/src/components/dashboard/input';
import AppDropdown from '@/src/components/dashboard/appDropdown';

const Page = () => {
  const [id, setId] = useState('');
  const [designation, setDesignation] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h3">Invoices</Typography>
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
          <Grid item xs={12} md={6} lg={3}>
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
            <AppDropdown
              selectedItem={designation}
              setSelectedItem={setDesignation}
              lg={12}
              type="select"
              placeHolder={'Select status'}
              data={[
                {
                  label: 'Active',
                },
                {
                  label: 'Inactive',
                },
              ]}
              isLoadingList={isLoading}
              setIsLoadingList={setIsLoading}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={1}>
            <Button
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
