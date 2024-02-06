import React, { useState } from 'react';
import { Box, FormControlLabel, Grid, Switch } from '@mui/material';

import { NotificationData } from '@/src/constants/data/tables/notifications';

              <Box>{Object.values(item)}</Box>
              <Box>
                <FormControlLabel
                  label=""
                  control={
                    <Switch
                      checked={switchStates[index]}
                      onChange={() => handleToggle(index)}
                      size="normal"
                      sx={{
                        '& .MuiSwitch-switchBase': {
                          color: '#f8f8f8',
                          '&.Mui-checked': {
                            color: '#fff',
                          },
                          '&.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#198f51 !important',
                          },
                          //   '& .MuiSwitch-thumb': {
                          //     width: 25,
                          //     height: 25,
                          //       },
                        },
                      }}
                    />
                  }
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
export default Notification;
