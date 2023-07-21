import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, CircularProgress, Grid, IconButton, Input, InputAdornment, InputLabel, Link, TextField, Typography, } from '@mui/material';
import { DarkMode, LightMode, Visibility, VisibilityOff } from '@mui/icons-material';
import jwt_decode from "jwt-decode"
import backendAxios from "../../backendAxios"
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, setAlert } from '../../userSlice';
import { getTheme } from '../../userSlice';
import { useNavigate } from 'react-router-dom';
import { googleClient_id } from '../../tmdb';
import { Helmet } from 'react-helmet';

const Register = () => {

    const dispatch = useDispatch()
    const theme = useSelector(getTheme)
    const navigate = useNavigate()


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [profilePhoto, setProfilePhoto] = useState("")
    const [isOAuth, setIsOAuth] = useState(false)
    const [OAuthProfilePhoto, setOAuthProfilePhoto] = useState("")
    const [signUpText, setSignUpText] = useState("Sign Up")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isProgress, setIsProgress] = useState(false)

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        password: false,
        email: false,
        confirmPassword: false
    })

    // useEffect(() => {
    //     console.log(errors)
    // }, [errors])
    const handleClick = () => {
        setShowPassword(prev => !prev);
    }
    const confirmPasswordIcon = () => {
        setShowConfirmPassword(prev => !prev);
    }

    useEffect(() => {
        // eslint-disable-next-line
        if (!isOAuth)
            setErrors({ ...errors, firstName: firstName.length > 2 ? true : false, lastName: lastName.length > 1 ? true : false })
        // eslint-disable-next-line
    }, [firstName, lastName, isOAuth])

    useEffect(() => {
        // eslint-disable-next-line
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!isOAuth)
            if (email.length > 1)
                setErrors({ ...errors, email: emailRegex?.test(email) })

        // eslint-disable-next-line
    }, [email, isOAuth])

    useEffect(() => {
        // eslint-disable-next-line
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        if (!isOAuth) {
            if (password.length > 1) {


                if (errors.password !== passwordRegex.test(password) && errors.confirmPassword !== (confirmPassword === password)) {
                    setErrors({ ...errors, password: passwordRegex.test(password), confirmPassword: confirmPassword !== password ? false : true })
                }
                else if (errors.password !== passwordRegex.test(password)) {
                    setErrors({ ...errors, password: passwordRegex.test(password) })
                }
            }
        }
        // eslint-disable-next-line
    }, [isOAuth, password])


    useEffect(() => {


        if (!isOAuth) {
            if (confirmPassword.length > 1) {
                // eslint-disable-next-line

                if (errors.confirmPassword !== (confirmPassword === password))
                    setErrors({ ...errors, confirmPassword: confirmPassword !== password ? false : true })

            }
        }
        // eslint-disable-next-line
    }, [confirmPassword, isOAuth])



    const submitButton = async () => {
        setSignUpText("Please Wait")
        setIsProgress(true)

        backendAxios.post('/register', {
            file: profilePhoto,
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            OAuth: isOAuth,
            OAuthProfilePhoto: OAuthProfilePhoto
        }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(function (response) {

                dispatch(setAlert({
                    type: response.data.errMsg || response.data.err ? "error" : "success",
                    data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                    isOpen: true
                }))

                if (response.data.errMsg || response.data.err) {
                    setSignUpText("Sign Up")
                    setIsProgress(false)

                    if (response.data.errMsg === "Please Login Using Email And Password" || response.data.err === "Please Login Using Email And Password") {
                        navigate("/login")
                    }
                    return

                }


                navigate("/login")

            })
            .catch(function (error) {
                setSignUpText("Sign Up")
                setIsProgress(false)
                dispatch(setAlert({
                    type: "error",
                    data: error.message,
                    isOpen: true
                }))
                console.log("Error in login Frontend: ", error);
            });
    }

    const fileUploadRef = useRef()







    function handleCallbackResponse(response) {
        const userObj = jwt_decode(response.credential)
        const uniqueId = userObj.iss + "-" + userObj.sub
        setIsOAuth(true)
        setEmail(userObj.email)
        setPassword(uniqueId)
        setFirstName(userObj.given_name)
        setlastName(userObj.family_name)
        setOAuthProfilePhoto(userObj.picture)
    }
    useEffect(() => {
        if (isOAuth) {
            submitButton()
        }
        // eslint-disable-next-line
    }, [isOAuth])


    useEffect(() => {
        /* global google */
        try {
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

        } catch (e) {
            console.log("Error in Google Callback  " + e)
        }

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
        <Grid container sx={{
            // minHeight: "100vh",
            height: { xxs: "fit-content", md: "100vh" }, width: "100vw",
            overflow: "scroll",
            bgcolor: "background.default",
            minHeight: "700px"
        }}>

            <Helmet>
                <title>Watcher</title>
            </Helmet>

            <IconButton sx={{
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 2
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
                    my: {
                        xxs: 5,
                        md: 0
                    },
                    position: "relative"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        width: "100%"
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
                        Signup To Continue
                        <Typography component="span" sx={{
                            wordWrap: "wrap",
                            fontSize: {
                                xxs: 10,
                                sm: 12
                            },
                            color: "login.secondaryText"
                        }}>
                            <Link href="/login" component="a"
                                sx={{ color: "login.mainText", textDecoration: "underline !important", ml: 1 }}

                            > Already have a account</Link>
                        </Typography>
                    </Typography>

                    <Box
                        sx={{ textAlign: "center" }}>

                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="first_name"
                                label="First Name"
                                name="first_name"
                                autoComplete='first_name'
                                autoFocus
                                onChange={(e) => setFirstName(e.target.value)}
                                error={!errors.firstName && firstName.length > 0 && !isOAuth}
                                helperText={!errors.firstName && firstName.length > 0 && !isOAuth ? "First Name must be more than 3" : ""}
                                sx={{
                                    mr: 1,
                                    color: "login.mainText",
                                    borderRadius: "15px",
                                    " & .MuiInputBase-root": {
                                        bgcolor: "login.input",
                                        borderRadius: "15px"
                                    },
                                    '& label.Mui-focused': {
                                        color: !errors.firstName && firstName.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                        // color: 'login.labelText',
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: 'login.labelText',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: !errors.firstName && firstName.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: !errors.firstName && firstName.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: !errors.firstName && firstName.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                        },
                                    }
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="last_name"
                                label="Last Name"
                                name="last_name"
                                onChange={(e) => setlastName(e.target.value)}
                                autoComplete='last_name'
                                error={!errors.lastName && lastName.length > 0 && !isOAuth}
                                helperText={!errors.lastName && lastName.length > 0 && !isOAuth ? "First Name must be more than 2" : ""}
                                sx={{
                                    ml: 1,
                                    color: "login.mainText",
                                    borderRadius: "15px",
                                    " & .MuiInputBase-root": {
                                        bgcolor: "login.input",
                                        borderRadius: "15px"
                                    },
                                    '& label.Mui-focused': {
                                        color: !errors.lastName && lastName.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: 'login.labelText',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: !errors.lastName && lastName.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: !errors.lastName && lastName.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: !errors.lastName && lastName.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                        },
                                    }
                                }}
                            />
                        </Box>

                        <InputLabel
                            sx={{
                                color: "login.signButtonText",
                                bgcolor: "login.signButton",
                                mt: 3,
                                mb: 0.5,
                                py: 1,
                                borderRadius: "10px",
                                fontSize: "20px",
                                "&:hover ": {
                                    backgroundColor: "login.signButton",
                                    transform: "scale(1.01)"
                                },
                            }}>
                            <Input
                                ref={fileUploadRef}
                                type="file"
                                accepts="image/*"
                                sx={{ display: "none" }}
                                onChange={(e) => setProfilePhoto(e.target.files[0])}
                            />
                            Upload Profile Photo
                        </InputLabel>



                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete='email'
                            error={!errors.email && email.length > 0 && !isOAuth}
                            helperText={!errors.email && email.length > 0 && !isOAuth ? "Please Enter Correct Email" : ""}
                            onChange={(e) => { setEmail(e.target.value) }}
                            sx={{
                                color: !errors.email && email.length > 0 && !isOAuth ? "login.mainText" : "red",
                                borderRadius: "15px",
                                " & .MuiInputBase-root": {
                                    bgcolor: "login.input",
                                    borderRadius: "15px"
                                },
                                '& label.Mui-focused': {
                                    color: !errors.email && email.length > 0 && !isOAuth ? "red " : 'login.labelText',

                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: 'login.labelText',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: !errors.email && email.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                    },
                                    '&:hover fieldset': {
                                        // borderColor: 'login.labelText',
                                        borderColor: !errors.email && email.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                    },
                                    '&.Mui-focused fieldset': {
                                        // borderColor: 'login.labelText',
                                        borderColor: !errors.email && email.length > 0 && !isOAuth ? "red " : 'login.labelText',
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
                                            {showPassword ? <VisibilityOff sx={{ color: !errors.password && password.length > 0 && !isOAuth ? "red " : 'login.labelText' }} /> : <Visibility sx={{ color: !errors.password && password.length > 0 ? "red " : 'login.labelText' }} />}
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
                            error={!errors.password && password.length > 0 && !isOAuth}
                            helperText={!errors.password && password.length > 0 && !isOAuth ? "Password must contain One Capital Letter and a special character" : ""}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete='current-password'
                            variant="outlined"
                            sx={{
                                color: 'login.labelText',
                                borderRadius: "15px",
                                " & .MuiInputBase-root": {
                                    bgcolor: "login.input",
                                    borderRadius: "15px"
                                },
                                '& label.Mui-focused': {
                                    color: !errors.password && password.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: 'login.labelText',
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


                        <TextField
                            InputProps={{
                                endAdornment:
                                    (< InputAdornment position="end" >
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={confirmPasswordIcon}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff sx={{ color: !errors.confirmPassword && confirmPassword.length > 0 && !isOAuth ? "red " : 'login.labelText' }} /> : <Visibility sx={{ color: !errors.confirmPassword && confirmPassword.length > 0 ? "red " : 'login.labelText' }} />}
                                        </IconButton>
                                    </InputAdornment>)

                            }}
                            margin="normal"
                            required
                            fullWidth
                            id="confirm-password"
                            label="Confirm Password"
                            name="confirm password"
                            value={confirmPassword}
                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                            error={!errors.confirmPassword && confirmPassword.length > 0 && !isOAuth}
                            helperText={!errors.confirmPassword && confirmPassword.length > 0 && !isOAuth ? "Password Does't Match" : ""}
                            type={showConfirmPassword ? 'text' : 'password'}
                            variant="outlined"
                            sx={{
                                color: 'login.labelText',
                                borderRadius: "15px",
                                " & .MuiInputBase-root": {
                                    bgcolor: "login.input",
                                    borderRadius: "15px"
                                },
                                '& label.Mui-focused': {
                                    color: !errors.confirmPassword && confirmPassword.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: 'login.labelText',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: !errors.confirmPassword && confirmPassword.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: !errors.confirmPassword && confirmPassword.length > 0 && !isOAuth ? "red " : 'login.labelText',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: !errors.confirmPassword && confirmPassword.length > 0 && !isOAuth ? "red " : 'login.labelText',
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

                            disabled={!(errors.email && errors.password && errors.firstName && errors.lastName && !isOAuth && errors.confirmPassword)}
                            onClick={submitButton}
                        >
                            {signUpText} {isProgress && <CircularProgress sx={{ color: "login.signButtonText", ml: 1 }} />}
                        </Button>
                        {/* <div id="signId"></div> */}
                    </Box>
                </Box>
                <IconButton sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0
                }}
                    onClick={themeChange}>

                    {theme === "dark" ? <LightMode /> : <DarkMode />}
                </IconButton>
            </Grid >

            <Grid item order={{ xxs: 1, md: 2 }} xxs={12} md={6}
                sx={{
                    bgcolor: "login.leftPart",
                    minHeight: "200px",
                    height: {
                        xxs: "30%",
                        md: "100%",
                    },

                    borderRadius: {
                        md: "50px 0 0 50px",
                        xxs: "0 0 50px 50px"
                    },
                }} />


        </Grid >

    )
}

export default Register