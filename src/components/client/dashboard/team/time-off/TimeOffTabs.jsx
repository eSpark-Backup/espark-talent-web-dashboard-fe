import { leaveRequestsTab } from '@/src/data/tabs/time-off-tabs';
import { updateCurrentReqTypeTab } from '@/src/redux/slices/clientSlices/timeOffSlice';
import { Box, Tab, Tabs } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

const TimeOffTabs = () => {
  const { tabData } = useSelector((state) => state?.client?.timeOff);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const search = searchParams.get('param');

  useEffect(() => {
    if (search === 'leave_request') {
      dispatch(
        updateCurrentReqTypeTab({
          tab: 'Leave Requests',
          val: 0,
        })
      );
    }

    if (search === 'punch_request') {
      dispatch(
        updateCurrentReqTypeTab({
          tab: 'Clockin/out Requests',
          val: 2,
        })
      );
    }
  }, [search]);

  const handleChangeCurrReqTypeTab = (event, newValue) => {
    const tab = event?.target?.innerText;
    dispatch(
      updateCurrentReqTypeTab({
        tab,
        val: newValue,
      })
    );
  };

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '40px' }}
    >
      <Tabs
        value={tabData?.currentReqTypeTabVal}
        onChange={handleChangeCurrReqTypeTab}
        aria-label="basic tabs example"
        variant="scrollable"
        TabIndicatorProps={{ style: { backgroundColor: '#068987' } }}
      >
        {leaveRequestsTab?.map(({ label, prop }, index) => (
          <Tab
            key={index}
            label={`${label}`}
            {...prop}
            disableRipple={true}
            sx={{
              textTransform: 'math-auto',
              mr: '20px',
              color: '#595959',
              '&.Mui-selected': {
                color: '#068987',
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};
export default TimeOffTabs;
