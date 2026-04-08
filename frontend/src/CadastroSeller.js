import React, { useState } from 'react';
import axios from 'axios';

function CadastroSeller() {
  // Estados para cada campo do seu curl
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    email: '',
    celular: '',
    senha: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Endereço da sua API Flask
      const response = await axios.post('http://localhost:5000/user', formData);
      alert("Seller cadastrado com sucesso!");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar. Verifique o console.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cadastro de Seller (Mercado)</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <input name="nome" placeholder="Nome do Mercado" onChange={handleChange} required />
        <input name="cnpj" placeholder="CNPJ" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="celular" placeholder="Celular" onChange={handleChange} required />
        <input name="senha" type="password" placeholder="Senha" onChange={handleChange} required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroSeller;