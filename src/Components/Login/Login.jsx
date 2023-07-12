import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, IconButton, InputAdornment, Link, Paper, TextField, Typography } from '@mui/material';
import { DarkMode, LightMode, Visibility, VisibilityOff } from '@mui/icons-material';
import jwt_decode from "jwt-decode"
import backendAxios from "../../backendAxios"
import { useDispatch, useSelector } from 'react-redux';
import { setData, setTheme, setAlert } from '../../userSlice';
import { getTheme } from '../../userSlice';
import { googleClient_id } from '../../tmdb';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Login = () => {


    const dispatch = useDispatch()
    const theme = useSelector(getTheme)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [OAuth, setOAuth] = useState(false)
    const handleClick = () => {
        setShowPassword(prev => !prev);
    }
    const submitButton = () => {
        backendAxios.post('/login', {
            email, password
        })
            .then(function (response) {
                if (response.data.errMsg) {

                    dispatch(setAlert({
                        type: "error",
                        data: response.data.errMsg,
                        isOpen: true
                    }))
                    return
                }
                const data = response.data
                dispatch(setData({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    profile_photo: data.profile_photo,
                    friends: data.friends,
                    pending_requests: data.pending_requests,
                    playlists: data.playlists,
                    watch_later: data.watch_later,
                    liked: data.liked,
                    watched: data.watched,
                    shared: data.shared
                }))
                localStorage.setItem("accessToken", response.data.accessToken)
                navigate("/")
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


    function handleCallbackResponse(response) {
        const userObj = jwt_decode(response.credential)
        setEmail(userObj.email)
        setPassword(userObj.iss + "-" + userObj.sub)
        setOAuth(true)

    }
    useEffect(() => {
        if (OAuth) {
            submitButton()
        }
        // eslint-disable-next-line
    }, [OAuth])



    useEffect(() => {
        /* global google */
        window.google.accounts.id.initialize({
            client_id: googleClient_id,
            callback: handleCallbackResponse
        })
        // window.google.accounts.id.prompt()

        window.google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                google.accounts.id.prompt()
            }
        });

        // window.google.accounts.id.renderButton(
        //     document.getElementById("signId"),
        //     { size: "large", theme: "filled_black" }
        // )

        // eslint-disable-next-line
    }, [])

    const themeChange = () => {
        if (theme === "dark") {
            dispatch(setTheme({
                theme: "light"
            }))
        } else {
            dispatch(setTheme({
                theme: "dark"
            }))
        }
    }



    return (
        <Grid container component={Paper} sx={{
            height: "100vh", width: "100vw",
            bgcolor: "background.default"
        }}>

            <Helmet>
                <title>Watcher</title>
            </Helmet>
            <Grid item xxs={12} md={6} order={{ xxs: 2, md: 1 }}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 6,
                    px: {
                        xxs: 2,
                        xs: 6,
                    },
                    height: {
                        xxs: "70%",
                        md: "100%",
                    }
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
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
                            xxs: 20,
                            sm: 25
                        },
                        color: "login.mainText"
                    }}>
                        SignIn To Continue
                    </Typography>
                    <Typography component="p" sx={{
                        wordWrap: "wrap",
                        fontSize: {
                            xxs: 12,
                            sm: 15
                        },
                        color: "login.secondaryText"
                    }}>
                        Don’t have an account? <Link href="/register" component="a"
                            sx={{ color: "login.mainText", textDecoration: "underline !important" }}

                        >Create a account</Link> is takes
                        less than a minute
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
                            autoFocus
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


                        <TextField
                            InputProps={{
                                endAdornment:
                                    (< InputAdornment position="end" >
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClick}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>)

                            }}
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            onChange={(e) => { setPassword(e.target.value) }}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete='current-password'
                            variant="outlined"
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
                        <Link href="/forgetpassword/email" component="a"
                            sx={{ color: "login.mainText" }}
                        >Forget Password</Link>
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
                            onClick={submitButton}
                        >
                            Sign In
                        </Button>
                        {/* <div id="signId"></div> */}
                    </Box>
                </Box>
            </Grid >

            <Grid item order={{ xxs: 1, md: 2 }} xxs={12} md={6}
                sx={{
                    bgcolor: "login.leftPart",
                    height: {
                        xxs: "30%",
                        md: "100%",
                    },

                    borderRadius: {
                        md: "50px 0 0 50px",
                        xxs: "0 0 50px 50px"
                    },
                }} />


            <IconButton sx={{
                position: "absolute",
                bottom: 0,
                left: 0
            }}
                onClick={themeChange}>

                {theme === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>


        </Grid >
    )
}

export default Login






