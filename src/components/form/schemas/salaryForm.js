import * as Yup from 'yup';

export const salaryFormSchema = Yup.object({
  job_status: Yup.string().required('Job status is required'),

  gross_salary: Yup.number()
    .typeError('Gross Salary must be a number')
    .required('Gross Salary is required')
    .min(0, 'Gross Salary must be at least Rs. 1')
    .max(1000000, 'Gross Salary cannot exceed Rs. 1,000,000'),
  tax_deduction: Yup.number()
    .typeError('Tax Deduction must be a number')
    .required('Tax Deduction is required')
    .min(0, 'Tax Deduction cannot be less than 0%')
    .max(100, 'Tax Deduction cannot exceed 100%'),
  net_salary: Yup.number()
    .typeError('Net Salary must be a number')
    .required('Net Salary is required')
    .min(0, 'Net Salary cannot be negative')
    .test(
      'is-less-than-gross',
      'Net Salary cannot exceed Gross Salary',
      function (value) {
        const { gross_salary } = this.parent;
        return value <= gross_salary;
      }
    )
    .test(
      'not-equal-when-tax',
      'Net Salary cannot be equal to Gross Salary when Tax Deduction is applied',
      function (value) {
        const { gross_salary, tax_deduction } = this.parent;
        if (tax_deduction > 0) {
          return value !== gross_salary;
        }
        return true;
      }
    ),
  date: Yup.date().required('Date is required'),
  pay_slip: Yup.mixed()
    .required('Pay Slip is required')
    .test(
      'fileFormat',
      'Only PDF files are allowed',
      (value) => value && value.type === 'application/pdf'
    )
    .test(
      'fileSize',
      'File size should not exceed 2MB',
      (value) => value && value.size <= 2 * 1024 * 1024 // Validates file size <= 2MB
    ),
});

export const salaryEditFormSchema = Yup.object({
  job_status: Yup.string().required('Job status is required'),
  gross_salary: Yup.number()
    .typeError('Gross Salary must be a number')
    .required('Gross Salary is required')
    .min(0, 'Gross Salary must be at least Rs. 1')
    .max(1000000, 'Gross Salary cannot exceed Rs. 1,000,000'),
  tax_deduction: Yup.number()
    .typeError('Tax Deduction must be a number')
    .required('Tax Deduction is required')
    .min(0, 'Tax Deduction cannot be less than 0%')
    .max(100, 'Tax Deduction cannot exceed 100%'),
  net_salary: Yup.number()
    .typeError('Net Salary must be a number')
    .required('Net Salary is required')
    .min(0, 'Net Salary cannot be negative')
    .test(
      'is-less-than-gross',
      'Net Salary cannot exceed Gross Salary',
      function (value) {
        const { gross_salary } = this.parent;
        return value <= gross_salary;
      }
    )
    .test(
      'not-equal-when-tax',
      'Net Salary cannot be equal to Gross Salary when Tax Deduction is applied',
      function (value) {
        const { gross_salary, tax_deduction } = this.parent;
        if (tax_deduction > 0) {
          return value !== gross_salary;
        }
        return true;
      }
    ),
  date: Yup.date().required('Date is required'),
  pay_slip: Yup.mixed()
    .test(
      'fileFormat',
      'Only PDF files are allowed',
      (value) => !value || value.type === 'application/pdf' // Allow empty or PDF
    )
    .test(
      'fileSize',
      'File size should not exceed 2MB',
      (value) => !value || value.size <= 2 * 1024 * 1024 // Allow empty or files <= 2MB
    ),
});
