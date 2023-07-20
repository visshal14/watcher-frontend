import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, Typography, Link, CircularProgress } from '@mui/material';
import { ArrowBackIosNewRounded, } from '@mui/icons-material';

import { useDispatch } from 'react-redux';
import { setAlert } from '../../userSlice';

import backendAxios from "../../backendAxios"
import { useNavigate } from 'react-router-dom';






const EnterEmail = ({ email, setEmail }) => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [isProgress, setIsProgress] = useState(false)
    const [resetText, setResetText] = useState("Reset Password")

    const [errors, setErrors] = useState(false)

    useEffect(() => {

        // eslint-disable-next-line
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (email.length > 1)
            setErrors(emailRegex.test(email))

        // eslint-disable-next-line
    }, [email])


    const emailSend = async () => {
        setResetText("Please Wait")
        setIsProgress(true)
        backendAxios.post('/forgetpasswordsendemail', {
            email
        })
            .then(function (response) {

                dispatch(setAlert({
                    type: response.data.errMsg || response.data.err ? "error" : "success",
                    data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                    isOpen: true
                }))

                if (response.data.errMsg || response.data.err) {
                    setIsProgress(false)
                    setResetText("Reset Password")
                    return

                }
                setResetText("Reset Password")
                setIsProgress(false)
                navigate("/forgetpassword/check")
            })
            .catch(function (error) {
                if (error.code) {
                    setResetText("Reset Password")
                    setIsProgress(false)
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
                    error={!errors && email.length > 0}
                    helperText={!errors && email.length > 0 ? "Please Enter Correct Email" : ""}
                    onChange={(e) => { setEmail(e.target.value) }}
                    sx={{
                        color: "login.mainText",
                        borderRadius: "15px",
                        " & .MuiInputBase-root": {
                            bgcolor: "login.input",
                            borderRadius: "15px"
                        },
                        '& label.Mui-focused': {
                            color: !errors && email.length > 0 ? "red " : 'login.labelText',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: !errors && email.length > 0 ? "red " : 'login.labelText',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: !errors && email.length > 0 ? "red " : 'login.labelText',
                            },
                            '&:hover fieldset': {
                                borderColor: !errors && email.length > 0 ? "red " : 'login.labelText',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: !errors && email.length > 0 ? "red " : 'login.labelText',
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
                    disabled={!errors}
                >
                    {resetText} {isProgress && <CircularProgress sx={{ color: "login.mainText" }} />}
                </Button>


            </Box>
        </Box>

    )
}

export default EnterEmail