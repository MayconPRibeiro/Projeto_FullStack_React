import React, { useState } from 'react';
import { verificarToken } from '../services/sellerService';
import { useNavigate, useLocation } from 'react-router-dom';
import './VerificarConta.css';

function VerificarConta() {
    const navigate = useNavigate();
    const location = useLocation();

    // Pega o email passado pelo Login.js via navigate('/verificar', { state: { email } })
    const [formData, setFormData] = useState({
        email: location.state?.email || '',
        token: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await verificarToken(formData);
            alert("Conta ativada com sucesso! Faça login.");
            navigate('/');
        } catch (error) {
            const mensagem = error.response?.data?.erro || "Token inválido. Tente novamente.";
            alert(mensagem);
        }
    };

    return (
        <div className="verificar-container">
            <div className="verificar-card">
                <h2>Verificar Conta</h2>
                <p>Digite o código que você recebeu no WhatsApp.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Seu email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="token"
                        placeholder="Código de verificação"
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Verificar</button>
                </form>
                <p className="verificar-link">
                    Já verificou? <span onClick={() => navigate('/')}>Entrar</span>
                </p>
            </div>
        </div>
    );
}

export default VerificarConta;