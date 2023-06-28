import React, { useEffect, useState } from 'react'
import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setAlert } from '../../userSlice'
import backendAxios from "../../backendAxios"
const PasswordSecurity = () => {

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const dispatch = useDispatch()


    useEffect(() => {
        if (window.localStorage.getItem("accessToken") === "") {

            window.location.reload();


            backendAxios.interceptors.request.use(request => {
                console.log('Starting Request', JSON.stringify(request, null, 2))
                return request
            })
        }
    }, [])

    const submitButton = () => {
        if (confirmPassword !== newPassword) {
            dispatch(setAlert({
                type: "error",
                data: "Confirm Password Doesn't Match",
                isOpen: true
            }))
            return
        }



        backendAxios.post(`/updatePassword`, {
            password: newPassword
        }).then((response) => {
            if (response.data.errMsg || response.data.err) {
                dispatch(setAlert({
                    type: "error",
                    data: response.data.errMsg || response.data.err,
                    isOpen: true
                }))
                return
            }
            dispatch(setAlert({
                type: "success",
                data: response.data.msg || response.data,
                isOpen: true
            }))
            setNewPassword("")
            setConfirmPassword("")
        })
    }



    return (
        <Stack sx={{
            px: {
                xxs: 1,
                xsm: 5
            },
            py: 3,
            width: {
                xxs: "100%",
                xsm: "fit-content"
            }
        }}>
            <Grid container alignItems={"center"} p={1} justifyContent={{
                xxs: "center",
                xsm: "flex-start"
            }}>
                <Typography sx={{
                    textAlign: {
                        xxs: "center",
                        xsm: "left"
                    },
                    width: {
                        xxs: "100%",
                        xsm: "120px",
                        sm: "150px"
                    }, fontSize: {
                        xxs: "1rem",
                        xsm: "0.8rem",
                        sm: "1rem"
                    }
                }}>New Password: </Typography>

                <TextField id="newPassword" type="password" label="" placeholder='Enter New Password' variant="filled"
                    sx={{
                        minWidth: "200px",
                        width: {
                            xxs: "100%",
                            xsm: "auto"
                        },
                        "& input": {
                            padding: 1,
                            fontSize: "15px",
                        },
                        "& input:focus": {
                            outline: "none"
                        },
                        "& .MuiInputBase-root": {
                            borderRadius: "8px"
                        },



                        m: {
                            xxs: "0",
                            xsm: "0px 16px "
                        },
                        borderRadius: "8px ",
                        bgcolor: "friends.inputColor"
                    }}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    InputProps={{
                        sx: {
                            "&:before": {
                                content: "''",
                                borderBottom: "none !important"
                            },
                            "&:after": {
                                content: "''",
                                borderBottom: "none "
                            }
                        },



                    }}
                />
            </Grid>
            <Grid container alignItems={"center"} p={1} justifyContent={{
                xxs: "center",
                xsm: "flex-start"
            }}>
                <Typography sx={{
                    textAlign: {
                        xxs: "center",
                        xsm: "left"
                    },
                    width: {
                        xxs: "100%",
                        xsm: "120px",
                        sm: "150px"
                    }, fontSize: {
                        xxs: "1rem",
                        xsm: "0.8rem",
                        sm: "1rem"
                    }
                }}>Confirm Password: </Typography>

                <TextField id="confirmPassword" type="email" label="" placeholder='Enter Confirm Password' variant="filled"
                    sx={{
                        minWidth: "200px",
                        width: {
                            xxs: "100%",
                            xsm: "auto"
                        },
                        "& input": {
                            padding: 1,
                            fontSize: "15px",
                        },
                        "& input:focus": {
                            outline: "none"
                        },
                        "& .MuiInputBase-root": {
                            borderRadius: "8px"
                        },



                        m: {
                            xxs: "0",
                            xsm: "0px 16px "
                        },
                        borderRadius: "8px ",
                        bgcolor: "friends.inputColor"
                    }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                        sx: {
                            "&:before": {
                                content: "''",
                                borderBottom: "none !important"
                            },
                            "&:after": {
                                content: "''",
                                borderBottom: "none "
                            }
                        },
                    }}
                />
            </Grid>
            <Button
                sx={{
                    mt: 2,
                    ml: "auto",
                    mr: {
                        xxs: "auto",
                        xsm: 3
                    },
                    bgcolor: "friends.background",
                    color: "leftSideNav.textColor",
                    fontSize: "13px",
                    minHeight: 0,
                    width: "fit-content"
                }}
                onClick={submitButton}
            >Continue</Button>
        </Stack>
    )
}

export default PasswordSecurity