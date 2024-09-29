import React, { useState } from 'react';
import api from '../../config/axiosConfig';
import { useNavigate } from 'react-router-dom';
import './sign-in.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginData = {
            email,
            password,
        };

        try {
            const response = await api.post('/sessions/login', loginData);
            if (response.data && response.data.token) {
                const token = response.data.token;

                // Salvar o token no localStorage ou sessionStorage
                localStorage.setItem('token', token);
                localStorage.setItem('isAdmin', response.data.user.is_admin);

                alert('Login realizado com sucesso!');
                navigate("/");
            } else {
                alert('Erro ao fazer login: Token não recebido.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        }
    };

    return (
        <div className="container">
            <div className="logo-sing-in">
                <svg width="30" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13.0635 0.306641L25.7096 7.60782V22.2102L13.0635 29.5114L0.417527 22.2102V7.60782L13.0635 0.306641Z"
                        fill="#065E7C" />
                </svg>
                <h1>Moema Restaurante</h1>
            </div>
            <div className="form-container">
                <h2>Faça login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Exemplo: exemplo@exemplo.com.br" value={email} onChange={(e) =>
                        setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" placeholder="No mínimo 6 caracteres" value={password} onChange={(e) =>
                        setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Entrar</button>
                </form>
                <p><a href="/sign-up" className="login-link">Criar uma conta</a></p>
            </div>
        </div>
    );
}

export default Login;