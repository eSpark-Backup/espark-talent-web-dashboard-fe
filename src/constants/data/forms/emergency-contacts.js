// export const formEmergencyPrimaryContact = [
//     {
//         title: 'Name',
//         placeholder: 'John Doe',
//         name: 'name1',
//     },
//     {
//         title: 'Relationship',
//         placeholder: 'Father',
//         name: 'relation1',
//     },
//     {
//         title: 'Phone',
//         placeholder: '0330012378',
//         name: 'phoneNumber1',
//     },
//     {
//         title: 'Phone',
//         placeholder: '0330012378',
//         name: 'phoneNumber2',
//     },
// ];

import { emergencyContactsSchema } from "@/src/components/form/schemas/emergencyContact";

export const formEmergencySecondaryContact = [
    {
        title: 'Name',
        placeholder: 'John Doe',
        name: 'name2',
    },
    {
        title: 'Relationship',
        placeholder: 'Father',
        name: 'relation2',
    },
    {
        title: 'Phone',
        placeholder: '0330012378',
        name: 'phoneNumber3',
    },
    {
        title: 'Phone',
        placeholder: '0330012378',
        name: 'phoneNumber4',
    },
];
export const formEmergencyContact = [
    {
        label: 'Primary Contract',
        fields: [
            {
                title: 'Name',
                placeholder: 'Enter name',
                name: 'name1',
            },
            {
                title: 'Relation',
                placeholder: 'Enter relation',
                name: 'relation1',
            },
            {
                title: 'Phone number',
                placeholder: 'Enter phone number',
                name: 'phoneNumber1',
            },
        ],
    },
    {
        label: 'Seconday Contract',
        fields: [
            {
                title: 'Name',
                placeholder: 'Enter name',
                name: 'name2',
            },
            {
                title: 'Relation',
                placeholder: 'Enter relation',
                name: 'relation2',
            },
            {
                title: 'Phone number',
                placeholder: 'Enter phone number',
                name: 'phoneNumber2',
            },
        ],
    },
];


export const formEmergency = [
    {
        schema: emergencyContactsSchema,
        form: formEmergencyContact,
    },

];