import { Grid, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Discover = () => {

    const { type } = useParams()
    useEffect(() => {
        if (type === "movie") {

        } else if (type === "tv") {

        } else if (type === "filter") {

        } else {

        }
    }, [type])

    const movieData = {
        "adult": false,
        "backdrop_path": "/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
        "genre_ids": [
            16,
            12,
            10751,
            14,
            35
        ],
        "id": 502356,
        "original_language": "en",
        "original_title": "The Super Mario Bros. Movie",
        "overview": "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.",
        "popularity": 10312.202,
        "poster_path": "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
        "release_date": "2023-04-05",
        "title": "The Super Mario Bros. Movie",
        "video": false,
        "vote_average": 7.6,
        "vote_count": 823
    }

    const tvData = {
        "backdrop_path": "/nYJRdNtrT8nYdoXHJboNFGWwS5z.jpg",
        "first_air_date": "2019-10-18",
        "genre_ids": [
            99
        ],
        "id": 94667,
        "name": "Traveling with the Derbez",
        "origin_country": [
            "MX"
        ],
        "original_language": "es",
        "original_name": "De viaje con los Derbez",
        "overview": "The series revolves around the Derbez family on their trip to Morocco, the family is made up of Eugenio Derbez, the patriarch of the family, Alessandra Rosaldo, his wife, Aitana Derbez, their daughter, Vadhir and José Eduardo Derbez, their children, and Aislinn Derbez, his eldest daughter. , along with Mauricio Ochmann and his daughter Kailani.",
        "popularity": 325.982,
        "poster_path": "/eBbRM16FR79GfpMsd5pXwm36J3s.jpg",
        "vote_average": 7.5,
        "vote_count": 1233
    }

    return (
        <Stack px={{
            xxs: 2,
            xsm: 5
        }} py={10} sx={{
        }} >

            <Grid container>





            </Grid>

        </Stack>
    )
}

export default Discover