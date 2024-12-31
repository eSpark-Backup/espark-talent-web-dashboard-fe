export const salaryForm = [
  {
    title: 'Job Status',
    placeholder: 'Select employement Status',
    type: 'select',
    options: [
      {
        label: 'Internship',
      },
      {
        label: 'Probation',
      },
      {
        label: 'Part-Time',
      },
      {
        label: 'Permenent',
      },
    ],
    name: 'job_status',
  },
  {
    title: 'Gross Salary(Rs)',
    placeholder: 'Enter gross salary',
    name: 'gross_salary',
    type: 'number',
  },
  {
    title: 'Tax Deduction(%)',
    placeholder: 'Enter tax deduction',
    name: 'tax_deduction',
    type: 'number',
  },
  {
    title: 'Net Salary(Rs)',
    placeholder: 'Enter net salary',
    name: 'net_salary',
    type: 'number',
  },
  {
    title: 'Date',
    name: 'date',
    type: 'date',
  },
  {
    title: 'Pay Slip',
    placeholder: 'Upload pay slip',
    name: 'pay_slip',
    prefixIcon: 'upload',
    type: 'file',
    filelabel: 'Accept .pdf file only',
    accept: '.pdf',
  },
];
