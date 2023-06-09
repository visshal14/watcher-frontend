import { Create, Sort } from '@mui/icons-material'
import { Grid, Typography, Box, Button, IconButton, TextField, InputLabel, Select, MenuItem } from '@mui/material'
import { } from '@mui/system'
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
    useEffect(() => {
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
                // return alert(response.data.errMsg)
            }
            setData(response.data.data)

            setNewPlaylistName(response.data.data.name)
            setNewDes(response.data.data.description)
            setVisibilty(response.data.data.shareable)
            if (response.data.data.owner.split("_")[1] === email) {
                setIsOwner(true)
            }
        })
        // eslint-disable-next-line
    }, [id, email])





    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const [newPlaylistName, setNewPlaylistName] = useState()
    const [newDes, setNewDes] = useState()
    const [isNameChanging, setIsNamechanging] = useState(false)
    const [isDesChanging, setIsDesChanging] = useState(false)
    const [visibilty, setVisibilty] = useState(false)

    const visiblityChange = (e) => {

        setVisibilty(e.target.value)
        backendAxios.post("/playListVisibiltyChange", {
            _id: id,
            vis: e.target.value
        }).then((response) => {
            if (response.data.errMsg) {
                return alert(response.data.errMsg)
            }
            setData(response.data.data)
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
                        return alert(response.data.errMsg)
                    }
                    setData(response.data.data)
                    setIsNamechanging(false)
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
                        return alert(response.data.errMsg)
                    }
                    setData(response.data.data)
                    setIsDesChanging(false)
                })


            } else {
                setIsDesChanging(false)
            }
        }

    }


    return (
        <Grid container spacing={2} px={{
            xxs: "10px",
            sm: "50px"
        }} py={"100px"}>


            <Helmet>
                <title>{data?.name}</title>
            </Helmet>

            <Grid item xxs={12} md={4} sx={{
                px: 2,

            }}>
                <Box sx={{
                    bgcolor: "playlists.background",
                    borderRadius: "10px",
                    p: "10px",
                    color: "playlists.textColor"
                }}>

                    {isNameChanging ? <>

                        <TextField fullWidth id="filled-basic" type="email" label="" value={newPlaylistName} placeholder='Enter Name' variant="filled"
                            sx={{
                                "& input": {
                                    padding: "5px 5px ",
                                    fontSize: "13px",
                                },
                                "& input:focus": {
                                    outline: "none"
                                },
                                "& .css-1906lwe-MuiInputBase-root-MuiFilledInput-root:after": {
                                    content: '""'
                                },
                                "& .css-1906lwe-MuiInputBase-root-MuiFilledInput-root:before": {
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

                        : <Typography variant={"h4"}>{data?.name}
                            {isOwner && <IconButton onClick={() => setIsNamechanging(!isNameChanging)}>
                                <Create />
                            </IconButton>}
                        </Typography>}
                    <Typography variant={"h6"}>Made By {data?.owner.split("_")[0]}</Typography>
                    <Typography variant={"h6"}>{data?.contents.length} items</Typography>

                    {isOwner &&
                        <>
                            <InputLabel id="demo-simple-select-standard-label">Visibilty</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={visibilty}
                                onChange={visiblityChange}
                                label="Age"
                            >
                                <MenuItem value={false}>
                                    <em>Private</em>
                                </MenuItem>
                                <MenuItem value={true}>Public</MenuItem>
                            </Select></>

                    }




                    {isDesChanging ? <>

                        <TextField fullWidth id="filled-basic" type="email" label="" value={newDes} placeholder='Enter description' variant="filled"
                            sx={{
                                "& input": {
                                    padding: "5px 5px ",
                                    fontSize: "13px",
                                },
                                "& input:focus": {
                                    outline: "none"
                                },
                                "& .css-1906lwe-MuiInputBase-root-MuiFilledInput-root:after": {
                                    content: '""'
                                },
                                "& .css-1906lwe-MuiInputBase-root-MuiFilledInput-root:before": {
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
                        : <Typography variant={"h6"}>{data?.description}
                            {isOwner && <IconButton onClick={() => setIsDesChanging(true)}>
                                <Create />
                            </IconButton>}
                        </Typography>}
                </Box>
            </Grid>
            <Grid item md={8} sx={{
                pl: 2,
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
                                    <Grid item xxs={4}>
                                        <img src={`https://image.tmdb.org/t/p/original${ele.background}`} loading="lazy" alt="img" style={{
                                            width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px"
                                        }} />
                                    </Grid>
                                    <Grid item xxs={8} px={1}>
                                        <Typography variant={"h5"} sx={{ mr: 2 }}>{ele.name} </Typography>
                                        <Typography>{truncate(ele.description, 100)} </Typography>
                                        <Typography>{ele.release_date.split("-")[0]}</Typography>

                                    </Grid>
                                </Grid>



                                <Box sx={{ position: "absolute", top: 0, right: 0 }}>
                                    <AddMenu id={`${ele.media_type}/${ele.media_id}`} name={ele?.name} />
                                </Box>
                            </Grid>


                        )
                    }







                </Box>

            </Grid>
        </Grid>

    )
}


export default Playlist