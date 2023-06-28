import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Grid, IconButton, Input, InputAdornment, InputLabel, Link, TextField, Typography, } from '@mui/material';
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

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [profilePhoto, setProfilePhoto] = useState("")
    const [isOAuth, setIsOAuth] = useState(false)
    const [OAuthProfilePhoto, setOAuthProfilePhoto] = useState("")

    const handleClick = () => {
        setShowPassword(prev => !prev);
    }
    const submitButton = async () => {


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
                if (response.data.errMsg || response.data.err) {
                    dispatch(setAlert({
                        type: "error",
                        data: response.data.errMsg || response.data.err,
                        isOpen: true
                    }))
                    if (response.data.errMsg === "Please Login Using Email And Password" || response.data.err === "Please Login Using Email And Password") {
                        navigate("/login")
                    }
                    return
                    // return alert(response.data.errMsg)
                }
                // alert(response.data)

                navigate("/login")

            })
            .catch(function (error) {
                console.log(error)
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
            minHeight: "100vh",
            height: { xxs: "fit-content", md: "100vh" }, width: "100vw",
            overflow: "scroll",
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
                        SignUp To Continue
                        <Typography component="span" sx={{
                            wordWrap: "wrap",
                            fontSize: {
                                xxs: 10,
                                sm: 12
                            },
                            color: "login.secondaryText"
                        }}>
                            <Link href="/login" component="a"
                                sx={{ color: "login.mainText" }}

                            >     Already have a account</Link>
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
                                sx={{
                                    bgcolor: "login.input",
                                    mr: 1,
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
                                id="last_name"
                                label="Last Name"
                                name="last_name"
                                onChange={(e) => setlastName(e.target.value)}
                                autoComplete='last_name'
                                sx={{
                                    bgcolor: "login.input",
                                    ml: 1,
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
                            Sign Up
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