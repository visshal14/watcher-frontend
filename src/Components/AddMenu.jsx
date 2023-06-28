import { Add, Lock, Link, ExpandLess, ExpandMore, } from '@mui/icons-material';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlaylists, getFriends, setData, getShared, setAlert } from '../userSlice';
// import { getMediaData } from '../tmdb';
import backendAxios from "../backendAxios"
import LoginChecker from '../LoginChecker';
// import { UpdateUserData } from '../dataUpdate';

const AddMenu = ({ position, padding, mr, mt, height, id, name }, ref) => {

    const data = useSelector(getAllPlaylists)
    const friends = useSelector(getFriends)
    const shared = useSelector(getShared)
    const [mediaData, setMediaData] = useState()
    const [ifLiked, setIfLiked] = useState("Add To")
    const [ifWatchLater, setWatchLater] = useState("Add To")
    const [ifWatched, setIfWatched] = useState("Add To")
    const [ifPlaylist, setIfPlaylist] = useState([])
    const [ifShareFriends, setIfShareFriends] = useState([])
    const [showFriends, setShowFriends] = useState(false)
    const dispatch = useDispatch()


    useEffect(() => {
        // console.log(mediaData)
        buttonUpdates()
        // eslint-disable-next-line
    }, [data, mediaData, showFriends])

    const buttonUpdates = () => {

        if (!mediaData) {
            return
        }
        //data[0] is playlists
        setIfPlaylist([])
        data[0].map(() =>
            setIfPlaylist(prev => [...prev, "Add To"])
        )

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
            // console.log(mediaData + "Media Data")
            data[2].series.every((ele) => {
                if (ele.details.id === mediaData?.split("/")[1]) {
                    // console.log(ele.details.id + "  " + mediaData.split("/")[1] + "  if")
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
                    // console.log(ele.details.id + "  " + mediaData.split("/")[1] + "  else")

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
        friends?.map(() =>
            setIfShareFriends(prev => [...prev, "Share To "])
        )
        friends?.forEach((ele, i) => {
            shared?.every((e) => {
                if (ele.email === e.email && `${mediaData?.split("/")[0]}/${mediaData.split("/")[1]}` === `${e.mediaType}/${e.mediaId}`) {
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




        // data[4]?.map((ele) => {
        //     if (`${ele.mediaType}/${ele.mediaId}` === mediaData) {
        //         friends.map((x, i) => {
        //             if (x.email === ele.email) {
        //                 setIfShareFriends((prev) =>
        //                     prev.map((x, j) =>
        //                         j === i ? "UnShare To " : "Share To "
        //                     ))
        //             }
        //         })
        //     }
        // })







    }



    // useEffect(() => {
    //     console.log(ifShareFriends.length + "   " + friends.length)
    //     if (ifShareFriends.length > friends.length + 1) {
    //         setIfShareFriends([])
    //     }
    // }, [ifShareFriends])

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setMediaData(event.currentTarget.id)


        LoginChecker()
        buttonUpdates()


    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const addToLikedWatched = async (type, value) => {

        if (value === "Remove From") {
            backendAxios.post(`/removeFromWatchLLiked/${type}/${mediaData.split("/")[1]}`).then((response) => {
                if (response.data.errMsg) {
                    dispatch(setAlert({
                        type: "error",
                        data: response.data.errMsg,
                        isOpen: true
                    }))


                    return
                    // return alert("error in saving")
                }
                dispatchSetData(response.data.data)
                // dispatch(
                //     setData({
                //         first_name: response.data.data.first_name,
                //         last_name: response.data.data.last_name,
                //         email: response.data.data.email,
                //         profile_photo: response.data.data.profile_photo,
                //         playlists: response.data.data.playlists,
                //         friends: response.data.data.friends,
                //         pending_requests: response.data.data.pending_requests,
                //         watch_later: response.data.data.watch_later,
                //         liked: response.data.data.liked,
                //         watched: response.data.data.watched,
                //         shared: response.data.data.shared
                //     })
                // )
                dispatch(setAlert({
                    type: "success",
                    data: response.data.msg,
                    isOpen: true
                }))


                // return
                // alert(response.data.msg)
            })
        } else {
            backendAxios.post(`/saveForWatchLater/${type}/${mediaData.split("/")[0]}/${mediaData.split("/")[1]}`).then((response) => {
                if (response.data.errMsg) {
                    dispatch(setAlert({
                        type: "error",
                        data: response.data.errMsg,
                        isOpen: true
                    }))


                    return
                    // return alert("error in saving")
                }

                dispatchSetData(response.data.data)

                // dispatch(
                //     setData({
                //         first_name: response.data.data.first_name,
                //         last_name: response.data.data.last_name,
                //         email: response.data.data.email,
                //         profile_photo: response.data.data.profile_photo,
                //         playlists: response.data.data.playlists,
                //         friends: response.data.data.friends,
                //         pending_requests: response.data.data.pending_requests,
                //         watch_later: response.data.data.watch_later,
                //         liked: response.data.data.liked,
                //         watched: response.data.data.watched,
                //         shared: response.data.data.shared
                //     })
                // )
                dispatch(setAlert({
                    type: "success",
                    data: response.data.msg,
                    isOpen: true
                }))


                // return
                // alert(response.data.msg)
                // UpdateUserData(response.data.data)
            })
        }
    }



    const addTowatched = () => {

        if (mediaData.split("/")[0] === "movie") {
            backendAxios.post(`/watchedMovie/${mediaData.split("/")[1]}`).then((response) => {
                if (response.data.errMsg) {
                    dispatch(setAlert({
                        type: "error",
                        data: response.data.errMsg,
                        isOpen: true
                    }))


                    return
                    // return alert("error in saving")
                }

                dispatchSetData(response.data.data)

                // dispatch(
                //     setData({
                //         first_name: response.data.data.first_name,
                //         last_name: response.data.data.last_name,
                //         email: response.data.data.email,
                //         profile_photo: response.data.data.profile_photo,
                //         playlists: response.data.data.playlists,
                //         friends: response.data.data.friends,
                //         pending_requests: response.data.data.pending_requests,
                //         watch_later: response.data.data.watch_later,
                //         liked: response.data.data.liked,
                //         watched: response.data.data.watched,
                //         shared: response.data.data.shared
                //     })
                // )
                dispatch(setAlert({
                    type: "success",
                    data: response.data.msg,
                    isOpen: true
                }))


                // return
                // alert(response.data.msg)
            })
        } else if (mediaData.split("/")[0] === "tv") {
            const season = mediaData.split("/")[2] || "all"
            const epi = mediaData.split("/")[3] || "all"


            backendAxios.post(`/watchedSeries/${mediaData.split("/")[1]}/${season}/${epi}`).then((response) => {
                if (response.data.errMsg) {
                    dispatch(setAlert({
                        type: "error",
                        data: response.data.errMsg,
                        isOpen: true
                    }))


                    return
                    // return alert("error in saving")
                }

                dispatchSetData(response.data.data)
                // dispatch(
                //     setData({
                //         first_name: response.data.data.first_name,
                //         last_name: response.data.data.last_name,
                //         email: response.data.data.email,
                //         profile_photo: response.data.data.profile_photo,
                //         playlists: response.data.data.playlists,
                //         friends: response.data.data.friends,
                //         pending_requests: response.data.data.pending_requests,
                //         watch_later: response.data.data.watch_later,
                //         liked: response.data.data.liked,
                //         watched: response.data.data.watched,
                //         shared: response.data.data.shared
                //     })
                // )
                // if (response.data.msg === "Added To Watched") {
                //     setIfWatched("Remove From")
                // } else {
                //     setIfWatched("Add To")
                // }
                dispatch(setAlert({
                    type: "success",
                    data: response.data.msg,
                    isOpen: true
                }))


                return
                // alert(response.data.msg)

            })
        }
    }



    const showFriendsBtn = () => {
        setShowFriends(!showFriends)
    }

    const shareToFriend = (e) => {
        const friendEmail = e.currentTarget.id.split("_")[1]

        let tempMediaData = mediaData.split("/")[0] + "/" + mediaData.split("/")[1]

        // console.log(friendEmail + "   " + mediaData)
        backendAxios.post(`shareToFriend`, {
            friendEmail: friendEmail,
            mediaData: tempMediaData
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

            dispatchSetData(response.data.data)

            // dispatch(
            //     setData({
            //         first_name: response.data.data.first_name,
            //         last_name: response.data.data.last_name,
            //         email: response.data.data.email,
            //         profile_photo: response.data.data.profile_photo,
            //         playlists: response.data.data.playlists,
            //         friends: response.data.data.friends,
            //         pending_requests: response.data.data.pending_requests,
            //         watch_later: response.data.data.watch_later,
            //         liked: response.data.data.liked,
            //         watched: response.data.data.watched,
            //         shared: response.data.data.shared
            //     })
            // )

            dispatch(setAlert({
                type: "success",
                data: response.data.msg,
                isOpen: true
            }))


            // return
            // alert(response.data.msg)
        })
        // setShowFriends(!showFriends)
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


    const addToPlaylist = (e) => {
        // console.log(e.currentTarget.id)
        backendAxios.post(`/addMediaToPlaylist`, {
            _id: e.currentTarget.id.split("_")[1],
            media_id: mediaData.split("/")[1],
            media_type: mediaData.split("/")[0]
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
            dispatchSetData(response.data.data)
            // dispatch(
            //     setData({
            //         first_name: response.data.data.first_name,
            //         last_name: response.data.data.last_name,
            //         email: response.data.data.email,
            //         profile_photo: response.data.data.profile_photo,
            //         playlists: response.data.data.playlists,
            //         friends: response.data.data.friends,
            //         pending_requests: response.data.data.pending_requests,
            //         watch_later: response.data.data.watch_later,
            //         liked: response.data.data.liked,
            //         watched: response.data.data.watched,
            //         shared: response.data.data.shared
            //     })
            // )

            dispatch(setAlert({
                type: "success",
                data: response.data.msg,
                isOpen: true
            }))


            // return
            // alert(response.data.msg)
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
                if (response.data.errMsg) {
                    dispatch(setAlert({
                        type: "error",
                        data: response.data.errMsg,
                        isOpen: true
                    }))


                    return
                    // return alert(response.data.errMsg)
                }
                if (response.data.success) {
                    backendAxios.post("/addMediaToPlaylist", {
                        _id: response.data.playlist_id,
                        media_id: mediaData.split("/")[1],
                        media_type: mediaData.split("/")[0]
                    }).then((res) => {
                        if (res.data.errMsg) {
                            dispatch(setAlert({
                                type: "error",
                                data: response.data.errMsg,
                                isOpen: true
                            }))


                            return
                            // return alert(res.data.errMsg)
                        }

                        dispatchSetData(res.data.data)
                        // dispatch(
                        //     setData({
                        //         first_name: res.data.data.first_name,
                        //         last_name: res.data.data.last_name,
                        //         email: res.data.data.email,
                        //         profile_photo: res.data.data.profile_photo,
                        //         playlists: res.data.data.playlists,
                        //         friends: res.data.data.friends,
                        //         pending_requests: res.data.data.pending_requests,
                        //         watch_later: res.data.data.watch_later,
                        //         liked: res.data.data.liked,
                        //         watched: res.data.data.watched,
                        //         shared: res.data.data.shared
                        //     })
                        // )
                        dispatch(setAlert({
                            type: "success",
                            data: res.data.msg,
                            isOpen: true
                        }))


                        // return
                        // alert(res.data.msg)

                    })
                }

            })
            setNewPlaylistName("")
            setIsCreatePlaylist(!isCreatePlaylist)

        }
    }


    const dispatchSetData = (data) => {
        dispatch(
            setData({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                profile_photo: data.profile_photo,
                playlists: data.playlists,
                friends: data.friends,
                pending_requests: data.pending_requests,
                watch_later: data.watch_later,
                liked: data.liked,
                watched: data.watched,
                shared: data.shared
            })
        )


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
                    // border: "1px solid white",
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
                        // border: "1px solid black",
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
                    >{ifLiked} Liked</Button>
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
                    >{ifWatchLater} Watch Later</Button>
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
                    >{ifWatched} Watched</Button>

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

                                <Button fullWidth id={`shareTo_${ele.email}`} key={`friend${i}`} sx={{
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
                                >{ifShareFriends[i]}{ele.name}</Button>
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
                            onClick={addToPlaylist}
                            endIcon={ele.shareable === "false" ? <Lock /> : <Link />}
                        >{`${ifPlaylist[i]} ${ele.name}`}</Button>)}

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
                                        padding: "7px 5px ",
                                        fontSize: "13px",
                                        color: "white"
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
                                    m: "10px 0",
                                    bgcolor: "grey",
                                    color: "white"
                                }}
                                value={newPlaylistName}

                                onChange={(e) => setNewPlaylistName(e.target.value)}
                            />

                            <Grid container justifyContent={"space-between"} alignItems={"center"}>

                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Visibilty</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={visibilty}
                                        onChange={(e) => setVisibilty(e.target.value)}
                                        label="Age"
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


export default AddMenu