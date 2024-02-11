import { Grid } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
// import axios from "axios"
import DetailCard from './DetailCard'
// import { apiKey } from '../../tmdb'
import backendAxios from "../../backendAxios"
// import knowMore from '../KnowMore'
// import AddMenu from '../AddMenu'
import CollectionTile from './CollectionTile'
import Comments from './Comments/Comments'
import { useDispatch } from 'react-redux'
import { setAlert } from '../../userSlice'
const Movie = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [details, setDetails] = useState()
    const [cast, setCast] = useState()
    const [watch_provider, setWatch_provider] = useState()
    const [isTrailer, setIsTrailer] = useState(false)
    const detailsRef = useRef(null)
    const [collection, setCollection] = useState([])
    useEffect(() => {
        backendAxios.get(`/getMovieDetails/${id}`).then((response) => {
            if (response.data.errMsg) {
                dispatch(setAlert({
                    type: "error",
                    data: response.data.errMsg,
                    isOpen: true
                }))
                return
            }



            setDetails(response.data.data)
            setCast(response.data.data.casts.cast)
            if (response.data?.collection?.parts) setCollection(response.data?.collection?.parts)
            if (response.data?.data?.results?.US?.buy[0]) {
                setWatch_provider(response.data.data.results.US.buy[0])
            }



        }).catch((e) => {
            // console.log("movie Error 47")
            dispatch(setAlert({
                type: "error",
                data: "There is been error, please try again",
                isOpen: true
            }))

            // // console.log("error in axios ", e)
        })

        // axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=casts,videos`).then((response) => {
        //     setDetails(response.data)
        //     setCast(response.data.casts.cast)
        // }).catch((e) => {
        //     // // console.log("error in axios ", e)
        // })

        // axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}&append_to_response=watch_providers`).then((response) => {
        //     if (response.data?.results?.US?.buy[0]) {
        //         setWatch_provider(response.data.results.US.buy[0])
        //     }

        // }).catch((e) => {
        //     // // console.log("error in axios ", e)
        // })





        // eslint-disable-next-line
    }, [])




    return (
        <Grid container px={{
            xxs: 2,
            sm: 5
        }} py={10}
            height={{ xxs: "auto", lg: !isTrailer || collection.length === 0 ? "100vh" : "auto" }}
            sx={{
                minHeight: "100vh"
            }}
        >

            <Grid item lg={collection.length > 0 ? 12 : 12} xxs={12} px={{
                xxs: 0,
                // lg: 3
            }} mb={2}
            >
                <DetailCard watch_provider={watch_provider} tempDetails={details} cast={cast} detailsRef={detailsRef} setIsTrailer={setIsTrailer} />
            </Grid>

            {collection.length > 0 &&
                <Grid container item
                    mx={{
                        xxs: 0,
                        // lg: 3
                    }}
                    mb={2}
                    lg={12} xxs={12}
                    sx={{
                        bgcolor: "movieTv.seasonsBackground",
                        height: {
                            xxs: "fit-content",
                            lg: "auto"
                        },
                        pt: "5px",
                        px: "5px",
                        pb: "5px",

                        borderRadius: "20px",



                    }}>

                    {collection?.map((ele, i) =>
                        <CollectionTile ele={ele} key={i} />
                    )}



                </Grid>
            }
            <Comments />
        </Grid >
    )
}

// const CollectionTile = ({ ele }) => {


//     return (
//         <Grid item lg={3} xsm={6} xmd={4} xxs={12}
//             sx={{
//                 p: "5px",
//                 position: "relative"
//             }} >

//             <Grid container flexDirection={"column"} sx={{
//                 p: "10px",
//                 bgcolor: "movieTv.aSeasonBackground",
//                 borderRadius: "10px",
//                 // mb: "5px",

//                 height: "100%",

//             }}
//                 onClick={() => {
//                     knowMore(ele.media_type + "/" + (ele.media_id || ele.id))
//                 }}>


//                 <img src={`https://image.tmdb.org/t/p/original${ele?.backdrop_path}`} alt="collection" loading="lazy" style={{
//                     width: "100%", maxHeight: "100%", objectFit: "cover", borderRadius: "10px"
//                 }}></img>
//                 <Box sx={{
//                     overflow: "hidden",
//                     width: "100%"
//                 }}>

//                     <Typography variant={"h5"} sx={{
//                         my: 1, cursor: "pointer", fontWeight: "700",
//                         width: "100%",

//                         whiteSpace: "nowrap",
//                         '@keyframes LeftToRight': {
//                             "0%": {
//                                 transform: 'translate(0,0)'
//                             },
//                             "100%": {
//                                 transform: 'translate(-50%,0)'
//                             }
//                         },
//                         "&:hover": {
//                             animation: 'LeftToRight 7s infinite',
//                             // animationDirection: "alternate"
//                         }

//                     }}>{ele.title || ele.original_title} </Typography>
//                 </Box>

//                 <Typography sx={{
//                     display: "-webkit-box",
//                     WebkitLineClamp: "3",
//                     WebkitBoxOrient: "vertical",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                     "&:hover": {
//                         WebkitBoxOrient: "initial",
//                     },
//                     transition: "all 2s ease-in-out"


//                 }}>{ele.overview} </Typography>
//                 <Typography variant={"h6"} sx={{ textAlign: "end", fontWeight: "700" }}>{ele.release_date.split("-")[0]}</Typography>
//             </Grid>
//             <AddMenu id={`${ele.media_type}/${ele.media_id || ele.id}`} name={ele?.title || ele?.original_title} mr={1} mt={1} />
//         </Grid >



//     )
// }

export default Movie