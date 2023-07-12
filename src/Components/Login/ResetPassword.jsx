import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material';


import { useDispatch } from 'react-redux';
import { setAlert } from '../../userSlice';

import backendAxios from "../../backendAxios"
import { useNavigate } from 'react-router-dom';


const ResetPassword = ({ id }) => {
    const dispatch = useDispatch()
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPasword] = useState("")
    const navigate = useNavigate()

    const resetPassword = async () => {

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
                navigate("/forgetpassword/done")
            })
            .catch(function (error) {
                if (error.code) {
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
                    onChange={(e) => { setNewPassword(e.target.value) }}
                    sx={{
                        bgcolor: "login.input",
                        color: "login.mainText",
                        borderRadius: "15px",
                        " & .MuiInputBase-root": {
                            borderRadius: "15px"
                        },
                        '& label.Mui-focused': {
                            color: 'login.labelText',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: 'login.labelText',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'login.labelText',
                            },
                            '&:hover fieldset': {
                                borderColor: 'login.labelText',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'login.labelText',
                            },
                        }
                    }}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="confrmPassword"
                    label="Confirm Password"
                    name="email"
                    autoComplete='email'
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPasword(e.target.value) }}
                    sx={{
                        bgcolor: "login.input",
                        color: "login.mainText",
                        borderRadius: "15px",
                        " & .MuiInputBase-root": {
                            borderRadius: "15px"
                        },
                        '& label.Mui-focused': {
                            color: 'login.labelText',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: 'login.labelText',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'login.labelText',
                            },
                            '&:hover fieldset': {
                                borderColor: 'login.labelText',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'login.labelText',
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
                    onClick={resetPassword}
                >
                    Reset Password
                </Button>
            </Box>
        </Box>

    )
}

export default ResetPassword