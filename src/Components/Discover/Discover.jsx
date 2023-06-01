
import { Box, Button, FormControlLabel, Checkbox, Grid, Menu, Stack, Typography, Pagination, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import countryList from "./countryList.json"
import movieGenres from "./movieGenres.json"
import { apiKey } from '../../tmdb'
import axios from 'axios'
import AddMenu from '../AddMenu'
import MovieOverviewTip from '../MovieOverviewTip'
import knowMore from '../KnowMore'
import { Close } from '@mui/icons-material'
const Discover = () => {

    const { type } = useParams()
    const [genres, setGenres] = useState("")
    const [country, setcountry] = useState("")
    // eslint-disable-next-line
    const [mediaType, setMediaType] = useState(type)

    const genreCheckBox = (e) => {
        let tempGenres = genres
        if (genres === "" && e.currentTarget.checked) {
            setGenres(e.currentTarget.value)
        } else if (e.currentTarget.checked) {
            setGenres(`${genres},${e.currentTarget.value}`)
        } else if (!e.currentTarget.checked && tempGenres.split(",")[0] === e.currentTarget.value && tempGenres.split(",").length > 1) {
            setGenres(genres.replace(`${e.currentTarget.value},`, ""))
        } else if (!e.currentTarget.checked && genres.split(",").length > 1) {
            setGenres(genres.replace(`,${e.currentTarget.value}`, ""))
        } else {
            setGenres("")
        }
    }



    const typeCheckBox = (e) => {

        if (e.currentTarget.checked) {
            if (mediaType !== "" && mediaType !== e.currentTarget.value) {
                setMediaType("all")
            } else {
                setMediaType(e.currentTarget.value)
            }
        } else {
            if (mediaType === "") {
                mediaType("all")
            } else {

                e.currentTarget.value === "movie" ? setMediaType("tv") : setMediaType("movie")
            }
        }


    }


    // useEffect(() => {
    //     console.log(mediaType + "   mediaType")
    // }, [mediaType])


    const countryCheckBox = (e) => {
        let tempCountry = country

        if (country === "" && e.currentTarget.checked) {
            setcountry(e.currentTarget.value)
        } else if (e.currentTarget.checked) {
            setcountry(`${country},${e.currentTarget.value}`)
        } else if (!e.currentTarget.checked && tempCountry.split(",")[0] === e.currentTarget.value && tempCountry.split(",").length > 1) {
            setcountry(country.replace(`${e.currentTarget.value},`, ""))
        } else if (!e.currentTarget.checked && tempCountry.split(",").length > 1) {
            setcountry(country.replace(`,${e.currentTarget.value}`, ""))
        } else {
            setcountry("")
        }
    }


    // useEffect(() => {

    //     console.log(country)

    // }, [mediaType, genres, country])

    // const movieData = {
    //     "adult": false,
    //     "backdrop_path": "/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
    //     "genre_ids": [
    //         16,
    //         12,
    //         10751,
    //         14,
    //         35
    //     ],
    //     "id": 502356,
    //     "original_language": "en",
    //     "original_title": "The Super Mario Bros",
    //     "overview": "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.",
    //     "popularity": 10312.202,
    //     "poster_path": "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    //     "release_date": "2023-04-05",
    //     "title": "The Super Mario Bros. Movie",
    //     "video": false,
    //     "vote_average": 7.6,
    //     "vote_count": 823
    // }

    // const tvData = {
    //     "backdrop_path": "/nYJRdNtrT8nYdoXHJboNFGWwS5z.jpg",
    //     "first_air_date": "2019-10-18",
    //     "genre_ids": [
    //         99
    //     ],
    //     "id": 94667,
    //     "name": "Traveling with the Derbez",
    //     "origin_country": [
    //         "MX"
    //     ],
    //     "no_of_seasons": 2,
    //     "no_of_episodes": 18,
    //     "original_language": "es",
    //     "original_name": "De viaje con los Derbez",
    //     "overview": "The series revolves around the Derbez family on their trip to Morocco, the family is made up of Eugenio Derbez, the patriarch of the family, Alessandra Rosaldo, his wife, Aitana Derbez, their daughter, Vadhir and José Eduardo Derbez, their children, and Aislinn Derbez, his eldest daughter. , along with Mauricio Ochmann and his daughter Kailani.",
    //     "popularity": 325.982,
    //     "poster_path": "/eBbRM16FR79GfpMsd5pXwm36J3s.jpg",
    //     "vote_average": 7.5,
    //     "vote_count": 1233
    // }
    const [anchorEl, setAnchorEl] = useState([{
        genre: null,
        type: null,
        country: null,
        year: null
    }]);
    const handleClick = (type) => (event) => {
        let array = [...anchorEl];
        array[type] = event.currentTarget
        setAnchorEl(array);


    };
    const handleClose = (type) => () => {
        let array = [...anchorEl];
        array[type] = null
        setAnchorEl(array);

    };



    const [movieData, setMovieData] = useState([])
    const [page, setPage] = useState(1)
    const pageChange = (e, value) => {
        setPage(value)
    }
    useEffect(() => {
        filterClicked()
        // eslint-disable-next-line
    }, [page])
    useEffect(() => {
        setMediaType(type)

        // eslint-disable-next-line
    }, [type])
    const navigate = useNavigate()
    useEffect(() => {
        filterClicked()

        if (mediaType === "all") {
            navigate("/discover/all")
        } else if (mediaType === "movie") {
            navigate("/discover/movie")

        } else if (mediaType === "tv") {
            navigate("/discover/tv")

        }
        // eslint-disable-next-line
    }, [mediaType])

    useEffect(() => {
        // console.log(mediaType)
        // const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
        const url = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate${genres ? `&with_genres=${genres}` : ""}${country ? `&with_origin_country=${country}` : ""}`



        if (mediaType === "all") {
            async function temp() {
                let tv = []
                let movie = []
                const tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate${genres ? `&with_genres=${genres}` : ""}${country ? `&with_origin_country=${country}` : ""}`
                const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate${genres ? `&with_genres=${genres}` : ""}${country ? `&with_origin_country=${country}` : ""}`
                setMovieData()
                await axios.get(movieUrl).then((response) => {
                    movie.push(response.data.results)
                }).catch((e) => {
                    console.log("error in axios ", e)
                })
                await axios.get(tvUrl).then((response) => {
                    tv.push(response.data.results)
                }).catch((e) => {
                    console.log("error in axios ", e)
                })

                let result = []
                for (let i = 0; i < 20; i++) {
                    result.push(movie[0][i])
                    result.push(tv[0][i])
                }
                setMovieData(result)
            }
            temp()
        } else {

            axios.get(url).then((response) => {
                setMovieData(response.data.results)
            }).catch((e) => {
                console.log("error in axios ", e)
            })
        }



        // eslint-disable-next-line
    }, [])




    const filterClicked = () => {
        // console.log(page)
        const url = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate${genres ? `&with_genres=${genres}` : ""}${country ? `&with_origin_country=${country}` : ""}`



        if (mediaType === "all") {
            async function temp() {
                let tv = []
                let movie = []
                const tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate${genres ? `&with_genres=${genres}` : ""}${country ? `&with_origin_country=${country}` : ""}`
                const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate${genres ? `&with_genres=${genres}` : ""}${country ? `&with_origin_country=${country}` : ""}`
                setMovieData()
                await axios.get(movieUrl).then((response) => {
                    movie.push(response.data.results)
                }).catch((e) => {
                    console.log("error in axios ", e)
                })
                await axios.get(tvUrl).then((response) => {
                    tv.push(response.data.results)
                }).catch((e) => {
                    console.log("error in axios ", e)
                })

                let result = []
                for (let i = 0; i < 20; i++) {
                    result.push(movie[0][i])
                    result.push(tv[0][i])
                }
                setMovieData(result)
            }
            temp()
        } else {

            axios.get(url).then((response) => {
                setMovieData(response.data.results)
            }).catch((e) => {
                console.log("error in axios ", e)
            })
        }
        // setPage(1)
        // console.log("filterClicked")
    }

    const clearAllGenreCountry = (data) => {
        data === "genre" ? setGenres("") : setcountry("")
    }

    return (
        <Stack px={{
            xxs: 2,
            xsm: 5
        }} py={10}>

            <Grid container>
                <Button
                    onClick={handleClick("genre")}
                    sx={{
                        m: 1,
                        width: "fit-content",
                        border: "1px solid ",
                        borderColor: "discover.buttonBorder",
                        borderRadius: "50px",
                        padding: "0.25rem 1rem",
                        color: "discover.buttonFore"
                    }}
                >
                    Genres {genres && <Typography sx={{
                        ml: 3,
                        fontSize: "10px",
                        bgcolor: "#fcba4e",
                        padding: "2px 10px",
                        borderRadius: "10px",
                        color: "#484848",
                        fontWeight: 700,
                        mr: "-0.5rem"
                    }}>  {genres ? `${genres.split(",").length} selected` : ""}</Typography>}
                </Button>
                <GenresPopover anchorEl={anchorEl} handleClose={handleClose} genres={genres} removeFun={clearAllGenreCountry} checkBoxFunc={genreCheckBox} />
                {/* type */}
                <Button
                    onClick={handleClick("type")}
                    sx={{
                        m: 1,
                        width: "fit-content",
                        border: "1px solid ",
                        borderColor: "discover.buttonBorder",
                        borderRadius: "50px",
                        padding: "0.25rem 1rem",
                        color: "discover.buttonFore"
                    }}
                >
                    Type {mediaType && <Typography sx={{
                        ml: 3,
                        fontSize: "10px",
                        bgcolor: "#fcba4e",
                        padding: "2px 10px",
                        borderRadius: "10px",
                        color: "#484848",
                        fontWeight: 700,
                        mr: "-0.5rem"
                    }}>  {mediaType}</Typography>}
                </Button>
                <TypePopover anchorEl={anchorEl} handleClose={handleClose} type={mediaType} checkBoxFunc={typeCheckBox} />
                {/* country */}
                <Button
                    onClick={handleClick("country")}
                    sx={{
                        m: 1,
                        width: "fit-content",
                        border: "1px solid ",
                        borderColor: "discover.buttonBorder",
                        borderRadius: "50px",
                        padding: "0.25rem 1rem",
                        color: "discover.buttonFore"
                    }}
                >
                    Country {country && <Typography sx={{
                        ml: 3,
                        fontSize: "10px",
                        bgcolor: "#fcba4e",
                        padding: "2px 10px",
                        borderRadius: "10px",
                        color: "#484848",
                        fontWeight: 700,
                        mr: "-0.5rem"
                    }}>  {country ? `${country.split(",").length} selected` : ""}</Typography>}
                </Button>
                <CountryPopover anchorEl={anchorEl} handleClose={handleClose} countries={country} removeFun={clearAllGenreCountry} checkBoxFunc={countryCheckBox} />
                <Button
                    onClick={filterClicked}
                    sx={{
                        m: 1,
                        width: "fit-content",
                        border: "1px solid white",
                        bgcolor: "discover.filterBack",
                        borderRadius: "50px",
                        padding: "0.25rem 1rem",
                        color: "discover.filterFore"
                    }}
                >
                    Submit
                </Button>

            </Grid>


            <Grid container >
                {movieData?.map((ele, i) =>
                    <SingleTiles key={i} data={ele} />
                )}
            </Grid>
            <Grid container justifyContent={"center"} sx={{
                mt: 5
            }}>
                <Pagination count={100} onChange={pageChange} size="large" />
            </Grid>
        </Stack>
    )
}


const CountryPopover = ({ anchorEl, handleClose, countries, removeFun, checkBoxFunc }) => {
    countries = countries?.split(",")
    // console.log(countries)
    return (
        <Menu
            anchorEl={anchorEl["country"]}
            open={anchorEl["country"] ? true : false}
            onClose={handleClose("country")}
            sx={{
                minWidth: "250px",
                maxWidth: "600px",
                "& .MuiPopover-paper": {
                    p: 2,

                }
            }}
        >
            <Button fullWidth startIcon={<Close />}
                sx={{
                    color: "discover.buttonBorder"
                }}
                onClick={() => removeFun("country")}
            >Clear all</Button>

            {countryList?.map((ele, i) =>
                <FormControlLabel key={i} sx={{
                    ml: 0,
                    "& .MuiFormControlLabel-label": {
                        fontSize: "12px"
                    },
                    minWidth: "150px"
                }} size="small" control={<Checkbox onChange={checkBoxFunc} value={ele.iso_3166_1} checked={countries?.includes(`${ele.iso_3166_1}`)} sx={{
                    p: 0
                }} />} label={ele.english_name} />
            )}
        </Menu>
    )
}


const TypePopover = ({ anchorEl, handleClose, type, checkBoxFunc }) => {


    return (
        <Menu
            anchorEl={anchorEl["type"]}
            open={anchorEl["type"] ? true : false}
            onClose={handleClose("type")}
            sx={{
                minWidth: "250px",
                maxWidth: "400px",
                p: 1
            }}
        >
            <FormControlLabel sx={{ ml: 0 }} control={<Checkbox onChange={checkBoxFunc} value={"movie"} checked={type === "all" || type === "movie"} />} label={"Movies"} />
            <FormControlLabel sx={{ ml: 0 }} control={<Checkbox onChange={checkBoxFunc} value={"tv"} checked={type === "all" || type === "tv"} />} label={"Tv-Series"} />

        </Menu>
    )
}


const GenresPopover = ({ anchorEl, handleClose, genres, removeFun, checkBoxFunc }) => {

    genres = genres.split(",")


    return (
        <Menu
            anchorEl={anchorEl["genre"]}
            open={anchorEl["genre"] ? true : false}
            onClose={handleClose("genre")}
            sx={{
                minWidth: "250px",
                maxWidth: "500px",
                p: 1
            }}
        >
            <Button fullWidth startIcon={<Close />}
                sx={{
                    color: "discover.buttonBorder"
                }}
                onClick={() => removeFun("genre")}
            >Clear all</Button>

            {movieGenres?.map((ele, i) =>
                <FormControlLabel key={i} sx={{
                    ml: 0,
                    "& .MuiFormControlLabel-label": {
                        fontSize: "12px"
                    },
                    minWidth: "130px"
                }} control={<Checkbox onChange={checkBoxFunc} value={ele.id} checked={genres.includes(`${ele.id}`)} />} label={ele.name} />
            )}
        </Menu>
    )
}

const SingleTiles = ({ data }) => {
    // console.log(data)
    // console.log()
    return (
        <Grid item xxs={6} sm={4} md={2} lg={1.5} sx={{
            maxWidth: "200px",
            minWidth: "100px",
            // m: 0.5,

            borderRadius: 1,
            position: "relative"
            // bgcolor: "grey"
        }} p={1}>

            <AddMenu mt="8px" mr="8px" id={`${data?.first_air_date ? "tv" : "movie"}/${data.id}`} />
            <Tooltip title={<MovieOverviewTip ele={data} bgcolor={"red"} type={`${data?.first_air_date ? "tv" : "movie"}`} />} enterDelay={500} placement="right">


                <Box p={1} sx={{
                    borderRadius: 1,
                    bgcolor: "discover.tilesBack",
                    color: "discover.color",
                    width: "100%",
                    height: "100%",

                }}

                    onClick={() => knowMore(`${data?.first_air_date ? "tv" : "movie"}/${data.id}`)}
                >

                    <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} style={{ height: "auto", width: "100%", objectFit: "contain", borderRadius: "8px" }} alt="poster" />
                    <Typography sx={{
                        width: "100%",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                    }}>
                        {data.original_title || data.name}
                    </Typography>
                    <Grid container justifyContent={"space-between"}>
                        <Typography >
                            {data.release_date?.split("-")[0] || data?.first_air_date?.split("-")[0]}
                        </Typography>
                        <Typography>
                            {data?.first_air_date ? "Tv" : "Movie"}
                        </Typography>
                    </Grid>

                </Box>
            </Tooltip>


        </Grid>
    )
}

export default Discover