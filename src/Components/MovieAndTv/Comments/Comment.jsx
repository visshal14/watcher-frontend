import { ArrowDropDown, ArrowDropUp, Delete, Share } from '@mui/icons-material'
import { Avatar, Button, Grid, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfilePhoto, setAlert } from '../../../userSlice'
import backendAxios, { frontEnd } from "../../../backendAxios"
import { useNavigate, useSearchParams } from 'react-router-dom'
import Replies from "./Replies"


const Comment = ({ ele, location, email, getComments, hightLightedCommentParents }) => {

    const dispatch = useDispatch()
    const profile_photo = useSelector(getProfilePhoto)
    const [isReplyDisplay, setIsReplyDisplay] = useState(false)
    const [replyText, setReplyText] = useState("")
    const [showMoreComment, setShowMoreComment] = useState(hightLightedCommentParents.includes(ele.comment_id))

    // eslint-disable-next-line

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    // const location = useLocation()
    const [isHightLightedComment, setIsHighLightedComment] = useState(false)





    const replyClicked = () => {
        setIsReplyDisplay(prev => !prev)
    }
    const replySubmit = () => {
        // // console.log(location)


        if (window.localStorage.getItem("accessToken") === null || window.localStorage.getItem("accessToken") === "") {
            dispatch(setAlert({
                type: "error",
                data: "Please login first",
                isOpen: true
            }))

            window.open(`${frontEnd}/login?redirected=true`, "_blank")
            return
        }

        backendAxios.post("/addReplies", {
            text: replyText,
            toReply_id: ele?.comment_id,
            media_data: location.pathname,
            media_name: ele?.media_name
        }).then((response) => {

            if (response.data.errMsg) {
                dispatch(setAlert({
                    type: "error",
                    data: response.data.errMsg,
                    isOpen: true
                }))
                return
            }


            // // console.log(response.data)
            setReplyText("")
            setIsReplyDisplay(false)
            getComments()
        }).catch((err) => {
            // console.log("comment Error 54")
            dispatch(setAlert({
                type: "error",
                data: "There is been error, please try again",
                isOpen: true
            }))

        })
    }

    const deleteComment = () => {
        backendAxios.delete(`/deleteComment/${ele?.comment_id}`,).then((response) => {

            if (response.data.errMsg) {
                dispatch(setAlert({
                    type: "error",
                    data: response.data.errMsg,
                    isOpen: true
                }))
                return
            }

            // // console.log(response.data)
            getComments()
        }).catch((err) => {
            // console.log("comment Error 78")
            dispatch(setAlert({
                type: "error",
                data: "There is been error, please try again",
                isOpen: true
            }))

        })
    }



    const shareComment = () => {

        // navigate(`${location.pathname}?comment_id=${ele.comment_id}`)

        var text = `${frontEnd}${location.pathname}?comment_id=${ele.comment_id}`
        navigator.clipboard.writeText(text).then(function () {
            // // console.log('Async: Copying to clipboard was successful!');
            dispatch(setAlert({
                type: "success",
                data: "Shared link copied to clipboard",
                isOpen: true
            }))
        }, function (err) {
            dispatch(setAlert({
                type: "error",
                data: "Could not copy shared link",
                isOpen: true
            }))
        });



    }




    const showMoreCommentFunction = () => {
        // // console.log("chowMore")
        setShowMoreComment(prev => !prev)
    }



    useEffect(() => {
        if (location.search !== "") {
            // // console.log(searchParams.get('comment_id'))
            setIsHighLightedComment(searchParams.get('comment_id') === ele.comment_id)



            const comment = document.getElementById(searchParams.get('comment_id'));
            if (comment) {

                window.scrollTo({
                    top: comment.offsetTop,
                    behavior: "smooth"
                });
            }

        }
        // // console.log(location)
    }, [location])




    return (
        <>
            {ele?.comment_id && !ele?.isReply && !ele?.isDeleted &&
                <Grid container id={ele.comment_id} sx={{
                    my: "4px",
                    width: "100%",
                    bgcolor: "movieTv.aSeasonBackground",
                    borderRadius: 2,
                    p: 1,
                    maxWidth: "100%",
                    position: "relative",
                    border: isHightLightedComment ? "2px solid" : "",
                    borderColor: "movieTv.xxsTextColor",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                }}>
                    <Grid item sx={{
                        mr: {
                            xxs: 1,
                            sm: 2
                        },
                    }}>
                        <Avatar src={ele?.user_id?.profile_photo} sx={{
                            width: {
                                xxs: "24px",
                                xmd: "32px"
                            },
                            height: {
                                xxs: "24px",
                                xmd: "32px"
                            }

                        }} />
                    </Grid>
                    <Grid item xs sx={{ maxWidth: "100%" }}>
                        <Stack sx={{ maxWidth: "100%" }}>
                            <Typography
                                variant={"h6"}
                                sx={{
                                    fontWeight: "600", fontSize: {
                                        xxs: "12px",
                                        sm: "14px"
                                    }
                                }}>{ele?.user_id?.first_name} {ele?.user_id?.last_name}</Typography>

                            <Typography sx={{ fontSize: { xxs: "10px", sm: "12px" } }}>{ele?.text}</Typography>





                            <Stack sx={{ width: "100%" }} >
                                <Grid container alignItems={"center"}>
                                    {/* <IconButton onClick={likeClicked} sx={{
                                    width: { xxs: "20px", sm: "22px" },
                                    height: { xxs: "20px", sm: "22px" },
                                }}>
                                    <FavoriteBorder sx={{ width: { xxs: "16px", sm: "18px" }, height: { xxs: "16px", sm: "18px" } }} />
                                </IconButton> */}
                                    {/* <Typography sx={{
                                    fontSize: { xxs: "12px", sm: "14px" }
                                }}>
                                    {ele?.like_count}
                                </Typography> */}

                                    <Button onClick={replyClicked} sx={{

                                        fontSize: {
                                            xxs: "12px",
                                            sm: "14px"
                                        },
                                        padding: {
                                            xxs: "2px 4px",
                                            sm: "2px 4px"
                                        },
                                        color: "movieTv.xxsTextColor"
                                    }}>Reply</Button>
                                </Grid>


                                {isReplyDisplay && <Grid container sx={{
                                    bgcolor: "movieTv.aSeasonBackground",
                                    borderRadius: 2,
                                    p: 1,
                                    maxWidth: "100%",
                                    flexWrap: "nowrap"
                                }}>


                                    <Avatar src={profile_photo} sx={{
                                        width: {
                                            xxs: "24px",
                                            xmd: "32px"
                                        },
                                        height: {
                                            xxs: "24px",
                                            xmd: "32px"
                                        },
                                        mr: {
                                            xxs: 1,
                                            sm: 2
                                        },

                                    }} />


                                    <TextField fullWidth
                                        value={replyText}
                                        autoFocus
                                        onChange={(e) => setReplyText(e.currentTarget.value)}

                                        variant="standard"
                                        placeholder="Reply"

                                        sx={{

                                            "& input": {
                                                padding: "2px 6px",
                                                fontSize: { xxs: "12px", sm: "14px" }
                                            },
                                            "& input:focus": {
                                                outline: "none"
                                            },
                                            "& .MuiInput-underline:after": {
                                                borderBottom: "0"
                                            },
                                        }}
                                    />
                                    <Button onClick={replySubmit} sx={{
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
                                    {/* <Button onClick={replyClicked} sx={{
                                ml: 1,
                                fontSize: {
                                    xxs: "12px"
                                },
                                padding: {
                                    xxs: "2px 5px"
                                }
                            }} >Cancel</Button> */}
                                </Grid>}
                            </Stack>


                            {ele?.replies?.length > 0 && <Button
                                onClick={showMoreCommentFunction}
                                startIcon={!showMoreComment ? <ArrowDropDown /> : <ArrowDropUp />}
                                sx={{
                                    width: "fit-content",
                                    fontSize: {
                                        xxs: "12px",
                                        sm: "14px"
                                    },
                                    padding: {
                                        xxs: "2px 5px",
                                        sm: "2px 15px"
                                    },
                                    color: "movieTv.xxsTextColor"
                                }}
                            >

                                {ele.replies?.length} {ele.replies?.length > 1 ? "Replies" : "Reply"}
                            </Button>}

                        </Stack>
                    </Grid>


                    <Grid sx={{
                        alignItems: "flex-start",
                        position: "absolute",
                        right: 0,
                        top: 0
                    }}>


                        {(email === ele?.user_id?.email) && <IconButton sx={{


                        }} onClick={deleteComment}>
                            <Delete sx={{
                                width: {
                                    xxs: "16px",
                                    xmd: "20px"
                                },
                                height: {
                                    xxs: "16px",
                                    xmd: "20px"
                                },

                            }} />
                        </IconButton>}
                        <IconButton sx={{

                        }}


                            onClick={shareComment}>

                            <Share sx={{
                                width: {
                                    xxs: "16px",
                                    xmd: "20px"
                                },
                                height: {
                                    xxs: "16px",
                                    xmd: "20px"
                                },

                            }} />
                        </IconButton>


                    </Grid>
                    {showMoreComment && <Grid container sx={{
                        pl: {
                            xxs: "10px",
                            sm: "20px"
                        },
                        // display: showMoreComment ? "flex" : "none"
                    }}>

                        {ele.replies?.map((d, i) =>
                            <Replies ele={d} key={i} location={location} email={email} getComments={getComments} hightLightedCommentParents={hightLightedCommentParents} />
                            // <Typography key={i}>{"ele.text"}</Typography>
                        )}


                    </Grid>}


                </Grid>}
        </>
    )
}




export default Comment