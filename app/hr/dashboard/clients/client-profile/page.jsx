'use client';
import React, { useState } from 'react';
import { Grid, Typography, Tabs, Tab } from '@mui/material';
import { Box } from '@mui/system';
import Step from '@/src/components/form/step/Step';
import { formSteps } from '@/src/constants/data/forms/add-client';
import Navigator from '@/src/components/form/step/Navigator';
import Breadcrumb from '@/src/components/form/step/Breadcrumb';
import { clientProfileTabs } from '@/src/constants/data/tabs/hr/client-profile';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';

const AddEmployee = () => {
    const [currentReqTypeTabVal, setcurrentReqTypeTabVal] = useState(0);
    // const [currentReqStatusTab, setcurrentReqStatusTab] = useState('All');
    const [currentTab, setCurrentTab] = useState({
        label:'Hire & onboard',
        val:0,
        nested:{
            label:'Hiring Request',
            val:0
        }
    })
    const handleChangeCurrentTab = (event, newValue) => {
        const current = clientProfileTabs[newValue]
        const {label,nestedTabs} = current
        console.log({newValue,allTabs:clientProfileTabs, curr:clientProfileTabs[newValue]})
        setCurrentTab(ps => {
            return {
                ...ps,
                label,
                val:newValue,
                nested:{
                    label:nestedTabs[0]?.label,
                    val:0
                }
            }
        })
    };
    const handleChangeNestedTab = (event, newValue, data) => {
        const current = data[newValue]
        const {label} = current
        setCurrentTab(ps => {
            return {
                ...ps,
                nested:{
                    label,
                    val:newValue
                }
            }
        })
        console.log({data,current,currNested:data[newValue]})
    }
    return (
        <Box>
            <Breadcrumb root="clients" title="Clients /" currentPage="Profile" />
            <Box mb={'40px'}>
                <Typography
                    sx={{
                        color: '#171717',
                        fontSize: '30px',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        lineHeight: 'normal',
                    }}
                >
                    Profile
                </Typography>
            </Box>
            <Grid container sx={{
                borderRadius: '5px',
                background: '#FFF',
                boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "flex-start", md: "center" },
                position: "relative",
                p: { xs: "10px", md: "18px 25px" }
            }}>
                <Grid item xs={12} lg={4} sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { xs: "flex-start", md: "center" },
                }}>
                    <Box sx={{
                        position: "relative"
                    }}>
                        <Box component="img" src='/icons/Employee.svg'
                            sx={{
                                width: { xs: "70px", md: "100px" },
                                height: { xs: "70px", md: "100px" },
                            }}
                        />
                        <Box component="img" sx={{
                            position: "absolute",
                            right: 0,
                            bottom: 0
                        }}
                            src='/icons/EditIcon.svg' width={35} height={35} />
                    </Box>
                    <Box sx={{
                        ml: { xs: "0px", md: "40px" }
                    }} display={"flex"} flexDirection={"column"}>
                        <Typography sx={{
                            color: '#171717',
                            fontSize: '25px',
                            fontStyle: 'normal',
                            fontWeight: '600',
                            lineHeight: 'normal',
                            mb: { xs: "10px", md: "15px" }
                        }}>John Doe</Typography>
                        <Typography sx={{
                            color: '#595959',
                            fontSize: '16px',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            lineHeight: 'normal',
                        }}>eSpark Consulting Group</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={8} sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { xs: "flex-start", md: "center" },
                    mt: { xs: "15px", lg: "0px" }
                }}>
                    <Grid container>
                        <Grid item xs={12} md={4}>
                            <Box display={"flex"} flexDirection={"column"} >
                                <Box display={"flex"} alignItems={"center"} sx={{ mb: { xs: "10px", md: "25px" } }}>
                                    <Typography sx={{
                                        color: '#595959',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        lineHeight: 'normal',
                                    }}>Client ID:</Typography>
                                    <Typography sx={{
                                        color: '#595959',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        lineHeight: 'normal',
                                    }}>es-00020</Typography>
                                </Box>
                                <Box display={"flex"} alignItems={"center"}>
                                    <Typography sx={{
                                        color: '#595959',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        lineHeight: 'normal',
                                    }}>Marital status:</Typography>
                                    <Typography sx={{
                                        color: '#595959',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        lineHeight: 'normal',
                                    }}>Single</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box display={"flex"} flexDirection={"column"} >
                                <Box display={"flex"} alignItems={"center"} sx={{ mb: { xs: "10px", md: "25px" } }}>
                                    <Typography sx={{
                                        color: '#595959',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        lineHeight: 'normal',
                                    }}>Gender:</Typography>
                                    <Typography sx={{
                                        color: '#595959',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        lineHeight: 'normal',
                                    }}>Male</Typography>
                                </Box>
                                <Box display={"flex"} alignItems={"center"}>
                                    <Typography sx={{
                                        color: '#595959',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        lineHeight: 'normal',
                                    }}>Phone:</Typography>
                                    <Typography sx={{
                                        color: '#595959',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        lineHeight: 'normal',
                                    }}>090078601</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box display={"flex"} flexDirection={"column"} >
                                <Box display={"flex"} alignItems={"center"} sx={{ mb: { xs: "10px", md: "25px" } }}>
                                    <Typography sx={{
                                        color: '#595959',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        lineHeight: 'normal',
                                    }}>Email:</Typography>
                                    <Typography sx={{
                                        color: '#595959',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        lineHeight: 'normal',
                                    }}>doejohn@321.com</Typography>
                                </Box>
                                <Box display={"flex"} alignItems={"center"}>
                                    <Typography sx={{
                                        color: '#595959',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        lineHeight: 'normal',
                                    }}>Birth date:</Typography>
                                    <Typography sx={{
                                        color: '#595959',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        lineHeight: 'normal',
                                    }}>26 Jan,2023</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Box component="img"
                    sx={{
                        position: "absolute",
                        top: { xs: '10px', md: '15px' },
                        right: { xs: '10px', md: '54px' }
                    }}
                    src='/icons/EditIcon.svg' width={35} height={35}
                />
            </Grid>
            <Box sx={{ width: "100%" }}>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    sx={{ borderBottom: 1, borderColor: 'divider', mt: '40px' }}
                >
                    <Tabs
                        value={currentTab.val}
                        onChange={handleChangeCurrentTab}
                        aria-label="basic tabs example"
                        variant="scrollable"
                    >
                        {clientProfileTabs?.map(({ label, prop }, index) => (
                            <Tab
                                key={index}
                                label={`${label}`}
                                {...prop}
                                disableRipple={true}
                            />
                        ))}
                    </Tabs>
                </Box>
                <Box
                    sx={{
                        marginTop: '10px',
                        marginBottom: '20px',
                        borderBottom:
                            currentTab.label !== 'Leave Balance' && 'solid 1px #ccc',
                    }}
                >
                    {clientProfileTabs?.map(({ nestedTabs }, index) => (
                        <CustomTabPanel
                            // value={currentReqTypeTabVal}
                            value={currentTab.val}
                            index={index}
                            key={index}
                        >
                            <Box
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Tabs
                                    variant="scrollable"
                                    value={currentTab.nested.val}
                                    onChange={(ev, newVal) =>
                                        handleChangeNestedTab(
                                            ev,
                                            newVal,
                                            nestedTabs
                                        )
                                    }
                                    aria-label="basic tabs example"
                                >
                                    {
                                        nestedTabs?.map(({ label, prop }, nestedIndex) => (
                                            <Tab
                                                key={nestedIndex}
                                                label={`${label}`}
                                                {...prop}
                                                disableRipple={true}
                                            />
                                        ))
                                    }
                                </Tabs>
                            </Box>
                        </CustomTabPanel>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default AddEmployee;
