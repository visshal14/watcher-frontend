import { ExpandMore } from '@mui/icons-material'
import { Grid, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import AddMenu from '../AddMenu'
import DetailCard from './DetailCard'
import { apiKey } from '../../tmdb'
const TvDetails = () => {


    const { id } = useParams()
    const [details, setDetails] = useState()
    const [cast, setCast] = useState()
    const [watch_provider, setWatch_provider] = useState()
    const [seasons, setSeasons] = useState([])


    useEffect(() => {

        axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en&append_to_response=credits`).then((response) => {
            setDetails(response.data)
            getSeasonsEpisodes(response.data.number_of_seasons)
            setCast(response.data.credits.cast)
        })
        axios.get(`https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${apiKey}`).then((response) => {
            if (response.data.results.US.flatrate) {
                setWatch_provider(response.data.results.US.flatrate[0])
            }
        })

        // eslint-disable-next-line
    }, [])

    function getSeasonsEpisodes(n) {
        for (let i = 1; i <= n; i++) {

            axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${i}?api_key=${apiKey}`).then((response) => {
                setSeasons(prev => [...prev, response.data])
            })


        }
    }
    // useEffect(() => {
    //     console.log(seasons)
    // }, [seasons])



    function totalEpisodes() {
        var count = 0;
        for (let i = 0; i < seasons.length; i++) {
            count += seasons[i].episodes.length
        }
        return count
    }

    return (


        <Grid container px={5} py={10} height={{ xxs: "auto", lg: "100vh" }}>
            <Grid item lg={9} xxs={12} px={{
                xxs: 0,
                lg: 3
            }} mb={{
                xxs: 3,
                lg: 0
            }}
            >
                <DetailCard watch_provider={watch_provider} details={details} isTv cast={cast} />
            </Grid>


            <Grid item lg={3} xxs={12} sx={{
                bgcolor: "movieTv.seasonsBackground",
                height: {
                    xxs: "fit-content",
                    lg: "auto"
                },
                maxHeight: "100%",
                pt: "10px",
                px: "10px",
                pb: "20px",
                borderRadius: "20px",
                position: "relative"
            }}>
                <Typography sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    zIndex: 2,
                    width: "100%",
                    textAlign: "center",
                    fontSize: "13px",
                    color: "movieTv.xxsTextColor"
                }}>{`Total ${seasons?.length} seasons ${totalEpisodes()} episodes `}</Typography>

                <Box
                    sx={{
                        // bgcolor: "movieTv.aSeasonBackground",
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
                    "& .css-o4b71y-MuiAccordionSummary-content": {
                        justifyContent: "space-between",
                        alignItems: "center"
                    },
                    // bgcolor: "movieTv.episodesBackground",
                }}
            >
                <Typography color={"movieTv.xxsTextColor"} component={"span"}>{ele.name}  <Typography component={"span"} fontSize={12}>({ele.episodes.length} epi)</Typography></Typography>
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
                                    Episode {ep.episode_number}
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