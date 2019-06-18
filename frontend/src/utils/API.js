import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/", // for production purposes (seperate django and react servers)
    //baseURL: "http://127.0.0.1:8080/api/", // for local deployment purposes (waitress)
    //baseURL: "http://upost-env.z9ame8dp78.us-west-2.elasticbeanstalk.com/api/", // for deployment purposes (AWS)
    responseType: "json",
    headers: !!localStorage.getItem("token") ? { Authorization: `Token ${localStorage.getItem("token")}` } : null
});

export const APIwForm = axios.create({
    baseURL: "http://127.0.0.1:8000/api/", // for production purposes (seperate django and react servers)
    //baseURL: "http://127.0.0.1:8080/api/", // for local deployment purposes (waitress)
    //baseURL: "http://upost-env.z9ame8dp78.us-west-2.elasticbeanstalk.com/api/", // for deployment purposes (AWS)
    responseType: "json",
    headers: !!localStorage.getItem("token")
        ? { Authorization: `Token ${localStorage.getItem("token")}`, "content-type": "multipart/form-data" }
        : null
});

export default axiosInstance;
