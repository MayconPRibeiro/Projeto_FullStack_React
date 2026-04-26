import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
});

export const listarVendas = () => api.get('/venda', getAuthHeader());

export const cadastrarVenda = (dados) => api.post('/venda', dados, getAuthHeader());