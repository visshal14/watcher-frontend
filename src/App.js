import './App.css';
import { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Login from "./Components/Login/Login"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material';
import Register from './Components/Register/Register';
import Homepage from './Components/Homepage/Homepage';
// import MovieOverviewTip from './Components/MovieOverviewTip';
import Movie from './Components/MovieAndTv/Movie';
import TvDetails from './Components/MovieAndTv/TvDetails';
import Profilepage from './Components/ProfilePage/Profilepage';
import Playlist from './Components/Playlist/Playlist';
import Navbar from './Components/Navbar/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { getTheme } from './userSlice';
import { setTheme } from './userSlice';
import lightMode from "./lightMode.json"
import darkMode from "./darkMode.json"
import WatchLater from './Components/WatchLaterLiked/WatchLater';
import Liked from './Components/WatchLaterLiked/Liked';
import AlertBox from './Components/AlertBox';
import Discover from './Components/Discover/Discover';
import ForgetPassword from './Components/Login/ForgetPassword';


function App() {
  const themeMode = useSelector(getTheme)

  const dispatch = useDispatch()
  useEffect(() => {
    if (window.localStorage.getItem("theme")) {
      dispatch(setTheme({
        theme: window.localStorage.getItem("theme")
      }))
    } else {
      window.localStorage.setItem("theme", themeMode)
    }
    // eslint-disable-next-line
  }, [])

  const themeObj = {
    dark: darkMode,
    light: lightMode
  }

  // eslint-disable-next-line
  const theme = createTheme({
    palette: {
      mode: themeMode,
      ...themeObj[themeMode]
    },
    breakpoints: {
      values: {
        xxs: 0,
        xs: 300, // phone
        xsm: 450,
        sm: 600, // tablets
        xmd: 800,
        md: 900, // small laptop
        lg: 1200, // desktop
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Navbar /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>
            <Navbar />
            <Outlet />
          </>}>
            <Route path="/" element={<Homepage />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/tv/:id" element={<TvDetails />} />
            <Route exact path="/profile" element={<Profilepage />} />
            <Route exact path="/playlist/:id" element={<Playlist />} />
            <Route path="/watchlater" element={<WatchLater />} />
            <Route path="/liked" element={<Liked />} />
            <Route path="/discover/:type" element={<Discover />} />
            {/* <Route exact path="/addmenu" element={<AddMenu />} /> */}
          </Route>
          {/* <Route exact path="/m" element={<MovieOverviewTip />} /> */}
          <Route exact path="/login" element={<Login />} />
          <Route path="/forgetpassword/:id" element={<ForgetPassword />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <AlertBox />
    </ThemeProvider>
  );
}

export default App;
