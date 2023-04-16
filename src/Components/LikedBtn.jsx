import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getLiked, setData, setAlert } from '../userSlice'
import backendAxios from "../backendAxios"
import LoginChecker from '../LoginChecker'

const Liked = ({ data }) => {

    // eslint-disable-next-line
    const [mediaData, setMediaData] = useState(data)
    const likedList = useSelector(getLiked)
    const dispatch = useDispatch()
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        setIsLiked(false)
        likedList?.every((ele) => {
            if (mediaData === `${ele.type}/${ele.id}`) {
                setIsLiked(true)
                return false
            }
            return true
        })
    }, [likedList, mediaData])

    const liked = () => {
        LoginChecker()
        console.log(isLiked)
        if (isLiked === true) {
            backendAxios.post(`/removeFromWatchLLiked/liked/${mediaData.split("/")[1]}`).then((response) => {
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
                // dispatch(
                //     setData({
                //         first_name: response.data.data.first_name,
                //         last_name: response.data.data.last_name,
                //         email: response.data.data.email,
                //         profile_photo: response.data.data.profile_photo,
                //         playlists: response.data.data.playlists,
                //         friends: response.data.data.friends,
                //         pending_requests: response.data.data.pending_requests,
                //         watch_later: response.data.data.watch_later,
                //         liked: response.data.data.liked,
                //         watched: response.data.data.watched,
                //         shared: response.data.data.shared
                //     })
                // )
                alert(response.data.msg)
            })
        } else {
            backendAxios.post(`/saveForWatchLater/liked/${mediaData.split("/")[0]}/${mediaData.split("/")[1]}`).then((response) => {
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
                // dispatch(
                //     setData({
                //         first_name: response.data.data.first_name,
                //         last_name: response.data.data.last_name,
                //         email: response.data.data.email,
                //         profile_photo: response.data.data.profile_photo,
                //         playlists: response.data.data.playlists,
                //         friends: response.data.data.friends,
                //         pending_requests: response.data.data.pending_requests,
                //         watch_later: response.data.data.watch_later,
                //         liked: response.data.data.liked,
                //         watched: response.data.data.watched,
                //         shared: response.data.data.shared
                //     })
                // )
                alert(response.data.msg)

                // UpdateUserData(response.data.data)
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
            bgcolor: "red", color: "white", fontSize: "10px",
            padding: "2px 4px",
            mt: "5px",
            minWidth: "0px",
            height: "25px"
        }}
            onClick={liked}
        >{isLiked ? <Favorite /> : <FavoriteBorder />}</Button>
    )
}

export default Liked