import axios from "axios";

const instance = axios.create({

    baseURL: "http://localhost:3001/api/v1",
    // baseURL: "https://watcher-backend.onrender.com/api/v1",
    headers: { 'authorization': `Bearer ${localStorage.getItem("accessToken")}` }
    // baseURL: "https://eduquiz001.onrender.com"
})
export default instance;
