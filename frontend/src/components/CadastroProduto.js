import React, { useState } from 'react';
import { cadastrarProduto } from '../services/produtoService';
import { useNavigate } from 'react-router-dom';
import './CadastroProduto.css';

function CadastroProduto() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        preco: '',
        quantidade: '',
        img: '',
        status: 'Ativo'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await cadastrarProduto(formData);
            alert("Produto cadastrado com sucesso!");
            navigate('/dashboard');
        } catch (error) {
            const mensagem = error.response?.data?.erro || "Erro ao cadastrar produto.";
            alert(mensagem);
        }
    };

    return (
        <div className="cadastro-produto-container">
            <div className="cadastro-produto-card">
                <div className="cadastro-produto-header">
                    <button className="btn-voltar" onClick={() => navigate('/dashboard')}>
                        ← Voltar
                    </button>
                    <h2>Novo Produto</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="campo">
                        <label>Nome do Produto</label>
                        <input
                            name="name"
                            placeholder="Ex: Arroz 5kg"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="campo-row">
                        <div className="campo">
                            <label>Preço (R$)</label>
                            <input
                                name="preco"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="Ex: 29.90"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="campo">
                            <label>Quantidade</label>
                            <input
                                name="quantidade"
                                type="number"
                                min="0"
                                placeholder="Ex: 100"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="campo">
                        <label>URL da Imagem</label>
                        <input
                            name="img"
                            placeholder="https://exemplo.com/imagem.jpg"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label>Status</label>
                        <select name="status" onChange={handleChange} value={formData.status}>
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-salvar">
                        Salvar Produto
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CadastroProduto;