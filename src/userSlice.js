import { createSlice } from "@reduxjs/toolkit";
// import tempData from "./tempData.json"


const initialTheme = window.localStorage.getItem("theme")
    ? window.localStorage.getItem("theme") : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"


const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    profile_photo: "",
    playlists: "",
    friends: "",
    pending_requests: "",
    watch_later: "",
    liked: "",
    watched: "",
    shared: "",
    theme: initialTheme,
    mediaIdAndType: "",
    alertBox: {
        type: "",
        data: "",
        isOpen: false,
    },
    isOAuth: false
}



const userSlice = createSlice({

    name: "user",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            // ...state,
            window.localStorage.setItem("theme", action.payload.theme)
            state.theme = action.payload.theme
        },
        setData: (state, action) => {
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.email = action.payload.email
            state.profile_photo = action.payload.profile_photo
            state.playlists = action.payload.playlists
            state.friends = action.payload.friends
            state.pending_requests = action.payload.pending_requests
            state.watch_later = action.payload.watch_later
            state.liked = action.payload.liked
            state.watched = action.payload.watched
            state.shared = action.payload.shared
            state.isOAuth = action.payload.isOAuth
        },
        setMedia: (state, action) => {
            state.mediaIdAndType = action.payload.media
        },
        setAlert: (state, action) => {
            state.alertBox.type = !action.payload.type ? state.alertBox.type : action.payload.type
            state.alertBox.data = !action.payload.data ? state.alertBox.data : action.payload.data
            state.alertBox.isOpen = action.payload.isOpen
        },
        setInitialState: () => {
            return initialState
        }
    }
})

export const { setTheme, setData, setAlert, setInitialState } = userSlice.actions

export const getTheme = (state) => state.user.theme
export const getFirstName = (state) => state.user.first_name
export const getLastName = (state) => state.user.last_name
export const getEmail = (state) => state.user.email
export const getProfilePhoto = (state) => state.user.profile_photo
export const getPlaylists = (state) => state.user.playlists
export const getFriends = (state) => state.user.friends
export const getPending_requests = (state) => state.user.pending_requests
export const getWatch_later = (state) => state.user.watch_later
export const getLiked = (state) => state.user.liked
export const getWatched = (state) => state.user.watched
export const getShared = (state) => state.user.shared
export const getAllData = (state) => state.user
export const getIsOAuth = (state) => state.user.isOAuth

export const getAllPlaylists = (state) => [state.user.playlists, state.user.watch_later, state.user.watched, state.user.liked, state.user.shared]

export const getMediaData = (state) => state.user.mediaIdAndType

export const getAlert = (state) => state.user.alertBox

export default userSlice.reducer