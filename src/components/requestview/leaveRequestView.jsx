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
import AttachDoc from './attachFile';

const LeaveRequest = ({ modalType, view }) => {
  return (
    <Box sx={{ p: 3.5 }}>
      <LeaveType view={view} />
      <LeaveDate date={REQUESTVIEW_DATA?.startDate} view={view} />
      <LeaveDate
        date={REQUESTVIEW_DATA?.endDate}
        backgroundColor="#F6F6F6"
        view={view}
      />

      {view && <LeaveDuration />}

      <LeaveCount
        countLabel={REQUESTVIEW_DATA?.count}
        totalNo={LEAVE_DATA?.countNo}
      backgroundColor={view ? "#F6F6F6" : "#fff"}
      />
      {view && (
        <LeaveCount
          countLabel={REQUESTVIEW_DATA?.sandwichCount}
          component={<LeaveDatePicker label={'0'} view={view} />}
        />
      )}
      <LeaveCount
        countLabel={
          view ? REQUESTVIEW_DATA?.total : REQUESTVIEW_DATA?.totalCount
        }
        totalNo={LEAVE_DATA?.totalNo}
        backgroundColor="#F6F6F6"
      />
      {!view && (
        <LeaveCount
          countLabel={REQUESTVIEW_DATA?.attachment}
          component={<AttachDoc />}
        />
      )}
      <LeaveCount
        countLabel={
          view ? (
            REQUESTVIEW_DATA?.reason
          ) : (
            <>
              {REQUESTVIEW_DATA?.reason}
              <span
                style={{
                  color: 'red',
                  fontSize: '25px',
                  marginLeft: '55px',
                  marginTop: '-25px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                *
              </span>
            </>
          )
        }
        component={<LeaveReason />}
      />
      <LeaveRequestButtons modalType={modalType} />
    </Box>
  );
};
export default LeaveRequest;
