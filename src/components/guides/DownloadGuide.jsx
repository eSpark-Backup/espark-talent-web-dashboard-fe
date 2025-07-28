import { Box, Button, CircularProgress, Typography } from '@mui/material';
import Image from 'next/image';
import { DOWNLOAD_GUIDE } from '@/src/services/apiService/apiEndPoints';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { Toast } from '@/src/utils/toast';

const DownloadGuide = ({
  id,
  image,
  reportHeading,
  reportLanguage,
  downloadReports,
  downloadBtn,
  viewBtn,
  data,
}) => {
  const downloadGuideMutation = useMutation({
    mutationFn: async (id) => {
      return api.downloadFile(`${DOWNLOAD_GUIDE}?id=${id}`);
    },
    onSuccess: ({ data }) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'guide.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      Toast('success', 'File downloaded');
    },
    onError: (err) => {
      Toast('error', err?.message || 'File not downloaded');
    },
  });

  const handleDownloadGuide = (id) => {
    downloadGuideMutation?.mutate(id);
  };

  const viewGuideMutation = useMutation({
    mutationFn: async (id) => {
      return api.downloadFile(`${DOWNLOAD_GUIDE}?id=${id}`);
    },
    onSuccess: ({ data }) => {
      const url = window?.URL?.createObjectURL(
        new Blob([data], { type: 'application/pdf' })
      );
      window?.open(url, '_blank');
    },
    onError: (err) => {
      Toast('error', err?.message || 'File not downloaded');
    },
  });

  const handleViewGuide = (id) => {
    viewGuideMutation?.mutate(id);
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: '100%', lg: '400px' },
        width: '100%',
        minHeight: '300px',
        display: 'flex',
        border: '1px solid #E4E4E4',
        borderRadius: '10px',
        flexDirection: 'column',
        alignItems: { xs: 'center', sm: 'flex-start' },
        textAlign: { xs: 'center', sm: 'start' },
        padding: '40px 28px',
        gap: '23px',
        position: 'relative',
        '@media (min-width: 800px) and (max-width: 1200px)': {
          maxWidth: data?.length === 1 ? '45%' : '100%',
          display: 'flex',
          mx: 'auto',
        },
        '@media (min-width: 600px) and (max-width: 800px)': {
          maxWidth: data?.length === 1 ? '55%' : '100%',
          display: 'flex',
          mx: 'auto',
        },
      }}
    >
      <Typography
        sx={{
          color: '#595959',
          fontSize: { xs: '14px', md: '16px' },
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
          position: 'absolute',
          right: 30,
          top: 30,
        }}
      >
        {reportLanguage}
      </Typography>
      <Image src={image} width={50} height={50} alt={reportHeading} />
      <Typography
        sx={{
          color: '#171717',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
        }}
      >
        {reportHeading}
      </Typography>
      <Typography
        sx={{
          color: '#595959',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
          maxWidth: '260px',
        }}
      >
        {downloadReports}
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'center', sm: 'flex-start' },
          gap: { xs: 1.2, sm: 2 },
        }}
      >
        <Button
          variant="contained"
          disableRipple
          sx={{
            width: '100%',
            maxWidth: { xs: '120px', md: '120px' },
            height: '40px',
            padding: '8px',
            fontSize: { xs: '14px', md: '16px' },
            fontWeight: 600,
            textAlign: 'center',
            color: '#fff',
            borderRadius: '5px',
            cursor: 'pointer',
            '&:hover,&:active,&:focus': {
              color: '#fff',
              backgroundColor: '#029E9C',
            },
          }}
          disabled={downloadGuideMutation?.isPending}
          onClick={() => handleDownloadGuide(id)}
        >
          {downloadGuideMutation?.isPending ? (
            <CircularProgress size={26} color="secondary" />
          ) : (
            downloadBtn
          )}
        </Button>
        <Button
          variant="outlined"
          disableRipple
          sx={{
            width: '100%',
            maxWidth: { xs: '120px', md: '120px' },
            height: '40px',
            padding: '8px',
            fontSize: { xs: '14px', md: '16px' },
            fontWeight: 600,
            backgroundColor: '#fff',
            textAlign: 'center',
            borderRadius: '5px',
            border:
              viewGuideMutation?.isPending && '1px solid #029E9C !important',
            cursor: 'pointer',
            '&:hover,&:active,&:focus': {
              color: '#029E9C',
              backgroundColor: '#fff',
            },
          }}
          disabled={viewGuideMutation?.isPending}
          onClick={() => handleViewGuide(id)}
        >
          {viewGuideMutation?.isPending ? (
            <CircularProgress size={26} color="primary" />
          ) : (
            viewBtn
          )}
        </Button>
      </Box>
    </Box>
  );
};
export default DownloadGuide;
