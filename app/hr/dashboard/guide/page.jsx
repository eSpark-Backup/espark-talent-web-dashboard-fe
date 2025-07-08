'use client';
import React, { useState } from 'react';
import { Grid, Box, Button } from '@mui/material';

import Heading from '@/src/components/global/Heading';
import AppTable from '@/src/components/appTableNew/AppTable';
import { CONTRACT_SIGNED } from '@/src/constants/contract-signed';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import {
  DOWNLOAD_GUIDE,
  HR_GUIDE,
  HR_GUIDE_EDIT,
} from '@/src/services/apiService/apiEndPoints';
import { Toast } from '@/src/components/Toast/Toast';
import { SETTING } from '@/src/constants/setting-hr';
import { useDispatch, useSelector } from 'react-redux';
import { GUIDE_DATA, guideColumn } from '@/src/constants/guide';
import UploadGuideModal from '@/src/components/modals/UploadGuideModal';
import {
  getGuideData,
  removeGuide,
  updateGuideValue,
} from '@/src/redux/slices/hrSlices/guide';
import EditGuideModal from '@/src/components/modals/EditGuideModal';

const Page = () => {
  const dispatch = useDispatch();
  const { guides_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { role } = useSelector((state) => state?.auth?.userData);
  const { guides } = useSelector((state) => state?.hr?.guides);
  const queryClient = useQueryClient();

  const { isLoading } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-guide-query'],
    queryFn: async () => {
      return api
        .getData(`${HR_GUIDE}`)
        .then(({ data }) => {
          const tempData =
            data !== ''
              ? data?.map((item) => ({
                  ...item,
                  action: [
                    'View',
                    role === 'super_admin' ||
                    (guides_perms && guides_perms[0]?.download)
                      ? 'Download'
                      : null,
                    role === 'super_admin' ||
                    (guides_perms && guides_perms[0]?.write)
                      ? 'Edit'
                      : null,
                    role === 'super_admin' ||
                    (guides_perms && guides_perms[0]?.delete)
                      ? 'Delete'
                      : null,
                  ]?.filter(Boolean),
                  actionStatus: true,
                  employee: ['DisabledCheck', 'EnabledCheck', item?.employee],
                  client: ['DisabledCheck', 'EnabledCheck', item?.client],
                  isSelected: false,
                  isModulePermissionData: true,
                  isGuideData: true,
                }))
              : [];

          dispatch(getGuideData(tempData));
          return tempData || [];
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      return api.updateJSONData(HR_GUIDE_EDIT, formVals);
    },
    onSuccess: () => {
      setIsOpenSaveGuide(false);
      Toast('success', 'Guides updates successfully');
      handleClose?.();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
    },
  });
  const deleteGuideMutation = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_GUIDE}?id=${id}`);
    },
    onSuccess: () => {
      dispatch(removeGuide(deletingGuideId));
      Toast('success', 'Guide deleted successfully');
      setDeletingGuideId(null);
      handleClose?.();
      queryClient.invalidateQueries(['hr-guide-query']);
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete policy');
    },
  });
  const [openUploadGuide, setOpenUploadGuide] = useState(false);
  const [openEditUploadGuide, setOpenEditUploadGuide] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [deletingGuideId, setDeletingGuideId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSaveGuide, setIsOpenSaveGuide] = useState(false);

  const downloadGuideMutation = useMutation({
    mutationFn: async (id) => {
      return api.downloadFile(`${DOWNLOAD_GUIDE}?id=${id}`);
    },
    onSuccess: ({ data }) => {
      const url = window?.URL?.createObjectURL(new Blob([data]));
      const link = document?.createElement('a');
      link.href = url;
      link?.setAttribute('download', 'guide.pdf');
      document?.body?.appendChild(link);
      link?.click();
      link?.parentNode?.removeChild(link);
      Toast('success', 'File downloaded');
    },
    onError: (err) => {
      Toast('error', err.message || 'File not downloaded');
    },
  });

  const openGuideMutation = useMutation({
    mutationFn: async ({ id }) => {
      return api.downloadFile(`${DOWNLOAD_GUIDE}?id=${id}`);
    },
    onSuccess: ({ data }, { setviewLoader }) => {
      const url = window?.URL?.createObjectURL(
        new Blob([data], { type: 'application/pdf' })
      );
      window?.open(url, '_blank');
      if (setviewLoader)
        setviewLoader({
          loader: false,
          id: null,
        });
    },
    onError: (err, { setviewLoader }) => {
      Toast('error', err.message || 'File not downloaded');
      if (setviewLoader)
        setviewLoader({
          loader: false,
          id: null,
        });
    },
  });

  const handleClickActionView = (id, column, row, setviewLoader) => {
    if (!setviewLoader || typeof setviewLoader !== 'function') {
      if (
        role === 'super_admin' ||
        (role !== 'super_admin' && guides_perms?.[0]?.write)
      ) {
        dispatch(
          updateGuideValue({
            id,
            key: column?.name,
            value: !row[column?.name][2],
          })
        );
      } else {
        return false;
      }
    } else {
      openGuideMutation?.mutate({ id, setviewLoader });
      setviewLoader({
        loader: true,
        id: id,
      });
    }
  };

  const handleClickActionEdit = ({ row }) => {
    setOpenEditUploadGuide(true);
    setEditModalData(row);
  };

  const handleClickActionDownload = (id) => {
    downloadGuideMutation?.mutate(id);
  };

  const handleClickDelete = (id) => {
    setDeletingGuideId(id);
    setIsOpen(true);
  };

  const handleOpenModal = () => {
    setOpenUploadGuide(true);
  };

  const handleClose = () => {
    setOpenUploadGuide(false);
    setOpenEditUploadGuide(false);
    setIsOpen(false);
  };

  const handleSaveGuide = () => {
    const tempData = guides?.map((item) => ({
      id: item?.id,
      employee: item?.employee[2],
      client: item?.client[2],
    }));
    mutate({ data: [...tempData] });
  };
  const handleDeleteGuide = () => {
    deleteGuideMutation?.mutate(deletingGuideId);
  };

  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '10px',
            gap: '80px',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'flex-start', md: 'space-between' },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box sx={{ display: 'flex', mx: { xs: 'none', md: 'auto' } }}>
              <Heading
                title={GUIDE_DATA?.guide}
                description={GUIDE_DATA?.companyGuide}
                containerStyles={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', md: 'center' },
                  '@media (min-width: 600px) and (max-width: 899px)': {
                    display: 'flex',
                    alignItems: 'flex-start',
                  },
                  '@media (min-width: 280px) and (max-width: 600px)': {
                    display: 'flex',
                    mx: 'auto',
                  },
                }}
              />
            </Box>
            <Box>
              {(role === 'super_admin' ||
                (role !== 'super_admin' && guides_perms?.[0].write)) && (
                <Box>
                  <Button
                    sx={{
                      minWidth: '200px',
                      height: '40px',
                      borderColor: '#029894',
                      color: 'teal',
                      fontSize: '16px',
                      '&:hover': {
                        background: '#fff',
                        color: 'teal',
                      },
                      marginTop: { xs: '20px', md: '0px' },
                      '@media (min-width: 600px) and (max-width: 900px)': {
                        display: 'flex',
                        alignItems: 'flex-start',
                      },
                      '@media (min-width: 280px) and (max-width: 600px)': {
                        display: 'flex',
                        mx: 'auto',
                      },
                    }}
                    variant="outlined"
                    onClick={handleOpenModal}
                  >
                    {GUIDE_DATA?.uploadGuide}
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              maxWidth: '100%',
              overflowX: 'auto',
            }}
          >
            <AppTable
              column={guideColumn}
              data={guides || []}
              handleClickActionView={handleClickActionView}
              handleClickActionEdit={handleClickActionEdit}
              handleClickActionDownload={handleClickActionDownload}
              handleClickActionDelete={handleClickDelete}
              noPagination
              isLoading={isLoading}
            />
          </Box>
          {(role === 'super_admin' ||
            (role !== 'super_admin' && guides_perms?.[0].write)) && (
            <Box
              sx={{
                mt: { xs: '-40px', md: '-85px' },
                '@media (min-width: 900px) and (max-width: 1400px)': {
                  mt: '-70px',
                },
              }}
            >
              <Button
                aria-hidden={false}
                disabled={guides?.length > 0 ? false : true}
                sx={{
                  minWidth: '120px',
                  fontSize: '16px',
                  backgroundColor: guides?.length > 0 ? '#029894' : 'lightgray',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#029894',
                    color: '#fff',
                  },
                }}
                onClick={() => setIsOpenSaveGuide(true)}
              >
                {SETTING?.save}
              </Button>
            </Box>
          )}
        </Box>
      </Grid>
      {openUploadGuide && (
        <UploadGuideModal open={openUploadGuide} onClose={handleClose} />
      )}
      {openEditUploadGuide && (
        <EditGuideModal
          modalData={editModalData}
          open={openEditUploadGuide}
          onClose={handleClose}
        />
      )}
      <AppConfirmationMadal
        title={CONTRACT_SIGNED?.delete}
        bodyText={CONTRACT_SIGNED?.warning}
        cancelButtonText={CONTRACT_SIGNED?.cancel}
        confirmButtonText={CONTRACT_SIGNED?.delete}
        isOpen={isOpen}
        handleClose={handleClose}
        handleConfirm={handleDeleteGuide}
        isLoading={deleteGuideMutation.isPending}
      />
      <AppConfirmationMadal
        title={'Save Guides'}
        bodyText={'Are you sure you want to update the guides?'}
        cancelButtonText={'Cancel'}
        confirmButtonText={'Save'}
        isOpen={isOpenSaveGuide}
        handleClose={() => setIsOpenSaveGuide(false)}
        handleConfirm={handleSaveGuide}
        isLoading={isPending}
      />
    </>
  );
};

export default Page;
