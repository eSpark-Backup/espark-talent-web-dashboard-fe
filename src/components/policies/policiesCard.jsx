import React from 'react';
import { Box } from '@mui/material';

import DownloadPolicies from './downloadPolicies';

const PoliciesCard = ({ data }) => {
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          maxWidth: '900px',
          gridTemplateRows: 'repeat(2, 1fr)',
          gridTemplateColumns: 'repeat(2, 1fr)',
          '@media (min-width: 280px) and (max-width: 768px)': {
            gridTemplateRows: 'repeat(1, 1fr)',
            gridTemplateColumns: 'repeat(1, 1fr)',
            mx: 0,
          },
          justifyContent: { xs: 'start', lg: 'center' },
          columnGap: 3.5,
          rowGap: 3.5,
          flexWrap: 'wrap',
          mx: 'auto',
        }}
      >
        {data.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'start', lg: 'center' },
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
