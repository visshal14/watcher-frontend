
import { Avatar, Grid, Typography } from '@mui/material'




const Cast = ({ cast }) => {
    return (

        <Grid item sm={4} pl={1} xxs={12}>
            <Typography sx={{ fontSize: "15px", mb: "10px" }} color={"movieTv.smCastColor"}  >Cast</Typography>

            <Grid container alignItems={"flex-start"} flexWrap={"nowrap"} overflow={"scroll"} sx={{
                "&::-webkit-scrollbar": {
                    display: "none"
                },
            }}>

                {cast?.map((ele, i) => (
                    <Grid key={i} sx={{
                        width: "60px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "0 5px"
                    }}  >
                        <Avatar src={ele.profile_path ? `https://image.tmdb.org/t/p/original${ele.profile_path}` : ""}
                            sx={{
                                width: {
                                    xxs: "30px",
                                    md: "40px"
                                },
                                height: {
                                    xxs: "30px",
                                    md: "40px"
                                }
                            }}
                        />
                        <Typography sx={{
                            fontSize: {
                                xxs: "9px",
                                md: "12px"
                            },

                        }} color={"movieTv.smCastColor"} >{ele.original_name}</Typography>
                    </Grid>

                ))}

            </Grid>
        </Grid>
    )
}

export default Cast