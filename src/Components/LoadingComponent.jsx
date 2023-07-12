import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const LoadingComponent = () => {


    const [loadingDot, setLoadingCount] = useState([])

    useEffect(() => {
        const timeInterval = setInterval(() => {
            if (loadingDot.length > 6) {
                setLoadingCount(".")
            } else {
                setLoadingCount(l => l + ".")
            }
        }, 200)

        return () => {
            clearInterval(timeInterval)
        }
    }, [loadingDot])

    return (
        <Grid container justifyContent={"center"} alignContent={"center"} sx={{
            width: "100vw",
            height: "100vh"
        }}>
            <Box sx={{
                textAlign: "center"
            }}>
                <CircularProgress sx={{ color: "login.mainText" }} />
                <Typography sx={{ color: "login.mainText" }}>Loading{loadingDot}</Typography>
            </Box>
        </Grid>
    )
}

export default LoadingComponent