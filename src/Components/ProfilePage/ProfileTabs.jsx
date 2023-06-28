
import { Button, Divider, Stack, Box } from '@mui/material'
import React, { useState } from 'react'
import Details from './Details'
import PasswordSecurity from './PasswordSecurity'
import FriendDetails from './FriendDetails'
import { useSelector } from 'react-redux'
import { getIsOAuth } from '../../userSlice'

const ProfileTabs = () => {

    const isOAuth = useSelector(getIsOAuth)
    const [current, setCurrent] = useState("details")

    return (
        <Stack sx={{
            bgcolor: "profileTabs.background",
            minHeight: "300px",
            height: "fit-content",
            maxHeight: {
                xxs: "auto",
                sm: "400px"
            },
            borderRadius: "20px"
        }}>
            <Box sx={{ p: "20px 40px 5px 40px" }}>
                <Button sx={{ color: current === "details" ? "profileTabs.activHeading" : "profileTabs.inActivHeading" }} onClick={() => {
                    setCurrent("details")
                }}>
                    Details
                </Button>

                <Button sx={{ color: current === "friend" ? "profileTabs.activHeading" : "profileTabs.inActivHeading" }} onClick={() => {
                    setCurrent("friend")
                }}>
                    Friends
                </Button>
                {!isOAuth && <Button sx={{ color: current === "security" ? "profileTabs.activHeading" : "profileTabs.inActivHeading" }} onClick={() => {
                    setCurrent("security")
                }}>
                    Password & Security
                </Button>}
            </Box>
            <Divider sx={{ color: "profileTabs.divider" }} />

            {current === "details" ? <Details /> : current === "friend" ? <FriendDetails /> : <PasswordSecurity />}
        </Stack>
    )
}

export default ProfileTabs