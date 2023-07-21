import { Box, Button, FormControlLabel, Checkbox, Grid, Menu, Stack, Typography, Pagination, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import countryList from "./countryList.json"
import movieGenres from "./movieGenres.json"
import tvGenres from "./tvGenres.json"
import allGenres from "./allGenres.json"
import { apiKey } from '../../tmdb'
import axios from 'axios'
import { Helmet } from "react-helmet";
import AddMenu from '../AddMenu'
import MovieOverviewTip from '../MovieOverviewTip'
import knowMore from '../KnowMore'
import { Close, FilterAlt } from '@mui/icons-material'
const Discover = () => {

    const { type } = useParams()
    const [genres, setGenres] = useState("")
    const [country, setcountry] = useState("")
    // eslint-disable-next-line
    const [mediaType, setMediaType] = useState(type)
    const [searchParams] = useSearchParams()
    const [movieData, setMovieData] = useState([])
    const [page, setPage] = useState(1)
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1)


    let pageNo = searchParams.get('page')
    let genre = searchParams.get('genre')
    let countryParams = searchParams.get('country')
    const [genresList, setGenresList] = useState()
    useEffect(() => {
        setGenresList(mediaType === "movie" ? movieGenres : mediaType === "tv" ? tvGenres : allGenres)
    }, [mediaType])






    useEffect(() => {

        setMediaType(type)
        clearAllGenreCountry("genre")
        getData(pageNo, genre, countryParams)
        setGenres(genre || "")
        setcountry(countryParams || "")
        setCurrentPage(parseInt(searchParams.get('page')) || 1)
        // eslint-disable-next-line
    }, [searchParams, type])




    async function getData(pageNo, genre, country) {
        let date = new Date()
        const todayDate = date.getFullYear() + "-" + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`) + "-" + date.getDate()
        const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&primary_release_date.lte=${todayDate}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNo || 1}&with_watch_monetization_types=flatrate${genre ? `&with_genres=${genre}` : ""}${country ? `&with_origin_country=${country}` : ""}`
        if (type === "all") {
            let tvGenres = []
            let movieGenres = []

            let sameButDifferent = [{
                movie: "28",
                tv: "10759"
            }, {
                movie: "10752",
                tv: "10768"
            }, {
                movie: "878",
                tv: "10765"
            }, {
                movie: "14",
                tv: "10765"
            }, {
                movie: "12",
                tv: "10759"
            }]

            let bothSame = ["16", "35", "80", "99", "18", "10751", "9648", "37"]
            let uniqueTv = ["10762", "10764", "10766", "10767", "10763"]
            let uniqueMovie = ["36", "27", "10402", "10749", "10770", "53"]

            let tempGenres = genre?.split(",")
            tempGenres?.forEach(ele => {

                if (uniqueMovie.includes(ele)) {
                    movieGenres.push(ele)
                } else if (uniqueTv.includes(ele)) {

                    tvGenres.push(ele)
                } else if (bothSame.includes(ele)) {

                    movieGenres.push(ele)
                    tvGenres.push(ele)
                } else {
                    sameButDifferent.forEach((i) => {
                        if (i.movie === ele || i.tv === ele) {
                            // console.log(ele)
                            movieGenres.push(i.movie)
                            tvGenres.push(i.tv)
                        }
                    })
                }
            });



            const tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNo}&with_watch_monetization_types=flatrate${tvGenres ? `&with_genres=${tvGenres.join(",")}` : ""}${country ? `&with_origin_country=${country}` : ""}`


            const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNo}&with_watch_monetization_types=flatrate${movieGenres ? `&with_genres=${movieGenres.join(",")}` : ""}${country ? `&with_origin_country=${country}` : ""}`



            let tv = []
            let movie = []

            setMovieData()
            await axios.get(movieUrl).then((response) => {
                if (response.data.results.length > 1) movie = response.data.results
            }).catch((e) => {
                // console.log("error in axios ", e)
            })
            await axios.get(tvUrl).then((response) => {
                if (response.data.results.length > 1) tv = response.data.results
            }).catch((e) => {
                // console.log("error in axios ", e)
            })

            let result = []
            for (let i = 0; i < 20; i++) {
                if (movie[i]) result.push(movie[i])
                if (tv[i]) result.push(tv[i])
            }
            setMovieData(result)
        } else {
            axios.get(url).then((response) => {
                setMovieData(response.data.results)
            }).catch((e) => {
                // console.log("error in axios ", e)
            })
        }
    }








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




    const pageChange = (e, value) => {
        setPage(value)
        navigate(`/discover/${mediaType}?page=${value}${genres ? `&genre=${genres}` : ""}${country ? `&country=${country}` : ""}`)
    }


    const filterClicked = () => {
        navigate(`/discover/${mediaType}?page=${page}${genres ? `&genre=${genres}` : ""}${country ? `&country=${country}` : ""}`)
    }

    const clearAllGenreCountry = (data) => {
        data === "genre" || data === "genres" ? setGenres("") : setcountry("")
    }


    const resetFilter = () => {
        navigate(`/discover/${mediaType}?page=1`)
    }

    return (
        <Stack px={{
            xxs: 1,
            sm: 5,
            md: 8
        }} py={10} sx={{
            minHeight: "700px"
        }}>

            <Helmet>
                <title>Watcher | Discover</title>
            </Helmet>
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
                <GenresPopover anchorEl={anchorEl} handleClose={handleClose} genres={genres} removeFun={clearAllGenreCountry} checkBoxFunc={genreCheckBox} list={genresList} />
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
                        // border: "1px solid white",
                        bgcolor: "discover.filterBack",
                        borderRadius: "50px",
                        padding: "0.25rem 1rem",
                        color: "discover.filterFore",
                        fontWeight: 700,
                        "&:hover": {
                            bgcolor: "discover.filterFore",
                            color: "discover.filterBack"
                        }
                    }}
                    endIcon={<FilterAlt />}
                >
                    Filter
                </Button>

            </Grid>
            <Grid container >
                {movieData && movieData.length !== 0 ? movieData?.map((ele, i) => <SingleTiles key={i} data={ele} />
                ) :
                    <Grid container mt={3} justifyContent={"center"}>
                        <Typography onClick={resetFilter}> No Data Found. Click here To reset the filter </Typography>
                    </Grid>
                }
            </Grid>
            <Grid container justifyContent={"center"} sx={{
                mt: 5
            }}>
                <Pagination count={100} page={currentPage} onChange={pageChange} size="large" />
            </Grid>
        </Stack>
    )
}


const CountryPopover = ({ anchorEl, handleClose, countries, removeFun, checkBoxFunc }) => {
    countries = countries?.split(",")
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

                },
                "&::-webkit-scrollbar": {
                    display: "none"
                },
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
                    minWidth: "150px",
                }} size="small" control={<Checkbox onChange={checkBoxFunc} value={ele.iso_3166_1} checked={countries?.includes(`${ele.iso_3166_1}`)} sx={{
                    p: 0,
                    bgColor: "white"
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


const GenresPopover = ({ anchorEl, handleClose, genres, removeFun, checkBoxFunc, list }) => {
    genres = genres?.split(",")
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

            {list?.map((ele, i) =>
                <FormControlLabel key={i} sx={{
                    ml: 0,
                    "& .MuiFormControlLabel-label": {
                        fontSize: "12px"
                    },
                    minWidth: "130px"
                }} control={<Checkbox onChange={checkBoxFunc} style={{
                    color: "#ffffff",
                }} value={ele.id} checked={genres?.includes(`${ele.id}`)} />} label={ele.name} />
            )}
        </Menu>
    )
}

export const SingleTiles = ({ data, discoverBackground }) => {

    return (
        <Grid item xxs={6} sm={4} md={2} lg={1.5} sx={{
            maxWidth: "200px",
            minWidth: "150px",
            borderRadius: 1,
            position: "relative",
            cursor: "pointer",
            scrollSnapAlign: "start",
        }} p={1}>

            {data?.id && <AddMenu mt="8px" mr="8px" id={`${data?.first_air_date ? "tv" : "movie"}/${data.id}`} name={data?.name || data?.title || data?.original_title} />}
            <Tooltip componentsProps={{
                tooltip: {
                    sx: {
                        p: 1,
                        bgcolor: "toolTip.background"
                    },
                },
            }} title={<MovieOverviewTip ele={data} bgcolor={"red"} type={`${data?.first_air_date ? "tv" : "movie"}`} />} enterDelay={500} placement="right">
                <Box p={1} sx={{
                    borderRadius: 1,
                    bgcolor: discoverBackground || "discover.tilesBack",
                    color: "discover.color",
                    width: "100%",
                    height: "100%",

                }}
                    onClick={() => knowMore(`${data?.first_air_date ? "tv" : "movie"}/${data.id}`)}
                >
                    <img src={`https://image.tmdb.org/t/p/original${data?.poster_path}`} loading="lazy" style={{ height: "auto", width: "100%", objectFit: "contain", borderRadius: "8px" }} alt="poster" />
                    <Typography sx={{
                        width: "100%",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                    }}>
                        {data?.title || data?.original_title || data?.name}
                    </Typography>
                    <Grid container justifyContent={"space-between"}>
                        <Typography >
                            {data?.release_date?.split("-")[0] || data?.first_air_date?.split("-")[0]}
                        </Typography>
                        <Typography sx={{ width: "fit-content", display: "inline-block", border: "1px solid #fcba4e", padding: "0 0.25rem", borderRadius: "0.25rem" }}>{data?.media_type ? data?.media_type : data?.first_air_date ? "TV" : "Movie"}</Typography>
                    </Grid>

                </Box>
            </Tooltip>


        </Grid >
    )
}

export default Discover



