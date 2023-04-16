import { Snackbar, Alert } from '@mui/material'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAlert, setAlert } from '../userSlice'
const AlertBox = () => {


    const data = useSelector(getAlert)
    const dispatch = useDispatch()
    // useEffect(() => {
    //     console.log(data)
    // }, [data])
    // useEffect(() => {
    //     // console.log(action + "   " + data + "   " + type)

    //     setOpen(action)
    // }, [action])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAlert({
            isOpen: false
        }))
    };

    return (

        <Snackbar
            open={data?.isOpen}
            autoHideDuration={4000}
            onClose={handleClose}
        >
            {data?.type === "success" ?
                <Alert severity="success" sx={{ width: '100%' }}>{data?.data}</Alert>
                :
                <Alert severity="error" sx={{ width: '100%' }}>{data?.data}</Alert>}

        </Snackbar>


    )
}

export default AlertBox