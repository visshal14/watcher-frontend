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
        if (likedList.length > 0) {

            likedList?.every((ele) => {
                if (mediaData === `${ele.type}/${ele.id}`) {
                    setIsLiked(true)
                    return false
                }
                return true
            })
        }
    }, [likedList, mediaData])

    const liked = () => {
        LoginChecker()
        console.log(isLiked)
        if (isLiked === true) {
            backendAxios.post(`/removeFromWatchLLiked/liked/${mediaData.split("/")[1]}`).then((response) => {

                dispatch(setAlert({
                    type: response.data.errMsg || response.data.err ? "error" : "success",
                    data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                    isOpen: true
                }))

                if (response.data.errMsg) return
                dispatchSetData(response.data.data)

            }).catch((e) => {
                // console.log("error in axios ", e)
            })
        } else {
            backendAxios.post(`/saveForWatchLater/liked/${mediaData.split("/")[0]}/${mediaData.split("/")[1]}`).then((response) => {

                dispatch(setAlert({
                    type: response.data.errMsg || response.data.err ? "error" : "success",
                    data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                    isOpen: true
                }))
                if (response.data.errMsg) return
                dispatchSetData(response.data.data)


            }).catch((e) => {
                // console.log("error in axios ", e)
            })
        }



    }

    const dispatchSetData = (data) => {
        dispatch(setData(data))



    }





    return (
        <Button variant='contained' sx={{
            bgcolor: "red", color: "white", fontSize: "10px",
            padding: "2px 4px",
            mt: "5px",
            minWidth: "0px",
            height: "25px",

            "&:hover": {
                bgcolor: "white",
                color: "red"
            }
        }}
            onClick={liked}
        >{isLiked ? <Favorite /> : <FavoriteBorder />}</Button>
    )
}

export default Liked