import * as Yup from 'yup';
export const addNewCandidateForm = [
  {
    title: 'Candidate name',
    placeholder: 'Enter candidate name',
    name: 'candidate_name',
    type: 'text',
  },
  {
    title: 'Designation',
    placeholder: 'Enter designation',
    name: 'designation',
    type: 'text',
  },
  {
    title: 'Image',
    name: 'image',
    prefixIcon: 'upload',
    type: 'file',
    filelabel: 'Accept .png, .jpg, .jpeg, or .svg files only',
    accept: '.png, .jpg, .jpeg, .svg',
  },
  {
    title: 'Resume',
    name: 'resume',
    prefixIcon: 'upload',
    type: 'file',
    accept: '.pdf',
    filelabel: 'Accept .pdf file only',
  },
];

export const addNewCandidateFormSchema = Yup.object({
  candidate_name: Yup.string().required('Candidate name is required'),
  designation: Yup.string().required('Designation is required'),
  image: Yup.mixed()
    .required('Image is required')
    .test('fileType', 'Only image files are accepted', (value) => {
      if (!value) return false;
      const allowedTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/svg+xml',
        'image/webp',
      ];
      return value && allowedTypes.includes(value.type);
    }),
  resume: Yup.mixed()
    .required('Resume is required')
    .test('fileType', 'Only PDF files are accepted', (value) => {
      if (!value) return false;
      return value && value.type === 'application/pdf';
    }),
});
