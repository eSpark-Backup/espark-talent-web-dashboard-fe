import React from 'react';
import { Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const EmployeeCard = ({
  eachItem,
  breakPoint,
  handleClick,
  anchorEl,
  open,
  handleClose,
  handleOpenRemove,
}) => {
  console.log({ eachItem });
  const router = useRouter();

  return (
    <Grid item xs={12} sm={6} md={4} lg={breakPoint ? 4 : 3}>
      <Box
        sx={{
          width: '100%',
          minHeight: '200px',
          backgroundColor: '#F6F6F6',
          borderRadius: '5px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          padding: '20px 15px 10px 15px',
          cursor: 'pointer',
          '@media (min-width: 900px) and (max-width: 1480px)': {
            minHeight: '250px',
          },
        }}
        onClick={() =>
          router.push(`/hr/dashboard/employees/${eachItem?.emp_pk}`)
        }
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: '65px',
              display: 'flex',
              columnGap: '5px',
              height: '20px',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              left: 0,
            }}
          >
            <Box
              sx={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor:
                  eachItem.status === 'active' ? '#068987' : '#F00',
              }}
            ></Box>

            <Typography
              sx={{
                color: eachItem.status === 'active' ? '#068987' : '#F00',
                fontSize: '12px',
              }}
            >
              {eachItem.status}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '60%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              rowGap: '5px',
              '@media (min-width: 1200px) and (max-width: 1450px)': {
                marginTop: '25px',
                mr: '35px',
              },
              '@media (min-width: 900px) and (max-width: 980px)': {
                marginTop: '25px',
                mr: '35px',
              },
            }}
          >
            <Box
              component={'img'}
              src={eachItem.image}
              sx={{
                // width: '150px',
                borderRadius: '50%',
                height: '100px',
              }}
            />
            <Typography
              sx={{
                color: '#171717',
                fontSize: '16px',
                fontWeight: '400',
                textAlign: 'center',
              }}
            >
              {eachItem.name}
            </Typography>
            <Typography
              sx={{ color: '#595959', fontSize: '16px', textAlign: 'center' }}
            >
              {eachItem.job_title}
            </Typography>
          </Box>
          {eachItem.status === 'active' ? (
            <Box sx={{ width: '10%', position: 'absolute', right: '0px' }}>
              <Image
                width={24}
                height={24}
                src={`/icons/ellipse.svg`}
                style={{ cursor: 'pointer' }}
                onClick={handleClick}
              />
              <>
                <Menu
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  sx={{ marginTop: '20px' }}
                >
                  <MenuItem onClick={(e) => handleOpenRemove(e, eachItem.id)}>
                    Terminate
                  </MenuItem>
                </Menu>
              </>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Grid>
  );
};

export default EmployeeCard;
