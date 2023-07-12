
import React from 'react'
import { Box, Button, Typography, Link } from '@mui/material';
import { ArrowBackIosNewRounded, } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CheckEmail = ({ email }) => {
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
                Check Your Email
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
                We sent a password rest link to <br></br>
                {email}
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
                    onClick={() => navigate("/forgetpassword/email")}
                >
                    Didn't receive the email? Click To resend
                </Button>
                <Link href="/login" component="a" sx={{
                    mt: 1,
                    wordWrap: "wrap",
                    fontSize: {
                        xxs: 10,
                        sm: 12
                    },
                    ml: 1,
                    color: "login.secondaryText",
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <ArrowBackIosNewRounded sx={{ fontSize: 10, mr: 1 }} /> Back to Sign in
                </Link>
            </Box>
        </Box>

    )
}

export default CheckEmail