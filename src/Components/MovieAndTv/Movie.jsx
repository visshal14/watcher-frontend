import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import DetailCard from './DetailCard'
import { apiKey } from '../../tmdb'
const Movie = () => {
    // 100088 tv
    //804150 movie
    const { id } = useParams()

    const [details, setDetails] = useState()
    const [cast, setCast] = useState()
    const [watch_provider, setWatch_provider] = useState()
    // const [details, setDetails] = useState()

    useEffect(() => {

        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=casts`).then((response) => {
            setDetails(response.data)
            setCast(response.data.casts.cast)
        })

        axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}&append_to_response=watch_providers`).then((response) => {
            if (response.data.results.US.buy[0]) {
                setWatch_provider(response.data.results.US.buy[0])
            }

        })
        // eslint-disable-next-line
    }, [])


    return (
        <Grid container justifyContent={"center"} py={10} px={{
            xxs: 5,
            sm: 10
        }} height={"100vh"} >
            <DetailCard watch_provider={watch_provider} details={details} cast={cast} />
        </Grid >
    )
}

export default Movie