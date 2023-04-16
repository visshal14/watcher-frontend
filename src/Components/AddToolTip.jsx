import { Box, Button } from '@mui/material'
import React from 'react'

const AddToolTip = React.forwardRef(() => {

    const playlist = [{
        name: "watched"
    }, {
        name: "Watchlater"
    }, {
        name: "playlist 1"
    },
    {
        name: "playlist 2"
    },
    {
        name: "playlist 3"
    }]


    return (

        <Box sx={{ width: "fit-content" }}>
            {playlist.map((ele) =>
                <Button fullWidth sx={{
                    color: "white", fontSize: {
                        xxs: "10px",
                        md: "0.875rem"
                    },
                    padding: {
                        xxs: "2px 6px",
                        xs: "3px 8px",
                        sm: "6px 16px"
                    }
                }}>{`Add To ${ele.name}`}</Button>)}
        </Box>
    )
})

export default AddToolTip