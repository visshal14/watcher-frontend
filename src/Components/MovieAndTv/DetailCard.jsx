import { FiberManualRecord, StarRateRounded, StopCircleOutlined, YouTube } from '@mui/icons-material'
import { Grid, Box, Stack, Typography, Button, Avatar, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from "react-helmet";
import AddMenu from '../AddMenu'
import Cast from './Cast'
import WatchLater from '../WatchLaterBtn'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { apiKey } from '../../tmdb';

const DetailCard = ({ watch_provider, tempDetails, isTv, cast, detailsRef, setIsTrailer }) => {

    const [videoID, setVideoID] = useState("")


    const getHourFromRuntime = (runtime) => {
        const h = runtime / 60
        const min = runtime % 60
        return `${h.toString()[0]}h ${min}min`
    }
    const { id, epino } = useParams()


    const [details, setDetails] = useState(tempDetails)
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [isVideos, setIsVideos] = useState(0)
    const [player, setPlayer] = useState();
    const [isPlayTrailer, setIsPlayTrailer] = useState(true)
    const [detailsDisplay, setDetailDisplay] = useState(true)
    const [youtubeError, setYoutubeError] = useState(false)
    const [seasonVideos, setSeasonVideos] = useState()


    useEffect(() => {
        setDetails(tempDetails)
    }, [tempDetails])


    useEffect(() => {
        details?.videos?.results.length > 0 ? setIsVideos(true) : setIsVideos(false)
    }, [details])


    useEffect(() => {

        if (epino && !details?.current_season_no_of_episodes) {

            axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${epino}?api_key=${apiKey}&append_to_response=videos`).then((response) => {
                if (response.data.videos.results.length > 0) {
                    setSeasonVideos(response.data)
                } else {
                    setSeasonVideos(details)
                }


                setDetails({
                    ...details,
                    current_season_overview: response.data.overview,
                    current_season_no_of_episodes: response.data.episodes.length,
                    current_season_air_date: response.data.air_date,
                    current_season_poster_path: response.data.poster_path
                })

            }).catch((e) => {
                console.log("error in axios ", e)
            })
        }



    }, [epino, details, id])


    useEffect(() => {

        if (epino) {

            axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${epino}?api_key=${apiKey}&append_to_response=videos`).then((response) => {
                setSeasonVideos(response.data)
            })
        }


    }, [epino, id])



    useEffect(() => {


        if (epino) {
            // eslint-disable-next-line
            details?.seasons.map((ele) => {
                if (ele.season_number === parseInt(epino)) {
                    setDetails({
                        ...details,
                        current_season_overview: ele.overview,
                        current_season_no_of_episodes: ele.episode_count,
                        current_season_air_date: ele.air_date,
                        current_season_vote_average: ele.vote_average,
                        current_season_poster_path: ele.poster_path
                    })


                }
            })
        }






        // eslint-disable-next-line
    }, [epino])





    const playTrailer = () => {
        setOpen((prevOpen) => !prevOpen);
    }

    useEffect(() => {

        try {
            if (isPlayTrailer) {
                player?.pauseVideo()
            } else {
                player?.playVideo();
            }
        } catch (e) { }

        if (setIsTrailer) {
            setIsTrailer(!isPlayTrailer)
        }
        // eslint-disable-next-line
    }, [isPlayTrailer, player, videoID])



    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }



    useEffect(() => {
        if (!videoID) return



        var tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.setAttribute("onload", "onYouTubeIframeReady()");
        var firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeReady = function () {
            new window.YT.Player("player", {
                videoId: videoID,
                autoplay: true,
                borderRadius: "20px",
                playerVars: {
                    'autoplay': 1,
                    'controls': 1,
                    'autohide': 1,
                    'wmode': 'opaque',
                    'origin': 'http://localhost:3000'
                },
                events: {
                    "onReady": (event) => {
                        event.target.pauseVideo();
                        setPlayer(event.target)
                    },
                    'onError': function (errEvent) {
                        console.log("onError")
                        setYoutubeError(true)

                    }
                }
            })

        };
    }, [videoID]);







    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };



    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);


    const playYoutubeVideo = (key) => {


        if (player) {

            player.loadVideoById(key)
        }

        setVideoID(key)

        if (youtubeError) {
            return
        }


        setIsPlayTrailer(false)
        setDetailDisplay(false)
    }

    const stopYoutube = () => {
        setIsPlayTrailer(true)
        setDetailDisplay(true)

    }


    return (
        <Grid item xxs={12} sx={{
            height: "100%",
            borderRadius: "20px",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            position: "relative",
            cursor: "default"
        }}>


            <Box sx={{
                position: "absolute",
                zIndex: isPlayTrailer ? -1 : 0,
                top: 0,
                left: 0,
                borderRadius: "20px",
                height: {
                    xxs: "200px",
                    xs: "300px",
                    xsm: "400px",
                    // sm: "100%"
                    sm: isPlayTrailer ? "100%" : `calc(100% - ${detailsRef?.current?.clientHeight}px)`
                },
                minHeight: "200px",
                width: "100%"
            }}>

                <Box
                    id="player"
                    sx={{
                        width: "100%",
                        //  height: {
                        //     xxs: "200px",
                        //     xs: "300px",
                        //     xsm: "400px",
                        //     sm: "100%"
                        // },
                        height: "100%",

                        // zIndex: 0,
                        top: 0,
                        left: 0,
                        borderRadius: "20px"
                    }}>

                    {/* <iframe width="560" id="player" height="315" src={`https://www.youtube.com/embed/${videoID}?autoplay=1&controls=0&mute=1`} style={{
                        width: "100%", height: "100%", borderRadius: "20px"
                    }} title="player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; " ></iframe> */}

                </Box>

            </Box>


            <Box sx={{
                width: "100%",
                height: {
                    xxs: "200px",
                    xs: "300px",
                    xsm: "400px",
                    sm: isPlayTrailer ? "100%" : `calc(100% - ${detailsRef?.current?.clientHeight}px)`
                },
                minHeight: "200px",
                maxHeight: "calc(100vh - 160px)",
                visibility: isPlayTrailer ? "visible" : "hidden",
                background: details?.backdrop_path ? "none" : "rgba(0,0,0)",
                borderRadius: "20px"
            }}>
                {(details?.backdrop_path || details?.poster_path) && <img src={details?.backdrop_path || details?.poster_path ? `https://image.tmdb.org/t/p/original${epino ? details?.current_season_poster_path : details?.backdrop_path || details?.poster_path}` : ""} loading="lazy" alt={`background of ${details?.original_title || details?.name}`} style={{
                    width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px"
                }} />}
            </Box>



            <Helmet>
                <title>{details?.name || details?.title || details?.original_title}</title>
            </Helmet>



            <Stack ref={detailsRef} sx={{

                padding: {
                    xxs: 2,
                    md: "30px 30px 20px 30px"
                }, backgroundImage: "linear-gradient( 180deg,transparent,rgba(37,37,37,0.6),#111 )",
                bottom: 0,
                position: {
                    xxs: "static",
                    // sm:"absolute",
                    sm: !detailsDisplay ? "static" : "absolute"
                }, width: "100%", borderRadius: " 0 0 12px 12px",
            }}>
                <Grid container sx={{

                    alignItems: "baseline",
                    /* word-wrap: break-word; */
                    flexWrap: "wrap"
                }}>

                    <Typography sx={{
                        fontSize: {
                            xxs: "25px",
                            xs: "30px",
                        },
                        color: {
                            xxs: "movieTv.xxsTextColor",
                            sm: "movieTv.smTextColor"
                        },

                    }}>
                        {details?.name || details?.title || details?.original_title}
                    </Typography>
                    <Typography sx={{
                        fontSize: {
                            xxs: "10px",
                            xs: "15px",
                        },
                        color: {
                            xxs: "movieTv.xxsTextColor",
                            sm: "movieTv.smTextColor"
                        },
                        ml: 1
                    }}>
                        {epino ? ` season ${epino}` : ""}
                    </Typography>
                </Grid>
                <Grid container alignItems={"center"} columnSpacing={3} >
                    <Grid item sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}>   <StarRateRounded sx={{
                        width: "1rem",
                        height: "1rem",
                        color: "yellow",

                    }} />
                        <Typography color={{
                            xxs: "movieTv.xxsTextColor",
                            sm: "movieTv.smTextColor"
                        }} component={"span"} sx={{ fontSize: "12px" }}>

                            {!epino ? details?.vote_average?.toFixed(1) : details?.current_season_vote_average?.toFixed(1)} {!epino && "|"} {!epino && details?.vote_count}

                        </Typography>
                    </Grid>



                    {isTv ?
                        <Grid item><Typography color={{
                            xxs: "movieTv.xxsTextColor",
                            sm: "movieTv.smTextColor"
                        }} component={"span"} sx={{ fontSize: "12px" }}><FiberManualRecord sx={{ fontSize: 10 }} />

                            {!epino ? details?.number_of_seasons : details?.current_season_no_of_episodes}
                            {!epino ? details?.number_of_seasons === 1 ? "season" : "seasons" : details?.current_season_no_of_episodes === 1 ? " episode" : " episodes"}


                        </Typography></Grid>
                        : <Grid item><Typography color={{
                            xxs: "movieTv.xxsTextColor",
                            sm: "movieTv.smTextColor"
                        }} component={"span"} sx={{ fontSize: "12px" }}><FiberManualRecord sx={{ fontSize: 10 }} />  {details ? getHourFromRuntime(details.runtime) : ""}</Typography></Grid>
                    }

                    <Grid item>
                        <FiberManualRecord sx={{
                            fontSize: 10, color: {
                                xxs: "movieTv.xxsTextColor",
                                sm: "movieTv.smTextColor"
                            }
                        }} />
                        {details?.genres?.map((ele, i) =>
                            <Typography component={"span"} color={{
                                xxs: "movieTv.xxsTextColor",
                                sm: "movieTv.smTextColor"
                            }} key={i} sx={{
                                mr: "5px",
                                fontSize: "12px"
                            }}>{ele.name} {details.genres[i + 1] ? "|" : ""}</Typography>
                        )}
                    </Grid>
                    <Grid item sx={{
                        fontSize: "12px", color: {
                            xxs: "movieTv.xxsTextColor",
                            sm: "movieTv.smTextColor"
                        }
                    }}>
                        <FiberManualRecord sx={{
                            fontSize: 10,
                        }} />



                        {isTv ? !epino ?
                            details?.first_air_date?.split("-")[0] : details?.current_season_air_date?.split("-")[0]
                            : details?.release_date.split("-")[0]
                        }

                    </Grid>

                </Grid>
                <Grid container>
                    <Grid item sm={8} xxs={12}>
                        <Typography sx={{
                            fontSize: {
                                xxs: "10px",
                                md: "12px"
                            },
                            lineClamp: 2,
                            overflow: "hidden"
                        }} color={{
                            xxs: "movieTv.xxsTextColor",
                            sm: "movieTv.smTextColor"
                        }} >
                            {!epino ? truncate(details?.overview, 250) : truncate(details?.current_season_overview || details?.overview, 250)}
                        </Typography>
                        <Grid container justifyContent={{ xxs: "center", sm: "flex-start" }} mt={"10px"}>
                            {watch_provider &&
                                <Button sx={{
                                    bgcolor: "gray",
                                    color: "white",
                                    fontSize: {
                                        xxs: "10px",
                                        md: "12px"
                                    },
                                    mr: "10px",
                                    mt: "5px",
                                    padding: {
                                        xxs: "4px 4px",
                                        md: "6px 8px"
                                    },
                                    "&:hover": {
                                        bgcolor: "white",
                                        color: "gray"
                                    }
                                }}

                                    endIcon={
                                        <Avatar sx={{
                                            width: {
                                                xxs: "15px",
                                                md: "20px"
                                            },
                                            height: {
                                                xxs: "15px",
                                                md: "20px"
                                            },
                                            // ml: "5px",

                                        }} src={watch_provider?.logo_path ? `https://image.tmdb.org/t/p/original${watch_provider?.logo_path}` : ""} />
                                    }
                                > Available On    </Button>}

                            <WatchLater padding={{
                                xxs: "4px 4px",
                                md: "6px 8px"
                            }} fontSize={{
                                xxs: "10px",
                                md: "12px"
                            }}
                                mr={"10px"}

                                mt={"5px"}
                                data={isTv ? `tv/${id}` : `movie/${id}`}
                            />


                            <AddMenu position={"normal"} padding={{
                                xxs: "4px 4px",
                                md: "6px 8px"
                            }} mr="10px" mt="5px"

                                id={isTv ? `tv/${details?.id}` : `movie/${details?.id}`}
                                name={details?.name || details?.title || details?.original_title}
                            />

                            {isVideos && <Button variant='contained' sx={{
                                bgcolor: "red", color: "white",
                                mr: "10px",

                                mt: "5px",
                                padding: {
                                    xxs: "4px 4px",
                                    xs: "3px 8px",
                                    sm: "6px 16px",
                                    md: "6px 8px",
                                },
                                fontSize: {
                                    xxs: "10px",
                                    md: "12px"
                                },
                                "&:hover": {
                                    bgcolor: "white",
                                    color: "red"
                                }


                            }}

                                startIcon={<YouTube />}
                                onClick={playTrailer}
                                ref={anchorRef}
                                id="composition-button"
                                aria-controls={open ? 'composition-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"




                            > Watch Trailer</Button>}





                            <Popper
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                placement="top-start"
                                transition
                                disablePortal
                                sx={{ width: "136px" }}
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                        }}
                                    >
                                        <Paper sx={{
                                            maxHeight: "400px",
                                            overflowY: "auto"
                                        }}>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList
                                                    autoFocusItem={open}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"

                                                    sx={{
                                                        "&.MuiList-root": {
                                                            pt: 0
                                                        }
                                                    }}
                                                >

                                                    {!isPlayTrailer && <MenuItem onClick={() => {
                                                        stopYoutube()
                                                    }} sx={{
                                                        width: "100%",
                                                        px: 1,
                                                        py: 0.5,
                                                        bgcolor: "red",
                                                        color: "white",

                                                    }}
                                                    ><Typography
                                                        sx={{
                                                            fontSize: "12px",
                                                            width: "100%",
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            display: "flex",
                                                            alignItems: "center"
                                                        }}
                                                    > <StopCircleOutlined sx={{ mr: 1 }} /> STOP TRAILER</Typography></MenuItem>}

                                                    {
                                                        !epino && !seasonVideos ? details?.videos?.results.map((ele, i) =>
                                                            <MenuItem onClick={() => {
                                                                playYoutubeVideo(ele.key)
                                                            }} key={i} sx={{
                                                                width: "100%",
                                                                px: 1,
                                                                py: 0.5

                                                            }}><Typography
                                                                sx={{
                                                                    fontSize: "12px",
                                                                    width: "100%",
                                                                    whiteSpace: "nowrap",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis"
                                                                }}
                                                            >{`${i + 1}. ${ele.name}`}</Typography></MenuItem>
                                                        ) : seasonVideos?.videos?.results.map((ele, i) =>
                                                            <MenuItem onClick={() => {
                                                                playYoutubeVideo(ele.key)
                                                            }} key={i} sx={{
                                                                width: "100%",
                                                                px: 1,
                                                                py: 0.5

                                                            }}><Typography
                                                                sx={{
                                                                    fontSize: "12px",
                                                                    width: "100%",
                                                                    whiteSpace: "nowrap",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis"
                                                                }}
                                                            >{`${i + 1}. ${ele.name}`}</Typography></MenuItem>
                                                        )
                                                    }


                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>

                        </Grid>
                    </Grid>
                    {cast?.length > 0 && <Cast cast={cast} />}
                </Grid>
            </Stack>
        </Grid >
    )
}

export default DetailCard