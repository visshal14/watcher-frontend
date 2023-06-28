import React from 'react'
import { Box, Button, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const PasswordDone = () => {
    const navigate = useNavigate()



    return (


        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center"
            }}>
            <Typography component="h1" variant='h3' sx={{

                fontWeight: "bold",
                fontSize: {
                    xxs: 25,
                    sm: 30,
                    md: 40
                },
                color: "login.mainText"
            }} >
                Password Reset
            </Typography>
            <Typography component="h3" variant='h5' sx={{
                mt: 1,
                wordWrap: "wrap",
                fontSize: {
                    xxs: 10,
                    sm: 12
                },
                color: "login.secondaryText"
            }}>

                Your Password has been successfully rest click
                Below to log in


            </Typography>

            <Box
                sx={{ textAlign: "center" }}>

                <Button type="submit"
                    fullWidth
                    variant='contained'
                    sx={{
                        color: "login.signButtonText",
                        bgcolor: "login.signButton",
                        mt: 3,
                        mb: 0.5,
                        borderRadius: "10px",
                        fontSize: "15px",
                        "&:hover ": {
                            backgroundColor: "login.signButton",
                            transform: "scale(1.01)"
                        },
                    }}
                    onClick={() => navigate("/login")}
                >
                    Sign in
                </Button>




                {/* <div id="signId"></div> */}
            </Box>
        </Box>

    )
}

export default PasswordDone