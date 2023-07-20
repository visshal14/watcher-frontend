import { BookmarkBorder, DarkModeOutlined, ExploreOutlined, FavoriteBorder, HelpOutline, Home, LightModeOutlined, LogoutRounded, Movie, PlaylistPlay, Tv, WatchLaterOutlined } from '@mui/icons-material'
import { Button, Drawer, Box, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, getAllPlaylists, getTheme, setAlert, setInitialState } from '../../userSlice';
import { useNavigate } from 'react-router-dom';


const LeftSideNav = ({ isOpen, openFunc }) => {

    const dispatch = useDispatch()

    const theme = useSelector(getTheme)
    const allPlaylists = useSelector(getAllPlaylists)
    const navigate = useNavigate();
    const themeChange = () => {
        if (theme === "dark") {
            dispatch(setTheme({
                theme: "light"
            }))
        } else {
            dispatch(setTheme({
                theme: "dark"
            }))
        }
    }

    const logout = () => {


        window.localStorage.setItem("accessToken", "")

        dispatch(setInitialState())

        navigate("/")
        dispatch(setAlert({
            type: "success",
            data: "Logout Succesfull",
            isOpen: true
        }))



        openFunc(false)
    }

    return (
        <Drawer
            anchor={"left"}
            open={isOpen}
            onClose={() => { openFunc(false) }}
            sx={{
                zIndex: 1,
                width: "200px",
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: "200px",
                    boxSizing: 'border-box',
                    p: "100px 20px",
                    borderRadius: "0 30px 30px 0",
                    bgcolor: "leftSideNav.background",

                    position: "relative"
                },
            }}
        >
            <Box sx={{
                maxHeight: "100%",
                overflowY: "auto",
            }}>
                <Stack>
                    <Typography color={"leftSideNav.textColor"} fontSize={"13px"}>Menu</Typography>

                    <Box sx={{
                        display: {
                            xxs: "block",
                            xmd: "none"
                        },

                    }}>
                        <Button fullWidth startIcon={<Home />}
                            sx={{
                                justifyContent: "flex-start",
                                color: "leftSideNav.textColor",
                                fontSize: "13px",
                                minHeight: 0
                            }}
                            onClick={() => navigate("/")}
                        >Home</Button>
                        <Button fullWidth startIcon={<Movie />}
                            sx={{
                                justifyContent: "flex-start",
                                color: "leftSideNav.textColor",
                                fontSize: "13px",
                                minHeight: 0
                            }}
                            onClick={() => navigate("/discover/movie")}
                        >Movies</Button>
                        <Button fullWidth startIcon={<Tv />}
                            sx={{
                                justifyContent: "flex-start",
                                color: "leftSideNav.textColor",
                                fontSize: "13px",
                                minHeight: 0
                            }}
                            onClick={() => navigate("/discover/tv")}
                        >TV</Button>
                    </Box>

                    <Button startIcon={<ExploreOutlined />}
                        sx={{
                            justifyContent: "flex-start",
                            color: "leftSideNav.textColor",
                            fontSize: "13px",
                            minHeight: 0
                        }}
                        onClick={() => navigate("/")}
                    >Browser</Button>
                    <Button startIcon={<BookmarkBorder />}
                        sx={{
                            justifyContent: "flex-start",
                            color: "leftSideNav.textColor",
                            fontSize: "13px",
                            minHeight: 0
                        }}>Watch List</Button>

                </Stack>
                <Stack>
                    <Typography color={"leftSideNav.textColor"} fontSize={"13px"} mt={2}>Library</Typography>

                    <Button startIcon={<FavoriteBorder />}
                        onClick={() => navigate("/liked")}
                        sx={{
                            justifyContent: "flex-start",
                            color: "leftSideNav.textColor",
                            fontSize: "13px",
                            minHeight: 0
                        }}

                    >Liked</Button>
                    <Button startIcon={<WatchLaterOutlined />}
                        onClick={() => navigate("/watchlater")}
                        sx={{
                            justifyContent: "flex-start",
                            color: "leftSideNav.textColor",
                            fontSize: "13px",
                            minHeight: 0
                        }}>Watch Later</Button>
                    {allPlaylists[0] && allPlaylists[0]?.map((ele, i) =>
                        <Button key={i} startIcon={<PlaylistPlay />}
                            sx={{
                                justifyContent: "flex-start",
                                color: "leftSideNav.textColor",
                                fontSize: "13px",
                                minHeight: 0
                            }}
                            onClick={() => navigate(`/playlist/${ele.playlist_id}`)}
                        >{ele.name}</Button>
                    )}
                </Stack>
                <Stack>
                    <Typography color={"leftSideNav.textColor"} fontSize={"13px"} mt={2}>General</Typography>

                    <Button startIcon={theme === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
                        sx={{
                            justifyContent: "flex-start",
                            color: "leftSideNav.textColor",
                            fontSize: "13px",
                            minHeight: 0
                        }}
                        onClick={themeChange}>Change Theme</Button>
                    <Button startIcon={<HelpOutline />}
                        sx={{
                            justifyContent: "flex-start",
                            color: "leftSideNav.textColor",
                            fontSize: "13px",
                            minHeight: 0
                        }}
                        href={`mailto:vishalpal2912@gmail.com`}
                    >Help</Button>
                </Stack>
            </Box>
            <Button startIcon={<LogoutRounded />}
                onClick={logout}
                sx={{
                    position: "absolute",
                    bottom: 20,
                    justifyContent: "flex-start",
                    color: "leftSideNav.textColor",
                    fontSize: "13px",
                    minHeight: 0,

                }}>Logout</Button>
        </Drawer>
    )
}
export default LeftSideNav