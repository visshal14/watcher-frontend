import { Box, Grid, Stack, Typography, Pagination, Tooltip, Select, MenuItem, OutlinedInput } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { apiKey } from '../../tmdb'
import axios from 'axios'
import { Helmet } from "react-helmet";
import AddMenu from '../AddMenu'
import MovieOverviewTip from '../MovieOverviewTip'
import knowMore from '../KnowMore'
const Search = () => {



    const [searchParams] = useSearchParams()
    const [movieData, setMovieData] = useState([])
    const navigate = useNavigate()

    // eslint-disable-next-line
    const [page, setPage] = useState(1)
    const [type, setType] = useState(searchParams.get("type") || "multi")
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1)
    const [query, setQuery] = useState(searchParams.get("query"))
    const [totalPages, setTotalPages] = useState(0)


    useEffect(() => {
        if (!query) {
            navigate(navigate(`/discover/all?page=1`))
        }

        setCurrentPage(parseInt(searchParams.get('page')))
        setType(searchParams.get("type") || "multi")
        setQuery(searchParams.get("query"))
        // eslint-disable-next-line
    }, [searchParams])



    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, [type, query, currentPage])

    async function getData() {
        const url = `https://api.themoviedb.org/3/search/${type}?query=${query}&api_key=${apiKey}&language=en-US&include_adult=false&page=${currentPage}`
        // console.log(url)
        axios.get(url).then((response) => {
            setMovieData(response.data.results)
            setTotalPages(response.data.total_pages > 100 ? 100 : response.data.total_pages)
        }).catch((e) => {

        })


    }




    const pageChange = (e, value) => {
        setPage(value)
        navigate(`/search?type=${type}&query=${query}&page=${value}`)
    }





    const resetFilter = () => {
        navigate(`/discover/all?page=1`)
    }

    const typeChanged = (e) => {
        setType(e.target.value)
    }


    return (
        <Stack px={{
            xxs: 1,
            sm: 5,
            md: 8
        }} py={10}>

            <Helmet>
                <title>Watcher|Search</title>
            </Helmet>
            <Grid container>
                <Select

                    displayEmpty
                    value={type}
                    onChange={typeChanged}
                    input={<OutlinedInput />}
                    // MenuProps={MenuProps}
                    renderValue={(type) => <Grid container>

                        <Typography sx={{

                            fontSize: "25px",
                            lineHeight: 1,
                            padding: "2px 10px",
                            fontWeight: 600,

                        }}>  Type</Typography>

                        <Typography sx={{
                            textTransform: "capitalize",
                            ml: 3,
                            lineHeight: 1.7,
                            fontSize: "15px",
                            bgcolor: "#fcba4e",
                            padding: "2px 20px",
                            borderRadius: "20px",
                            color: "#484848",
                            fontWeight: 700,

                        }}>  {type}</Typography>
                    </Grid>
                    }


                    sx={{

                        "& .MuiSelect-select": {
                            padding: 0,

                            minHeight: "0 !important",
                            paddingRight: "0 !important"
                        },

                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "discover.buttonBorder",
                        },
                        "& .MuiOutlinedInput-notchedOutline:focus": {
                            borderColor: "discover.buttonBorder",
                        },
                        '&.Mui-focused fieldset': {
                            border: 'none !important',
                        },
                        "& .MuiSelect-iconOutlined": {
                            display: "none"
                        },
                        // "&:hover": {
                        //     border: "none",
                        //     borderColor: "transparent"
                        // },
                        m: 1,
                        width: "fit-content",
                        border: "1px solid",
                        borderColor: "discover.buttonBorder",
                        borderRadius: "50px",
                        padding: "0.25rem 5px 0.25rem 1rem",
                        color: "discover.buttonFore"
                    }}

                >
                    <MenuItem value="multi">Multi</MenuItem>
                    <MenuItem value="movie">Movie</MenuItem>
                    <MenuItem value="tv">Tv</MenuItem>
                    <MenuItem value="person">Person</MenuItem>

                </Select>

            </Grid >
            <Grid container >
                {movieData && movieData.length !== 0 ? movieData?.map((ele, i) => <SingleTiles key={i} data={ele} type={type} />
                ) :
                    <Grid container mt={3} justifyContent={"center"}>
                        <Typography onClick={resetFilter}> No Data Found. Click here To reset the filter </Typography>
                    </Grid>
                }
            </Grid>
            <Grid container justifyContent={"center"} sx={{
                mt: 5
            }}>
                <Pagination count={totalPages} page={currentPage} onChange={pageChange} size="large" />
            </Grid>
        </Stack >
    )
}







export const SingleTiles = ({ data, discoverBackground, type }) => {

    return (
        <Grid item xxs={6} sm={4} md={2} lg={1.5} sx={{
            maxWidth: "200px",
            minWidth: "100px",
            borderRadius: 1,
            position: "relative",
            cursor: "pointer",
            scrollSnapAlign: "start",
        }} p={1}>

            {data?.id && <AddMenu mt="8px" mr="8px" id={`${data?.first_air_date ? "tv" : "movie"}/${data.id}`} name={data?.name || data?.title || data?.original_title} />}
            <Tooltip title={<MovieOverviewTip ele={data} bgcolor={"red"} type={`${data?.first_air_date ? "tv" : "movie"}`} />} enterDelay={500} placement="right">
                <Box p={1} sx={{
                    borderRadius: 1,
                    bgcolor: discoverBackground || "discover.tilesBack",
                    color: "discover.color",
                    width: "100%",
                    height: "100%",

                }}
                    onClick={() => knowMore(`${type !== "multi" ? type : data?.media_type ? data?.media_type : data?.first_air_date ? "tv" : "movie"}/${data.id}`)}
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
                        <Typography sx={{ width: "fit-content", display: "inline-block", border: "1px solid #fcba4e", padding: "0 0.25rem", borderRadius: "0.25rem" }}>{type !== "multi" ? type : data?.media_type ? data?.media_type : data?.first_air_date ? "TV" : "Movie"}</Typography>
                    </Grid>

                </Box>
            </Tooltip>


        </Grid >
    )
}

export default Search



