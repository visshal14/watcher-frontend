import { Delete } from '@mui/icons-material'
import { Avatar, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import backendAxios, { frontEnd } from '../../backendAxios'
import { useDispatch } from 'react-redux'
import { setAlert } from "../../userSlice"
const CommentsProfile = ({ data, getComments }) => {
    const dispatch = useDispatch()

    const redirectComment = (id, media_data) => {
        var text = `${frontEnd}${media_data}?comment_id=${id}`
        window.open(text, "_blank")
    }
    useEffect(() => {
        getComments()
    }, [])

    const deleteComment = (id) => {
        console.log("id delete")
        backendAxios.delete(`/deleteComment/${id}`,).then((response) => {

            if (response.data.errMsg) {
                dispatch(setAlert({
                    type: "error",
                    data: response.data.errMsg,
                    isOpen: true
                }))
                return
            }
            getComments()
        }).catch((err) => {
            dispatch(setAlert({
                type: "error",
                data: "There is been error, please try again",
                isOpen: true
            }))

        })


    }
    return (
        <Stack sx={{
            p: "10px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
                display: "none",
                width: "10px",
                // bgcolor: "transparent"

            },
        }}>
            {data.map((ele, i) => {
                !ele?.isDeleted && <Grid container key={i} sx={{
                    p: "5px",
                    position: "relative",
                    borderRadius: "10px",
                    "&:hover ": {
                        backgroundColor: "#929294",
                    },

                }} >
                    <Grid item >
                        <Avatar src={ele.user_id.profile_photo} />
                    </Grid>
                    <Stack sx={{ pl: "10px", cursor: "pointer" }} onClick={() => redirectComment(ele.comment_id, ele.media_data)}>
                        <Typography sx={{
                            fontSize: "10px"
                        }}>{ele.media_name}</Typography>
                        <Typography sx={{
                            fontSize: "14px"
                        }}>{ele.text}</Typography>
                    </Stack>
                    <IconButton sx={{
                        position: "absolute",
                        right: "10px"
                    }} onClick={() => deleteComment(ele.comment_id)}>
                        <Delete />
                    </IconButton>
                </Grid>
            }

            )}
        </Stack>
    )
}

export default CommentsProfile