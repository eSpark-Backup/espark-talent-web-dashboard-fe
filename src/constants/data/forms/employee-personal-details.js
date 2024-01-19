import { jobTitles } from "../dropdown.js/startHiring";


export const personalDetailsForm = [
    {
        title: 'Employee name',
        placeholder: 'John Doe',
        name: 'employeeName',
    },
    {
        title: 'Employee ID',
        placeholder: 'eS000020',
        name: 'employeeId',
    },
    {
        title: 'Birth Date',
        placeholder: 'DD-MM-YYYY',
        suffixIcon: 'calender',
        type: 'date',
        name: 'dateOfBirth',
    },
    {
        title: 'Gender',
        placeholder: 'Select',
        name: 'gender',
        type: 'select',
        options: [
            {
                label: 'Male',
            },
            {
                label: 'Female',
            },
        ],
    },
    {
        title: 'Email',
        placeholder: 'Enter email',
        name: 'email',
    },
    {
        title: 'Team',
        placeholder: 'johndoe@1123.com',
        name: 'team',
    },
    {
        title: 'Job title',
        placeholder: 'Select job',
        type: 'select',
        nested: true,
        options: jobTitles,
        name: 'jobTitle',
    },
    {
        title: 'Joining Date',
        placeholder: 'DD-MM-YYYY',
        suffixIcon: 'calender',
        type: 'date',
        name: 'dateOfJoining',
    },

    {
        title: 'Marital status',
        placeholder: 'Select',
        name: 'maritalStatus',
        type: 'select',
        defaultValue: 'Married',

        options: [
            {
                label: 'Married',
            },
            {
                label: 'Single',
            },
        ],
    },

];