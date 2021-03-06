import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json',
    },

});


api.interceptors.request.use((request) => {
    request.params = request.params || {};
    request.params['api_key'] = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
    request.params['language'] = 'pt-BR';
    return request;
});


export default api;
