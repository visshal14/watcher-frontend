import { useEffect, lazy, Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './Components/Navbar/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { getTheme } from './userSlice';
import { setTheme } from './userSlice';
import lightMode from "./lightMode.json"
import darkMode from "./darkMode.json"
import LoadingComponent from './Components/LoadingComponent';



const Login = lazy(() => import('./Components/Login/Login'));
const Homepage = lazy(() => import('./Components/Homepage/Homepage'));
const Movie = lazy(() => import('./Components/MovieAndTv/Movie'));
const TvDetails = lazy(() => import('./Components/MovieAndTv/TvDetails'));
const Profilepage = lazy(() => import('./Components/ProfilePage/Profilepage'));
const WatchLater = lazy(() => import('./Components/WatchLaterLiked/WatchLater'));
const Liked = lazy(() => import('./Components/WatchLaterLiked/Liked'));
const AlertBox = lazy(() => import('./Components/AlertBox'));
const Playlist = lazy(() => import('./Components/Playlist/Playlist'));
const Discover = lazy(() => import('./Components/Discover/Discover'));
const ForgetPassword = lazy(() => import('./Components/Login/ForgetPassword'));
const Register = lazy(() => import('./Components/Register/Register'));
const Person = lazy(() => import("./Components/Person/Person"))
const Search = lazy(() => import("./Components/Search/Search"))

function App() {
  const themeMode = useSelector(getTheme)

  const dispatch = useDispatch()
  useEffect(() => {




    if (window.localStorage.getItem("theme")) {
      dispatch(setTheme({
        theme: window.localStorage.getItem("theme")
      }))
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        window.localStorage.setItem("theme", "dark")
        dispatch(setTheme({
          theme: "dark"
        }))
      } else {
        window.localStorage.setItem("theme", "light")
        dispatch(setTheme({
          theme: "light"
        }))
      }

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
        xmd: 830,
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
            <Route path="/" element={
              <Suspense fallback={<LoadingComponent />}>
                <Homepage />
              </Suspense>} />

            <Route path="/movie/:id" element={
              <Suspense fallback={<LoadingComponent />}>
                <Movie />
              </Suspense>} />

            <Route path="/tv/:id" element={
              <Suspense fallback={<LoadingComponent />}>
                <TvDetails />
              </Suspense>} >

              <Route path="season/:epino" element={
                <Suspense fallback={<LoadingComponent />}>
                  <TvDetails />
                </Suspense>} />

            </Route>

            <Route exact path="/profile" element={
              <Suspense fallback={<LoadingComponent />}>
                <Profilepage />
              </Suspense>} />

            <Route exact path="/playlist/:id" element={<Suspense fallback={<LoadingComponent />}>
              <Playlist />
            </Suspense>} />

            <Route path="/watchlater" element={
              <Suspense fallback={<LoadingComponent />}>
                <WatchLater />
              </Suspense>} />

            <Route path="/liked" element={
              <Suspense fallback={<LoadingComponent />}>
                <Liked />
              </Suspense>} />

            <Route path="/discover/:type" element={
              <Suspense fallback={<LoadingComponent />}>
                <Discover />
              </Suspense>} />
            <Route path="/search" element={
              <Suspense fallback={<LoadingComponent />}>
                <Search />
              </Suspense>} />


            <Route path="/person/:id" element={
              <Suspense fallback={<LoadingComponent />}>
                <Person />
              </Suspense>} />


          </Route>

          <Route exact path="/login" element={<Suspense fallback={<LoadingComponent />}>
            <Login />
          </Suspense>} />

          <Route path="/forgetpassword/:id" element={<Suspense fallback={<LoadingComponent />}>
            <ForgetPassword />
          </Suspense>} />

          <Route exact path="/register" element={
            <Suspense fallback={<LoadingComponent />}>
              <Register />
            </Suspense>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>



        {/* <Routes path="/temp" element={<TempPrivate/>}>
            <Route path="dashboard" element={<TempPrivateComponent/>}/>
          </Routes> */}

      </BrowserRouter>
      <AlertBox />
    </ThemeProvider>
  );
}

// const TempPrivateComponent = ()=>{
//   return<>TempPrivateComponent</>
// }
// const TempPrivate = ()=>{



//   useEffect(()=>{
//     if(localStorage.getItem("accessToken")){
//       return <Outlet/>
//     }else{
//       Navigate("?")
//     }
//   },[])
//   return <>TempPrivate</>
// }

export default App;
