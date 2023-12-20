import { Add, Lock, Link, ExpandLess, ExpandMore, } from '@mui/icons-material';
import { Box, Button, CircularProgress, FormControl, Grid, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlaylists, getFriends, setData, getShared, setAlert, getEmail } from '../userSlice';
// import { getMediaData } from '../tmdb';
import backendAxios from "../backendAxios"
import LoginChecker from '../LoginChecker';
// import { UpdateUserData } from '../dataUpdate';

const AddMenu = ({ position, padding, mr, mt, height, id, name }, ref) => {

    const data = useSelector(getAllPlaylists)
    const friends = useSelector(getFriends)
    const shared = useSelector(getShared)
    const currentEmail = useSelector(getEmail)
    const [mediaData, setMediaData] = useState()
    const [ifLiked, setIfLiked] = useState("Add To")
    const [ifWatchLater, setWatchLater] = useState("Add To")
    const [ifWatched, setIfWatched] = useState("Add To")
    const [ifPlaylist, setIfPlaylist] = useState([])
    const [ifShareFriends, setIfShareFriends] = useState([])
    const [showFriends, setShowFriends] = useState(false)
    const dispatch = useDispatch()
    const [likedProgress, setLikedProgress] = useState("")
    const [watchLaterProgress, setWatchLaterProgress] = useState("")
    const [watchedProgress, setWatchedProgress] = useState("")
    const [sharedProgress, setSharedProgress] = useState([])
    const [playlistProgress, setPlaylistProgress] = useState([])


    // useEffect(() => {
    //     // setLikedProgress(<CircularProgress size="15px" />)
    //     setTimeout(() => {
    //         setLikedProgress("")
    //     }, 5000)
    // }, [])

    useEffect(() => {

        buttonUpdates()
        // eslint-disable-next-line
    }, [data, mediaData, showFriends])

    const buttonUpdates = () => {

        if (!currentEmail || window.localStorage.getItem("accessToken") === "") {
            setAnchorEl(null);

            return
        }
        //data[0] is playlists
        setIfPlaylist([])
        setPlaylistProgress([])
        // eslint-disable-next-line
        data[0]?.map(() => {
            setPlaylistProgress(prev => [...prev, " "])
            setIfPlaylist(prev => [...prev, "Add To"])
        })

        data[0]?.forEach((ele, i) => {
            ele.contents?.every((e) => {
                if (`${mediaData?.split("/")[0]}/${mediaData?.split("/")[1]}` === `${e.media_type}/${e.media_id}`) {
                    setIfPlaylist((prev) =>
                        prev.map((x, j) =>
                            j === i ? "Remove From" : x

                        )
                    )
                    return false
                }
                return true
            })


        })




        //watchLater

        data[1]?.every((ele) => {
            if (`${ele.type}/${ele.id}` === `${mediaData?.split("/")[0]}/${mediaData?.split("/")[1]}`) {
                setWatchLater("Remove From")
                return false
            } else {
                setWatchLater("Add To")
                return true
            }
        })




        //watched

        if (mediaData?.split("/")[0] === "tv") {

            data[2]?.series.every((ele) => {
                if (ele.details.id === mediaData?.split("/")[1]) {
                    if (ele.episode_list.length === 0) {
                        setIfWatched("Add To")
                        return true
                    }
                    ele.episode_list.every((e) => {

                        if (`${ele.details.type}/${ele.details.id}/${e.split("-")[0]}/${e.split("-")[1]}` === mediaData || e === "all-all") {
                            setIfWatched("Remove From")
                            return false
                        } else {

                            setIfWatched("Add To")
                            return true
                        }
                    })
                    return false
                } else {
                    setIfWatched("Add To")
                    return true
                }

            })
        } else {
            data[2]?.movies.every((ele) => {
                if (`${ele.type}/${ele.id}` === mediaData) {
                    setIfWatched("Remove From")
                    return false
                } else {
                    setIfWatched("Add To")
                    return true
                }
            })
        }

        //liked
        data[3]?.every((ele) => {
            if (`${ele.type}/${ele.id}` === `${mediaData?.split("/")[0]}/${mediaData?.split("/")[1]}`) {
                setIfLiked("Remove From")
                return false
            } else {
                setIfLiked("Add To")
                return true
            }
        })




        //shared
        setIfShareFriends([])
        setSharedProgress([])


        // eslint-disable-next-line
        friends?.map(() => {
            setSharedProgress(prev => [...prev, " "])
            setIfShareFriends(prev => [...prev, "Share To "])
        })

        friends?.forEach((ele, i) => {

            shared?.every((e) => {
                if (ele.id.email === e.email && `${mediaData?.split("/")[0]}/${mediaData.split("/")[1]}` === `${e.mediaType}/${e.mediaId}`) {

                    setIfShareFriends((prev) =>
                        prev.map((x, j) =>
                            j === i ? "UnShare To " : x
                        )
                    )
                    return false
                }
                return true
            })


        })



    }





    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {


        if (!currentEmail) {

            dispatch(setAlert({
                type: "error",
                data: "There is being some error, try after some time or login again",
                isOpen: true
            }))
            LoginChecker()
            return
        }

        setAnchorEl(event.currentTarget);
        setMediaData(event.currentTarget.id)
        LoginChecker()
        buttonUpdates()


    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const addToLikedWatched = async (type, value) => {

        if (type === "liked") {
            setLikedProgress(<AddMenuProgress />)
        } else {
            setWatchLaterProgress(<AddMenuProgress />)
        }

        if (value === "Remove From") {
            backendAxios.post(`/removeFromWatchLLiked/${type}/${mediaData.split("/")[1]}`).then((response) => {
                dispatch(setAlert({
                    type: response.data.errMsg || response.data.err ? "error" : "success",
                    data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                    isOpen: true
                }))

                if (response.data.errMsg) {
                    if (type === "liked") {
                        setLikedProgress("")
                    } else {
                        setWatchLaterProgress("")
                    }
                    return

                }
                dispatchSetData(response.data.data)


                if (type === "liked") {
                    setLikedProgress("")
                } else {
                    setWatchLaterProgress("")
                }
            }).catch((e) => {
                // console.log("error in axios ", e)
            })
        } else {
            backendAxios.post(`/saveForWatchLater/${type}/${mediaData.split("/")[0]}/${mediaData.split("/")[1]}`).then((response) => {

                dispatch(setAlert({
                    type: response.data.errMsg || response.data.err ? "error" : "success",
                    data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                    isOpen: true
                }))
                if (response.data.errMsg) {


                    if (type === "liked") {
                        setLikedProgress("")
                    } else {
                        setWatchLaterProgress("")
                    }
                    return

                }
                if (type === "liked") {
                    setLikedProgress("")
                } else {
                    setWatchLaterProgress("")
                }
                dispatchSetData(response.data.data)


            }).catch((e) => {
                // console.log("error in axios ", e)
            })
        }
    }



    const addTowatched = () => {
        setWatchedProgress(<AddMenuProgress />)
        if (mediaData.split("/")[0] === "movie") {
            backendAxios.post(`/watchedMovie/${mediaData.split("/")[1]}`).then((response) => {
                dispatch(setAlert({
                    type: response.data.errMsg || response.data.err ? "error" : "success",
                    data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                    isOpen: true
                }))
                if (response.data.errMsg) {
                    setWatchedProgress("")
                    return
                }

                dispatchSetData(response.data.data)
                setWatchedProgress("")

            }).catch((e) => {
                // console.log("error in axios ", e)
            })
        } else if (mediaData.split("/")[0] === "tv") {
            const season = mediaData.split("/")[2] || "all"
            const epi = mediaData.split("/")[3] || "all"


            backendAxios.post(`/watchedSeries/${mediaData.split("/")[1]}/${season}/${epi}`).then((response) => {
                dispatch(setAlert({
                    type: response.data.errMsg || response.data.err ? "error" : "success",
                    data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                    isOpen: true
                }))
                if (response.data.errMsg) {
                    setWatchedProgress("")
                    return
                }
                setWatchedProgress("")
                dispatchSetData(response.data.data)
                setIfWatched("Add To")
                return
            }).catch((e) => {
                // console.log("error in axios ", e)
            })
        }
    }



    const showFriendsBtn = () => {
        setShowFriends(!showFriends)
    }

    const shareToFriend = (e) => {
        setSharedProgress(prev =>
            prev.map((ele, i) =>
                i === parseInt(e.currentTarget?.id?.split("_")[2]) ? <AddMenuProgress /> : ""
                // (i === e.currentTarget?.id?.split("_")[2] ? <CircularProgress size="15px" /> : ele)
            ))
        const friendEmail = e.currentTarget.id.split("_")[1]
        let tempMediaData = mediaData.split("/")[0] + "/" + mediaData.split("/")[1]
        backendAxios.post(`shareToFriend`, {
            friendEmail: friendEmail,
            mediaData: tempMediaData
        }).then((response) => {
            dispatch(setAlert({
                type: response.data.errMsg || response.data.err ? "error" : "success",
                data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                isOpen: true
            }))

            if (response.data.errMsg) return

            dispatchSetData(response.data.data)



        }).catch((e) => {
            // console.log("error in axios ", e)
        })

    }




    const copyLink = () => {
        navigator.clipboard.writeText(`https://watcher-380709.web.app/${mediaData}`).then((function () {
            dispatch(setAlert({
                type: "success",
                data: "Link Copied",
                isOpen: true
            }))
        }), function () {
            console.log('Copy Error')
        });
    }


    const addToPlaylist = (e, i) => {

        setPlaylistProgress(prev =>
            prev.map((ele, j) =>
                j === parseInt(i) ? <AddMenuProgress /> : ""
                // (i === e.currentTarget?.id?.split("_")[2] ? <CircularProgress size="15px" /> : ele)
            ))


        backendAxios.post(`/addMediaToPlaylist`, {
            _id: e.currentTarget.id.split("_")[1],
            media_id: mediaData.split("/")[1],
            media_type: mediaData.split("/")[0]
        }).then((response) => {

            dispatch(setAlert({
                type: response.data.errMsg || response.data.err ? "error" : "success",
                data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                isOpen: true
            }))

            if (response.data.errMsg) return
            dispatchSetData(response.data.data)


        }).catch((e) => {
            // console.log("error in axios ", e)
        })


    }

    const [isCreatePlaylist, setIsCreatePlaylist] = useState(false)
    const [newPlaylistName, setNewPlaylistName] = useState("")
    const [visibilty, setVisibilty] = useState(false)
    const createNewPlaylist = (action) => {
        if (action === "show") {
            setIsCreatePlaylist(!isCreatePlaylist)


        } else {
            backendAxios.post(`/addNewPlaylist`, {
                name: newPlaylistName,
                shareable: visibilty,
                description: ""
            }).then((response) => {

                dispatch(setAlert({
                    type: response.data.errMsg || response.data.err ? "error" : "success",
                    data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                    isOpen: true
                }))

                if (response.data.errMsg) return
                if (response.data.success) {
                    backendAxios.post("/addMediaToPlaylist", {
                        _id: response.data.playlist_id,
                        media_id: mediaData.split("/")[1],
                        media_type: mediaData.split("/")[0]
                    }).then((response) => {

                        dispatch(setAlert({
                            type: response.data.errMsg || response.data.err ? "error" : "success",
                            data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                            isOpen: true
                        }))

                        if (response.data.errMsg) return

                        dispatchSetData(response.data.data)



                    })
                }

            }).catch((e) => {
                // console.log("error in axios ", e)
            })
            setNewPlaylistName("")
            setIsCreatePlaylist(!isCreatePlaylist)

        }
    }


    const dispatchSetData = (data) => {
        dispatch(setData(data))
    }






    return (
        <>
            <Button
                id={id}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}

                sx={{
                    minWidth: 0,
                    bgcolor: "black",
                    color: "white",

                    position: position ? "static" : "absolute",
                    top: position ? "" : "10px",
                    right: position ? "" : "10px",
                    zIndex: 1,
                    padding: padding || "",
                    mt: mt || 0,
                    mr: mr || 0,
                    "&:hover": {
                        bgcolor: "white",
                        color: "black",

                    }
                }}

            >
                <Add id={id} sx={{
                    height: height || "1em", width: height || "1em",
                }} />
            </Button >



            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'addMenu.background',
                    border: '2px solid ',
                    borderColor: "addMenu.border",
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 4,
                    maxHeight: "400px",
                    overflowY: "auto",
                    color: "addMenu.textColor",
                    "&::-webkit-scrollbar": {
                        display: "none"
                    }
                }}>


                    {name && <Typography variant="h2" component={"h2"} sx={{
                        color: "addMenu.textColor",
                        fontSize: "24px",
                        fontWeight: 800,
                        textAlign: "center",
                        width: "100%",
                        borderBottom: "1px solid",
                        borderColor: "addMenu.textColor",
                        marginBottom: "8px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}>

                        {name}

                    </Typography>}

                    <Button fullWidth sx={{
                        color: "addMenu.textColor", fontSize: {
                            xxs: "10px",
                            md: "0.875rem"
                        },
                        padding: {
                            xxs: "2px 6px",
                            xs: "3px 8px",
                            sm: "6px 16px"
                        }
                    }}
                        onClick={() => { addToLikedWatched("liked", ifLiked) }}
                    >{ifLiked} Liked {likedProgress}</Button>
                    <Button fullWidth sx={{
                        color: "addMenu.textColor", fontSize: {
                            xxs: "10px",
                            md: "0.875rem"
                        },
                        padding: {
                            xxs: "2px 6px",
                            xs: "3px 8px",
                            sm: "6px 16px"
                        }
                    }}
                        onClick={() => { addToLikedWatched("watch-later", ifWatchLater) }}
                    >{ifWatchLater} Watch Later {watchLaterProgress}</Button>
                    <Button fullWidth sx={{
                        color: "addMenu.textColor", fontSize: {
                            xxs: "10px",
                            md: "0.875rem"
                        },
                        padding: {
                            xxs: "2px 6px",
                            xs: "3px 8px",
                            sm: "6px 16px"
                        }
                    }}
                        onClick={addTowatched}
                    >{ifWatched} Watched {watchedProgress}</Button>

                    {/* shared accordian */}
                    <Button fullWidth sx={{
                        color: "addMenu.textColor", fontSize: {
                            xxs: "10px",
                            md: "0.875rem"
                        },
                        padding: {
                            xxs: "2px 6px",
                            xs: "3px 8px",
                            sm: "6px 16px"
                        }
                    }}
                        onClick={showFriendsBtn}

                        endIcon={showFriends ? <ExpandLess /> : <ExpandMore />}
                    >Share</Button>

                    {showFriends &&
                        <Box sx={{
                            bgcolor: "grey",
                            borderRadius: "10px"

                        }}>
                            {friends.map((ele, i) =>

                                <Button fullWidth id={`shareTo_${ele.email}_${i}`} key={`friend${i}`} sx={{
                                    color: "white", fontSize: {
                                        xxs: "10px",
                                        md: "0.875rem"
                                    },
                                    padding: {
                                        xxs: "2px 6px",
                                        xs: "3px 8px",
                                        sm: "6px 16px"
                                    }
                                }}
                                    onClick={shareToFriend}
                                >{ifShareFriends[i]}{`${ele.id.first_name} ${ele.id.last_name}`} {sharedProgress[i]}</Button>
                            )}
                            <Button fullWidth sx={{
                                color: "white", fontSize: {
                                    xxs: "10px",
                                    md: "0.875rem"
                                },
                                padding: {
                                    xxs: "2px 6px",
                                    xs: "3px 8px",
                                    sm: "6px 16px"
                                }
                            }}
                                onClick={copyLink}
                            >Copy Link</Button>
                        </Box>
                    }




                    {data[0] && data[0]?.map((ele, i) =>
                        <Button key={i} id={`playlist_${ele._id}`} fullWidth sx={{
                            color: "addMenu.textColor", fontSize: {
                                xxs: "10px",
                                md: "0.875rem"
                            },
                            padding: {
                                xxs: "2px 6px",
                                xs: "3px 8px",
                                sm: "6px 16px"
                            }
                        }}
                            onClick={(e) => addToPlaylist(e, i)}
                            endIcon={ele.shareable === "false" ? <Lock /> : <Link />}
                        >{`${ifPlaylist[i]} ${ele.name}`} {playlistProgress[i]}</Button>)}

                    {!isCreatePlaylist &&
                        <Button fullWidth sx={{
                            color: "white", fontSize: {
                                xxs: "10px",
                                md: "0.875rem"
                            },
                            padding: {
                                xxs: "2px 6px",
                                xs: "3px 8px",
                                sm: "6px 16px"
                            },
                            bgcolor: "grey"
                        }}
                            startIcon={<Add />}
                            onClick={() => createNewPlaylist("show")}
                        >Create A New Playlist</Button>}

                    {isCreatePlaylist &&
                        <Box>
                            <TextField fullWidth id="filled-basic" type="text" label="" placeholder='Enter Playlist Name' variant="filled"
                                sx={{
                                    "& input": {
                                        padding: "7px 5px",
                                        fontSize: "13px",
                                        color: "white",
                                        borderRadius: "4px"
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
                                    m: "10px 0",
                                    bgcolor: "grey",
                                    color: "white",
                                    borderRadius: "4px"
                                }}
                                value={newPlaylistName}
                                autoFocus
                                onChange={(e) => setNewPlaylistName(e.target.value)}
                            />

                            <Grid container justifyContent={"space-between"} alignItems={"center"}>

                                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                    {/* <InputLabel id="standard">Visibilty</InputLabel> */}
                                    <Select
                                        labelId="select-standard"
                                        id="select-standard"
                                        value={visibilty}
                                        onChange={(e) => setVisibilty(e.target.value)}
                                        label="visibilty"
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
                                <Button sx={{
                                    color: "white", fontSize: {
                                        xxs: "10px",
                                        md: "0.875rem"
                                    },
                                    padding: {
                                        xxs: "2px 6px",
                                        xs: "3px 8px",
                                        sm: "6px 16px"
                                    },
                                    bgcolor: "grey"
                                }}
                                    startIcon={<Add />}
                                    onClick={() => createNewPlaylist("create")}
                                >Save</Button>
                            </Grid>
                        </Box>
                    }
                </Box>
            </Modal>
        </>
    )
}


const AddMenuProgress = () => {
    return <CircularProgress size="15px" sx={{ ml: "10px", color: "addMenu.textColor" }} />
}


export default AddMenu