import { BookmarkAdded, BookmarkBorder } from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getWatch_later, setData, setAlert } from '../userSlice'
import backendAxios from "../backendAxios"
import LoginChecker from '../LoginChecker'
const WatchLater = ({ mr, mt, padding, fontSize, data }) => {

    // eslint-disable-next-line
    const [mediaData, setMediaData] = useState(data)
    const watch_later = useSelector(getWatch_later)
    const dispatch = useDispatch()
    const [isWatch_later, setIsWatch_later] = useState(false)

    useEffect(() => {
        setIsWatch_later(false)
        if (watch_later?.length !== 0) {

            watch_later?.every((ele) => {
                if (mediaData === `${ele.type}/${ele.id}`) {
                    setIsWatch_later(true)
                    return false
                }
                return true
            })
        }
    }, [watch_later, mediaData])

    const watchLater = () => {
        LoginChecker()
        if (isWatch_later === true) {
            backendAxios.post(`/removeFromWatchLLiked/watch-later/${mediaData.split("/")[1]}`).then((response) => {
                if (response.data.errMsg) {
                    dispatch(setAlert({
                        type: "error",
                        data: response.data.errMsg,
                        isOpen: true
                    }))


                    return
                    // return alert("error in saving")
                }
                dispatchSetData(response.data.data)
                dispatch(setAlert({
                    type: "success",
                    data: response.data.msg,
                    isOpen: true
                }))

            })
        } else {
            backendAxios.post(`/saveForWatchLater/watch-later/${mediaData.split("/")[0]}/${mediaData.split("/")[1]}`).then((response) => {
                if (response.data.errMsg) {
                    dispatch(setAlert({
                        type: "error",
                        data: response.data.errMsg,
                        isOpen: true
                    }))


                    return

                }
                dispatchSetData(response.data.data)
                dispatch(setAlert({
                    type: "success",
                    data: response.data.msg,
                    isOpen: true
                }))

            })
        }



    }


    const dispatchSetData = (data) => {
        dispatch(
            setData({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                profile_photo: data.profile_photo,
                playlists: data.playlists,
                friends: data.friends,
                pending_requests: data.pending_requests,
                watch_later: data.watch_later,
                liked: data.liked,
                watched: data.watched,
                shared: data.shared
            })
        )


    }



    return (
        <Button variant='contained' sx={{
            bgcolor: "red", color: "white",
            mr: mr || "",
            mt: mt || "",
            padding: padding || {
                xxs: "2px 6px",
                xs: "3px 8px",
                sm: "6px 16px"
            },
            fontSize: fontSize || {
                xxs: "10px",
                md: "0.875rem"
            },
            "&:hover": {
                bgcolor: "white",
                color: "red"
            }

            // padding: {
            //     xxs: "2px 6px",
            //     xs: "3px 8px",
            //     sm: "6px 16px"
            // }
        }}

            startIcon={!isWatch_later ? <BookmarkBorder /> : <BookmarkAdded />}
            onClick={watchLater}
        > Watch Later</Button>

    )
}





export default WatchLater