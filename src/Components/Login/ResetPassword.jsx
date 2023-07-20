import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../userSlice';
import backendAxios from "../../backendAxios"
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const ResetPassword = ({ id }) => {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch()
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPasword] = useState("")
    const navigate = useNavigate()
    const [resetPasswordText, setResetPasswordText] = useState("Reset Password")
    const [isProgress, setIsProgress] = useState(false)

    const [errors, setErrors] = useState({
        newPassword: false,
        confirmPassword: false
    })
    const handleClick = () => {
        setShowPassword(prev => !prev);
    }
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
            // eslint-disable-next-line
            if (errors.confirmPassword !== (confirmPassword === newPassword))
                setErrors({ ...errors, confirmPassword: confirmPassword !== newPassword ? false : true })
        }
        // eslint-disable-next-line
    }, [confirmPassword])




    const resetPassword = async () => {

        setResetPasswordText("Please Wait")
        setIsProgress(true)

        if (newPassword !== confirmPassword) {
            return dispatch(setAlert({
                type: "error",
                data: "Password Doesn't Match",
                isOpen: true
            }))
        }

        backendAxios.post('/resetPassword', {
            password: newPassword
        }, {
            headers: { 'authorization': `Bearer ${id}` }
        })
            .then(function (response) {

                dispatch(setAlert({
                    type: response.data.errMsg || response.data.err ? "error" : "success",
                    data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                    isOpen: true
                }))
                if (response.data.errMsg || response.data.err) {


                    setResetPasswordText("Reset Password")
                    setIsProgress(false)

                    return
                }
                setResetPasswordText("Reset Password")
                setIsProgress(false)

                navigate("/forgetpassword/done")
            })
            .catch(function (error) {

                if (error.code) {
                    setResetPasswordText("Reset Password")
                    setIsProgress(true)
                    dispatch(setAlert({
                        type: "error",
                        data: error.code,
                        isOpen: true
                    }))
                }
                navigate("/login")
            });

    }


    return (


        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center"
            }}>
            <Typography component="h1" variant='h3' sx={{
                mb: 2,
                fontWeight: "bold",
                fontSize: {
                    xxs: 25,
                    sm: 30,
                    md: 40
                },
                color: "login.mainText"
            }} >
                Set New Password
            </Typography>
            <Typography component="h3" variant='h5' sx={{
                my: 2,
                fontSize: {
                    xxs: 10,
                    sm: 12
                },
                color: "login.secondaryText"
            }}>
                Forget Password
                Your new Password must be different to previously
                used passwords

            </Typography>

            <Box
                sx={{ textAlign: "center" }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Enter New Password"
                    name="password"
                    type="password"
                    autoComplete='email'
                    value={newPassword}
                    error={!errors.newPassword && newPassword.length > 0}
                    helperText={!errors.newPassword && newPassword.length > 0 ? "Password must contain One Capital Letter and a special character" : " "}
                    onChange={(e) => { setNewPassword(e.target.value) }}
                    sx={{
                        color: !errors.newPassword && newPassword.length > 0 ? "red " : 'login.labelText',
                        borderRadius: "15px",
                        " & .MuiInputBase-root": {
                            borderRadius: "15px",
                            bgcolor: "login.input",
                        },
                        '& label.Mui-focused': {
                            color: !errors.newPassword && newPassword.length > 0 ? "red " : 'login.labelText',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: !errors.newPassword && newPassword.length > 0 ? "red " : 'login.labelText',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: !errors.newPassword && newPassword.length > 0 ? "red " : 'login.labelText',
                            },
                            '&:hover fieldset': {
                                borderColor: !errors.newPassword && newPassword.length > 0 ? "red " : 'login.labelText',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: !errors.newPassword && newPassword.length > 0 ? "red " : 'login.labelText',
                            },
                        }
                    }}
                />


                <TextField

                    InputProps={{
                        endAdornment:
                            (< InputAdornment position="end" >
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClick}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff sx={{ color: !errors.confirmPassword && confirmPassword.length > 0 ? "red " : 'login.labelText' }} /> : <Visibility sx={{ color: !errors.confirmPassword && confirmPassword.length > 0 ? "red " : 'login.labelText' }} />}
                                </IconButton>
                            </InputAdornment>)
                    }}

                    margin="normal"
                    required
                    fullWidth
                    id="confrmPassword"
                    label="Confirm Password"
                    name="confirmpassword"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    error={!errors.confirmPassword && confirmPassword.length > 0}
                    helperText={!errors.confirmPassword && confirmPassword.length > 0 ? "Passwords doesn't match" : " "}

                    onChange={(e) => { setConfirmPasword(e.target.value) }}
                    sx={{
                        color: !errors.confirmPassword && confirmPassword.length > 0 ? "red " : 'login.labelText',
                        borderRadius: "15px",
                        " & .MuiInputBase-root": {
                            bgcolor: "login.input",
                            borderRadius: "15px"
                        },
                        '& label.Mui-focused': {
                            color: !errors.confirmPassword && confirmPassword.length > 0 ? "red " : 'login.labelText',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: !errors.confirmPassword && confirmPassword.length > 0 ? "red " : 'login.labelText',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: !errors.confirmPassword && confirmPassword.length > 0 ? "red " : 'login.labelText',
                            },
                            '&:hover fieldset': {
                                borderColor: !errors.confirmPassword && confirmPassword.length > 0 ? "red " : 'login.labelText',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: !errors.confirmPassword && confirmPassword.length > 0 ? "red " : 'login.labelText',
                            },
                        }
                    }}
                />




                <Button type="submit"
                    fullWidth
                    variant='contained'
                    sx={{
                        color: "login.signButtonText",
                        bgcolor: "login.signButton",
                        mt: 3,
                        mb: 0.5,
                        borderRadius: "10px",
                        fontSize: "20px",
                        "&:hover ": {
                            backgroundColor: "login.signButton",
                            transform: "scale(1.01)"
                        },
                    }}
                    disabled={!(errors.newPassword && errors.confirmPassword)}
                    onClick={resetPassword}
                >

                    {resetPasswordText} {isProgress && <CircularProgress sx={{ color: "login.signButtonText", ml: 1 }} />}
                </Button>
            </Box>
        </Box>

    )
}

export default ResetPassword