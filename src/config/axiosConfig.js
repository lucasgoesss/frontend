import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// Crie uma instância do Axios
const api = axios.create({
    baseURL: backendUrl, // URL do backend que você definiu no .env
});

// Interceptor para adicionar o token nas requisições
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // ou sessionStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor para lidar com erros de resposta
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            // Lógica para deslogar o usuário ou renovar o token
            console.log('Usuário não autorizado. Token inválido ou expirado.');
        }
        return Promise.reject(error);
    }
);

export default api;
