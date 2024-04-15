import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import EditModal from '@/src/components/employeeData/editModal';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const ClientProfileData = ({
  handleOpenModal,
  showEditModal,
  handleCloseModal,
}) => {
  const router = useRouter();
  const clientInfoData = [
    [
      {
        title: 'Client ID',
        name: 'client_id',
      },
      {
        title: 'Address',
        name: 'address',
      },
    ],
    [
      {
        title: 'Country',
        name: 'country',
      },
      {
        title: 'Phone',
        name: 'phone_number',
      },
    ],
    [
      {
        title: 'Email',
        name: 'email',
      },
      {
        title: 'Join date',
        name: 'join_date',
      },
    ],
  ];
  const { currentClient } = useSelector((state) => state?.hr?.clients);
  return (
    <Grid
      container
      sx={{
        borderRadius: '5px',
        background: '#FFF',
        boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        position: 'relative',
        p: { xs: '10px', md: '18px 25px' },
      }}
    >
      <Grid
        item
        xs={12}
        lg={4}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
        }}
      >
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <Box
            component="img"
            src={currentClient?.image_path}
            sx={{
              width: { xs: '70px', md: '100px' },
              height: { xs: '70px', md: '100px' },
              borderRadius: '50%',
            }}
          />
          <Box
            component="img"
            sx={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              cursor: 'pointer',
            }}
            src="/icons/EditIcon.svg"
            width={35}
            height={35}
            onClick={handleOpenModal}
          />
          {showEditModal && (
            <EditModal
              handleOpenModal={handleOpenModal}
              onClose={handleCloseModal}
            />
          )}
        </Box>
        <Box
          sx={{
            ml: { xs: '0px', md: '40px' },
          }}
          display={'flex'}
          flexDirection={'column'}
        >
          <Typography
            sx={{
              color: '#171717',
              fontSize: '25px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: 'normal',
              mb: { xs: '10px', md: '15px' },
            }}
          >
            {`${currentClient?.first_name} ${currentClient?.last_name}`}
          </Typography>
          <Typography
            sx={{
              color: '#595959',
              fontSize: { xs: '13px', md: '14px', xl: '16px' },
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: 'normal',
            }}
          >
            {`${currentClient?.company_name}`}
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        lg={8}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          mt: { xs: '15px', lg: '0px' },
        }}
      >
        <Grid container>
          {clientInfoData.map((childArr, childIndex) => (
            <Grid key={childIndex} item xs={12} md={4}>
              <Box display={'flex'} flexDirection={'column'}>
                {childArr.map(({ title, name }, itemIndex) => (
                  <Box
                    key={itemIndex}
                    display={'flex'}
                    alignItems={'center'}
                    sx={{ mb: { xs: '0', md: itemIndex % 2 === 0 && '25px' } }}
                  >
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '13px', md: '14px', xl: '16px' },
                        width: { xs: '200px', md: 'auto' },
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: { xs: '1.5', md: 'normal' },
                      }}
                    >
                      {`${title}: `}
                    </Typography>
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '13px', md: '14px', xl: '16px' },
                        width: { xs: '200px', md: 'auto' },
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: { xs: '1.5', md: 'normal' },
                      }}
                    >
                      {currentClient[name]}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Box
        component="img"
        sx={{
          position: 'absolute',
          top: { xs: '5px', xl: '15px' },
          right: { xs: '5px', xl: '40px' },
          cursor: 'pointer',
        }}
        src="/icons/EditIcon.svg"
        width={35}
        height={35}
        onClick={() => router.push(`/hr/dashboard/clients/edit-profile`)}
      />
    </Grid>
  );
};

export default ClientProfileData;
