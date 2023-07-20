import { Grid } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import DetailCard from './DetailCard'
import { apiKey } from '../../tmdb'
const Movie = () => {

    const { id } = useParams()

    const [details, setDetails] = useState()
    const [cast, setCast] = useState()
    const [watch_provider, setWatch_provider] = useState()

    const detailsRef = useRef(null)
    useEffect(() => {

        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=casts,videos`).then((response) => {
            setDetails(response.data)
            setCast(response.data.casts.cast)
        }).catch((e) => {
            console.log("error in axios ", e)
        })

        axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}&append_to_response=watch_providers`).then((response) => {
            if (response.data?.results?.US?.buy[0]) {
                setWatch_provider(response.data.results.US.buy[0])
            }

        }).catch((e) => {
            console.log("error in axios ", e)
        })





        // eslint-disable-next-line
    }, [])


    return (
        <Grid container justifyContent={"center"} py={10} px={{
            xxs: 1,
            sm: 5,
            md: 8
        }} height={"100vh"} >
            <DetailCard watch_provider={watch_provider} tempDetails={details} cast={cast} detailsRef={detailsRef} />
        </Grid >
    )
}

export default Movie