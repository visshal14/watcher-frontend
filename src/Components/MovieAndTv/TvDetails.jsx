import { ExpandMore } from '@mui/icons-material'
import { Grid, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AddMenu from '../AddMenu'
import DetailCard from './DetailCard'
import backendAxios from "../../backendAxios"
const TvDetails = () => {


    const { id } = useParams()




    const [details, setDetails] = useState()
    const [cast, setCast] = useState()
    const [watch_provider, setWatch_provider] = useState()
    const [seasons, setSeasons] = useState([])
    const [noOfSeasons, setNoOfSeasons] = useState("")
    const seasonUseRef = useRef(0)
    const detailsRef = useRef(null)
    const [isTrailer, setIsTrailer] = useState(false)
    useEffect(() => {
        setSeasons([])

        backendAxios.get(`/getTvDetails/${id}`).then((response) => {
            setDetails(response.data)
            getSeasonsEpisodes(response.data.number_of_seasons)
            setNoOfSeasons(response.data.number_of_seasons)
            setCast(response.data.credits.cast)
            if (response.data?.networks) {
                setWatch_provider(response.data.networks)
            }
            else if (response.data["watch/providers"].results?.US?.flatrate) {
                setWatch_provider(response.data["watch/providers"].results?.US?.flatrate[0])
            }
        }).catch((e) => {
            // console.log("error in axios ", e)
        })


        // axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en&append_to_response=credits,videos`).then((response) => {
        //     setDetails(response.data)
        //     getSeasonsEpisodes(response.data.number_of_seasons)
        //     setNoOfSeasons(response.data.number_of_seasons)
        //     setCast(response.data.credits.cast)
        // }).catch((e) => {
        //     // console.log("error in axios ", e)
        // })
        // axios.get(`https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${apiKey}`).then((response) => {

        //     if (response.data.results?.US?.flatrate) {
        //         setWatch_provider(response.data.results.US.flatrate[0])
        //     }
        // }).catch((e) => {
        //     // console.log("error in axios ", e)
        // })

        // eslint-disable-next-line
    }, [])






    function compare(a, b) {
        if (a.season_number > b.season_number) return 1;
        if (a.season_number < b.season_number) return -1;
        return 0;
    }


    function getSeasonsEpisodes(n) {
        // /getEpisodesDetails/:id/:n
        backendAxios.get(`/getEpisodesDetails/${id}/${n}`).then((response) => {
            setSeasons(response.data)
        }).catch((e) => {
            // console.log("error in axios ", e)
        })
        // for (let i = 1; i <= n; i++) {
        //     axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${i}?api_key=${apiKey}`).then((response) => {
        //         setSeasons(prev => [...prev, response.data])
        //     }).catch((e) => {
        //         // console.log("error in axios ", e)
        //     })
        // }
    }
    useEffect(() => {
        if (seasons.length === noOfSeasons && seasonUseRef.current === 0) {
            seasonUseRef.current = 1
            const sorted = [...seasons].sort(compare);
            setSeasons(sorted);
        }
        // eslint-disable-next-line
    }, [seasons])


    function totalEpisodes() {
        var count = 0;
        for (let i = 0; i < seasons.length; i++) {
            count += seasons[i].episodes.length
        }
        return count
    }


    return (


        <Grid container px={{
            xxs: 2,
            sm: 5
        }} py={10}
            height={{ xxs: "auto", lg: !isTrailer ? "100vh" : "auto" }}
        >
            <Grid item lg={9} xxs={12} px={{
                xxs: 0,
                lg: 3
            }} mb={{
                xxs: 3,
                lg: 0
            }}
            >
                <DetailCard watch_provider={watch_provider} tempDetails={details} isTv cast={cast} setIsTrailer={setIsTrailer} detailsRef={detailsRef} />
            </Grid>


            <Grid item lg={3} xxs={12} sx={{
                bgcolor: "movieTv.seasonsBackground",
                height: {
                    xxs: "fit-content",
                    lg: "auto"
                },
                maxHeight: {
                    xxs: "100%",
                    lg: "calc(100vh - 160px)"
                },
                pt: "10px",
                px: "10px",
                pb: "20px",
                borderRadius: "20px",
                position: "relative",

            }}>
                <Typography sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    zIndex: 2,
                    width: "100%",
                    textAlign: "center",
                    fontSize: "13px",
                    color: "movieTv.xxsTextColor",
                    cursor: "default"
                }}>{`Total ${seasons?.length} seasons ${totalEpisodes()} episodes `}</Typography>

                <Box
                    sx={{

                        maxHeight: "100%",
                        overflow: "scroll",
                        "&::-webkit-scrollbar": {
                            display: "none"
                        },
                    }}
                >

                    {seasons?.map((ele, i) =>
                        <SeasonsAccordion key={`season_${i}`} id={`tv/${id}/${i + 1}`} ele={ele} />
                    )}
                </Box>
            </Grid>
        </Grid>
    )
}

const SeasonsAccordion = ({ ele, id }) => {
    const navigate = useNavigate()

    const { epino } = useParams()

    const seasonsClicked = (e) => {
        if (id.split("/")[2] === epino) {
            navigate("./")
        } else {
            navigate(`season/${id.split("/")[2]}`)
        }

    }


    return (
        <Accordion sx={{
            borderRadius: "10px",
            mb: "10px",
            "&:first-of-type": {
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px"
            },
            "&:last-of-type": {
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px"
            },
            bgcolor: "movieTv.aSeasonBackground",

        }} >
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                    "& .Mui-expanded": {
                        minWidth: 0,
                    },
                    "& .MuiAccordionSummary-content": {
                        justifyContent: "space-between",
                        alignItems: "center"
                    },

                }}
            >
                <Typography color={"movieTv.xxsTextColor"} component={"span"} onClick={seasonsClicked}>{ele.name}  <Typography component={"span"} fontSize={12}>({ele.episodes.length} epi)</Typography></Typography>
                <AddMenu mr="10px" height="1rem" id={id} position={"normal"} />
            </AccordionSummary>
            <AccordionDetails sx={{
                p: "10px",
                m: "10px",
                borderRadius: "10px",
                bgcolor: "movieTv.episodesBackground",
                "& .MuiAccordionSummary-content": {
                    margin: 0
                }
            }}>
                {
                    ele.episodes.map((ep, j) => (

                        <Accordion sx={{
                            borderRadius: "10px",
                            mb: "5px",
                            "&:first-of-type": {
                                borderTopLeftRadius: "10px",
                                borderTopRightRadius: "10px"
                            },
                            "&:last-of-type": {
                                borderBottomLeftRadius: "10px",
                                borderBottomRightRadius: "10px"
                            },

                            bgcolor: "movieTv.aEpisodeBackground",
                        }} key={`${j}-innerAcc`}>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel11a-content"
                                id="panel11a-header"
                                sx={{
                                    "& .MuiAccordionSummary-content": {
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    },
                                    borderRadius: "7px",
                                    bgcolor: "movieTv.aEpisodeBackground",
                                }}
                            >
                                <Typography fontSize={"12px"}>
                                    {/* Episode {ep.episode_number} */}
                                    {ep.episode_number}. {ep.name}
                                </Typography>
                                <AddMenu position={"normal"} mr="10px" id={id + "/" + j} padding={{
                                    xxs: "2px 2px",
                                    lg: "6px 8px"
                                }} height="1rem" />
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography fontSize={{
                                    xxs: "10px",
                                    lg: "13px"
                                }}> {ep.overview} </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
            </AccordionDetails>
        </Accordion>
    )
}

export default TvDetails