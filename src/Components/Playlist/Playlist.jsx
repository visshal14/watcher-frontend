import { Create, Sort } from '@mui/icons-material'
import { Grid, Typography, Box, Button, IconButton, TextField, Select, MenuItem, Stack, FormControl } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEmail, setAlert } from '../../userSlice'
import { useParams } from 'react-router-dom'
import backendAxios from "../../backendAxios"
import AddMenu from '../AddMenu'
import knowMore from '../KnowMore'
import LoginChecker from '../../LoginChecker'
import { Helmet } from 'react-helmet'

const Playlist = () => {

    LoginChecker()

    const { id } = useParams()
    const [data, setData] = useState()
    const email = useSelector(getEmail)
    const [isOwner, setIsOwner] = useState(false)
    const dispatch = useDispatch()
    const [newPlaylistName, setNewPlaylistName] = useState()
    const [newDes, setNewDes] = useState()
    const [isNameChanging, setIsNamechanging] = useState(false)
    const [isDesChanging, setIsDesChanging] = useState(false)
    const [visibilty, setVisibilty] = useState(false)



    useEffect(() => {
        setIsNamechanging(false)
        setIsDesChanging(false)

        if (id && email) {
            backendAxios.post(`/getPlaylist/${id}`, {
                email: email
            }).then((response) => {
                if (response.data.errMsg) {
                    dispatch(setAlert({
                        type: "error",
                        data: response.data.errMsg,
                        isOpen: true
                    }))


                    return
                }

                setData(response.data.data)
                setNewPlaylistName(response.data.data.name)
                setNewDes(response.data.data.description)
                setVisibilty(response.data.data.shareable)
                if (response.data.data.owner.split("_")[1] === email) {
                    setIsOwner(true)
                }
            }).catch((e) => {
                console.log("error in axios ", e)
            })
        }
        // eslint-disable-next-line
    }, [id, email])





    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }





    const visiblityChange = (e) => {

        setVisibilty(e.target.value)
        backendAxios.post("/playListVisibiltyChange", {
            _id: id,
            vis: e.target.value
        }).then((response) => {
            if (response.data.errMsg) {
                return dispatch(setAlert({
                    type: response.data.errMsg || response.data.err ? "error" : "success",
                    data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                    isOpen: true
                }))
            }

            setData(response.data.data)
        }).catch((e) => {
            console.log("error in axios ", e)
        })


    }


    const saveCancelBtn = (type, value) => {
        if (type === "name") {
            if (value === 'save') {
                backendAxios.post("/playlistnamechange", {
                    _id: id,
                    name: newPlaylistName
                }).then((response) => {
                    if (response.data.errMsg) {
                        return dispatch(setAlert({
                            type: response.data.errMsg || response.data.err ? "error" : "success",
                            data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                            isOpen: true
                        }))
                    }
                    setData(response.data.data)
                    setIsNamechanging(false)
                }).catch((e) => {
                    console.log("error in axios ", e)
                })
            } else {
                setIsNamechanging(false)
            }
        } else {
            if (value === 'save') {
                backendAxios.post("/playlistdeschange", {
                    _id: id,
                    des: newDes
                }).then((response) => {
                    if (response.data.errMsg) {
                        return dispatch(setAlert({
                            type: response.data.errMsg || response.data.err ? "error" : "success",
                            data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                            isOpen: true
                        }))
                    }
                    setData(response.data.data)
                    setIsDesChanging(false)
                }).catch((e) => {
                    console.log("error in axios ", e)
                })


            } else {
                setIsDesChanging(false)
            }
        }

    }


    return (
        <Grid container px={{
            xxs: 1,
            sm: 5,
            md: 8
        }} py={{
            xxs: "68px",
            sm: "100px"
        }}>


            <Helmet>
                <title>{data?.name}</title>
            </Helmet>

            <Grid item xxs={12} md={4} sx={{
                px: 2,
                pb: 2
            }}>
                <Stack sx={{
                    bgcolor: "playlists.background",
                    borderRadius: "10px",
                    p: 3,
                    color: "playlists.textColor"
                }}>


                    {isNameChanging ? <>

                        <TextField autoFocus fullWidth id="filled-basic" type="email" label="" value={newPlaylistName} placeholder='Enter Name' variant="filled"
                            sx={{
                                "& input": {
                                    padding: "5px 5px ",
                                    fontSize: "13px",
                                },
                                "& input:focus": {
                                    outline: "none"
                                },
                                "&.MuiInputBase-input:after": {
                                    content: '""',

                                },
                                "&.MuiInputBase-input:before": {
                                    content: '""',
                                    position: "static"

                                },
                                "& .MuiInputBase-root:before": {
                                    content: '""',
                                    position: "static"
                                },
                                "& .MuiInputBase-root:after": {
                                    content: '""',
                                    position: "static"
                                },
                                m: "10px 0"
                            }}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                        />
                        <Button sx={{ color: "playlists.textColor" }} onClick={() => saveCancelBtn("name", "save")}>Save</Button>
                        <Button sx={{ color: "playlists.textColor" }} onClick={() => saveCancelBtn("name", "save")}>Cancel</Button>
                    </>

                        :
                        <Grid container justifyContent={"space-between"}>
                            <Typography variant={"h4"} sx={{ fontWeight: "700" }}>{data?.name}</Typography>
                            {isOwner && <IconButton onClick={() =>
                                setIsNamechanging(!isNameChanging)
                            }>
                                <Create />
                            </IconButton>}
                        </Grid>

                    }


                    <Typography variant={"h6"} sx={{ fontSize: "16px", fontWeight: "600", mt: 1 }}>{data?.owner.split("_")[0]}</Typography>
                    <Typography variant={"h6"} sx={{ fontSize: "12px", fontWeight: "400", mt: 1 }}>{data?.contents.length} items  Updated On {data?.contents[data?.contents.length - 1].saved_on}</Typography>

                    {isOwner &&
                        <>
                            {/* <InputLabel id="demo-simple-select-standard-label">Visibilty</InputLabel> */}
                            <FormControl variant="filled" sx={{ width: "fit-content" }}>

                                <Select
                                    labelId="select-filled-label"
                                    id="simple-select-filled"
                                    value={visibilty}
                                    onChange={visiblityChange}
                                    label="Visibility"
                                    displayEmpty
                                    disableUnderline={true}
                                    sx={{

                                        "& .MuiInputBase-input": {
                                            paddingTop: "8px",
                                            paddingRight: "48px !important",
                                            pl: 1
                                        },
                                        bgcolor: "transparent"
                                    }}
                                >
                                    <MenuItem value={false}>
                                        <em>Private</em>
                                    </MenuItem>
                                    <MenuItem value={true}>Public</MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    }



                    {isDesChanging ? <>

                        <TextField fullWidth autoFocus id="filled-basic" label="" value={newDes} placeholder='Enter description' variant="filled"
                            sx={{
                                "& input": {
                                    padding: "5px 5px ",
                                    fontSize: "13px",
                                },

                                "& input:focus": {
                                    outline: "none"
                                },
                                "&.MuiInputBase-input:after": {
                                    content: '""',

                                },
                                "&.MuiInputBase-input:before": {
                                    content: '""',
                                    position: "static"

                                },
                                "& .MuiInputBase-root:before": {
                                    content: '""',
                                    position: "static"
                                },
                                "& .MuiInputBase-root:after": {
                                    content: '""',
                                    position: "static"
                                },
                                m: "10px 0"
                            }}
                            onChange={(e) => setNewDes(e.target.value)}
                        />
                        <Button sx={{ color: "playlists.textColor" }} onClick={() => saveCancelBtn("des", "save")}>Save</Button>
                        <Button sx={{ color: "playlists.textColor" }} onClick={() => saveCancelBtn("ses", "save")}>Cancel</Button>
                    </>
                        :
                        <Grid container justifyContent={"space-between"}>

                            <Typography variant={"h6"} sx={{ fontSize: "16px", fontWeight: "400", mt: 1 }}>{data?.description.length < 2 ? "No Description" : data?.description} </Typography>
                            {isOwner && <IconButton onClick={() => setIsDesChanging(true)} >
                                <Create />
                            </IconButton>}
                        </Grid>

                    }
                </Stack>
            </Grid>


            <Grid item md={8} sx={{
                px: 2,
            }}>
                <Box sx={{
                    bgcolor: "playlists.background",
                    p: {
                        xxs: "5px",
                        sm: "10px"
                    },
                    borderRadius: "10px"
                }}>
                    <Button sx={{ color: "playlists.textColor" }} startIcon={<Sort />}> Sort</Button>
                    {
                        data?.contents?.map((ele, i) =>

                            <Grid key={i} id={ele.media_type + "/" + ele.media_id}


                                container p={{
                                    xxs: 1,
                                    sm: 2
                                }} mb={1}
                                sx={{
                                    bgcolor: "playlists.titleBackground",
                                    borderRadius: "10px",
                                    cursor: "default"
                                }}
                                position={"relative"}


                            >

                                <Grid container onClick={() => {
                                    knowMore(ele.media_type + "/" + ele.media_id)

                                }}>
                                    <Grid item xxs={12} sm={4} >
                                        <img src={`https://image.tmdb.org/t/p/original${ele.background}`} loading="lazy" alt="img" style={{
                                            width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px"
                                        }} />
                                    </Grid>
                                    <Grid item xxs={12} sm={8} px={1}>
                                        <Typography variant={"h5"} sx={{ mr: 4, cursor: "pointer", fontWeight: "700" }}>{ele.name} </Typography>
                                        <Typography>{truncate(ele.description, 100)} </Typography>
                                        <Typography>{ele.release_date.split("-")[0]}</Typography>

                                    </Grid>
                                </Grid>




                                <AddMenu id={`${ele.media_type}/${ele.media_id}`} name={ele?.name} mr={0.5} mt={0.5} />

                            </Grid>


                        )
                    }







                </Box>

            </Grid>
        </Grid >

    )
}


export default Playlist