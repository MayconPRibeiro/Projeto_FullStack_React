import React, { useState } from 'react';
import { cadastrarSeller } from '../services/sellerService';
import './CadastroSeller.css';
import { useNavigate } from 'react-router-dom';



function CadastroSeller() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', cnpj: '', email: '', celular: '', password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await cadastrarSeller(formData);
    alert("Seller cadastrado com sucesso! Verifique o WhatsApp para ativar sua conta.");
    navigate('/');
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    // Pega a mensagem exata que vem do backend
    const mensagem = error.response?.data?.erro || "Erro ao cadastrar. Tente novamente.";
    alert(mensagem);
  }
};

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h2>Cadastro de Seller</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Nome do Mercado" onChange={handleChange} required />
          <input name="cnpj" placeholder="CNPJ" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="celular" placeholder="Celular" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Senha" onChange={handleChange} required />
          <button type="submit">Cadastrar</button>
        </form>
        <p className="cadastro-link">
          Já tem conta?{' '}
          <span onClick={() => navigate('/')}>
            Entrar
          </span>
        </p>
      </div>
    </div>
  );
}

export default CadastroSeller;