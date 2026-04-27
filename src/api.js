import axios from "axios";

export const getApi = () => axios.create({
    baseURL: "http://localhost:8001/api",
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    timeout: 45000,
});