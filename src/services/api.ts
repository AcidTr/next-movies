import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    headers: {
        'Content-Type': 'application/json',
    },

});

console.log(process.env.NEXT_PUBLIC_TMDB_API_KEY)

api.interceptors.request.use((request) => {
    request.params = request.params || {};
    request.params['api_key'] = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    request.params['language'] = 'pt-BR';
    return request;
});


export default api;
