import { Avatar, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { useDispatch, useSelector } from 'react-redux'
import { getEmail, getProfilePhoto, setAlert } from '../../../userSlice'
import { useLocation, useSearchParams } from 'react-router-dom'
import backendAxios, { frontEnd } from "../../../backendAxios"
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingComponent from '../../LoadingComponent'

const Comments = () => {


    const profile_photo = useSelector(getProfilePhoto)
    const email = useSelector(getEmail)
    const [comment, setComment] = useState("")
    // const { id } = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const [hightLightedCommentParents, setHightLightedCommentParents] = useState([])

    const [hasMore, setHasMore] = useState(true);
    const [index, setIndex] = useState(1);
    const [totalComments, setTotalComments] = useState(0)

    // id
    //reply
    //user_id
    //time
    //date
    //like 
    //content
    //moviemane

    // 1 -> 1.1 ->1.1.1->1.1.2
    //          1.2







    const [data, setData] = useState([])

    const getComments = () => {
        backendAxios.get(`/getComments${location.pathname}?offset=0&limit=10`).then((response) => {
            if (response.data.errMsg) {
                dispatch(setAlert({
                    type: "error",
                    data: response.data.errMsg,
                    isOpen: true
                }))
                return
            }
            setData(response.data)
            // // console.log(response.data)
            // // console.log(response.data)
        }).catch((e) => {
            // console.log("comments Error 57")
            dispatch(setAlert({
                type: "error",
                data: "There is been error, please try again",
                isOpen: true
            }))

        })
    }


    const fetchMoreData = () => {
        backendAxios.get(`/getComments${location.pathname}?offset=${index}0&limit=10`).then((response) => {
            if (response.data.errMsg) {
                dispatch(setAlert({
                    type: "error",
                    data: response.data.errMsg,
                    isOpen: true
                }))
                return
            }
            setData((prevItems) => [...prevItems, ...response.data]);

            response.data.length > 0 ? setHasMore(true) : setHasMore(false);
        }).catch((err) => {

            dispatch(setAlert({
                type: "error",
                data: "There is been error, please try again",
                isOpen: true
            }))
        });

        setIndex((prevIndex) => prevIndex + 1);
    };


    useEffect(() => {
        // // console.log(location.pathname.split("/")[1])
        if (location.pathname.split("/")[1] === "tv" || location.pathname.split("/")[1] === "movie") {
            getComments()
        }


        if (searchParams.get("comment_id") !== null && searchParams.get("comment_id")?.length !== "") {

            backendAxios.get(`/getParents/${searchParams.get("comment_id")}`).then((response) => {
                if (response.data.errMsg) {
                    dispatch(setAlert({
                        type: "error",
                        data: response.data.errMsg,
                        isOpen: true
                    }))
                    return
                }



                setHightLightedCommentParents(response.data)
                // // console.log(response.data)
                // // console.log(response.data)
            }).catch((e) => {
                // console.log("comments Error 92")
                dispatch(setAlert({
                    type: "error",
                    data: "There is been error, please try again",
                    isOpen: true
                }))

            })
        }



        // eslint-disable-next-line
    }, [location])


    useEffect(() => {
        getComments()
        backendAxios.get(`/getCommentsCount${location.pathname}?offset=0&limit=10`).then((response) => {
            if (response.data.errMsg) {
                dispatch(setAlert({
                    type: "error",
                    data: response.data.errMsg,
                    isOpen: true
                }))
                return
            }
            setTotalComments(response.data)

        }).catch((e) => {

            dispatch(setAlert({
                type: "error",
                data: "There is been error, please try again",
                isOpen: true
            }))

        })
        // eslint-disable-next-line
    }, [location.pathname])



    const commentSubmit = () => {
        // // console.log("comment  " + comment)
        // // console.log(location.pathname)

        if (window.localStorage.getItem("accessToken") === null || window.localStorage.getItem("accessToken") === "") {
            dispatch(setAlert({
                type: "error",
                data: "Please login first",
                isOpen: true
            }))

            window.open(`${frontEnd}/login?redirected=true`, "_blank")
            return
        }

        backendAxios.post("/addComment", {

            text: comment,
            media_data: location.pathname

        }).then((response) => {
            if (response.data.errMsg) {
                dispatch(setAlert({
                    type: "error",
                    data: response.data.errMsg,
                    isOpen: true
                }))
                return
            }

            dispatch(setAlert({
                type: "success",
                data: "Done",
                isOpen: true
            }))

            getComments()
            setComment("")
        }).catch(function (err) {
            // console.log("comments Error 138")
            // // console.log(err)
            dispatch(setAlert({
                type: "error",
                data: "There is been error, please try again",
                isOpen: true
            }))

            // // console.log("Error in login Frontend: ", error);
        });
    }

    return (
        <Stack
            // mx={{
            //     xxs: 0,
            //     lg: 3
            // }}

            sx={{
                bgcolor: "movieTv.seasonsBackground",
                height: {
                    xxs: "fit-content",
                    lg: "auto"
                },
                // maxHeight: {
                //     xxs: "100%",
                //     lg: "calc(100vh - 160px)"
                // },
                pt: "5px",
                px: "10px",
                pb: "5px",
                width: "100%",
                borderRadius: "20px",



            }} >

            <Typography variant={"h4"} sx={{
                m: 1, fontWeight: "700",
                fontSize: {
                    xxs: "16px",
                    sm: "18px",
                    md: "20px"
                }

            }}>{totalComments} {totalComments > 1 ? "Comments" : "Comment"}</Typography>


            <Grid container sx={{
                mb: "4px",
                bgcolor: "movieTv.aSeasonBackground",
                borderRadius: 2,
                p: 1,
                maxWidth: "100%",
                flexWrap: "nowrap"
            }} alignItems={"center"} >

                <Avatar src={profile_photo} sx={{
                    width: {
                        xxs: "24px",
                        sm: "32px",
                        xmd: "40px"
                    },
                    height: {
                        xxs: "24px",
                        sm: "32px",
                        xmd: "40px"
                    },
                    mr: 1

                }} />



                <TextField fullWidth
                    value={comment}
                    autoFocus
                    onChange={(e) => setComment(e.currentTarget.value)}

                    variant="standard"
                    placeholder="Add Your Comment"
                    // InputProps={{
                    //     disableUnderline: true


                    // }}
                    sx={{

                        "& input": {
                            padding: "2px 6px",
                            fontSize: { xxs: "12px", sm: "14px" }
                        },

                        "& .MuiInput-underline:after": {
                            borderBottom: "0"
                        },


                    }}
                />

                <Button
                    onClick={commentSubmit}
                    sx={{
                        ml: 1,
                        fontSize: {
                            xxs: "12px",
                            sm: "14px"
                        },
                        padding: {
                            xxs: "2px 5px",
                            sm: "2px 15px"
                        },
                        color: "movieTv.xxsTextColor"
                    }} >Submit</Button>
            </Grid>

            <Stack>
                <InfiniteScroll
                    dataLength={data.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<LoadingComponent />}
                >

                    {data?.map((ele, i) =>
                        <Comment ele={ele} key={i} isReply={false} location={location} email={email} hightLightedCommentParents={hightLightedCommentParents} getComments={getComments} />
                    )}


                </InfiniteScroll>

            </Stack>




            {/* 
            <Grid container flexDirection={"column"} sx={{
                p: "10px",
                bgcolor: "movieTv.aSeasonBackground",
                borderRadius: "10px",
                // mb: "5px",

                height: "100%",

            }}
                onClick={() => {
                    knowMore(ele.media_type + "/" + (ele.media_id || ele.id))
                }}>


                <img src={`https://image.tmdb.org/t/p/original${ele?.backdrop_path}`} alt="collection" loading="lazy" style={{
                    width: "100%", maxHeight: "100%", objectFit: "cover", borderRadius: "10px"
                }}></img>
                <Box sx={{
                    overflow: "hidden",
                    width: "100%"
                }}>

                    <Typography variant={"h5"} sx={{
                        my: 1, cursor: "pointer", fontWeight: "700",
                        width: "100%",

                        whiteSpace: "nowrap",
                        '@keyframes LeftToRight': {
                            "0%": {
                                transform: 'translate(0,0)'
                            },
                            "100%": {
                                transform: 'translate(-50%,0)'
                            }
                        },
                        "&:hover": {
                            animation: 'LeftToRight 7s infinite',
                            // animationDirection: "alternate"
                        }

                    }}>{ele.title || ele.original_title} </Typography>
                </Box>

                <Typography sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    "&:hover": {
                        WebkitBoxOrient: "initial",
                    },
                    transition: "all 2s ease-in-out"


                }}>{ele.overview} </Typography>
                <Typography variant={"h6"} sx={{ textAlign: "end", fontWeight: "700" }}>{ele.release_date.split("-")[0]}</Typography>
            </Grid>
            <AddMenu id={`${ele.media_type}/${ele.media_id || ele.id}`} name={ele?.title || ele?.original_title} mr={1} mt={1} /> */}
        </Stack >
    )
}

export default Comments