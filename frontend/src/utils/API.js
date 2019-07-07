import axios from "axios";

const axiosInstance = axios.create({
    baseURL: APILink + "/api",
    responseType: "json"
});

axiosInstance.defaults.xsrfCookieName = "csrftoken";
axiosInstance.defaults.xsrfHeaderName = "X-CSRFToken";

export default axiosInstance;

export const setAuthToken = (token) => {
    axiosInstance.defaults.headers.common["Authorization"] = "";
    delete axiosInstance.defaults.headers.common["Authorization"];
    if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
};

export const setContentToForm = () => {
    axiosInstance.defaults.headers.common["Content-Type"] = "multipart/form-data";
};

export const resetContentType = () => {
    axiosInstance.defaults.headers.common["Content-Type"] = "";
    delete axiosInstance.defaults.headers.common["Content-Type"];
};
