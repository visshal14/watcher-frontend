import { Grid, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import requests from '../../request'
import SingleFeaturedPost from './SingleFeaturedPost'
import backendAxios from "../../backendAxios"
import { useDispatch } from 'react-redux'
import { setAlert } from '../../userSlice'
// import LoadingComponent from "../LoadingComponent"
const FeaturedPosts = () => {
    const [featured, setFeatures] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        backendAxios.post(`/getRowDetails`, {
            fetchUrl: requests.fetchTrending
        }).then((response) => {
            if (response.data.errMsg) {
                dispatch(setAlert({
                    type: "error",
                    data: response.data.errMsg,
                    isOpen: true
                }))
                return
            }

            setFeatures(prev => [...prev, response.data.results[0]])
            setFeatures(prev => [...prev, response.data.results[1]])
            setFeatures(prev => [...prev, response.data.results[2]])
            setFeatures(prev => [...prev, response.data.results[3]])
        }).catch((e) => {

            // console.log("featuredPost Error 32")
            dispatch(setAlert({
                type: "error",
                data: "There is been error, please try again",
                isOpen: true
            }))

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

            {featured.length > 1 ? featured.map((ele, i) =>
                <SingleFeaturedPost key={`featuredpost_${i}`} postNo={i} tileClicked={tileClicked} data={ele} series={featurePost[i]?.series} spot={featurePost[i]?.spot} />
            ) :
                <Skeleton variant="rounded" width={"100%"} height={"100%"} />

                //  <LoadingComponent />

            }
        </Grid>
    )
}

export default FeaturedPosts