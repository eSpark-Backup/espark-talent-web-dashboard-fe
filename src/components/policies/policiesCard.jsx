import React from 'react';
import { Box } from '@mui/material';

import DownloadPolicies from './downloadPolicies';

const PoliciesCard = ({ data }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          justifyContent: 'center',
          // gap: 3,
          flexWrap: 'wrap',
          '@media (min-width: 1200px) and (max-width: 1379px)': {
            width: '100%',
          },
          width: { xs: '100%', md: '100%', lg: '90%' },
          mx: 'auto',
        }}
      >
        {data.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: { sm: 0, md: '25px' },
              mb:{xs:"25px",md:"0"},
              '@media (min-width: 900px) and (max-width: 1280px)': {
                padding: '15px',
              },
            }}
          >
            <DownloadPolicies
              key={item.id}
              image={item.image}
              reportHeading={item.reportHeading}
              downloadReports={item.downloadReports}
              downloadBtn={item.downloadBtn}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};
export default PoliciesCard;
