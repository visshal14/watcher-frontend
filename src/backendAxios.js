import axios from "axios";

const instance = axios.create({

    baseURL: "http://localhost:3001/api/v1",
    // baseURL: "https://watcher-backend.onrender.com/api/v1",
    headers: {
        'authorization': `Bearer ${localStorage.getItem("accessToken")}`,

    }

})


instance.interceptors.request.use(
    (config) => {

        config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
        return config;
    },
    (error) => {
        // console.log("request error", error);
        return Promise.reject(error);
    }
);
export default instance;
