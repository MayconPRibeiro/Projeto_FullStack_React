import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
});

export const listarProdutos = () => api.get('/product', getAuthHeader());

export const buscarProduto = (id) => api.get(`/product/${id}`, getAuthHeader());

export const cadastrarProduto = (dados) => api.post('/product', dados, getAuthHeader());

export const atualizarProduto = (id, dados) => api.put(`/product/${id}`, dados, getAuthHeader());

export const inativarProduto = (id) => api.patch(`/product/${id}`, {}, getAuthHeader());