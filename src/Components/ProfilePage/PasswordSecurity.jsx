import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setAlert } from '../../userSlice'
import backendAxios from "../../backendAxios"
const PasswordSecurity = () => {

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const dispatch = useDispatch()
    const [resetPasswordText, setResetPasswordText] = useState("Reset Password")
    const [isProgress, setIsProgress] = useState(false)
    const [errors, setErrors] = useState({
        newPassword: false,
        confirmPassword: false
    })



    useEffect(() => {
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

        if (newPassword.length > 1) {
            // eslint-disable-next-line

            if (errors.newPassword !== passwordRegex.test(newPassword) && errors.confirmPassword !== (confirmPassword === newPassword)) {
                setErrors({ ...errors, newPassword: passwordRegex.test(newPassword), confirmPassword: confirmPassword !== newPassword ? false : true })
            }
            else if (errors.newPassword !== passwordRegex.test(newPassword)) {
                setErrors({ ...errors, newPassword: passwordRegex.test(newPassword) })
            }
        }

        // eslint-disable-next-line
    }, [newPassword])

    useEffect(() => {
        if (confirmPassword.length > 1) {


            if (errors.confirmPassword !== (confirmPassword === newPassword))
                setErrors({ ...errors, confirmPassword: confirmPassword !== newPassword ? false : true })

        }
        // eslint-disable-next-line
    }, [confirmPassword])

    useEffect(() => {
        if (window.localStorage.getItem("accessToken") === "") {
            window.location.reload();
            backendAxios.interceptors.request.use(request => {
                console.log('Starting Request', JSON.stringify(request, null, 2))
                return request
            }).catch((e) => {
                console.log("error in axios ", e)
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
        setResetPasswordText("Please Wait")
        setIsProgress(true)


        backendAxios.post(`/updatePassword`, {
            password: newPassword
        }).then((response) => {
            dispatch(setAlert({
                type: response.data.errMsg || response.data.err ? "error" : "success",
                data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                isOpen: true
            }))
            setResetPasswordText("Reset Password")
            setIsProgress(false)
            if (response.data.errMsg || response.data.err) return
            setNewPassword("")
            setConfirmPassword("")
        }).catch((e) => {
            console.log("error in axios ", e)
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
                        color: !errors.newPassword && newPassword.length > 0 ? "red " : 'login.labelText',
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
                    error={!errors.newPassword && newPassword.length > 0}
                    helperText={!errors.newPassword && newPassword.length > 0 ? "Password must contain One Capital Letter and a special character" : ""}
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

                <TextField id="confirmPassword" type="password" label="" placeholder='Enter Confirm Password' variant="filled"
                    sx={{
                        color: !errors.confirmPassword && confirmPassword.length > 0 ? "red " : 'login.labelText',
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
                    error={!errors.confirmPassword && confirmPassword.length > 0}
                    helperText={!errors.confirmPassword && confirmPassword.length > 0 ? "Passwords doesn't match" : ""}
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
                disabled={!(errors.newPassword && errors.confirmPassword)}
            >
                {resetPasswordText} {isProgress && <CircularProgress sx={{ color: "login.signButtonText", ml: 1 }} />}

            </Button>
        </Stack>
    )
}

export default PasswordSecurity