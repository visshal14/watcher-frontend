import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import AddMenu from '../AddMenu'
import WatchLater from '../WatchLaterBtn'
import knowMore from '../KnowMore'
const SingleFeaturedPost = ({ data, series, spot }) => {


    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <Grid key={`${data.media_type}_${data.id}`} item sx={{
            position: spot ? "static" : "absolute",
            bottom: 40,
            right: series === 3 ? 40 : series === 1 ? 60 + (100 * (3 - series)) : 50 + (100 * (3 - series)),
            width: spot ? "100%" : "100px",
            height: spot ? 400 : "80px",
            zIndex: series + 1,
            display: {
                xxs: series === 0 ? "block" : "none",
                md: "block"
            },
            // transition: "width 1s, height 1s, transform 2s"
        }}>

            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
                    position: "relative",
                    borderRadius: 3,
                    cursor: "default",

                }}>
                <Box
                    sx={{
                        position: "absolute", bottom: { xxs: 10, xs: 20, md: 40 }, left: { xxs: 10, xs: 20, md: 40 }, zIndex: "2", maxWidth: {
                            xxs: "99%",
                            sm: "70%",
                            md: "50%"
                        },
                        display: spot ? "block" : "none"
                    }}>
                    <Typography variant={'h3'} component={"h3"} color={"white"} fontSize={{
                        xxs: "1.5rem",
                        xs: "2rem",
                        md: "3rem"
                    }}>{data?.name || data?.original_title}</Typography>
                    <Typography
                        fontSize={{
                            xxs: "0.5rem",
                            xs: "0.7rem",
                            md: "1rem"
                        }}
                        color={"white"}
                    >  {truncate(data?.overview, 80)}</Typography>
                    <Box>
                        <Button variant='contained'
                            sx={{
                                bgcolor: "red", color: "white",
                                mr: {
                                    xxs: 1,
                                    sm: 2
                                },
                                fontSize: {
                                    xxs: "10px",
                                    md: "0.875rem"
                                },
                                p: {
                                    xxs: "2px 6px",
                                    xs: "3px 8px",
                                    sm: "6px 16px"
                                },

                                "&:hover": {
                                    bgcolor: "white",
                                    color: "red"
                                }

                            }}
                            onClick={() => knowMore(`${data.media_type}/${data.id}`)}>Know More</Button>

                        <AddMenu mr={{
                            xxs: 1,
                            sm: 2
                        }} padding={{
                            xxs: "4px",
                            md: "6px "
                        }} height={{
                            xxs: "1.2rem",
                            sm: "1em"
                        }} position="normal" id={`${data.media_type}/${data.id}`} name={data?.name || data?.title || data?.original_title} />
                        <WatchLater data={`${data.media_type}/${data.id}`} />
                    </Box>
                </Box>
                <Box sx={{ backgroundImage: "linear-gradient( 180deg,transparent,rgba(37,37,37,0.6),#111 )", height: "10rem", bottom: 0, position: "absolute", width: "100%", borderRadius: " 0 0 12px 12px", display: spot ? "block" : "none" }}></Box>
            </Box>
        </Grid >
    )
}

export default SingleFeaturedPost