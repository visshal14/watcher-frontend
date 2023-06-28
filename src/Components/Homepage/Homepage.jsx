import { Stack } from '@mui/material'
import React from 'react'
import requests from '../../request'
import Row from '../Row'
import FeaturedPosts from './FeaturedPosts'
import { Helmet } from 'react-helmet'

const Homepage = () => {






    return (
        <Stack spacing={2} py={{
            xxs: 12,
            md: 12
        }}
            px={{
                xxs: 1,
                sm: 5,
                md: 8
            }}
        >
            <FeaturedPosts />
            <Stack>
                <Helmet>

                    <title>Watcher</title>
                </Helmet>
                {/* <Row titles="NETFLIX ORIGINAL" fetchUrl={requests.fetchNetflixOriginals} type={"tv"} /> */}
                <Row titles="Trending Now" fetchUrl={requests.fetchTrending} />
                {/* <Row titles="Top Rated" fetchUrl={requests.fetchTopRated} type={"movie"} /> */}
                <Row titles="Action Movies" fetchUrl={requests.fetchActionMovies} type={"movie"} />
                <Row titles="Action Series" fetchUrl={requests.fetchActionTv} type={"tv"} />
                <Row titles="Comedy Movies" fetchUrl={requests.fetchComedyMovies} type={"movie"} />
                <Row titles="Comedy Series" fetchUrl={requests.fetchComedyTv} type={"tv"} />
                <Row titles="Horror Movies" fetchUrl={requests.fetchHorrorHovies} type={"movie"} />
                <Row titles="Romance Movies" fetchUrl={requests.fetchRomanceMovies} type={"movie"} />
                <Row titles="Mysteries" fetchUrl={requests.fetchMystries} type={"movie"} />
                <Row titles="Fantasy" fetchUrl={requests.fetchFantasies} type={"movie"} />
                {/* fetchFantasies */}
            </Stack>
        </Stack >
    )
}


export default Homepage






