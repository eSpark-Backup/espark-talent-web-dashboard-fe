import React from 'react'
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const AppTable = ({ column, data }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    {
                        column?.map((item, i) => (
                            <th key={i}>{item}</th>
                        ))
                    }
                </tr>
                <br />
            </thead>
            <tbody>
                {data?.length ? data.map(({ employeeName,
                    gender,
                    jobTitle,
                    roleType,
                    employmentTerm,
                    interviewDateTime,
                    country,
                    status, }, i) => (
                    <React.Fragment key={i}>
                        <tr>
                            <td>{employeeName}</td>
                            <td>{gender}</td>
                            <td>{jobTitle}</td>
                            <td>{roleType}</td>
                            <td>{employmentTerm}</td>
                            <td>{interviewDateTime}</td>
                            <td>{country}</td>
                            <td>{status}</td>
                        </tr>
                        {i < (data?.length - 1) && <br />}
                    </React.Fragment>
                )) : <tr>
                {/* <td></td>
                <td></td>
                <td></td>
                <td></td> */}
                <td colSpan={8}>
                    No Records Found</td>
                {/* <td></td>
                <td></td>
                <td></td> */}
            </tr>}
            </tbody>
        </table>
    )
}


AppTable.propTypes = {
    prefixIcon: PropTypes.array,
    suffixIcon: PropTypes.array,
};

export default AppTable