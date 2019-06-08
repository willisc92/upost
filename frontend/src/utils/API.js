import axios from "axios";

const axiosInstance = axios.create({
    //baseURL: "http://127.0.0.1:8080/api/", // for production purposes
    baseURL: "http://upost.mzwhk73mkb.us-west-2.elasticbeanstalk.com/api/", // for deployment purposes
    responseType: "json",
    headers: !!localStorage.getItem("token") ? { Authorization: `Token ${localStorage.getItem("token")}` } : null
});

export default axiosInstance;
