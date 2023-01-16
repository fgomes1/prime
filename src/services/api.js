import axios from 'axios';
//URL BASE http://api.themoviedb.org/3/
//URL DETALHADA movie/now_playing?api_key=ecfabb023e1fafcbd30e14f6f29fbf8f

const api = axios.create({
    baseURL: 'http://api.themoviedb.org/3/'
})

export default api;
