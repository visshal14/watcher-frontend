import { ClearRounded, DoneRounded, ExpandMore, Send } from '@mui/icons-material'
import { Avatar, Divider, Grid, List, Button, ListItem, Box, TextField, ListItemAvatar, ListItemText, Stack, Typography, IconButton, Accordion, AccordionSummary, AccordionDetails, Card, CardActionArea, CardMedia, CardContent, InputAdornment } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getFriends, getPending_requests, setData, setAlert, getEmail } from '../../userSlice'
import backendAxios from "../../backendAxios"
import { useNavigate } from 'react-router-dom'
import knowMore from '../KnowMore'

const FriendDetails = () => {

    const pendingRequest = useSelector(getPending_requests)
    const friends = useSelector(getFriends)
    const currentEmail = useSelector(getEmail)
    const [currentFriend, setCurrentFriend] = useState("")
    const dispatch = useDispatch()
    const sharedList = useSelector(getFriends)
    const [currentSharedList, setCurrentSharedList] = useState()

    useEffect(() => {
        sharedList && sharedList?.forEach((ele) =>
            ele.email === currentFriend ?
                setCurrentSharedList(ele.shared_items)
                : ""
        )

    }, [sharedList, currentFriend])

    // useEffect(() => {
    //     // // console.log(friends)
    // }, [friends])

    const [friendExpand, setFriendExpand] = useState(false)
    const [pendingRequestEmail, setPendingRequestEmail] = useState("")
    const friendClicked = (e) => {
        setCurrentFriend(e.currentTarget.id)
        setFriendExpand(!friendExpand)
        getFriendPlaylist(e.currentTarget.id)
    }

    const [currentFriendPlaylist, setCurrentFriendPlaylist] = useState([])
    const getFriendPlaylist = (email) => {

        backendAxios.get(`/getPlaylists/${email}`).then((response) => {
            if (response.data.errMsg) {
                dispatch(setAlert({
                    type: "error",
                    data: response.data.errMsg,
                    isOpen: true
                }))
                return
            }

            setCurrentFriendPlaylist(response.data.data)
        }).catch((e) => {
            // // console.log("freindDetails Error 56")

            dispatch(setAlert({
                type: "error",
                data: "There is been error, please try again",
                isOpen: true
            }))

            // // // console.log("error in axios ", e)
        })


    }




    const pendingRequestSend = () => {
        if (pendingRequestEmail === currentEmail) {
            return dispatch(setAlert({
                type: "error",
                data: "Cannot Send Request",
                isOpen: true
            }))
        }

        backendAxios.post(`/addFriend`, {
            friendEmail: pendingRequestEmail
        }).then((response) => {
            if (response.data === "Unauthorized") return window.location.reload();
            if (response.data.errMsg) {
                dispatch(setAlert({
                    type: "error",
                    data: response.data.errMsg,
                    isOpen: true
                }))
                return
            }

            dispatch(setAlert({
                type: response.data.errMsg || response.data.err ? "error" : "success",
                data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                isOpen: true
            }))


            dispatchSetData(response.data.data)
            setPendingRequestEmail("")
        }).catch(() => {
            // // console.log("freindDetails Error 105")

            dispatch(setAlert({
                type: "error",
                data: "There is been error, please try again",
                isOpen: true
            }))

            return window.location.reload();
        })
    }

    const pendingRequestAddRemove = (e) => {
        setFriendExpand(false)

        if (e.currentTarget.id.split("_")[1] === "add") {
            backendAxios.post("/acceptFriendRequest", {
                friendEmail: e.currentTarget.id.split("_")[2]
            }).then((response) => {

                if (response.data.errMsg) {
                    dispatch(setAlert({
                        type: "error",
                        data: response.data.errMsg,
                        isOpen: true
                    }))
                    return
                }


                dispatch(setAlert({
                    type: response.data.errMsg || response.data.err ? "error" : "success",
                    data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                    isOpen: true
                }))


                dispatchSetData(response.data.data)
            }).catch((e) => {
                // // console.log("freindDetails Error 144")

                dispatch(setAlert({
                    type: "error",
                    data: "There is been error, please try again",
                    isOpen: true
                }))

                // // // console.log("error in axios ", e)
            })
        } else {
            backendAxios.post(`/removeFriend/${e.currentTarget.id.split("_")[0]}`, {
                friendEmail: e.currentTarget.id.split("_")[2]
            }).then((response) => {
                if (response.data.errMsg) {
                    dispatch(setAlert({
                        type: "error",
                        data: response.data.errMsg,
                        isOpen: true
                    }))
                    return
                }

                dispatch(setAlert({
                    type: response.data.errMsg || response.data.err ? "error" : "success",
                    data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                    isOpen: true
                }))



                dispatchSetData(response.data.data)

            }).catch((e) => {
                // // console.log("freindDetails Error 178")

                dispatch(setAlert({
                    type: "error",
                    data: "There is been error, please try again",
                    isOpen: true
                }))

                // // // console.log("error in axios ", e)
            })
        }
    }


    const dispatchSetData = (data) => {
        dispatch(setData(data))


    }



    return (
        <Grid container>
            <Grid item xxs={12} sm={6} sx={{
                p: {
                    xxs: "10px 10px 5px 10px",
                    sm: "10px 5px 10px 10px"
                },
                height: "100%"
            }}>
                <Stack sx={{
                    bgcolor: "friends.background",
                    height: "100%",
                    borderRadius: "10px",
                    p: "10px"
                }} >
                    <Grid container justifyContent={"space-between"} px={2} color={"friends.textColor"} >
                        <Typography>
                            Friend
                        </Typography>
                        <Typography>
                            {friends?.length}
                        </Typography>
                    </Grid>
                    <Divider />
                    <List dense={true} sx={{
                        height: "100%",
                        overflowY: "scroll",
                        maxHeight: "250px",
                        "&::-webkit-scrollbar": {
                            display: "none"
                        },
                        bgcolor: "friends.innerBoxBackground",
                        borderRadius: "10px",
                        mt: "10px",
                        color: "friends.textColor"
                    }}
                    >
                        {friends.length === 0 &&
                            <ListItem  >
                                <ListItemAvatar>
                                    <Avatar />
                                </ListItemAvatar>
                                <ListItemText primary={"Please Add Friend"} />
                            </ListItem>
                        }

                        {friends && friends?.map((ele, i) =>

                            <ListItem key={`friend${i}`} id={ele.id.email} onClick={friendClicked}>
                                <ListItemAvatar>
                                    <Avatar src={ele.id.profile_photo} />
                                </ListItemAvatar>
                                <ListItemText primary={`${ele.id.first_name} ${ele.id.last_name}`} />
                            </ListItem>
                        )}

                    </List>

                </Stack>


            </Grid>
            {!friendExpand && <Grid item xxs={12} sm={6} sx={{
                p: {
                    xxs: "0 10px 10px 10px",
                    sm: "10px 10px 10px 5px"
                }
            }}>
                <Box sx={{
                    bgcolor: "friends.background",
                    p: "10px",
                    borderRadius: '10px',
                    // mb: "16px",
                    mb: pendingRequest ? "10px" : "",
                    color: "friends.textColor"
                }}>
                    <Typography>Add Friend</Typography>
                    <TextField fullWidth id="filled-basic" type="email" label="" placeholder='Enter Email' variant="filled"
                        sx={{
                            "& input": {
                                padding: 1,
                                fontSize: "15px",
                            },
                            "& input:focus": {
                                outline: "none"
                            },
                            "& .MuiInputBase-root": {
                                borderRadius: "8px"
                            },
                            m: "10px 0 0 ",
                            borderRadius: "8px ",
                            bgcolor: "friends.inputColor"
                        }}
                        value={pendingRequestEmail}
                        onChange={(e) => setPendingRequestEmail(e.target.value)}
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
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={pendingRequestSend}>
                                        <Send color={"friends.textColor"} />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>
                {pendingRequest?.length !== 0 && pendingRequest && <Box sx={{
                    bgcolor: "friends.background",
                    p: "10px",
                    borderRadius: '10px',
                    color: "friends.textColor"
                }}>
                    <Typography>Pending Request</Typography>
                    <List dense={true} sx={{
                        mt: 1,
                        height: "100%",
                        overflowY: "scroll",
                        maxHeight: "150px",
                        "&::-webkit-scrollbar": {
                            display: "none"
                        },
                        bgcolor: "friends.innerBoxBackground",
                        borderRadius: "10px",
                    }}>
                        {pendingRequest?.map((ele, i) =>
                            <ListItem key={`pendingFriend${i}`}
                                secondaryAction={
                                    <Box>
                                        <IconButton edge="end" id={`pending_add_${ele.id.email}`} aria-label="delete" onClick={pendingRequestAddRemove}>
                                            <DoneRounded sx={{
                                                color: "#009545"
                                            }} />
                                        </IconButton>
                                        <IconButton edge="end" id={`pending_remove_${ele.id.email}`} aria-label="delete" onClick={pendingRequestAddRemove}>
                                            <ClearRounded sx={{
                                                color: "#AA0404"
                                            }} />
                                        </IconButton>
                                    </Box>

                                }>
                                <ListItemAvatar>
                                    <Avatar src={ele.id.profile_photo} />
                                </ListItemAvatar>
                                <ListItemText primary={`${ele.id.first_name} ${ele.id.last_name}`} />
                            </ListItem>
                        )}

                    </List>
                </Box>}


            </Grid>}



            {
                friendExpand && <Grid item xxs={12} p={{

                    xxs: "5px 10px 10px 10px",
                    sm: "10px 10px 0 5px"
                }} sm={6}>
                    <AFriendDetail email={currentFriend} friendRemoveFunc={pendingRequestAddRemove} currentSharedList={currentSharedList} playlists={currentFriendPlaylist} />
                </Grid>

            }
        </Grid>
    )
}

const AFriendDetail = ({ email, friendRemoveFunc, currentSharedList, playlists }) => {
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    const navigate = useNavigate()
    return (
        <Box sx={{
            bgcolor: "friends.background",
            padding: "10px",
            borderRadius: "10px",
            mb: {
                xxs: "0",
                sm: "10px"
            },
            color: "friends.textColor"
        }}>
            <Grid container mb={1} justifyContent={"space-between"} alignItems={"center"}>
                <Typography>{email}</Typography>
                <Button sx={{
                    color: "friends.textColor",
                    bgcolor: "friends.removeBtnBackground"
                }} id={`friend_remove_${email}`} onClick={friendRemoveFunc}>Remove From List </Button>
            </Grid>

            <Box sx={{
                maxHeight: "230px",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                    display: "none"
                },
            }}>

                <Accordion sx={{

                    bgcolor: "friends.innerBoxBackground",
                    color: "friends.textColor",
                    borderRadius: "10px",
                    "&:first-of-type": {
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px"
                    },
                    mb: 1
                }}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Shared movies</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container justifyContent={"center"} alignItems={"center"} sx={{
                            overflow: "scroll",
                            "&::-webkit-scrollbar": {
                                display: "none"
                            },
                        }}>
                            {
                                currentSharedList?.map((ele) =>
                                    <Card key={`card_${ele.id}`} sx={{ maxWidth: 350, m: 1, borderRadius: "10px", width: "100%", bgcolor: "friends.background" }} id={`${ele.type}/${ele.id}`} onClick={(e) => {
                                        // // // console.log(`${ele.type}/${ele.id}`)
                                        knowMore(`${ele.type}/${ele.id}`)
                                    }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={`https://image.tmdb.org/t/p/original${ele.background}`}
                                                alt="cardImage"
                                            />
                                            <CardContent sx={{
                                                minHeight: "150px"
                                            }}>
                                                <Typography color={"friends.textColor"} gutterBottom variant="h5" component="div">
                                                    {ele.title}
                                                </Typography>
                                                <Typography variant="body2" color={"friends.textColor"} >
                                                    {truncate(ele.description, 150)}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>

                                )
                            }

                        </Grid>
                    </AccordionDetails>
                </Accordion>


                <Accordion
                    sx={{

                        bgcolor: "friends.innerBoxBackground",
                        color: "friends.textColor",
                        borderRadius: "10px",
                        "&:first-of-type": {
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px"
                        },
                        "&:last-of-type": {
                            borderBottomLeftRadius: "10px",
                            borderBottomRightRadius: "10px"
                        },
                    }}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Shared Playlist</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {playlists.map((ele) =>
                            <Button key={ele.playlist_id} sx={{
                                maxWidth: "100%",
                                width: "100%",
                                bgcolor: "friends.background",
                                color: "friends.textColor",
                                mb: 1
                            }}
                                onClick={() => navigate(`/playlist/${ele.playlist_id}`)}
                            >{ele.name}</Button>

                        )}

                    </AccordionDetails>
                </Accordion>

            </Box>
        </Box>
    )
}


export default FriendDetails