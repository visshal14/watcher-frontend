import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import requests from '../../request'
import SingleFeaturedPost from './SingleFeaturedPost'
const FeaturedPosts = () => {

    const [featured, setFeatures] = useState([])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3${requests.fetchTrending}`).then((response) => {
            setFeatures(prev => [...prev, response.data.results[0]])
            setFeatures(prev => [...prev, response.data.results[1]])
            setFeatures(prev => [...prev, response.data.results[2]])
            setFeatures(prev => [...prev, response.data.results[3]])
        }).catch((e) => {

        })
    }, [])

    const [featurePost, setfeaturePost] = useState([{
        spot: true,
        series: 0
    },
    {
        spot: false,
        series: 1
    },
    {
        spot: false,
        series: 2
    },
    {
        spot: false,
        series: 3
    }])


    useEffect(() => {
        const timeOut = setTimeout(() => {
            let x = featurePost
            for (let i = 0; i < x.length; i++) {
                if (x[i].series === 0) {
                    x[i].series = 3
                    x[i].spot = false
                } else {
                    if (x[i].series - 1 === 0) {
                        x[i].series -= 1
                        x[i].spot = true
                    } else {
                        x[i].series -= 1
                        x[i].spot = false

                    }
                }
            }
            setfeaturePost([{
                spot: x[0].spot,
                series: x[0].series
            },
            {
                spot: x[1].spot,
                series: x[1].series
            },
            {
                spot: x[2].spot,
                series: x[2].series
            },
            {
                spot: x[3].spot,
                series: x[3].series
            }])
        }, 3000)

        return () =>
            clearTimeout(timeOut)
    }, [featurePost])

    const tileClicked = (n, i, e) => {
        if (i === 0 && e === true) return
        let x = featurePost
        while (x[n].series !== 0 && x[n].spot !== true) {
            for (let i = 0; i < x.length; i++) {
                if (x[i].series === 0) {
                    x[i].series = 3
                    x[i].spot = false
                } else {
                    if (x[i].series - 1 === 0) {
                        x[i].series -= 1
                        x[i].spot = true
                    } else {
                        x[i].series -= 1
                        x[i].spot = false
                    }
                }
            }
        }

        setfeaturePost([{
            spot: x[0].spot,
            series: x[0].series
        },
        {
            spot: x[1].spot,
            series: x[1].series
        },
        {
            spot: x[2].spot,
            series: x[2].series
        },
        {
            spot: x[3].spot,
            series: x[3].series
        }])
    }

    return (
        <Grid container sx={{
            position: "relative",
            height: "400px"
        }}>
            {featured.map((ele, i) =>
                <SingleFeaturedPost key={`featuredpost_${i}`} postNo={i} tileClicked={tileClicked} data={ele} series={featurePost[i].series} spot={featurePost[i].spot} />
            )}
        </Grid>
    )
}

export default FeaturedPosts