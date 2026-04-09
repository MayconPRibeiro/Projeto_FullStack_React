import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

export const cadastrarSeller = (dados) => api.post('/user', dados);

export const loginSeller = (dados) => api.post('/login', dados);