import React, { useEffect, useState } from 'react'
import { Grid, IconButton } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { getAlert, setAlert, setTheme } from '../../userSlice';
import { getTheme } from '../../userSlice';

import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import EnterEmail from './EnterEmail';
import CheckEmail from './CheckEmail';
import ResetPassword from './ResetPassword';
import PasswordDone from './PasswordDone';
import backendAxios from "../../backendAxios"

const ForgetPassword = () => {

    const alertBox = useSelector(getAlert)
    const dispatch = useDispatch()



    //email //check/ password //done
    // const [element, setElement] = useState("email")
    const { id } = useParams()
    const [email, setEmail] = useState("")

    const navigate = useNavigate()
    useEffect(() => {
        // setElement(id)
        if (id === "email" || id === "check" || id === "done" || id.split("_")[0] === "password") {


        } else {
            navigate("/login")
        }
        if (id === "check") if (alertBox.data !== "Check Your Mail") navigate("/login")
        if (id.split("_").length < 2 && id.split("_")[0] === "password") navigate("/login")
        if (id === "done") if (alertBox.data !== "Password Updated") navigate("/login")
        if (id.split("_")[0] === "password") {

            backendAxios.get('/checkAccessToken', {
                headers: { 'authorization': `Bearer ${id.replace("password_", "")}` }
            })
                .then(function (response) {

                    if (response.data.errMsg || response.data.err) {

                        dispatch(setAlert({
                            type: "error",
                            data: response.data.errMsg || response.data.err,
                            isOpen: true
                        }))
                        return
                        // return alert(response.data.errMsg)
                    }
                    // dispatch(setAlert({
                    //     type: "success",
                    //     data: response.data.msg || response.data,
                    //     isOpen: true
                    // }))
                    // navigate("/forgetpassword/done")
                })
                .catch(function (error) {
                    console.log(error)
                    if (error.code) {
                        dispatch(setAlert({
                            type: "error",
                            data: error.code,
                            isOpen: true
                        }))

                        // return
                        // alert(error.code)
                    }
                    navigate("/login")
                    // console.log("Error in login Frontend: ", error);
                });

        }


        // if (id === "check") {
        //     if (alertBox.data !== "Check Your Mail") {
        //         navigate("/login")
        //     }
        // }

        // eslint-disable-next-line
    }, [id])












    const theme = useSelector(getTheme)
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

    return (
        <Grid container sx={{
            minHeight: "100vh",
            height: { xxs: "fit-content", md: "100vh" }, width: "100vw",
            overflow: "scroll",
            bgcolor: "background.default"
        }}>

            <Helmet>
                <title>Watcher</title>
            </Helmet>

            <Grid item xxs={12} md={6} order={{ xxs: 2, md: 1 }}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 6,
                    px: {
                        xxs: 2,
                        xs: 6,
                    },
                    height: {
                        xxs: "70%",
                        md: "100%",
                    },
                    my: {
                        xxs: 5,
                        md: 0
                    },
                    position: "relative"
                }}
            >

                {id === "email" && <EnterEmail email={email} setEmail={setEmail} />}
                {id === "check" && <CheckEmail email={email} />}
                {id.split("_")[0] === "password" && <ResetPassword id={id.replace("password_", "")} />}
                {id === "done" && <PasswordDone />}












                <IconButton sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0
                }}
                    onClick={themeChange}>

                    {theme === "dark" ? <LightMode /> : <DarkMode />}
                </IconButton>
            </Grid >

            <Grid item order={{ xxs: 1, md: 2 }} xxs={12} md={6}
                sx={{
                    bgcolor: "login.leftPart",
                    minHeight: "200px",
                    height: {
                        xxs: "30%",
                        md: "100%",
                    },

                    borderRadius: {
                        md: "50px 0 0 50px",
                        xxs: "0 0 50px 50px"
                    },
                }} />


        </Grid >
    )

}

export default ForgetPassword


