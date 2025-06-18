import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
  Box,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/navigation';

const statusColors = {
  Active: '#4caf50',
  onBoard: '#2196f3',
  Terminated: '#f44336',
};

const TeamMemberCard = ({ member, onView, showStatus = true }) => {
  const statusColor = statusColors[member?.status] || '#9e9e9e';
  const router = useRouter();

  const handleViewClick = (e) => {
    e.stopPropagation(); 
    router.push('/team-members-detail');
  };

  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: '12px',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
        padding: 2,
        textAlign: 'center',
        background: '#F6F6F6',
        borderRadius: '5px',
        cursor: 'default', // 👈 no pointer
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

      {/* 👇 Only this triggers navigation */}
      {onView && (
        <IconButton
          onClick={(e) => {
            e.stopPropagation(); // stop bubbling
            onView(member); // call the passed function
          }}
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
      )}

      <Avatar
        alt={member?.name}
        src={member?.profileImage || ''}
        sx={{
          width: 72,
          height: 72,
          margin: '20px auto 10px',
        }}
      />

      <Typography variant="subtitle1" fontWeight={600}>
        {member?.name || 'Unnamed Member'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {member?.role || 'N/A'}
      </Typography>
    </Card>
  );
};

export default TeamMemberCard;
