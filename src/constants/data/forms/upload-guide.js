export const uploadGuideForm = [
  {
    title: 'Guide name',
    placeholder: 'Enter guide name',
    name: 'guide',
  },
  {
    title: 'Language',
    placeholder: 'Select',
    type: 'select',
    name: 'language',
    options: [
      {
        label: 'Arabic',
      },
      {
        label: 'English',
      },
    ],
  },
  {
    title: 'Description',
    placeholder: 'Write here',
    name: 'description',
  },
  {
    title: 'Upload',
    placeholder: 'Upload guide (pdf)',
    prefixIcon: 'upload',
    type: 'file',
    name: 'guide_doc',
    accept: '.pdf',
    filelabel: 'Accept .pdf files only',
  },
];
