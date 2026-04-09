import React, { useState } from 'react';
import { loginSeller } from '../services/sellerService';
import './Login.css';
import { useNavigate } from 'react-router-dom';



function Login() {

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginSeller(formData);
            const { access_token } = response.data;

            localStorage.setItem('access_token', access_token);

            alert("Login realizado com sucesso!");
            // redirecionar para o dashboard depois
        } catch (error) {
            if (error.response?.status === 401) {
                alert("Senha inválida.");
            } else if (error.response?.status === 404) {
                alert("Usuário não encontrado.");
            } else if (error.response?.status === 403) {
                alert("Conta não ativada.");
            } else {
                alert("Erro ao fazer login.");
            }
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                    <input name="password" type="password" placeholder="Senha" onChange={handleChange} required />
                    <button type="submit">Entrar</button>
                </form>

                <p className="login-link">
                    Não tem conta?{' '}
                    <span onClick={() => navigate('/cadastro')}>
                        Cadastre-se
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;