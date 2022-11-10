import axios from "axios";

const instance = axios.create({
    baseURL:'// http://localhost:5001/fir-challenge-43c34/us-central1/api' // API (cloud function) URL
});

export default instance;