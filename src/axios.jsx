import axios from "axios";

const instance = axios.create({
    baseURL: "https://englishapi.pinkvilla.com/"
})

export default instance