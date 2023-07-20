import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import { ReadMore, StarRateRounded } from '@mui/icons-material'
import Liked from './LikedBtn'
import knowMore from './KnowMore'
const MovieOverviewTip = ({ ele, type }) => {




    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <Box sx={{
            width: "200px",
            height: "200px",
            p: 2,
            bgcolor: "toolTip.foreBackground",
            borderRadius: "5px",
            cursor: "default",
            color: "toolTip.textColor"
        }}>

            <Typography sx={{
                width: "100%",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
            }}> {ele?.name || ele?.title || ele?.original_title || ele?.details?.title}</Typography>
            <Grid container justifyContent="space-between" >
                <Grid container alignItems="center" width=" fit-content" ><StarRateRounded sx={{ color: "yellow", width: "1rem", height: "0.5em" }} /><Typography fontSize={12}>{ele?.vote_average?.toFixed(2) || ele?.rating?.toFixed(2) || ele?.details?.rating?.toFixed(2) || "NA"}</Typography> </Grid>
                <Typography fontSize={12}>{ele?.release_date?.split("-")[0] || ele?.first_air_date?.split("-")[0] || ele?.first_epi_date?.split("-")[0] || ele?.details?.first_epi_date?.split("-")[0]}</Typography>

            </Grid>

            <Typography sx={{
                fontSize: "12px",
                wordBreak: "break-all"
            }}>{truncate(ele?.overview || ele?.description || ele?.details?.description, 100)}</Typography>
            <Typography sx={{
                fontSize: "12px"
            }}>{ele?.origin_country ? `Country: ${ele?.origin_country[0] || ele?.origin_country}` : ""} </Typography>

            <Button variant='contained' sx={{
                bgcolor: "red", color: "white", marginRight: {
                    xxs: 1,
                    sm: 2
                }, fontSize: "10px",
                padding: {
                    xxs: "2px 4px",
                    sm: "4px 8px"
                },
                mt: "5px",
                "&:hover": {
                    bgcolor: "white",
                    color: "red"
                }
            }}

                endIcon={<ReadMore />}
                onClick={() => knowMore(`${ele?.media_type || ele?.type || ele?.details?.type || type}/${ele?.id || ele?.details?.id || ele?.media_id}`)}
            >Know More</Button>
            <Liked data={(ele?.media_type || ele?.type || type || ele?.details?.type) + "/" + (ele?.id || ele?.details?.id || ele?.media_id)} />
        </Box>
    )
}

export default MovieOverviewTip