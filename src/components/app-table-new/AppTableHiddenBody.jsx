import { Box, Button, Typography } from '@mui/material';

const TableHiddenBody = ({
  renderMessage,
  renderMessageButton,
  handleClickRenderMessageButton,
}) => {
  return (
    <>
      {[...Array(5)]?.map((_, index) => (
        <tr
          key={index}
          style={{
            background: index === 2 && '#fff',
            display: 'flex',
            justifyContent: 'center',
          }}
          className="app-table-row"
        >
          {index === 2 ? (
            <td style={{ textAlign: 'center' }}>
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography
                  component="div"
                  sx={{
                    fontSize: '24px',
                    fontWeight: 400,
                    lineHeight: '29px',
                    letterSpacing: '0em',
                    textAlign: 'left',
                  }}
                  variant="body1"
                  textAlign={'center'}
                >
                  {renderMessage}
                </Typography>
                {renderMessageButton && (
                  <Button
                    onClick={handleClickRenderMessageButton}
                    sx={{ marginTop: '20px' }}
                    variant="contained"
                  >
                    {renderMessageButton}
                  </Button>
                )}
              </Box>
            </td>
          ) : (
            <td />
          )}
        </tr>
      ))}
    </>
  );
};

export default TableHiddenBody;
