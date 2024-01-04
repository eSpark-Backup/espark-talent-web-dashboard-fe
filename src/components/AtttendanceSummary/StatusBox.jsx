import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { Summary_Boxes } from '@/src/constants/data/hrDashboard';

const StatusBox = ({
  title,
  count,
  horizotalLineColor,
  backgroundColor,
  isEmployee,
  images
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '110px',
          borderRadius: '10px',
          background: `${backgroundColor}`,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '80%',
            height: '70%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'start',
            pl: 3,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <hr
              style={{
                width: '27px',
                height: '2px',
                backgroundColor: `${horizotalLineColor}`,
              }}
            />
            <Typography variant="h6">{isEmployee ? title : count}</Typography>
          </Box>
          <Box>
            <Typography>{isEmployee ? count : title}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: '20%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isEmployee ? (
            <img
              src="/icons/arrow-right.svg"
              style={{ width: '15px', height: '15px' }}
              alt="arrow"
            />
          ) : (
              <Image
                src={images}
                width={30}
                height={30}
                alt="employee"
                style={{
                  marginRight:"10px"
                }}
              />
            // Summary_Boxes.map((box, index) => {
            //   let imageSrc;

            //   if (index === 0) {
            //     imageSrc = '/images/dashboard/hr/employee.svg';
            //   } else if (index === 1) {
            //     imageSrc = '/images/dashboard/hr/client.svg';
            //   } else if (index === 2) {
            //     imageSrc = '/images/dashboard/hr/hiring.svg';
            //   } else if (index === 3) {
            //     imageSrc = '/images/dashboard/hr/interview.svg';
            //   }

            //   return (
            //     <Image
            //       key={index}
            //       src={imageSrc}
            //       width={30}
            //       height={30}
            //       alt={`image-${index}`}
            //       style={{
            //         marginRight: '20px',
            //       }}
            //     />
                  
            //   )
            // }))
          )
          }
      
        </Box>
      </Box>
    </>
  );
};

export default StatusBox;
