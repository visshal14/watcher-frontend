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
                }

                dispatch(setAlert({
                    type: response.data.errMsg || response.data.err ? "error" : "success",
                    data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                    isOpen: true
                }))
                dispatchSetData(response.data.data)


            }).catch((e) => {
                // console.log("watchlaterBtn Error 52")
                dispatch(setAlert({
                    type: "error",
                    data: "There is been error, please try again",
                    isOpen: true
                }))

                // // console.log("error in axios ", e)
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

                dispatch(setAlert({
                    type: response.data.errMsg || response.data.err ? "error" : "success",
                    data: response.data.errMsg || response.data.err || response.data.msg || response.data,
                    isOpen: true
                }))


                dispatchSetData(response.data.data)


            }).catch((e) => {
                // console.log("watchlaterBtn Error 82")

                dispatch(setAlert({
                    type: "error",
                    data: "There is been error, please try again",
                    isOpen: true
                }))

                // // console.log("error in axios ", e)
            })
        }



    }


    const dispatchSetData = (data) => {
        dispatch(setData(data))


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