import { Box, Button, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import React, { useRef } from 'react'

import ProfileTabs from './ProfileTabs'
import { useSelector } from 'react-redux'

import { ArrowBackIosNewRounded, ArrowForwardIosRounded, PlayArrowRounded } from '@mui/icons-material'
import AddMenu from '../AddMenu'
import MovieOverviewTip from '../MovieOverviewTip'
import knowMore from '../KnowMore'
import { getWatch_later, getLiked, getWatched, getPlaylists } from '../../userSlice'
import { Link } from 'react-router-dom'
import LoginChecker from '../../LoginChecker'
import { Helmet } from 'react-helmet'

const Profilepage = () => {
    LoginChecker()
    const watchLater = useSelector(getWatch_later)
    const liked = useSelector(getLiked)
    const watched = useSelector(getWatched)
    const playlists = useSelector(getPlaylists)



    return (
        <Stack px={{
            xxs: 1,
            sm: 5,
            md: 8
        }} py={{
            xxs: 8,
            sm: 12,
            // md: 12
        }} sx={{
        }} >

            <ProfileTabs />
            <Stack>
                <Row titles="Liked" url={"/liked"} data={liked} />
                <Row titles="Watch Later" url={"/watchlater"} data={watchLater} />
                <Row titles="Watched Movies" data={watched?.movies} />
                <Row titles="Watched Tv" data={watched?.series} />
                {playlists && playlists?.map((ele, i) =>
                    <Row key={"playlist_" + i} titles={ele.name} url={"/playlist/" + ele.playlist_id} data={ele.contents} />
                )}
            </Stack>

        </Stack>
    )
}

const Row = ({ titles, data, url }) => {

    const rowRef = useRef(null)
    const scrollLeft = () => {
        rowRef.current.scrollLeft -= 300;
    }
    const scrollRight = () => {
        rowRef.current.scrollLeft += 300;
    }



    return (

        <Box my={1}>
            <Grid container sx={{ justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>

                {url ?
                    <Link to={url}>
                        <Typography component="span" variant='h5' color={"playlists.textColor"} sx={{
                            fontSize: {
                                xxs: "0.8rem",
                                sm: "1.5rem"
                            }

                        }}> {titles} </Typography>
                    </Link>
                    : <Typography component="span" variant='h5' color={"playlists.textColor"} sx={{
                        fontSize: {
                            xxs: "0.8rem",
                            sm: "1.5rem"
                        }

                    }}> {titles} </Typography>}

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
            <Helmet>
                <title>Watcher</title>
            </Helmet>

            <Grid id={titles} ref={rowRef} container flexWrap="nowrap" overflow="auto"
                sx={{
                    "&::-webkit-scrollbar": {
                        display: "none"
                    },
                    overflowY: "hidden",
                    scrollSnapType: "x mandatory",
                    height: {
                        xxs: "158px",
                        sm: "166px",
                        md: "200px"

                    }
                }}>
                {data &&
                    data?.map((ele, i) => (
                        <Box id={`${ele?.type || ele.details?.type || ele?.media_type}/${ele?.id || ele?.details?.id || ele?.media_id}-outer`} key={i} sx={{
                            minWidth: {
                                xxs: "200px",
                                sm: "250px",
                                md: "300px"
                            },
                            height: {
                                xxs: "133px",
                                sm: "166px",
                                md: "200px"
                            },
                            marginRight: "10px",
                            bgcolor: "gray",
                            borderRadius: {
                                xxs: "10px 10px 0 0",
                                sm: "10px"
                            },
                            scrollSnapAlign: "start",
                            position: "relative",
                            cursor: "pointer"
                        }}>

                            <AddMenu id={`${ele.type || ele.media_type || ele?.details?.type}/${ele.id || ele.media_id || ele.details?.id}`} name={ele.name || ele.title || ele?.original_title || ele?.details.title || ""} />

                            <Tooltip componentsProps={{
                                tooltip: {
                                    sx: {
                                        p: 1,
                                        bgcolor: "toolTip.background"
                                    },
                                },
                            }} title={<MovieOverviewTip ele={ele} bgcolor={"red"} />} enterDelay={500} placement="right">


                                <Box onClick={() => knowMore(`${ele.type || ele.media_type || ele.details?.type}/${ele.id || ele.media_id || ele.details?.id}`)} sx={{
                                    width: "100%",
                                    height: "100%",
                                    position: "relative",
                                    bgcolor: "gray",
                                    borderRadius: {
                                        xxs: "10px 10px 0 0",
                                        sm: "10px"
                                    },
                                }}>


                                    <Box id={`${ele.type || ele.media_type || ele.details?.type}/${ele.id || ele.media_id || ele.details?.id}`} sx={{
                                        width: "100%",
                                        height: "100%",
                                        position: "absolute",
                                        // zIndex: 1
                                    }}>

                                    </Box>


                                    <img className='row-image-border' src={`https://image.tmdb.org/t/p/original${ele.background || ele.details?.background}`} loading="lazy" alt="abc" style={{
                                        width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px"
                                    }} />




                                    <Grid container alignItems="center" sx={{
                                        height: {
                                            xxs: "25px",
                                            sm: "30px",
                                            md: "50px"
                                        },
                                        width: "100%",
                                        bgcolor: "rgba(0, 0, 0, 0.4)",
                                        position: "absolute",
                                        bottom: {
                                            xxs: -25,
                                            sm: 0,

                                        },
                                        color: {
                                            xxs: "row.textColor",
                                            sm: "white"
                                        },
                                        borderRadius: "0 0 10px 10px",
                                        padding: {
                                            xxs: "1px",
                                            sm: "3px",
                                            md: "5px"
                                        },
                                    }}>
                                        <IconButton sx={{
                                            padding: {
                                                xxs: "0px",
                                                sm: "2px",
                                                md: "8px"
                                            }
                                        }}>
                                            <PlayArrowRounded sx={{ color: "row.textColor" }} />
                                        </IconButton>
                                        <Typography sx={{
                                            width: "80%",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            fontSize: {
                                                xxs: "13px",
                                                sm: "15px",
                                                md: "20px"
                                            }
                                        }}>

                                            {ele.name || ele.title || ele?.original_title || ele?.details.title || ""}
                                        </Typography>
                                    </Grid>
                                </Box>
                            </Tooltip>





                        </Box>



                    ))
                }

            </Grid >

        </Box >

    )
}



export default Profilepage