import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import { StarRateRounded } from '@mui/icons-material'
import Liked from './LikedBtn'
import knowMore from './KnowMore'
const MovieOverviewTip = ({ ele, type }) => {


    // ele = {
    //     "adult": false,
    //     "backdrop_path": "/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
    //     "created_by": [
    //         {
    //             "id": 35796,
    //             "credit_id": "5e84f06a3344c600153f6a57",
    //             "name": "Craig Mazin",
    //             "gender": 2,
    //             "profile_path": "/uEhna6qcMuyU5TP7irpTUZ2ZsZc.jpg"
    //         },
    //         {
    //             "id": 1295692,
    //             "credit_id": "5e84f03598f1f10016a985c0",
    //             "name": "Neil Druckmann",
    //             "gender": 2,
    //             "profile_path": "/bVUsM4aYiHbeSYE1xAw2H5Z1ANU.jpg"
    //         }
    //     ],
    //     "episode_run_time": [
    //         59
    //     ],
    //     "first_air_date": "2023-01-15",
    //     "genres": [
    //         {
    //             "id": 18,
    //             "name": "Drama"
    //         }
    //     ],
    //     "homepage": "https://www.hbo.com/the-last-of-us",
    //     "id": 100088,
    //     "in_production": true,
    //     "languages": [
    //         "en"
    //     ],
    //     "last_air_date": "2023-03-12",
    //     "last_episode_to_air": {
    //         "id": 4071047,
    //         "name": "Look for the Light",
    //         "overview": "After being pursued by Infected, a pregnant Anna places her trust in a lifelong friend. Years later, Ellie is forced to grapple with the emotional toll of her journey, while Joel faces a devastating decision of his own.",
    //         "vote_average": 7.804,
    //         "vote_count": 46,
    //         "air_date": "2023-03-12",
    //         "episode_number": 9,
    //         "production_code": "",
    //         "runtime": 46,
    //         "season_number": 1,
    //         "show_id": 100088,
    //         "still_path": "/qFouIBgN3Jgba7LnuRmkTAohh07.jpg"
    //     },
    //     "name": "The Last of Us",
    //     "next_episode_to_air": null,
    //     "networks": [
    //         {
    //             "id": 49,
    //             "logo_path": "/tuomPhY2UtuPTqqFnKMVHvSb724.png",
    //             "name": "HBO",
    //             "origin_country": "US"
    //         }
    //     ],
    //     "number_of_episodes": 9,
    //     "number_of_seasons": 1,
    //     "origin_country": [
    //         "US"
    //     ],
    //     "original_language": "en",
    //     "original_name": "The Last of Us",
    //     "overview": "Twenty years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone. What starts as a small job soon becomes a brutal, heartbreaking journey, as they both must traverse the United States and depend on each other for survival.",
    //     "popularity": 1432.395,
    //     "poster_path": "/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    //     "production_companies": [
    //         {
    //             "id": 125281,
    //             "logo_path": "/3hV8pyxzAJgEjiSYVv1WZ0ZYayp.png",
    //             "name": "PlayStation Productions",
    //             "origin_country": "US"
    //         },
    //         {
    //             "id": 11073,
    //             "logo_path": "/aCbASRcI1MI7DXjPbSW9Fcv9uGR.png",
    //             "name": "Sony Pictures Television Studios",
    //             "origin_country": "US"
    //         },
    //         {
    //             "id": 23217,
    //             "logo_path": "/kXBZdQigEf6QiTLzo6TFLAa7jKD.png",
    //             "name": "Naughty Dog",
    //             "origin_country": "US"
    //         },
    //         {
    //             "id": 119645,
    //             "logo_path": null,
    //             "name": "Word Games",
    //             "origin_country": "US"
    //         },
    //         {
    //             "id": 115241,
    //             "logo_path": null,
    //             "name": "The Mighty Mint",
    //             "origin_country": "US"
    //         },
    //         {
    //             "id": 3268,
    //             "logo_path": "/tuomPhY2UtuPTqqFnKMVHvSb724.png",
    //             "name": "HBO",
    //             "origin_country": "US"
    //         }
    //     ],
    //     "production_countries": [
    //         {
    //             "iso_3166_1": "US",
    //             "name": "United States of America"
    //         }
    //     ],
    //     "seasons": [
    //         {
    //             "air_date": "2023-01-15",
    //             "episode_count": 9,
    //             "id": 144593,
    //             "name": "Season 1",
    //             "overview": "",
    //             "poster_path": "/aUQKIpZZ31KWbpdHMCmaV76u78T.jpg",
    //             "season_number": 1
    //         }
    //     ],
    //     "spoken_languages": [
    //         {
    //             "english_name": "English",
    //             "iso_639_1": "en",
    //             "name": "English"
    //         }
    //     ],
    //     "status": "Returning Series",
    //     "tagline": "When you're lost in the darkness, look for the light.",
    //     "type": "Scripted",
    //     "vote_average": 8.762,
    //     "vote_count": 3122
    // }


    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <Box sx={{
            width: "200px",
            height: "220px",
            py: 3,
            px: 3,
            bgcolor: "black",
            borderRadius: "5px"
        }}>

            <Typography sx={{
                width: "100%",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
            }}> {ele?.name || ele?.original_title || ele?.title || ele?.details?.title}</Typography>
            <Grid container justifyContent="space-between" >
                <Grid container alignItems="center" width=" fit-content" ><StarRateRounded sx={{ color: "yellow", width: "1rem", height: "0.5em" }} /><Typography fontSize={12}>{ele?.vote_average || ele?.rating || ele?.details?.rating || "NA"}</Typography> </Grid>
                <Typography fontSize={12}>{ele?.release_date?.split("-")[0] || ele?.first_air_date?.split("-")[0] || ele?.first_epi_date?.split("-")[0] || ele?.details?.first_epi_date?.split("-")[0]}</Typography>

            </Grid>

            <Typography sx={{
                fontSize: "12px"
            }}>{truncate(ele?.overview || ele?.description || ele?.details?.description, 100)}</Typography>
            <Typography sx={{
                fontSize: "12px"
            }}>{ele?.origin_country ? `Country:" ${ele?.origin_country[0] || ele?.origin_country}` : ""} </Typography>

            <Button variant='contained' sx={{
                bgcolor: "red", color: "white", marginRight: {
                    xxs: 1,
                    sm: 2
                }, fontSize: "10px",
                padding: {
                    xxs: "2px 4px",
                    sm: "4px 8px"
                },
                mt: "5px"
            }}
                onClick={() => knowMore(`${ele.media_type || ele.type || ele.details?.type || type}/${ele.id || ele.details?.id || ele.media_id}`)}
            >Know More</Button>
            <Liked data={(ele.media_type || ele.type || ele.details?.type) + "/" + (ele.id || ele.details?.id || ele.media_id)} />
        </Box>
    )
}

export default MovieOverviewTip