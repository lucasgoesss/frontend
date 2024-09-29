import React, { useState } from 'react';
import api from '../../config/axiosConfig'; // Importe a instância configurada do Axios
import './sign-up.css'; // Importe o CSS

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            name,
            email,
            password,
        };

        try {
            const response = await api.post('/users', userData);

            if (response.status === 201) {
                console.log('Usuário criado com sucesso:', response.data);
                alert('Usuário criado com sucesso!');
                window.location.href = '/login';
            } else {
                console.error('Erro ao criar usuário:', response.data);
                alert('Erro ao criar usuário: ' + (response.data.message || 'Verifique os dados e tente novamente.'));
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro na requisição. Por favor, tente novamente mais tarde.');
        }
    };

    return (
        <div className="container">
            <div className="logo-sign-up">
                <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13.0635 0.306641L25.7096 7.60782V22.2102L13.0635 29.5114L0.417527 22.2102V7.60782L13.0635 0.306641Z"
                        fill="#065E7C" />
                </svg>
                <h1>food explorer</h1>
            </div>
            <div className="form-container">
                <h2>Crie sua conta</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Seu nome</label>
                        <input type="text" id="name" placeholder="Exemplo: Maria da Silva" value={name} onChange={(e) =>
                            setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Exemplo: exemplo@exemplo.com.br" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" placeholder="No mínimo 6 caracteres" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="register-button">Criar conta</button>
                </form>
                <a href="/sign-in" className="login-link">Já tenho uma conta</a>
            </div>
        </div>
    );
}

export default SignUp;