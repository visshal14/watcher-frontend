import { Grid, Avatar, Badge, Box, Stack, Typography, IconButton, TextField, Button, Input, InputLabel } from '@mui/material'
import { CameraAlt, Create } from "@mui/icons-material"
import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllData, setData, setAlert } from '../../userSlice'

import backendAxios from "../../backendAxios"
const Details = () => {
    const userData = useSelector(getAllData)

    const [change, setChange] = useState(false)
    const [newFirstName, setNewFirstName] = useState("")
    const [newLastName, setNewLastName] = useState("")
    const [newProfilePhoto, setNewProfilePhoto] = useState()
    const fileUploadRef = useRef()
    const dispatch = useDispatch()
    const changeStart = () => {
        setChange(!change)
    }
    const doneChange = () => {
        if (newFirstName === "" && newLastName === "" && !newProfilePhoto) {
            return setChange(!change)
        }
        backendAxios.post(`/updatePersonalDetails`, {
            file: newProfilePhoto,
            first_name: newFirstName,
            last_name: newLastName,
        }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response.data.errMsg) {
                dispatch(setAlert({
                    type: "error",
                    data: response.data.errMsg,
                    isOpen: true
                }))


                return
                // return alert(response.data.errMsg)
            }

            dispatch(
                setData({
                    first_name: response.data.data.first_name,
                    last_name: response.data.data.last_name,
                    email: response.data.data.email,
                    profile_photo: response.data.data.profile_photo,
                    playlists: response.data.data.playlists,
                    friends: response.data.data.friends,
                    pending_requests: response.data.data.pending_requests,
                    watch_later: response.data.data.watch_later,
                    liked: response.data.data.liked,
                    watched: response.data.data.watched,
                    shared: response.data.data.shared
                })
            )
            alert(response.data.msg)
            cancelChange()
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
                            <Avatar sx={{ width: "100%", height: "100%" }} src={userData?.profile_photo} />
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
                            > Done</Button>
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
                                            padding: "2px",
                                            fontSize: "13px"
                                        },
                                        bgcolor: "details.inputBackground"
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

                                            padding: "2px",
                                            fontSize: "13px"
                                        },
                                        bgcolor: "details.inputBackground"
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