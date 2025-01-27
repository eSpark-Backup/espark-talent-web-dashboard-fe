import Skeleton from '@mui/material/Skeleton';
import AppTable from '@/src/components/appTableNew/AppTable';
import { addEmployeModalFormSchema } from '@/src/components/form/schemas/addEmployeeModal';
import Navigator from '@/src/components/form/step/Navigator';
import FormInput from '@/src/components/form/ui-elements/FormInput';
import { Toast } from '@/src/components/Toast/Toast';
import { addEmployeeModalFormSteps } from '@/src/constants/data/forms/add-employee-modal';
import { FORM_DATA } from '@/src/constants/form';
import {
  getClientAllEmps,
  getClientAllEmpsRequest,
  getOutsourceableEmps,
  selectEmployeeToAdd,
} from '@/src/redux/slices/hrSlices/clientSlice';
import { api } from '@/src/services/apiService';
import {
  HR_CLIENT_EMPLOYEES,
  HR_OUTSOURCEABLE_EMPS,
} from '@/src/services/apiService/apiEndPoints';
import { Box, Button, CircularProgress, Grid, Modal } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countriesList } from '@/src/constants/countries';

const AddEmployeeModal = ({ open, onClose }) => {
  const { currentClient, outsourceableEmployees, currentEmpToAddInClient } =
    useSelector((state) => state?.hr?.clients);
  const { email } = currentClient;

  const getClientEmpsMutation = useMutation({
    mutationFn: async () => {
      dispatch(getClientAllEmpsRequest());
      return api.getData(`${HR_CLIENT_EMPLOYEES}?c_email=${email}&tab=all`);
    },
    onSuccess: ({ data }) => {
      dispatch(getClientAllEmps(data));
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      return api.postJSONData(
        `${HR_OUTSOURCEABLE_EMPS}?c_email=${email}`,
        formVals
      );
    },
    onSuccess: () => {
      setCurrentStep(1);
      handleCloseModal();
      getClientEmpsMutation.mutate();
      Toast('success', 'Data posted successfully');
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
    },
  });
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDisabledNext, setIsDisabledNext] = useState(true);
  const [modalStep1FormTableState, setModalStep1FormTableState] = useState([]);
  useEffect(() => {
    setModalStep1FormTableState(outsourceableEmployees);
  }, [outsourceableEmployees]);

  const handleSelectRow = (employeeId) => {
    dispatch(selectEmployeeToAdd(employeeId));
    const tempForm = [...modalStep1FormTableState]?.map((item) => ({
      ...item,
      isSelected: false,
    }));
    const employeeIndex = tempForm?.findIndex((el) => el.id === employeeId);
    tempForm[employeeIndex] = {
      ...tempForm[employeeIndex],
      isSelected: !tempForm[employeeIndex].isSelected,
    };
    setModalStep1FormTableState(tempForm);
    setIsDisabledNext(false);
  };

  const { isLoading } = useQuery({
    staleTime: 1000,
    refetchOnWindowFocus: false,
    queryKey: ['get-outsourceable-emp-query'],
    queryFn: async () => {
      return api
        .getData(`${HR_OUTSOURCEABLE_EMPS}?c_email=${email}&tab=active`)
        .then(({ data }) => {
          const tempData =
            data !== ''
              ? data?.map((item) => ({
                  ...item,
                  pic: '/images/users/Bilal.svg',
                  formActionStatus: true,
                  isSelected: false,
                  action: ['DisabledCheck', 'EnabledCheck'],
                }))
              : [];
          dispatch(getOutsourceableEmps(tempData));
          return tempData;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const {
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
    setFieldError,
    setErrors,
    handleReset,
  } = useFormik({
    initialValues: {
      joining_date: null,
      // benefits: {
      //   life_insurance_card: false,
      //   medical_card: false,
      //   fuel_card: false,
      // },
    },
    validationSchema: addEmployeModalFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const finalData = {
        ...formValues,
        id: currentEmpToAddInClient,
        joining_date: dayjs(formValues?.joining_date)?.format('YYYY-MM-DD'),
        country: formValues?.country?.title,
      };

      mutate(finalData);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const handleCloseModal = () => {
    handleReset();
    onClose();
  };
  const handleSelectEmployee = () => {
    setCurrentStep((ps) => ps + 1);
  };

  return (
    <>
      {isLoading ? (
        <Skeleton
          animation="wave"
          width={'100%'}
          height={40}
          sx={{ background: '#F6F6F6' }}
        />
      ) : (
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
          disableScrollLock
          disableEnforceFocus
          disableRestoreFocus
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              bgcolor: '#fff',
              width: '90%',
              height: '90%',
              minWidth: '70%',
              maxWidth: '1000px',
              display: 'flex',
              flexDirection: 'column',
              gap: 3.5,
              pb: 2.5,
              borderRadius: '10px',
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
              minHeight: '50%',
              maxHeight: '640px',
            }}
          >
            <Navigator
              formSteps={addEmployeeModalFormSteps}
              currentStep={currentStep}
              navigationLabelWidth="80px"
              navigationPadding="14px 0 36px 0"
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: { xs: '96%', md: '95%', lg: '85%' },
                mx: 'auto',
                height: 'calc(100% - 50px )',
                overflow: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: 'gray',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            >
              {addEmployeeModalFormSteps?.map(
                ({ form, data, column, countNo }, stepIndex) => {
                  if (countNo === currentStep) {
                    if (data?.length)
                      return (
                        <Box
                          sx={{
                            width: { xs: '96%', md: '95%', lg: '85%' },
                          }}
                          key={stepIndex}
                        >
                          <AppTable
                            column={column}
                            data={modalStep1FormTableState}
                            minWidth={'750px'}
                            handleClickActionView={handleSelectRow}
                            noPagination
                            isLoading={isLoading}
                          />
                          <Box>
                            <Button
                              disabled={isDisabledNext}
                              variant="contained"
                              sx={{ minWidth: '120px', mb: 1.5 }}
                              onClick={handleSelectEmployee}
                            >
                              {FORM_DATA?.add}
                            </Button>
                          </Box>
                        </Box>
                      );
                    else if (form.length)
                      return (
                        <form onSubmit={handleSubmit} key={stepIndex}>
                          <Grid
                            container
                            sx={{
                              display: 'flex',
                              height: '100%',
                              justifyContent: 'space-between',
                              pb: 2,
                            }}
                          >
                            {form?.map(
                              (
                                {
                                  title,
                                  placeholder,
                                  errorText,
                                  prefixIcon,
                                  type,
                                  suffixIcon,
                                  options,
                                  name,
                                  nested,
                                  selectWithType,
                                  fields,
                                  searchable,
                                  withFlag,
                                },
                                formIndex
                              ) => (
                                <Grid item xs={12} lg={5.5} key={formIndex}>
                                  <FormInput
                                    title={title}
                                    placeholder={placeholder}
                                    errorText={errorText}
                                    prefixIcon={prefixIcon}
                                    type={type}
                                    suffixIcon={suffixIcon}
                                    options={options}
                                    name={name}
                                    width={'100%'}
                                    selectWithType={selectWithType}
                                    searchable={searchable}
                                    withFlag={withFlag}
                                    countries={countriesList}
                                    setFieldValue={setFieldValue}
                                    value={values[name]}
                                    error={errors[name]}
                                    touched={touched}
                                    setFieldError={setFieldError}
                                    errors={errors}
                                    setErrors={setErrors}
                                    values={values}
                                    nested={nested}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    fields={fields}
                                  />
                                </Grid>
                              )
                            )}
                            <Grid
                              item
                              p={'0 10px'}
                              xs={12}
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Button
                                variant="outlined"
                                sx={{
                                  minWidth: '120px',
                                  color: 'teal',
                                  '&:hover': {
                                    background: '#fff',
                                    color: 'teal',
                                  },
                                }}
                                onClick={() => setCurrentStep((ps) => ps - 1)}
                              >
                                Back
                              </Button>
                              <Button
                                sx={{ minWidth: '120px' }}
                                variant="contained"
                                type="submit"
                                disabled={isPending}
                              >
                                {isPending ? (
                                  <CircularProgress
                                    size={26}
                                    color="secondary"
                                  />
                                ) : (
                                  'Submit'
                                )}
                              </Button>
                            </Grid>
                          </Grid>
                        </form>
                      );
                  }
                }
              )}
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default AddEmployeeModal;
