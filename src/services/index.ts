import axios from "axios";

const instance = axios.create({
    baseURL: `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`,
});

export default instance