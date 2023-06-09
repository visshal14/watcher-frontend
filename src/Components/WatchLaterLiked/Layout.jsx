import React from 'react'
import { Sort } from '@mui/icons-material'
import { Box, Button, Grid, Typography } from '@mui/material'
import AddMenu from '../AddMenu'
import knowMore from '../KnowMore'
const Layout = ({ data, title }) => {
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    return (
        <Grid container spacing={2} px={{
            xxs: "10px",
            sm: "50px"
        }} py={"100px"}>

            <Grid item xxs={12} md={4} sx={{
                px: 2,

            }}>
                <Box sx={{
                    bgcolor: "playlists.background",
                    borderRadius: "10px",
                    p: "10px",
                    color: "playlists.textColor"
                }}>
                    <Typography variant={"h4"}>{title}</Typography>
                    {/* <Typography variant={"h6"}>Watch Later</Typography> */}
                    <Typography variant={"h6"}>{data?.length} items</Typography>
                </Box>
            </Grid>
            <Grid item md={8} sx={{
                pl: 2,
            }}>
                <Box sx={{
                    bgcolor: "playlists.background",
                    p: {
                        xxs: "5px",
                        sm: "10px"
                    },
                    borderRadius: "10px"
                }}>
                    <Button sx={{ color: "playlists.textColor" }} startIcon={<Sort />}> Sort</Button>
                    {
                        data?.map((ele, i) =>

                            <Grid key={i} id={ele.type + "/" + ele.id}


                                container p={{
                                    xxs: 1,
                                    sm: 2
                                }} mb={1} sx={{
                                    bgcolor: "playlists.titleBackground",
                                    borderRadius: "10px"
                                }} position={"relative"}>
                                <Grid container onClick={() => {
                                    knowMore(ele.type + "/" + ele.id)

                                }}>
                                    <Grid item xxs={4}>
                                        <img src={`https://image.tmdb.org/t/p/original${ele.background}`} loading="lazy" alt="img" style={{
                                            width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px"
                                        }} />
                                    </Grid>
                                    <Grid item xxs={8} px={1}>
                                        <Typography variant={"h5"}>{ele.title} </Typography>
                                        <Typography>{truncate(ele.description, 100)} </Typography>
                                        <Typography>{ele?.release_date?.split("-")[0]}</Typography>
                                    </Grid>
                                </Grid>
                                <Box sx={{ position: "absolute", top: 0, right: 0 }}>
                                    <AddMenu id={`${ele.type}/${ele.id}`} name={ele.title} />
                                </Box>
                            </Grid>


                        )
                    }








                </Box>

            </Grid>
        </Grid>
    )
}

export default Layout