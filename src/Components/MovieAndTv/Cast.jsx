
import { Avatar, Grid, Typography } from '@mui/material'
import knowMore from '../KnowMore'




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
                        p: "5px",
                        cursor: "pointer",
                        "&:hover": {
                            bgcolor: "rgba(0,0,0,0.3)",
                            borderRadius: "5px",
                            transform: "scale(1.04)",
                            transition: "all 0.5s"
                        }
                    }}
                        onClick={() => knowMore(`person/${ele.id}`)}
                    >
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