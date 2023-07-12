import React, { useState } from 'react'
import { Box, Button, TextField, Typography, Link, CircularProgress } from '@mui/material';
import { ArrowBackIosNewRounded, } from '@mui/icons-material';

import { useDispatch } from 'react-redux';
import { setAlert } from '../../userSlice';

import backendAxios from "../../backendAxios"
import { useNavigate } from 'react-router-dom';






const EnterEmail = ({ email, setEmail }) => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [progressDisplay, setProgressDisplay] = useState(false)
    const emailSend = async () => {
        setProgressDisplay(true)
        backendAxios.post('/forgetpasswordsendemail', {
            email
        })
            .then(function (response) {
                if (response.data.errMsg || response.data.err) {
                    return dispatch(setAlert({
                        type: "error",
                        data: response.data.errMsg || response.data.err,
                        isOpen: true
                    }))

                    // return alert(response.data.errMsg)
                }

                setProgressDisplay(false)
                dispatch(setAlert({
                    type: "success",
                    data: response.data.msg || response.data,
                    isOpen: true
                }))
                navigate("/forgetpassword/check")
            })
            .catch(function (error) {
                if (error.code) {
                    dispatch(setAlert({
                        type: "error",
                        data: error.code,
                        isOpen: true
                    }))
                }
                console.log("Error in login Frontend: ", error);
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
                Welcome To Watcher
            </Typography>
            <Typography component="h3" variant='h5' sx={{
                my: 2,
                fontSize: {
                    xxs: 15,
                    sm: 20
                },
                color: "login.mainText"
            }}>
                Forget Password
                <Typography component="span" sx={{
                    wordWrap: "wrap",
                    fontSize: {
                        xxs: 10,
                        sm: 12
                    },
                    ml: 1,
                    color: "login.secondaryText"
                }}>
                    <br></br>No worries. we'll send vou reset instructions
                </Typography>
            </Typography>

            <Box
                sx={{ textAlign: "center" }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete='email'
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
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

                <Link href="/login" component="a" sx={{
                    mt: 1,
                    wordWrap: "wrap",
                    fontSize: {
                        xxs: 10,
                        sm: 12
                    },
                    ml: 1,
                    color: "login.secondaryText",
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <ArrowBackIosNewRounded sx={{ fontSize: 10, mr: 1 }} /> Back to Sign in
                </Link>

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
                    onClick={emailSend}
                >
                    Reset Password
                </Button>

                {progressDisplay && <Box sx={{ display: 'flex', width: "100%", justifyContent: "center", mt: 2 }}>
                    <CircularProgress sx={{ color: "login.mainText" }} />
                </Box>}
            </Box>
        </Box>

    )
}

export default EnterEmail