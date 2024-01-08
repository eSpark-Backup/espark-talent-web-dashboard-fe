"use client"
import { allEmployees } from '@/src/constants/AllEmployee'
import { Badge, Grid, Menu, MenuItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'
import React, { useState } from 'react'

const EmployeeView = ({ status }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Grid container sx={{ marginTop: "20px", paddingLeft: "20px" }} rowGap={3} spacing={3}>

                {allEmployees?.filter((eachItem) => {
                    if (status === "All") {
                        return true
                    }
                    else if (status === "Active") {
                        return eachItem.status === "Active"
                    }
                    else {
                        return eachItem.status === "Inactive"

                    }
                }).map((eachItem, index) => (
                    <Grid item xs={12} md={4} lg={3} key={index}>
                        <Box sx={{ width: "100%", minHeight: "200px", backgroundColor: "#F6F6F6", borderRadius: "5px", boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.30)", padding: '20px 15px 10px 15px' }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Box sx={{ width: "20%" }}>
                                    <Badge color={eachItem.status === "Active" ? "primary" : "secondary"} variant="dot" />
                                </Box>
                                <Box sx={{ width: "60%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap: "5px" }}>
                                    <Image src={"/icons/Employee.svg"} width={100} height={30} />
                                    <Typography sx={{ color: "#171717", fontSize: "16px", fontWeight: "400", textAlign: "center" }}>{eachItem.name}</Typography>
                                    <Typography sx={{ color: "#595959", fontSize: "16px", textAlign: "center" }}>{eachItem.role}</Typography>
                                </Box>
                                <Box sx={{ width: "10%" }}>
                                    <Image width={24}
                                        height={24} src={`/icons/ellipse.svg`} style={{ cursor: "pointer" }} onClick={handleClick} />
                                    <Menu
                                        id="demo-positioned-menu"
                                        aria-labelledby="demo-positioned-button"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>Remove</MenuItem>
                                    </Menu>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                ))
                }

            </Grid>
        </>
    )
}

export default EmployeeView
