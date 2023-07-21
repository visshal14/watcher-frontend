import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material'
import { SingleTiles } from '../Discover/Discover'
import { ArrowBackIosNewRounded, ArrowForwardIosRounded, Instagram } from '@mui/icons-material'
import knowMore from '../KnowMore'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { apiKey } from '../../tmdb'
const Person = () => {

    const { id } = useParams()

    const [details, setDetails] = useState()
    const [popular, setPopular] = useState()
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&append_to_response=combined_credits,images,external_ids`).then((response) =>
            setDetails(response.data)
        ).catch((e) => {
            // console.log("error in axios ", e)
        })
        axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${apiKey}`).then((response) =>
            setPopular(response.data.results)
        ).catch((e) => {
            // console.log("error in axios ", e)
        })


    }, [id])

    const knownRowRef = useRef(null)
    const photosRowRef = useRef(null)
    const artistRowRef = useRef(null)


    const scrollLeft = (titles) => {
        if (titles === "knownFor")
            knownRowRef.current.scrollLeft -= 150;
        else if (titles === "photos")
            photosRowRef.current.scrollLeft -= 150;
        else {
            artistRowRef.current.scrollLeft -= 150;
        }
    }
    const scrollRight = (titles) => {
        if (titles === "knownFor")
            knownRowRef.current.scrollLeft += 150;
        else if (titles === "photos")
            photosRowRef.current.scrollLeft += 150;
        else {
            artistRowRef.current.scrollLeft += 150;
        }
    }


    // function truncate(str, n) {
    //     return str?.length > n ? str.substr(0, n - 1) + " Read More..." : str;
    // }

    return (

        <Grid container py={{
            xxs: 8,
            sm: 12,
            md: 12
        }}
            px={{
                xxs: 1,
                sm: 5,
                md: 8
            }}
            sx={{
                // height: "100vh",
                minHeight: {
                    xxs: "auto",
                    xmd: "100vh"
                },

            }}
        >


            <Grid container spacing={1} >
                <Grid item xxs={12} xmd={details?.biography ? 4 : 12} sx={{
                    height: {
                        xxs: "fit-content",
                        xmd: "100%"
                    }, overflow: "auto",
                    mb: {
                        xxs: "10px",
                        xmd: 0
                    },
                    bgcolor: "person.background"
                }}>
                    <Grid container sx={{
                        borderRadius: "10px",
                        p: "20px",
                        bgcolor: "person.tilesBackground",
                        flexDirection: {
                            xxs: "column",
                            sm: "row",

                        },
                        height: {
                            xxs: "fit-content",
                            xmd: "100%"
                        }
                    }} alignItems={"center"}>

                        <Grid item xxs={12} sm={4} xmd={12} sx={{
                            aspectRatio: "1/1",
                            width: {
                                xxs: "100px",
                                sm: "150px",
                                xmd: "200px"
                            },
                            height: {
                                xxs: "100px",
                                sm: "150px",
                                xmd: "200px"
                            },
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Avatar alt="Profile Photo" src={details?.profile_path ? `https://image.tmdb.org/t/p/original${details?.profile_path}` : ""} sx={{
                                width: "100%", height: "100%",
                                maxWidth: {
                                    xxs: "100px",
                                    sm: "150px",
                                    xmd: "200px"
                                }, maxHeight: {
                                    xxs: "100px",
                                    sm: "150px",
                                    xmd: "200px"
                                }
                            }} />
                        </Grid>
                        <Grid item xxs={12} sm={8} xmd={12} sx={{ width: "100%" }}>
                            <Typography variant='h3' sx={{
                                fontWeight: "700",
                                fontSize: "35px", textAlign: "center", mt: 2
                            }}> {details?.name}</Typography>
                            <Stack>
                                {details?.also_known_as.length > 0 && <> <Typography variant='h5' sx={{
                                    fontWeight: "600",
                                    fontSize: {
                                        xxs: "15px",
                                        xmd: "20px"
                                    }, mt: 2
                                }}>
                                    Also Known As
                                </Typography>
                                    <Typography variant='h6' sx={{
                                        fontSize: {
                                            xxs: "12px",
                                            xmd: "15px"
                                        },
                                        width: "fit-content"
                                    }}>
                                        {details?.also_known_as?.map((ele, i) => i === 0 ? ele : `, ${ele}`
                                        )}
                                    </Typography>
                                </>}
                                <Grid container justifyContent={"space-between"}>
                                    <Box>
                                        <Typography variant='h5' sx={{
                                            fontWeight: "600",
                                            fontSize: {
                                                xxs: "15px",
                                                xmd: "20px"
                                            }, mt: 2
                                        }}>Born On</Typography>
                                        <Typography variant='h6' sx={{
                                            fontSize: {
                                                xxs: "12px",
                                                xmd: "15px"
                                            }
                                        }}>{details?.birthday}</Typography>
                                    </Box>
                                    {details?.deathday && <Box>
                                        <Typography variant='h5' sx={{
                                            fontWeight: "600",
                                            fontSize: {
                                                xxs: "15px",
                                                xmd: "20px"
                                            }, mt: 2
                                        }}>Died On</Typography>
                                        <Typography variant='h6' sx={{
                                            fontSize: {
                                                xxs: "12px",
                                                xmd: "15px"
                                            }
                                        }}>{details?.deathday}</Typography>
                                    </Box>}
                                </Grid>
                                <Typography variant='h5' sx={{
                                    fontWeight: "600",
                                    fontSize: {
                                        xxs: "15px",
                                        xmd: "20px"
                                    }, mt: 2
                                }}>
                                    Gender
                                </Typography>
                                <Typography variant='h6' sx={{
                                    fontSize: {
                                        xxs: "12px",
                                        xmd: "15px"
                                    }
                                }}>
                                    {details?.gender === 1 ? "Female" : details?.gender === 3 ? "Non Binary" : "Male"}
                                </Typography>

                                <Box sx={{
                                    display: "flex", justifyContent: {
                                        xxs: "center",
                                        sm: "flex-end",
                                        xmd: "center"
                                    }
                                }}>
                                    <Button sx={{
                                        background: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                                        color: "white",
                                        // mr: mr || "",
                                        // mt: mt || "",
                                        padding: {
                                            xxs: "2px 6px",
                                            xs: "3px 8px",
                                            sm: "6px 16px"
                                        },
                                        fontSize: {
                                            xxs: "10px",
                                            md: "0.875rem"
                                        },
                                        "&:hover": {
                                            // backgroundcolor: "primary",
                                            // backgroundImage: `linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)`,
                                            // backgroundSize: "100%",
                                            // backgroundRepeat: "repeat",
                                            // backgroundClip: "text",
                                            // WebkitBackgroundClip: "text",
                                            // WebkitTextFillColor: "transparent",
                                            transform: "scale(1.2)",
                                            transition: "all 0.5s"

                                        }


                                    }}


                                        startIcon={<Instagram />}
                                        // onClick={}
                                        href={`https://www.instagram.com/${details?.external_ids?.instagram_id}`}
                                        target="_blank"
                                    > Instagram</Button>
                                </Box>



                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                {details?.biography && <Grid item xxs={12} xmd={8}>

                    <Box sx={{
                        borderRadius: "10px",
                        p: "10px",
                        height: "100%",
                        bgcolor: "person.tilesBackground",
                    }}>

                        <Typography variant='h5' sx={{
                            fontWeight: "600",
                            fontSize: {
                                xxs: "25px",
                                xmd: "30px"
                            }, mb: 2
                        }}>
                            Biography
                        </Typography>
                        <Typography variant='h6' sx={{
                            fontSize: {
                                xxs: "12px",
                                xmd: "15px"
                            }
                        }}>
                            {details?.biography}
                        </Typography>
                    </Box>


                </Grid>}
            </Grid>


            <Grid item xxs={12} xmd={12} sx={{ minHeight: "100%" }}>
                <Grid container sx={{
                    borderRadius: "10px",
                    p: "10px",
                    bgcolor: "person.tilesBackground",
                    mt: "10px", mb: 2
                }}>

                    <Grid container sx={{ justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <Typography variant='h5' sx={{
                            fontWeight: "600",
                            fontSize: {
                                xxs: "25px",
                                xmd: "30px"
                            },
                        }}> Known For </Typography>
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
                                onClick={() => scrollLeft("knownFor")}
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

                                onClick={() => scrollRight("knownFor")}> <ArrowForwardIosRounded sx={{
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



                    <Grid ref={knownRowRef} container sx={{
                        flexWrap: "nowrap", overflow: "auto", scrollSnapType: "x mandatory", "&::-webkit-scrollbar": {
                            display: "none",

                        },
                    }} >
                        {details?.combined_credits.cast.map((ele, i) =>
                            <SingleTiles data={ele} key={i} discoverBackground={"person.discoverBackground"} />
                        )}
                    </Grid>


                </Grid>

                <Grid container sx={{
                    borderRadius: "10px",
                    p: "10px",
                    bgcolor: "person.tilesBackground", mb: 2
                }}>

                    <Grid container sx={{ justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <Typography variant='h5' sx={{
                            fontWeight: "600",
                            fontSize: {
                                xxs: "25px",
                                xmd: "30px"
                            },
                        }}> Photos </Typography>
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
                                onClick={() => scrollLeft("photos")}
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

                                onClick={() => scrollRight("photos")}> <ArrowForwardIosRounded sx={{
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
                        <Grid ref={photosRowRef} container sx={{
                            flexWrap: "nowrap", overflow: "auto", scrollSnapType: "x mandatory", "&::-webkit-scrollbar": {
                                display: "none",

                            },
                        }} >
                            {details?.images.profiles.map((ele, i) =>

                                <img key={i} src={`https://image.tmdb.org/t/p/original${ele?.file_path}`} loading="lazy" alt="profilephoto" style={{
                                    width: "auto", maxHeight: "200px", aspectRatio: "113/200",
                                    objectFit: "cover", borderRadius: "10px", margin: "5px", scrollSnapAlign: "start",
                                }} />
                            )}
                        </Grid>



                    </Grid>


                </Grid>



                <Grid container sx={{
                    borderRadius: "10px",
                    p: "10px",
                    bgcolor: "person.tilesBackground",
                }}>

                    <Grid container sx={{ justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <Typography variant='h5' sx={{
                            fontWeight: "600",
                            fontSize: {
                                xxs: "25px",
                                xmd: "30px"
                            },
                        }}> Popular Artists </Typography>
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
                                onClick={() => scrollLeft("artists")}
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

                                onClick={() => scrollRight("artists")}> <ArrowForwardIosRounded sx={{
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
                    <Grid ref={artistRowRef} container sx={{
                        flexWrap: "nowrap", overflow: "auto",
                        scrollSnapType: "x mandatory",
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                        alignItems: "baseline"
                    }} >
                        {popular?.map((ele, i) =>
                            <Grid key={i} sx={{
                                width: "100px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                padding: "0 5px",
                                scrollSnapType: "x mandatory",
                                mx: 0.5,
                                cursor: "pointer",
                                "&:hover": {

                                    transform: "scale(1.04)",
                                    transition: "all 0.5s"
                                }
                            }}
                                onClick={() => knowMore(`person/${ele.id}`)}
                            >
                                <Avatar src={ele.profile_path ? `https://image.tmdb.org/t/p/original${ele.profile_path}` : ""}
                                    sx={{
                                        width: "100px",
                                        height: "100px"
                                    }}
                                />
                                <Typography sx={{
                                    fontSize: "15px",

                                }} color={"person.textColor"} >{ele.original_name || ele.name}</Typography>
                            </Grid>
                        )}
                    </Grid>

                </Grid>




            </Grid>

        </Grid >
    )
}

export default Person