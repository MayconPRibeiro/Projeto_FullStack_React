import React, { useEffect, useState } from 'react';
import { listarProdutos, inativarProduto } from '../services/produtoService';
import { useNavigate } from 'react-router-dom';
import './ListagemProdutos.css';
import Navbar from '../components/Navbar';

function ListagemProdutos() {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    const carregarProdutos = async () => {
        try {
            const response = await listarProdutos();
            setProdutos(response.data.produtos);
        } catch (error) {
            if (error.response?.status === 401) {
                alert("Sessão expirada. Faça login novamente.");
                navigate('/');
            } else {
                alert("Erro ao carregar produtos.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInativar = async (id) => {
        if (!window.confirm("Deseja inativar este produto?")) return;
        try {
            await inativarProduto(id);
            alert("Produto inativado com sucesso!");
            carregarProdutos();
        } catch (error) {
            const mensagem = error.response?.data?.erro || "Erro ao inativar produto.";
            alert(mensagem);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            navigate('/', { replace: true });
            return;
        }

        carregarProdutos();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Navbar />

            <div className="listagem-container">
                <div className="listagem-header">
                    <h2>Meus Produtos</h2>
                    <div className="listagem-actions">
                        <button
                            className="btn-cadastrar"
                            onClick={() => navigate('/produtos/cadastrar')}
                        >
                            + Novo Produto
                        </button>
                    </div>
                </div>

                {loading ? (
                    <p className="loading">Carregando produtos...</p>
                ) : produtos.length === 0 ? (
                    <p className="vazio">Nenhum produto cadastrado ainda.</p>
                ) : (
                    <div className="produtos-grid">
                        {produtos.map((produto) => (
                            <div
                                key={produto.id}
                                className={`produto-card ${produto.status === 'Inativo' ? 'inativo' : ''}`}
                            >
                                {produto.img && (
                                    <img
                                        src={produto.img}
                                        alt={produto.name}
                                        className="produto-img"
                                    />
                                )}

                                <div className="produto-info">
                                    <h3>{produto.name}</h3>
                                    <p>💰 R$ {Number(produto.preco).toFixed(2)}</p>
                                    <p>📦 Estoque: {produto.quantidade}</p>

                                    <span
                                        className={`badge ${
                                            produto.status === 'Ativo'
                                                ? 'badge-ativo'
                                                : 'badge-inativo'
                                        }`}
                                    >
                                        {produto.status}
                                    </span>
                                </div>

                                <div className="produto-botoes">
                                    <button
                                        className="btn-editar"
                                        onClick={() =>
                                            navigate(`/produtos/editar/${produto.id}`)
                                        }
                                    >
                                        Editar
                                    </button>

                                    {produto.status === 'Ativo' && (
                                        <button
                                            className="btn-inativar"
                                            onClick={() => handleInativar(produto.id)}
                                        >
                                            Inativar
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default ListagemProdutos;