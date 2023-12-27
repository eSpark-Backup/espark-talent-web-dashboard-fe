import React from 'react';
import { Box } from '@mui/material';

import LeaveType from './leaveType';
import LeaveDate from './leaveDate';
import { LEAVE_DATA, REQUESTVIEW_DATA } from '@/src/constants/requestviewModal';
import LeaveDuration from './leaveDuration';
import LeaveCount from './leaveCount';
import LeaveDatePicker from './leaveDatepicker';
import LeaveReason from './leaveReason';
import LeaveRequestButtons from './leaveRequestButton';

const LeaveRequest = ({modalType}) => {
  return (
    <Box sx={{p:4}}>
      <LeaveType />
      <LeaveDate date={REQUESTVIEW_DATA?.startDate} />
      <LeaveDate date={REQUESTVIEW_DATA?.endDate} backgroundColor="#F6F6F6" />
      <LeaveDuration />
      <LeaveCount
        countLabel={REQUESTVIEW_DATA?.count}
        totalNo={LEAVE_DATA?.countNo}
        backgroundColor="#F6F6F6"
      />
      <LeaveCount
        countLabel={REQUESTVIEW_DATA?.sandwichCount}
        component={<LeaveDatePicker label={"0"}/>}
      />
      <LeaveCount
        countLabel={REQUESTVIEW_DATA?.total}
        totalNo={LEAVE_DATA?.totalNo}
        backgroundColor="#F6F6F6"
      />
      <LeaveCount
        countLabel={REQUESTVIEW_DATA?.reason}
        component={<LeaveReason />}
      />
      <LeaveRequestButtons modalType={modalType } />
      
    </Box>
  );
};
export default LeaveRequest;
