import React, { useEffect, useState } from 'react';
import { buscarProduto, atualizarProduto } from '../services/produtoService';
import { useNavigate, useParams } from 'react-router-dom';
import './CadastroProduto.css'; // pode reaproveitar o mesmo CSS

function EditarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        preco: '',
        quantidade: '',
        img: '',
        status: 'Ativo'
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarProduto();
    }, []);

    const carregarProduto = async () => {
        try {
            const response = await buscarProduto(id);
            setFormData(response.data.produto);
        } catch (error) {
            alert("Erro ao carregar produto");
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await atualizarProduto(id, formData);
            alert("Produto atualizado com sucesso!");
            navigate('/dashboard');
        } catch (error) {
            const mensagem = error.response?.data?.erro || "Erro ao atualizar produto.";
            alert(mensagem);
        }
    };

    if (loading) return <p>Carregando...</p>;

    return (
        <div className="cadastro-produto-container">
            <div className="cadastro-produto-card">
                <div className="cadastro-produto-header">
                    <button className="btn-voltar" onClick={() => navigate('/dashboard')}>
                        ← Voltar
                    </button>
                    <h2>Editar Produto</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="campo">
                        <label>Nome do Produto</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="campo-row">
                        <div className="campo">
                            <label>Preço</label>
                            <input
                                name="preco"
                                type="number"
                                value={formData.preco}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="campo">
                            <label>Quantidade</label>
                            <input
                                name="quantidade"
                                type="number"
                                value={formData.quantidade}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="campo">
                        <label>Imagem</label>
                        <input
                            name="img"
                            value={formData.img}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label>Status</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-salvar">
                        Salvar Alterações
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditarProduto;