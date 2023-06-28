import { ArrowBackIosNewRounded, ArrowForwardIosRounded, MoreVert } from '@mui/icons-material'
import { Avatar, Box, Button, Drawer, Grid, Menu, MenuItem, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFirstName, getProfilePhoto, getPlaylists, getWatch_later, setData, setAlert } from '../../userSlice'
// import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import knowMore from '../KnowMore'
// import { apiKey } from '../../tmdb'
const RightSideNav = ({ isOpen, openFunc }) => {

    const firstName = useSelector(getFirstName)
    const profilePhoto = useSelector(getProfilePhoto)
    const playlists = useSelector(getPlaylists)
    const watchLater = useSelector(getWatch_later)
    // const watched = useSelector(getWatched)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {


        window.localStorage.setItem("accessToken", "")

        dispatch(
            setData({
                first_name: "",
                last_name: "",
                email: "",
                profile_photo: "",
                playlists: "",
                friends: "",
                pending_requests: "",
                watch_later: "",
                liked: "",
                watched: "",
                shared: ""
            })
        )
        openFunc(false)
        navigate("/")
        handleClose()
        dispatch(setAlert({
            type: "success",
            data: "Logout Succesfull",
            isOpen: true
        }))

    }

    return (
        <Drawer
            anchor={"right"}
            open={isOpen}
            onClose={() => { openFunc(false) }}
            sx={{
                zIndex: 10,
                width: {
                    xxs: "270px",
                    xsm: "300px"
                },
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: {
                        xxs: "270px",
                        xsm: "300px"
                    },
                    boxSizing: 'border-box',
                    p: "20px 20px",
                    borderRadius: "30px 0 0 30px",
                    bgcolor: "rightSideNav.background"
                },
            }}
        >
            <Button sx={{
                display: {
                    xxs: "inline-flex",
                    xsm: "none"
                },
                width: " fit-content",
                minWidth: 0,
                mb: 2,
                color: "rightSideNav.textColor"
            }} onClick={() => { openFunc(false) }}
                startIcon={<ArrowBackIosNewRounded />}

            > Back </Button>

            <Box sx={{
                height: "fit-content",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                    display: "none"
                },
            }}>

                <Stack sx={{ width: "100%" }}>

                    <Grid container justifyContent={"space-between"} my={1}>
                        <Grid container alignItems="center" color={"rightSideNav.textColor"} width={"fit-content"}>
                            <Avatar sx={{
                                width: "25px",
                                height: "25px",
                                mr: "5px"
                            }} src={profilePhoto}
                            /> {firstName}
                        </Grid>
                        <Button sx={{
                            minWidth: 0,
                            color: "rightSideNav.textColor"
                        }}
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : false}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : false}
                            onClick={handleClick}>
                            <MoreVert />
                        </Button>

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            bgcolor={"rightSideNav.cardBackground"}
                        >
                            {/* <MenuItem color={"rightSideNav.textColor"} onClick={handleClose}>Share Your Profile</MenuItem> */}
                            <MenuItem color={"rightSideNav.textColor"} onClick={logout}>Logout</MenuItem>
                        </Menu>
                    </Grid>
                    <Button onClick={() => { navigate("/profile"); openFunc(false) }}
                        sx={{
                            color: "rightSideNav.textColor",
                            bgcolor: "rightSideNav.cardBackground",
                            my: 1
                        }}
                    > View Your Profile</Button>



                    {/* <NewEpisodeRow tv={watched.series} id={"right_newEpi"} /> */}

                    <Row name={"Watch Later"} id={"right_watchLaterBox"} data={watchLater} />

                    {playlists && playlists?.map((e, i) =>
                        <Row key={e.playlist_id || i} id={"right_playlist/" + e.playlist_id} name={e.name} data={e.contents} />
                    )}



                </Stack>
            </Box>

        </Drawer>
    )
}

// const NewEpisodeRow = ({ tv, id }) => {

//     const scrollLeft = () => {
//         document.getElementById(id).scrollLeft -= 200
//     }
//     const scrollRight = () => {
//         document.getElementById(id).scrollLeft += 200
//     }

//     const [tvDetails, setTvDetails] = useState([])

//     useEffect(() => {
//         tv?.map((ele) =>
//             axios.get(`https://api.themoviedb.org/3/tv/${ele.details.id}?api_key=${apiKey}`).then((response) => {

//                 setTvDetails(prev => [...prev, response.data])
//             })

//         )
//     }, [tv])


//     return (
//         <Stack sx={{
//             width: "100%",
//             my: 1,
//         }}>
//             <Grid mb={1} container justifyContent={"space-between"} alignItems={"center"}>
//                 <Typography color={"rightSideNav.textColor"}>New Episode</Typography>
//                 <Box >
//                     <Button sx={{
//                         bgcolor: "scrollBtn.background",
//                         color: "scrollBtn.leftColor",
//                         minWidth: 0,
//                         padding: "3px 1px",
//                         mx: 1,
//                         "&:hover ": {
//                             backgroundColor: "#929294",
//                         },
//                     }}
//                         onClick={scrollLeft}
//                     ><ArrowBackIosNewRounded sx={{
//                         height: {
//                             xxs: "0.9rem",
//                             sm: "1rem",
//                             md: "1.5rem"
//                         },
//                         width: {
//                             xxs: "0.9rem",
//                             sm: "1rem",
//                             md: "1.5rem"
//                         }
//                     }} /></Button>
//                     <Button sx={{
//                         bgcolor: "scrollBtn.background",
//                         color: "scrollBtn.rightColor",
//                         minWidth: 0,
//                         padding: "3px 1px",
//                         mr: 1,
//                         "&:hover ": {
//                             backgroundColor: "#929294",
//                         },

//                     }}
//                         onClick={scrollRight}> <ArrowForwardIosRounded sx={{
//                             height: {
//                                 xxs: "0.9rem",
//                                 sm: "1rem",
//                                 md: "1.5rem"
//                             },
//                             width: {
//                                 xxs: "0.9rem",
//                                 sm: "1rem",
//                                 md: "1.5rem"
//                             }
//                         }} /> </Button>
//                 </Box>
//             </Grid>
//             <Box id={id} sx={{
//                 width: "100%",
//                 overflowX: "scroll",
//                 "&::-webkit-scrollbar": {
//                     display: "none"
//                 },
//             }}>
//                 <Grid container sx={{ width: "fit-content", flexWrap: "nowrap" }}>

//                     {tvDetails && tvDetails?.map((ele, i) =>
//                         ele.next_episode_to_air !== null && <Grid key={`newEpi` + i} onClick={() => knowMore(`tv/${ele.id}`)} container spacing={1} sx={{
//                             width: "200px",
//                             height: "150px",
//                             bgcolor: "rightSideNav.cardBackground",
//                             m: 0.5,
//                             p: 1,
//                             borderRadius: "10px",
//                             flexWrap: "nowrap", position: "relative"
//                         }}>
//                             <img src={`https://image.tmdb.org/t/p/original${ele.poster_path}`} alt="poster" style={{ height: "100%", width: "auto", objectFit: "contain", borderRadius: "7px" }} />
//                             <Grid item color={"rightSideNav.textColor"}>
//                                 <Typography sx={{ wordBreak: "break-all" }}>{ele?.name || ele.original_name}</Typography>
//                                 <Typography fontSize={"13px"}>S{ele?.last_episode_to_air.season_number} Ep{ele?.last_episode_to_air.episode_number}</Typography>
//                                 <Typography fontSize={"13px"}>{ele?.last_episode_to_air.air_date} </Typography>
//                             </Grid>
//                             <Box sx={{
//                                 position: "absolute",
//                                 left: 0,
//                                 bottom: "20px",
//                                 p: "2px 5px",
//                                 bgcolor: "blue"
//                             }}>
//                                 <Typography fontSize={"9px"}>New</Typography>
//                             </Box>
//                         </Grid>
//                     )}





//                 </Grid>




//             </Box>


//         </Stack>
//     )
// }


const Row = ({ name, data, id }) => {
    const scrollLeft = () => {
        document.getElementById(id).scrollLeft -= 150
    }
    const scrollRight = () => {
        document.getElementById(id).scrollLeft += 150
    }
    return (
        <Stack sx={{
            width: "100%",
            my: 1,
        }}>
            <Grid container justifyContent={"space-between"} alignItems={"center"}>
                {name !== "Watch Later" ? <Link to={id.split("_")[1]}>
                    <Typography color={"rightSideNav.textColor"}>{name}</Typography>
                </Link> : <Typography color={"rightSideNav.textColor"}>{name}</Typography>}

                <Box>
                    <Button sx={{
                        bgcolor: "scrollBtn.background",
                        color: "scrollBtn.leftColor",
                        minWidth: 0,
                        padding: "3px 1px",
                        mx: 1,
                        "&:hover ": {
                            backgroundColor: "#929294",
                        },
                    }}
                        onClick={scrollLeft}
                    ><ArrowBackIosNewRounded sx={{
                        height: {
                            xxs: "0.9rem",
                            sm: "1rem",
                            md: "1.5rem"
                        },
                        width: {
                            xxs: "0.9rem",
                            sm: "1rem",
                            md: "1.5rem"
                        }
                    }} /></Button>
                    <Button sx={{
                        bgcolor: "scrollBtn.background",
                        color: "scrollBtn.rightColor",
                        minWidth: 0,
                        padding: "3px 1px",
                        mr: 1,
                        "&:hover ": {
                            backgroundColor: "#929294",
                        },

                    }}
                        onClick={scrollRight}> <ArrowForwardIosRounded sx={{
                            height: {
                                xxs: "0.9rem",
                                sm: "1rem",
                                md: "1.5rem"
                            },
                            width: {
                                xxs: "0.9rem",
                                sm: "1rem",
                                md: "1.5rem"
                            }
                        }} /> </Button>
                </Box>
            </Grid>
            <Box sx={{
                width: "100%",
                overflow: "scroll",
                "&::-webkit-scrollbar": {
                    display: "none"
                },
            }} id={id} my={1}>
                <Grid container sx={{ width: "fit-content", flexWrap: "nowrap" }}>
                    {data && data?.map((ele, i) =>
                        <Box key={ele.id || i} onClick={() => knowMore(`${ele.media_type || ele.type}/${ele.media_id || ele.id}`)} sx={{
                            width: "150px",
                            height: "150px",
                            bgcolor: "rightSideNav.cardBackground",
                            m: 0.5,
                            p: 1,
                            borderRadius: "10px",
                            flexWrap: "nowrap",
                            color: "rightSideNav.textColor"
                        }}>
                            <img src={`https://image.tmdb.org/t/p/original${ele.background}`} alt="poster" style={{ width: "100%", objectFit: "contain", borderRadius: "7px" }} />
                            <Grid item>
                                <Typography
                                    sx={{
                                        width: "100%",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                    }}>{ele.name || ele.title || ""}</Typography>
                                <Typography fontSize={"13px"}>{ele.first_epi_date?.split("-")[0] || ele.release_date?.split("-")[0]}</Typography>
                            </Grid>

                        </Box>
                    )}
                </Grid>
            </Box>
        </Stack>
    )
}

export default RightSideNav