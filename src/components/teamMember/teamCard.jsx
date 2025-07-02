import { Card, Typography, IconButton, Avatar, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';

const statusColors = {
  Active: '#4caf50',
  onBoard: '#2196f3',
  Terminated: '#f44336',
};

const TeamMemberCard = ({ member, showStatus = true }) => {
  const statusColor = statusColors[member?.status] || '#9e9e9e';

  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: '12px',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
        padding: 2,
        textAlign: 'center',
        background: '#F6F6F6',
        cursor: 'default',
      }}
    >
      {showStatus && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: statusColor,
            }}
          />

          <Typography variant="caption" sx={{ color: statusColor }}>
            {member?.status || 'Unknown'}
          </Typography>
        </Box>
      )}
      <Link href={`/client/dashboard/team/team-members/${member?.id || '1'}`}>
        <IconButton
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            color: '#757575',
          }}
          aria-label={`View ${member.name}'s details`}
        >
          <VisibilityIcon />
        </IconButton>
      </Link>
      <Avatar
        alt={member?.name}
        src={member?.profileImage || '/icons/Ellipse 14.svg'}
        sx={{
          width: 72,
          height: 72,
          margin: '20px auto 10px',
        }}
      />
      <Typography variant="subtitle1" fontWeight={600}>
        {member?.employee_name || 'Unnamed Member'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {member?.job_title || 'N/A'}
      </Typography>
    </Card>
  );
};

export default TeamMemberCard;
