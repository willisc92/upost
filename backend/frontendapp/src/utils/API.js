import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    responseType: "json",
    headers: !!localStorage.getItem("token") ? { Authorization: `Token ${localStorage.getItem("token")}` } : null
});

export default axiosInstance;
