import { Box } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

const ActionBarComponent = ({ onClose }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2px',
        paddingTop: '12px',
        position: 'absolute',
        bottom: 10,
        right: -110,
        left: 'auto',
        width: '100%',
        zIndex: 1,
      }}
    >
      <CloseIcon
        color="primary"
        fontSize="medium"
        onClick={onClose}
        sx={{
          borderRadius: '100%',
          p: 0.5,
          fontSize: '30px',
          '&:hover': { backgroundColor: 'rgb(228, 245, 244)' },
        }}
      />
      <DoneIcon
        color="primary"
        sx={{
          borderRadius: '100%',
          p: 0.5,
          fontSize: '30px',
          '&:hover': { backgroundColor: 'rgb(228, 245, 244)' },
        }}
        fontSize="medium"
        onClick={onClose}
      />
    </Box>
  );
};
export default ActionBarComponent;
