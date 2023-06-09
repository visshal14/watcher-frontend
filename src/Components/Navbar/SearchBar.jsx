import { Clear, Search } from '@mui/icons-material'
import { TextField, Box, InputAdornment, Stack, Grid, Typography, ClickAwayListener, IconButton } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import knowMore from '../KnowMore'
import { apiKey } from '../../tmdb'
const SearchBar = () => {



    const [value, setValue] = useState("")

    const [data, setData] = useState([])

    useEffect(() => {
        // setValue(value.replace(" ", "+"))
        setData([])
        var timer = setTimeout(() => {
            axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${value}`).then((response) => {

                if (response.data.results.lenght > 5) {
                    for (let i = 0; i < 5; i++) {
                        setData(prev => [...prev, response.data.results[i]])
                    }
                } else {
                    setData(response.data.results)
                }
            })
        }, 500)
        return () => {
            clearTimeout(timer)
        }


    }, [value])



    return (
        <Box sx={{

            // maxWidth: "350px",
            minWidth: {
                xxs: "47px",
                xmd: "300px",
                md: "400px"
            },
            mx: {
                xxs: "0px",
                sm: "20px"
            },
            px: {
                xxs: "20px",
                sm: "0px"
            },
            width: {
                xxs: "100%",
                xmd: "auto"
            },
            position: "relative"
        }}>
            <TextField fullWidth id="outlined-basic" variant="outlined" placeholder='Search' autoFocus
                value={value}
                onChange={(e) => { setValue(e.target.value) }}
                sx={{
                    "&.MuiInputBase-input-MuiOutlinedInput-input": {
                        padding: "7px 0",
                        fontSize: "12px",
                        color: "navbar.searchBarText",
                    },
                    borderRadius: value !== "" ? " 20px 20px 0 0" : "50px",
                    bgcolor: "navbar.searchBarBackground",
                    fontSize: "14px",
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "2px ",
                        borderStyle: "solid",
                        borderColor: "navbar.searchBarOutline",
                        borderRadius: value !== "" ? " 20px 20px 0 0" : "50px",

                    },

                    width: "100%",
                    mr: "10px",
                    mb: {
                        xxs: value ? "0px" : "10px",
                        sm: "0"
                    },
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderWidth: "2px ",
                            borderStyle: "solid",
                            borderColor: "navbar.searchBarOutline",
                        }
                    },


                }}

                InputProps={{
                    sx: {
                        input: {
                            padding: "7px 10px",
                            fontSize: "15px",
                            color: "navbar.searchBarText",
                        },
                        "input:focus": {
                            outline: 0
                        }

                    },
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search sx={{ color: "navbar.searchBarOutline" }} />
                        </InputAdornment>

                    ),
                    endAdornment: (
                        <InputAdornment position="start">
                            {value && <IconButton>
                                <Clear sx={{ color: "navbar.searchBarOutline" }} />
                            </IconButton>}
                        </InputAdornment>

                    ),
                }}
            />

            <ClickAwayListener onClickAway={() => setValue("")}>
                <Stack sx={{
                    position: "absolute",
                    width: {
                        xxs: "calc(100% - 40px)",
                        sm: "100%"
                    },
                    // height: "100px",
                    bgcolor: "navbar.searchBarBackground",
                    top: "100%",
                    // bottom: { xxs: "-90px", sm: "-100px" },
                    left: 0,
                    ml: {
                        xxs: "20px",
                        sm: "0px"
                    },
                    p: 1,
                    display: value !== "" ? "block" : "none",
                    maxHeight: "400px",
                    borderRadius: "0 0 20px 20px",
                    overflowY: "auto",
                    "&::-webkit-scrollbar": {
                        display: "none"
                    },
                    borderWidth: "2px ",
                    borderStyle: "solid",
                    borderColor: "navbar.searchBarOutline",
                    borderTop: "none"
                }}
                    spacing={1}
                >

                    {data?.map((ele, i) =>

                        <Grid flexWrap="nowrap" key={"grid" + i} id={`${ele.media_type}/${ele.id}`} container onClick={() => knowMore(`${ele.media_type}/${ele.id}`)} bgcolor={"grey.400"}
                            sx={{
                                height: "140px",
                                borderRadius: "10px",
                                p: 1,
                                bgcolor: "navbar.searchBarGrid",
                                color: "navbar.searchBarText"
                            }}
                        >
                            {ele?.poster_path && <Grid item sx={{
                                height: "100%",
                                width: "auto",
                                mr: "8px"
                            }}>
                                <img src={"https://image.tmdb.org/t/p/original" + ele?.poster_path} alt="moviePoster" style={{ height: "100%", objectFit: "cover", maxWidth: "100%", borderRadius: "5px" }} />
                            </Grid>}
                            <Grid container
                                // sx={{ maxWidth: ele?.poster_path ? "70%" : "100%" }}
                                flexDirection={"column"} justifyContent={"space-between"}>
                                <Typography sx={{
                                    // wordBreak: "break-all"

                                }}>{ele?.name || ele?.title || ele?.original_title}</Typography>
                                <Grid container justifyContent={"space-between"}>
                                    <Typography sx={{ width: "fit-content", pr: 1, display: "inline-block" }}>{ele?.first_air_date?.split("-")[0] || ele?.release_date?.split("-")[0]}</Typography>
                                    <Typography sx={{ width: "fit-content", display: "inline-block", border: "1px solid #fcba4e", padding: "0 0.25rem", borderRadius: "0.25rem" }}>{ele?.media_type}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                    )}







                </Stack>
            </ClickAwayListener>


        </Box>

    )
}

export default SearchBar