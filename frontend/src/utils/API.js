import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/", // for production purposes (seperate django and react servers)
    //baseURL: "http://127.0.0.1:8080/api/", // for local deployment purposes (waitress)
    //baseURL: "http://upost-env.z9ame8dp78.us-west-2.elasticbeanstalk.com/api/", // for deployment purposes (AWS)
    responseType: "json"
});

export default axiosInstance;

export const setAuthToken = (token) => {
    axiosInstance.defaults.headers.common["Authorization"] = "";
    delete axiosInstance.defaults.headers.common["Authorization"];
    if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Token ${token}`;
    }
};

export const setContentToForm = () => {
    axiosInstance.defaults.headers.common["Content-Type"] = "multipart/form-data";
};

export const resetContentType = () => {
    axiosInstance.defaults.headers.common["Content-Type"] = "";
    delete axiosInstance.defaults.headers.common["Content-Type"];
};
