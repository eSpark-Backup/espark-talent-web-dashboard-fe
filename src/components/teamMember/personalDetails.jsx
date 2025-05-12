'use client';

import { employeeProfileFields } from '@/src/constants/teamMember';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Typography,
  Link,
  Grid,
} from '@mui/material';

export default function EmployeeProfile({ fields }) {
  return (
    <Grid container spacing={4} p={4}>
      {/* Left Section */}
      <Grid item xs={12} md={9}>
        <Grid container spacing={2}>
          {fields.map((field, index) => (
            <Grid
              item
              xs={12}
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f7f7f7',
                borderRadius: 1,
                marginBottom: '15px',
                height: '50px',
                paddingTop: '0 !important',
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight={500}>{field.label}</Typography>
              </Box>
              <Box sx={{ flex: 2 }}>
                <input
                  type="text"
                  defaultValue={field.value}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    backgroundColor: 'white',
                    fontSize: '14px',
                  }}
                />
              </Box>
            </Grid>
          ))}
          <Grid item xs={12} mt={2}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '120px', height: '40px' }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Section - Profile Card */}
      <Grid item xs={12} md={3}>
        <Box
          sx={{
            width: '100%',
            borderRadius: 2,
            boxShadow: 2,
            p: 2,
            backgroundColor: '#F6F6F6',
          }}
        >
          <Box
            sx={{
              border: '1px solid #00a39d',
              borderRadius: 1,
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 2,
              backgroundColor: '#fff',
            }}
          >
            <Avatar
              alt="John Doe"
              src="/icons/Ellipse 14.svg"
              sx={{ width: 50, height: 50 }}
            />
            <Box>
              <Typography fontWeight={600} fontSize={16}>
                John Doe
              </Typography>
              <Typography fontSize={14} color="text.secondary">
                Sr. UI/UX Designer
              </Typography>
            </Box>
          </Box>

          {[
            { label: 'Employment Status:', value: 'Active' },
            { label: 'Location:', value: 'Karachi, Pakistan' },
            { label: 'Department:', value: 'IT' },
            {
              label: 'Email:',
              value: 'areeba@esparkconsultants.com',
              editable: true,
            },
            { label: 'Probation Period:', value: 'Active' },
          ].map((item, index) => (
            <Box key={index} sx={{ mb: 1.5 }}>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  mt: 1,
                }}
              >
                <Typography fontSize={13} color="text.secondary">
                  {item.label}
                </Typography>
                {item.editable && (
                  <Link
                    component="button"
                    variant="body2"
                    underline="none"
                    sx={{ fontSize: 12 }}
                  >
                    Edit
                  </Link>
                )}
              </Box>
              <Typography fontSize={14} mt={0.5}>
                {item.value}
              </Typography>
            </Box>
          ))}

          <Divider sx={{ mt: 1.5, mb: 2 }} />

          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#00a39d',
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#008a85',
              },
            }}
          >
            Download Resume
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
