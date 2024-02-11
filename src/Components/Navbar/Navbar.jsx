import { Search } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Avatar, Box, Button, Grid, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import watcherLogo from "../../Assets/watcherlogo.png"
import LeftSideNav from './LeftSideNav'
import RightSideNav from './RightSideNav'
import SearchBar from "./SearchBar"
import { useSelector } from 'react-redux'
import { getFirstName, getProfilePhoto, setAlert } from '../../userSlice'
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



    // useEffect(() => {
    //     // console.log("Search Bar :" + isSearchBar)
    // }, [isSearchBar])

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


    const getUserData = () => {

        if (window.localStorage.getItem("accessToken") === null || window.localStorage.getItem("accessToken") === "") {
            return
        }
        backendAxios.get("/getUserData", {
            headers: { 'authorization': `Bearer ${localStorage.getItem("accessToken")}` }
        }).then((response) => {
            if (response.data.errMsg) {
                dispatch(setAlert({
                    type: "error",
                    data: response.data.errMsg,
                    isOpen: true
                }))
                return
            }

            // // console.log(data)
            dispatch(setData(response.data))
        }).catch((e) => {
            // // console.log("navbar Error 72")
            // // console.log(e)
            dispatch(setAlert({
                type: "error",
                data: "There is been error, please try again",
                isOpen: true
            }))

        })
    }


    useEffect(() => {
        getUserData()
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
            navigate("/login")
        }
    }

    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{
                zIndex: "9",
                // marginTop: "env(safe-area-inset-top)",
                paddingTop: "env(safe-area-inset-top)",
                bgcolor: "navbar.background",
                minHeight: {
                    xxs: "calc(56px + env(safe-area-inset-top))",
                    sm: "calc(64px + env(safe-area-inset-top))"
                },

            }}>
                <Toolbar sx={{
                    justifyContent: "space-between",
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

                            <Avatar src={watcherLogo} variant="square" alt="logo" sx={{ height: 35, objectFit: "contain", marginTop: "-5px" }} />

                            {/* <img src={watcherLogo} alt="logo" height={"35px"} style={{
                                objectFit: "contain", marginTop: "-5px"
                            }} /> */}
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
                        <ListItemButton
                            sx={{
                                "&:hover": {
                                    borderRadius: "0.5rem"
                                }
                            }}
                            onClick={() => navigate("/")}>
                            <ListItemText>Home</ListItemText>
                            {/* <ListItemText>Home</ListItemText> */}

                        </ListItemButton>
                        <ListItemButton sx={{
                            "&:hover": {
                                borderRadius: "0.5rem"
                            }
                        }} onClick={() => navigate("/discover/movie?page=1")}>
                            <ListItemText>Movies</ListItemText>
                        </ListItemButton>
                        <ListItemButton sx={{
                            "&:hover": {
                                borderRadius: "0.5rem"
                            }
                        }} onClick={() => navigate("/discover/tv?page=1")}>
                            <ListItemText>TV</ListItemText>
                        </ListItemButton>
                    </List>

                    <Button startIcon={<Avatar src={profilePhoto} />}
                        sx={{
                            "& .MuiButton-startIcon": {
                                marginRight: "0px"
                            },
                            color: "navbar.menuItem",
                            "&:hover": {
                                borderRadius: "0.5rem"
                            },
                            minWidth: 0,
                            padding: "0"
                        }}
                        onClick={loginBtnClicked} >
                        <Typography sx={{
                            display: {
                                xxs: "none",
                                xsm: "initial"
                            },
                            ml: 1
                            // color: "navbar.menuItem"
                        }}>{firstName || "Login"}</Typography>
                    </Button>


                </Toolbar>
                {
                    isSearchBar && isMobile && <SearchBar closeFunc={searchBarShow} isMobile />
                }

            </AppBar>


            <LeftSideNav isOpen={leftDrawerOpen} openFunc={setLeftDrawerOpen} />
            <RightSideNav isOpen={rightDrawerOpen} openFunc={setRightDrawerOpen} />
            {/* <RightDrawer isOpen={rightDrawerOpen} openFunc={setRightDrawerOpen} /> */}
        </Box>
    )
}







export default Navbar