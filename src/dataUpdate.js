import { useDispatch } from "react-redux";
import { setData } from "./userSlice";

export const UpdateUserData = (data) => {
    const dispatch = useDispatch()

    dispatch(
        setData({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            profile_photo: data.profile_photo,
            playlists: data.playlists,
            friends: data.friends,
            pending_requests: data.pending_requests,
            watch_later: data.watch_later,
            liked: data.liked,
            watched: data.watched,
            shared: data.shared
        })
    )

}