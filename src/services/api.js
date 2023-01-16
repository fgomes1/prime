import axios from 'axios';
//URL BASE http://api.themoviedb.org/3/


const api = axios.create({
    baseURL: 'http://api.themoviedb.org/3/'
})

export default api;
