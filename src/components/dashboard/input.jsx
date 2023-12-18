import React from 'react'
import { Box, InputAdornment } from '@mui/material'
import PropTypes from 'prop-types';

const Input = ({prefixIcon,suffixIcon,handleChange,value,setIsLoading}) => {
    return (
        <Box display={"flex"} alignItems={"center"} marginY={5} borderRadius={1} width={300}>
            <Box display={"flex"} alignItems={"center"} sx={{ border: "solid 1px #ccc" }} padding={1} borderRadius={1} width={"100%"}>
                {!!prefixIcon && <InputAdornment position="start"><img src={`/icons/SearchIcon.svg`} /></InputAdornment>}
                <input value={value} onChange={(e) => {
                    setIsLoading(true)
                    handleChange(e?.target?.value)
                }} className="search-input" placeholder="Search..." style={{ overflow: "hidden", width: "100%" }} />
            </Box>
            {!!suffixIcon && <InputAdornment sx={{ marginX: 1 }}><img src='/icons/QuestionMarkIcon.svg' /></InputAdornment>}
        </Box>
    )
}

Input.propTypes = {
    prefixIcon: PropTypes.string,
    suffixIcon: PropTypes.string,
    handleChange:PropTypes.func,
    value:PropTypes.string,
    setIsLoading:PropTypes.func,
  };

export default Input