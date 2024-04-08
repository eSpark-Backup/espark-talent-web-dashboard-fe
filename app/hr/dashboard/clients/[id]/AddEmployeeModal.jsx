import AppTable from '@/src/components/appTableNew/AppTable';
import { addEmployeModalFormSchema } from '@/src/components/form/schemas/addEmployeeModal';
import Navigator from '@/src/components/form/step/Navigator';
import FormInput from '@/src/components/form/ui-elements/FormInput';
import { Toast } from '@/src/components/Toast/Toast';
import { addEmployeeModalFormSteps } from '@/src/constants/data/forms/add-employee-modal';
import { FORM_DATA } from '@/src/constants/form';
import {
  getOutsourceableEmps,
  selectEmployeeToAdd,
} from '@/src/redux/slices/hrSlices/clientSlice';
import { api } from '@/src/services/apiService';
import { HR_OUTSOURCEABLE_EMPS } from '@/src/services/apiService/apiEndPoints';
import { Box, Button, Grid, Modal } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AddEmployeeModal = ({ open, onClose }) => {
  const { mutate } = useMutation({
    mutationFn: async (formVals) => {
      return api.postJSONData(
        `${HR_OUTSOURCEABLE_EMPS}?c_email=${email}`,
        formVals
      );
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Data posted successfully');
      console.log({ data });
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const dispatch = useDispatch();
  const { currentClient, outsourceableEmployees, currentEmpToAddInClient } =
    useSelector((state) => state?.hr?.clients);
  const { email } = currentClient;
  const [currentStep, setCurrentStep] = useState(1);
  const [isDisabledNext, setIsDisabledNext] = useState(true);
  const [modalStep1FormTableState, setModalStep1FormTableState] = useState([]);
  useEffect(() => {
    setModalStep1FormTableState(outsourceableEmployees);
  }, [outsourceableEmployees]);

  const handleSelectRow = (employeeId) => {
    dispatch(selectEmployeeToAdd(employeeId));
    console.log({ employeeId });
    const tempForm = [...modalStep1FormTableState];
    const employeeIndex = tempForm.findIndex((el) => el.id === employeeId);
    tempForm[employeeIndex] = {
      ...tempForm[employeeIndex],
      isSelected: !tempForm[employeeIndex].isSelected,
    };
    console.log({ employeeIndex, tempForm, slctd: tempForm[employeeIndex] });
    setModalStep1FormTableState(tempForm);
    setIsDisabledNext(false);
  };

  const { isLoading } = useQuery({
    staleTime: 1000,
    queryKey: ['get-outsourceable-emp-query'],
    queryFn: async () => {
      return api
        .getData(`${HR_OUTSOURCEABLE_EMPS}?c_email=${email}&tab=active`)
        .then(({ data }) => {
          const tempData = data?.length
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
          console.log({ err });
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
    initialValues: {},
    validationSchema: addEmployeModalFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const finalData = {
        ...formValues,
        id: currentEmpToAddInClient,
        joining_date: dayjs(formValues.joining_date).format('YYYY-MM-DD'),
      };
      console.log({ formValues, finalData });
      mutate(finalData);
      handleCloseModal();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const handleCloseModal = () => {
    handleReset();
    setCurrentStep(2);
    onClose();
  };
  const handleSelectEmployee = () => {
    setCurrentStep((ps) => ps + 1);
  };

  return (
    <>
      {isLoading ? (
        'Loading...'
      ) : (
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              bgcolor: '#fff',
              width: { xs: '100%', sm: '90%', md: '55%' },
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '10px',
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
              overflowY: 'auto',
              maxHeight: '90%',
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
                p: { xs: '20px', md: '30px 100px' },
              }}
            >
              {addEmployeeModalFormSteps.map(
                ({ form, data, column, countNo }, stepIndex) => {
                  if (countNo === currentStep) {
                    if (data?.length)
                      return (
                        <Box
                          sx={{
                            maxWidth: '100%',
                            overflowX: 'auto',
                          }}
                          key={stepIndex}
                        >
                          <AppTable
                            column={column}
                            data={modalStep1FormTableState}
                            minWidth="100%"
                            handleClickActionView={handleSelectRow}
                            noPagination
                          />
                          <Box>
                            <Button
                              disabled={isDisabledNext}
                              variant="contained"
                              sx={{ minWidth: '120px' }}
                              // onClick={() => setCurrentStep((ps) => ps + 1)}
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
                            sx={
                              {
                                // padding: { xs: '10px 20px', lg: '41px 100px' },
                              }
                            }
                          >
                            {form.map(
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
                                  fields,
                                },
                                formIndex
                              ) => (
                                <>
                                  <Grid item xs={12} lg={5}>
                                    <FormInput
                                      key={formIndex}
                                      title={title}
                                      placeholder={placeholder}
                                      errorText={errorText}
                                      prefixIcon={prefixIcon}
                                      type={type}
                                      suffixIcon={suffixIcon}
                                      options={options}
                                      name={name}
                                      setFieldValue={setFieldValue}
                                      value={values[name]}
                                      error={errors[name]}
                                      touched={touched}
                                      setFieldError={setFieldError}
                                      errors={errors}
                                      setErrors={setErrors}
                                      values={values}
                                      nested={nested}
                                      lg={12}
                                      fields={fields}
                                    />
                                  </Grid>
                                  {formIndex % 2 === 0 && (
                                    <Grid item xs={12} lg={2}></Grid>
                                  )}
                                </>
                              )
                            )}
                            <Grid item p={'0 10px'} xs={12}>
                              <Button
                                sx={{ minWidth: '120px' }}
                                variant="contained"
                                type="submit"
                              >
                                Submit
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
