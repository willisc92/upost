import axios from "axios";

export default axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    responseType: "json"
});

axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
