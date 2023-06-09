import { FiberManualRecord, StarRateRounded } from '@mui/icons-material'
import { Grid, Box, Stack, Typography, Button, Avatar } from '@mui/material'
import React from 'react'
import { Helmet } from "react-helmet";
import AddMenu from '../AddMenu'
import Cast from './Cast'
import WatchLater from '../WatchLaterBtn'
import { useParams } from 'react-router-dom'

const DetailCard = ({ watch_provider, details, isTv, cast }) => {
    // function truncate(str, n) {
    //     return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    // }
    const getHourFromRuntime = (runtime) => {
        const h = runtime / 60
        const min = runtime % 60
        return `${h.toString()[0]}h ${min}min`
    }
    const { id } = useParams()
    return (
        <Grid item xxs={12} sx={{
            height: "100%",
            borderRadius: "20px",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            // backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
            position: "relative",
            cursor: "default"
        }}>
            <Box sx={{
                width: "100%", height: {
                    xxs: "200px",
                    xs: "300px",
                    xsm: "400px",
                    sm: "100%"
                }
            }}>
                <img src={details?.backdrop_path ? `https://image.tmdb.org/t/p/original${details?.backdrop_path}` : ""} loading="lazy" alt={`background of ${details?.original_title || details?.name}`} style={{
                    width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px"
                }} />
            </Box>

            <Helmet>
                <title>{details?.name || details?.title || details?.original_title}</title>
            </Helmet>



            <Stack sx={{
                padding: {
                    xxs: 2,
                    md: "30px 30px 20px 30px"
                }, backgroundImage: "linear-gradient( 180deg,transparent,rgba(37,37,37,0.6),#111 )", bottom: 0, position: {
                    xxs: "static",
                    sm: "absolute"
                }, width: "100%", borderRadius: " 0 0 12px 12px",
            }}>

                <Typography sx={{
                    fontSize: {
                        xxs: "25px",
                        xs: "30px",
                    },
                    color: {
                        xxs: "movieTv.xxsTextColor",
                        sm: "movieTv.smTextColor"
                    }
                }}>
                    {details?.name || details?.title || details?.original_title}
                </Typography>
                <Grid container alignItems={"center"} columnSpacing={3} >
                    <Grid item sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}>   <StarRateRounded sx={{
                        width: "1rem",
                        height: "1rem",
                        color: "yellow",

                    }} /> <Typography color={{
                        xxs: "movieTv.xxsTextColor",
                        sm: "movieTv.smTextColor"
                    }} component={"span"} sx={{ fontSize: "12px" }}>   {details?.vote_average.toFixed(1)} | {details?.vote_count} </Typography>
                    </Grid>



                    {isTv ?
                        <Grid item><Typography color={{
                            xxs: "movieTv.xxsTextColor",
                            sm: "movieTv.smTextColor"
                        }} component={"span"} sx={{ fontSize: "12px" }}><FiberManualRecord sx={{ fontSize: 10 }} />  {details?.number_of_seasons} {details?.number_of_seasons === 1 ? "season" : "seasons"}</Typography></Grid>
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



                        {isTv ?
                            details?.first_air_date?.split("-")[0]
                            : details?.release_date.split("-")[0]
                        }

                        {/* <Typography component={"span"} sx={{ fontSize: "12px" }}>{details?.release_date.split("-")[0]}</Typography> */}
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
                            {/* {truncate(details?.overview, 150)} */}
                            {details?.overview}
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
                            {/* <Button sx={{
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
                                }
                            }} startIcon={<BookmarkBorder />}>Watch Later </Button> */}

                            <AddMenu position={"normal"} padding={{
                                xxs: "4px 4px",
                                md: "6px 8px"
                            }} mr="10px" mt="5px"

                                id={isTv ? `tv/${details?.id}` : `movie/${details?.id}`}
                                name={details?.name || details?.title || details?.original_title}
                            />
                        </Grid>
                    </Grid>
                    <Cast cast={cast} />
                </Grid>
            </Stack>
        </Grid>
    )
}

export default DetailCard