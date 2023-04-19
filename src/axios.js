import axios from "axios";

const instance = axios.create({
    baseURL: "https://matterbay.cyclic.app/"
})

export default instance