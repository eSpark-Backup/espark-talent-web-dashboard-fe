"use client"
import { Badge, Button, Grid, Menu, MenuItem, Tab, Tabs, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useState } from 'react'
import Input from '../dashboard/input'
import Image from 'next/image'
import { inputsData } from '@/src/constants/AllEmployee'
import EmployeeView from './EmployeeView'

const AllEmployee = () => {
    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [designation, setDesignation] = useState("")



    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", padding: "30px" }}>
                <Typography sx={{ color: "#171717", fontSize: "30px", fontWeight: "600" }}>Employees</Typography>
                <Button sx={{ backgroundColor: "#029894", width: "160px", color: "#FFF" }}>Add employee</Button>

            </Box>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                >
                    <Tab
                        value="one"
                        label="All"
                        wrapped
                    />
                    <Tab value="two" label="Active employees" />
                    <Tab value="three" label="Inactive employees" />
                </Tabs>
                <Grid container sx={{ marginTop: "20px", paddingLeft: "20px" }} spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <Input handleChange={(e) => setId(e)} placeHolder={"Employee ID"} prefixIcon={"/icons/searchIconWhite.svg"} name={"id"} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Input handleChange={(e) => setName(e)} placeHolder={"Employee name"} prefixIcon={"/icons/searchIconWhite.svg"} name={"name"} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Input handleChange={(e) => setDesignation(e)} placeHolder={"Employee Designation"} prefixIcon={"/icons/searchIconWhite.svg"} name={"designation"} />
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Button sx={{ backgroundColor: "#029894", color: "#FFF", height: "40px", width: "100%" }}>
                            <Image
                                width={24}
                                height={24}
                                alt="Refresh"
                                src={`/icons/searchIconWhite.svg`}
                            />
                        </Button>
                    </Grid>
                </Grid>
                {value === "one" ? <EmployeeView  status={"All"} /> : value === "two" ? <EmployeeView  status={"Active"} /> : <EmployeeView  status={"Inactive"} />}
            </Box>
        </>
    )
}

export default AllEmployee



