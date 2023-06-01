import { Search } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Avatar, Box, Button, Grid, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import watcherLogo from "../../Assets/watcherlogo.png"
import LeftSideNav from './LeftSideNav'
import RightSideNav from './RightSideNav'
import SearchBar from "./SearchBar"
import { useSelector } from 'react-redux'
import { getFirstName, getProfilePhoto } from '../../userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { setData } from '../../userSlice'
import { useDispatch } from 'react-redux'
import backendAxios from "../../backendAxios"
const Navbar = () => {


    const navigate = useNavigate()

    const firstName = useSelector(getFirstName)
    const profilePhoto = useSelector(getProfilePhoto)
    const [leftDrawerOpen, setLeftDrawerOpen] = useState(false)
    const [rightDrawerOpen, setRightDrawerOpen] = useState(false)

    const [isMobile, setIsMobile] = useState(window.innerWidth < 600 ? true : false)
    const [isSearchBar, setIsSearchBar] = useState(window.innerWidth < 600 ? false : true)

    const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth < 600) {
                setIsMobile(true)
                setIsSearchBar(false)
            } else {
                setIsMobile(false)
                setIsSearchBar(false)
            }

        })
        return () => window.removeEventListener("resize", () => {
        });
    }, [])
    useEffect(() => {
        // console.log(theme)

        if (window.localStorage.getItem("accessToken") === "") {
            return
        }
        backendAxios.get("/getUserData", {
            headers: { 'authorization': `Bearer ${localStorage.getItem("accessToken")}` }
        }).then((response) => {
            let data = response.data
            dispatch(
                setData({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    profile_photo: data.profile_photo,
                    playlists: data.playlists,
                    friends: data.friends,
                    pending_requests: data.pending_request,
                    watch_later: data.watch_later,
                    liked: data.liked,
                    watched: data.watched,
                    shared: data.shared
                })
            )
        })
        // window.location.reload()



        // eslint-disable-next-line
    }, [])



    const searchBarShow = () => {
        if (isSearchBar === false && isMobile) {
            setIsSearchBar(true)
        } else {
            setIsSearchBar(false)
        }

    }
    const loginBtnClicked = () => {
        if (firstName) {
            setRightDrawerOpen(!leftDrawerOpen)
        } else {
            window.location.href = "/login"
        }

    }

    return (

        <Box x={{ flexGrow: 1 }}>


            <AppBar sx={{ zIndex: "9", bgcolor: "navbar.background" }}>
                <Toolbar sx={{
                    justifyContent: "space-between"
                }}>

                    <Grid container alignItems={"center"} sx={{
                        width: {
                            xxs: "100%",
                            xmd: "fit-content"
                        },
                        flexWrap: "nowrap"
                    }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => { setLeftDrawerOpen(!leftDrawerOpen) }}
                        >
                            <MenuIcon sx={{ color: "navbar.leftDrawerToggle" }} />
                        </IconButton>
                        <Link to="/">
                            <img src={watcherLogo} alt="logo" height={"35px"} style={{
                                objectFit: "contain", marginTop: "-5px"
                            }} />
                        </Link>

                        {isMobile ?
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ ml: 1 }}
                                onClick={searchBarShow}
                            >
                                <Search sx={{ color: "navbar.searchBarText" }} />
                            </IconButton>
                            : <SearchBar />}

                    </Grid>

                    <List sx={{
                        display: {
                            xxs: "none",
                            xmd: "flex"
                        },
                        color: "navbar.menuItem"
                    }}>
                        <ListItemButton onClick={() => navigate("/")}>
                            <ListItemText>Home</ListItemText>
                            {/* <ListItemText>Home</ListItemText> */}

                        </ListItemButton>
                        <ListItemButton onClick={() => navigate("/discover/movie")}>
                            <ListItemText>Movies</ListItemText>
                        </ListItemButton>
                        <ListItemButton onClick={() => navigate("/discover/tv")}>
                            <ListItemText>Tv</ListItemText>
                        </ListItemButton>
                    </List>

                    <Button startIcon={<Avatar src={profilePhoto} />}
                        sx={{
                            color: "navbar.menuItem"
                        }}
                        onClick={loginBtnClicked} >
                        <Typography sx={{
                            display: {
                                xxs: "none",
                                xsm: "initial"
                            },
                            // color: "navbar.menuItem"
                        }}>{firstName || "Login"}</Typography>
                    </Button>


                </Toolbar>
                {
                    isSearchBar && isMobile && <SearchBar />
                }

            </AppBar>


            <LeftSideNav isOpen={leftDrawerOpen} openFunc={setLeftDrawerOpen} />
            <RightSideNav isOpen={rightDrawerOpen} openFunc={setRightDrawerOpen} />
            {/* <RightDrawer isOpen={rightDrawerOpen} openFunc={setRightDrawerOpen} /> */}
        </Box>
    )
}








export default Navbar