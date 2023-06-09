import React, { useEffect, useState } from 'react'
import { ArrowBackIosNewRounded, ArrowForwardIosRounded, PlayArrowRounded } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import knowMore from './KnowMore'
import MovieOverviewTip from './MovieOverviewTip'
import AddMenu from './AddMenu'
import { useNavigate } from 'react-router-dom'

const Row = ({ titles, fetchUrl, type }) => {

    const [tiles, setTiles] = useState([])
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3${fetchUrl}`).then((response) => {
            setTiles(response.data.results)
        })
        // console.log(type)
        // eslint-disable-next-line
    }, [])

    const scrollLeft = () => {
        document.getElementById(titles).scrollLeft -= 300
    }
    const scrollRight = () => {
        document.getElementById(titles).scrollLeft += 300
    }


    // const boxClick = (e) => {
    //     // console.log(e.target)
    //     window.location.href = `/${e.target.id}`

    // }
    const navigate = useNavigate()

    return (

        <Box my={1}>
            <Grid container sx={{ justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <Typography component="span" variant='h5' sx={{
                    fontSize: {
                        xxs: "0.8rem",
                        sm: "1.5rem"
                    },
                    cursor: "pointer"

                }} onClick={() => navigate("/discover/movie")}> {titles} </Typography>
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

            <Grid id={titles} container flexWrap="nowrap" overflow="auto"
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

                    },

                }}>
                {
                    tiles?.map((ele, i) => (

                        <Box id={`${ele.media_type || type}/${ele.id}-outer`} key={i} sx={{
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
                            position: "relative",
                            scrollSnapAlign: "start",

                            "&:hover": {
                                cursor: "pointer"
                                // bgcolor: "white",
                                // color: "red"
                            }
                        }}>

                            <AddMenu id={`${ele.media_type || type}/${ele.id}`} name={ele?.name || ele?.title || ele?.original_title} />

                            <Tooltip title={<MovieOverviewTip ele={ele} bgcolor={"red"} type={type} />} enterDelay={500} placement="right">


                                <Box onClick={() => knowMore(`${ele.media_type || type}/${ele.id}`)} sx={{
                                    width: "100%",
                                    height: "100%",
                                    position: "relative",
                                    bgcolor: "gray",
                                    borderRadius: {
                                        xxs: "10px 10px 0 0",
                                        sm: "10px"
                                    },
                                }}>


                                    <Box id={`${ele.media_type || type}/${ele.id}`} sx={{
                                        width: "100%",
                                        height: "100%",
                                        position: "absolute",
                                        // zIndex: 1
                                    }}>

                                    </Box>


                                    <img src={`https://image.tmdb.org/t/p/original${ele.backdrop_path}`} alt="abc" loading="lazy" style={{
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

                                            {ele.name || ele.title || ele.original_title}
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

export default Row