import { Grid, Avatar, Badge, Box, Stack, Typography, IconButton, TextField, Button, Input, InputLabel, CircularProgress } from '@mui/material'
import { CameraAlt, Create } from "@mui/icons-material"
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllData, setData, setAlert } from '../../userSlice'

import backendAxios from "../../backendAxios"
const Details = () => {
    const userData = useSelector(getAllData)

    const [change, setChange] = useState(false)
    const [newFirstName, setNewFirstName] = useState("")
    const [newLastName, setNewLastName] = useState("")
    const [newProfilePhoto, setNewProfilePhoto] = useState()
    const [isProgress, setIsProgress] = useState(false)
    const fileUploadRef = useRef()
    const dispatch = useDispatch()
    const [previewImage, setPreviewImage] = useState(null)
    const changeStart = () => {
        setChange(!change)
    }


    useEffect(() => {

        if (newProfilePhoto) {
            setPreviewImage(URL.createObjectURL(newProfilePhoto));
        }

    }, [newProfilePhoto])

    const doneChange = () => {
        if (newFirstName === "" && newLastName === "" && !newProfilePhoto) {
            return setChange(!change)
        }
        setIsProgress(true)
        backendAxios.post(`/updatePersonalDetails`, {
            file: newProfilePhoto,
            first_name: newFirstName,
            last_name: newLastName,
        }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            setIsProgress(false)


            dispatch(setAlert({
                type: response.data.errMsg || response.data.err ? "error" : "success",
                data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                isOpen: true
            }))
            if (response.data.errMsg) return


            dispatch(setData(response.data.data))
            cancelChange()
        }).catch((e) => {
            // console.log("error in axios ", e)
        })
    }
    const cancelChange = () => {
        setNewFirstName("")
        setNewLastName("")
        setChange(!change)
    }

    return (

        <Grid container>
            <Grid item xxs={12} xsm={4} sm={3} p={2} sx={{
                height: "fit-content",
                display: "flex",
                justifyContent: "center",
            }}>
                {change ?

                    <Badge badgeContent={<CameraAlt sx={{ fill: "black" }} fontSize={"small"} />} overlap="circular" color="primary" anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }} sx={{
                        "& .MuiBadge-badge": {
                            padding: "6px",
                            height: "auto",
                            borderRadius: "50%",
                            bgcolor: "profileTabs.background",
                            boxShadow: "1px 1px 5px 1px #00000050"
                        }
                    }}>

                        <InputLabel

                            sx={{
                                height: " 100%",
                                width: "100%",
                                position: "absolute",
                                zIndex: "2",
                            }}
                        >
                            <Input
                                ref={fileUploadRef}
                                type="file"
                                accepts="image/*"
                                sx={{ display: "none" }}
                                onChange={(e) => setNewProfilePhoto(e.target.files[0])}
                            />
                        </InputLabel>




                        <Box sx={{ width: "6rem", height: "6rem", border: "2px solid", borderColor: "details.profilePhotoBorder", borderRadius: "50%", p: "5px" }}>
                            <Avatar sx={{ width: "100%", height: "100%" }} src={previewImage || userData?.profile_photo} />
                        </Box>
                    </Badge>

                    :
                    <Box sx={{ width: "6rem", height: "6rem", border: "2px solid", borderColor: "details.profilePhotoBorder", borderRadius: "50%", p: "5px" }}>
                        <Avatar sx={{ width: "100%", height: "100%" }} src={userData?.profile_photo} />
                    </Box>}


            </Grid>
            <Grid item xxs={12} xsm={8} sm={5} p={2}>
                <Stack spacing={2}>

                    <Typography color={"details.headingColor"}>Info
                        <IconButton sx={{
                            ml: "16px"
                        }} onClick={changeStart}>
                            <Create sx={{
                                color: change ? "details.profilePhotoBorder" : "details.headingColor",
                            }} />
                        </IconButton>
                        {change ? <>
                            <Button sx={{
                                color: "details.headingColor", fontSize: {
                                    xxs: "10px",
                                    md: "0.875rem"
                                },
                                padding: {
                                    xxs: "2px 6px",
                                    xs: "3px 8px",
                                    sm: "6px 16px"
                                },
                                ml: "16px",
                                bgcolor: "details.inputBackground"
                            }}
                                onClick={doneChange}
                            > {isProgress ? <CircularProgress size="15px" sx={{ color: "addMenu.textColor" }} /> : "Done"}


                            </Button>
                            <Button sx={{
                                color: "details.headingColor", fontSize: {
                                    xxs: "10px",
                                    md: "0.875rem"
                                },
                                ml: 1,
                                padding: {
                                    xxs: "2px 6px",
                                    xs: "3px 8px",
                                    sm: "6px 16px"
                                },
                                bgcolor: "details.inputBackground"
                            }}
                                onClick={cancelChange}
                            > Cancel</Button>
                        </> : ""}
                    </Typography>

                    <Grid container >
                        <Grid item xxs={6}>
                            <Typography fontSize={13} color={"details.headingColor"}>First Name</Typography>

                            {
                                change ? <TextField id="filled-basic" label="" placeholder='Enter First Name' variant="filled"
                                    sx={{
                                        "& input": {
                                            padding: "2px 6px",
                                            fontSize: "13px"
                                        },
                                        "& input:focus": {
                                            outline: "none"
                                        },
                                        "& .MuiInputBase-root": {
                                            borderRadius: "4px"
                                        },
                                        borderRadius: "4px ",
                                        bgcolor: "details.inputBackground",
                                        mr: 1
                                    }}
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

                                    value={newFirstName}
                                    onChange={(e) => setNewFirstName(e.target.value)}
                                /> : <Typography fontWeight={"bold"} color={"details.textColor"} fontSize={{
                                    xxs: 14,
                                    xs: 16
                                }}>{userData?.first_name}</Typography>
                            }




                        </Grid>
                        <Grid item xxs={6}>
                            <Typography fontSize={13} color={"details.headingColor"}>Last Name</Typography>
                            {
                                change ? <TextField id="filled-basic" label="" placeholder='Enter Last Name' variant="filled"
                                    sx={{
                                        "& input": {
                                            padding: "2px 6px",
                                            fontSize: "13px"
                                        },
                                        "& input:focus": {
                                            outline: "none"
                                        },
                                        "& .MuiInputBase-root": {
                                            borderRadius: "4px"
                                        },
                                        borderRadius: "4px ",
                                        bgcolor: "details.inputBackground"
                                    }}
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
                                    value={newLastName}
                                    onChange={(e) => setNewLastName(e.target.value)}
                                /> : <Typography fontWeight={"bold"} color={"details.textColor"} fontSize={{
                                    xxs: 14,
                                    xs: 16
                                }}>{userData?.last_name}</Typography>
                            }
                        </Grid>
                    </Grid>
                    <Box>
                        <Typography fontSize={13} color={"details.headingColor"}>Email</Typography>
                        <Typography fontWeight={"bold"} fontSize={{
                            xxs: 14,
                            xs: 16
                        }} color={"details.textColor"}>{userData?.email}</Typography>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xxs={12} sm={4} p={2}>
                <Stack sx={{
                    textAlign: {
                        xxs: "left",
                        xsm: "center",
                        sm: "left"
                    }
                }}>
                    <Typography color={"details.textColor"} fontSize={12} >Total Movies Watched : {userData.watched.movies?.length}</Typography>
                    <Typography color={"details.textColor"} fontSize={12}>Total Series Watched :  {userData.watched.series?.length}</Typography>
                    <Typography color={"details.textColor"} fontSize={12}>Total Playlist :  {userData.playlists?.length}</Typography>
                    <Typography color={"details.textColor"} fontSize={12}>Watch Later :  {userData.watch_later?.length}</Typography>
                </Stack>
            </Grid>
        </Grid>

    )
}

export default Details