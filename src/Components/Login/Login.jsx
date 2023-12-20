import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Grid, IconButton, InputAdornment, Link, Paper, TextField, Typography } from '@mui/material';
import { DarkMode, LightMode, Visibility, VisibilityOff } from '@mui/icons-material';
import jwt_decode from "jwt-decode"
import backendAxios from "../../backendAxios"
import { useDispatch, useSelector } from 'react-redux';
import { setData, setTheme, setAlert } from '../../userSlice';
import { getTheme } from '../../userSlice';
import { googleClient_id } from '../../tmdb';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// eslint-disable-next-line
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Capacitor } from '@capacitor/core';
// import { Keyboard } from '@capacitor/keyboard';



const Login = () => {


    const dispatch = useDispatch()
    const theme = useSelector(getTheme)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isOAuth, setIsOAuth] = useState(false)
    const [signInText, setSignInText] = useState("Sign In")
    const [isProgress, setIsProgress] = useState(false)
    const [keyboardHeight, setKeyboardHeight] = useState(0)
    const [errors, setErrors] = useState({
        password: false,
        email: false
    })
    const handleClick = () => {
        setShowPassword(prev => !prev);
    }

    useEffect(() => {

        if (!isOAuth) {
            // eslint-disable-next-line
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            if (email.length > 1)
                setErrors({ ...errors, email: emailRegex.test(email) })
        } else {
            setErrors({ ...errors, email: true })
        }
        // eslint-disable-next-line
    }, [email, isOAuth])

    useEffect(() => {

        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        if (!isOAuth)
            if (password.length > 1)
                setErrors({ ...errors, password: passwordRegex?.test(password) })

        // eslint-disable-next-line
    }, [password, isOAuth])

    const submitButton = () => {
        // console.log("submit")
        setSignInText("Please Wait")
        setIsProgress(true)
        backendAxios.post('/login', {
            email, password
        })
            .then(function (response) {
                // console.log(response.data)
                if (response.data.errMsg) {

                    setSignInText("Sign In")
                    setIsProgress(false)
                    dispatch(setAlert({
                        type: "error",
                        data: response.data.errMsg,
                        isOpen: true
                    }))
                    return
                }


                dispatch(setData(response.data))
                localStorage.setItem("accessToken", response.data.accessToken)
                navigate("/")
            })
            .catch(function (error) {
                if (error.code) {
                    setSignInText("Sign In")
                    setIsProgress(false)
                    dispatch(setAlert({
                        type: "error",
                        data: error.code,
                        isOpen: true
                    }))
                }
                // console.log("Error in login Frontend: ", error);
            });


    }


    function handleCallbackResponse(response) {
        const userObj = jwt_decode(response.credential)
        // console.log(userObj)
        setEmail(userObj.email)
        setPassword(userObj.iss + "-" + userObj.sub)
        setIsOAuth(true)

    }
    useEffect(() => {
        if (isOAuth) {
            submitButton()
        }
        // eslint-disable-next-line
    }, [isOAuth])



    useEffect(() => {


        if (!window?.google?.accounts?.id) {
            // console.log("capacitor12345")
            // eslint-disable-next-line
            try {

                GoogleAuth?.init();
                setTimeout(async () => {
                    const x = await GoogleAuth.signIn();
                    console.log(x)
                    // console.log(x.email)
                    setEmail(x.email)
                    setPassword("https://accounts.google.com-" + x.id)
                    // https://accounts.google.com-100478867211187871333
                    // console.log(x.iss + "-" + x.sub)
                    setIsOAuth(true)

                }, 3000)
            } catch (e) {
                console.log(e)
            }
        }

        /* global google */

        if (window.google) {

            window.google.accounts.id.initialize({
                client_id: googleClient_id,
                callback: handleCallbackResponse
            })
            window.google.accounts.id.prompt((notification) => {

                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                    document.cookie = `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                    google.accounts.id.prompt()
                }
            });
        }
        // window.google.accounts.id.prompt()


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

    useEffect(() => {
        if (Capacitor.getPlatform() === "android") {

            setKeyboardHeight(320)


        } else {
            setKeyboardHeight(0)
        }
    }, [])

    return (
        <Grid container component={Paper} sx={{

            // minHeight: "100vh",
            height: `calc(100vh + ${keyboardHeight}px )`,
            width: "100vw",
            bgcolor: "background.default",
            minHeight: "700px"
        }}>

            <Helmet>
                <title>Watcher</title>
            </Helmet>


            <IconButton sx={{
                position: "absolute",
                top: 10,
                left: 10
            }} href="/">
                <img src={"/watcherlogo.png"} alt="logo" style={{ width: "30px", height: "30px" }} />

            </IconButton>

            <Grid item xxs={12} md={6} order={{ xxs: 2, md: 1 }}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 6,
                    px: {
                        xxs: 1,
                        xs: 2,
                        sm: 6
                    },
                    height: {
                        xxs: "70%",
                        md: "100%",
                    },
                    pb: `${keyboardHeight}px`
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
                            value={email}
                            error={!errors.email && email.length > 0}
                            helperText={!errors.email && email.length > 0 ? "Please Enter Correct Email" : ""}
                            onChange={(e) => { setEmail(e.target.value) }}
                            sx={{
                                color: !errors.email && email.length > 0 ? "login.mainText" : "red",
                                borderRadius: "15px",
                                " & .MuiInputBase-root": {
                                    bgcolor: "login.input",
                                    borderRadius: "15px"
                                },
                                '& label.Mui-focused': {
                                    color: !errors.email && email.length > 0 ? "red " : 'login.labelText',
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: !errors.email && email.length > 0 ? "red " : 'login.labelText',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: !errors.email && email.length > 0 ? "red " : 'login.labelText',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: !errors.email && email.length > 0 ? "red " : 'login.labelText',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: !errors.email && email.length > 0 ? "red " : 'login.labelText',
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
                            error={!errors.password && password.length > 0 && !isOAuth}
                            helperText={!errors.password && password.length > 0 && !isOAuth ? "Password must contain One Capital Letter and a special character" : " "}
                            variant="outlined"
                            sx={{
                                color: !errors.password && password.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                borderRadius: "15px",
                                " & .MuiInputBase-root": {
                                    bgcolor: "login.input",
                                    borderRadius: "15px"
                                },
                                '& label.Mui-focused': {
                                    color: 'login.labelText',
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: !errors.password && password.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: !errors.password && password.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: !errors.password && password.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: !errors.password && password.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                    },
                                }
                            }}
                        />
                        <Link href="/forgetpassword/email" component="a"
                            sx={{ color: "login.mainText", textDecoration: "underline !important" }}
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

                            disabled={!(errors.email && errors.password && !isOAuth)}
                            onClick={submitButton}>
                            {signInText} {isProgress && <CircularProgress sx={{ color: "login.signButtonText", ml: 1 }} />}
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
                top: 0,
                right: 0
            }}
                onClick={themeChange}>

                {theme === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>


        </Grid >
    )
}

export default Login






