
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import knowMore from '../KnowMore'
import AddMenu from '../AddMenu'
const CollectionTile = ({ ele }) => {
    return (
        <Grid item lg={3} xsm={6} xmd={4} xxs={12}
            sx={{
                p: "5px",
                position: "relative",

            }} >

            <Grid container flexDirection={"column"} sx={{
                p: "10px",
                bgcolor: "movieTv.aSeasonBackground",
                borderRadius: "10px",
                // mb: "5px",

                height: "100%",

            }}
                onClick={() => {
                    knowMore(ele.media_type + "/" + (ele.media_id || ele.id))
                }}>


                <img src={`https://image.tmdb.org/t/p/original${ele?.backdrop_path}`} alt="collection" loading="lazy" style={{
                    width: "100%", maxHeight: "100%", objectFit: "cover", borderRadius: "10px"
                }}></img>
                <Box sx={{
                    overflow: "hidden",
                    width: "100%"
                }}>

                    <Typography variant={"h5"} sx={{
                        my: 1, cursor: "pointer", fontWeight: "700",
                        width: "100%",

                        whiteSpace: "nowrap",
                        '@keyframes LeftToRight': {
                            "0%": {
                                transform: 'translate(0,0)'
                            },
                            "100%": {
                                transform: 'translate(-50%,0)'
                            }
                        },
                        "&:hover": {
                            animation: 'LeftToRight 7s infinite',
                            // animationDirection: "alternate"
                        }

                    }}>{ele.title || ele.original_title} </Typography>
                </Box>

                <Typography sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    "&:hover": {
                        WebkitBoxOrient: "initial",
                    },
                    transition: "all 2s ease-in-out"


                }}>{ele.overview} </Typography>
                <Typography variant={"h6"} sx={{ textAlign: "end", fontWeight: "700" }}>{ele.release_date.split("-")[0]}</Typography>
            </Grid>
            <AddMenu id={`${ele.media_type}/${ele.media_id || ele.id}`} name={ele?.title || ele?.original_title} mr={1} mt={1} />
        </Grid >



    )
}

export default CollectionTile