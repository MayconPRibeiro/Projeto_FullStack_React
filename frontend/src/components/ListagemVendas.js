import React, { useEffect, useState } from 'react';
import { listarVendas } from '../services/vendaService';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './ListagemProdutos.css';

function ListagemVendas() {
    const navigate = useNavigate();
    const [vendas, setVendas] = useState([]);

    useEffect(() => {
        carregar();
    }, []);

    const carregar = async () => {
        try {
            const res = await listarVendas();
            setVendas(res.data.vendas);
        } catch {
            alert("Erro ao carregar vendas");
        }
    };

    return (
        <>
            <Navbar />

            <div className="listagem-container">
                <div className="listagem-header">
                    <h2>Vendas</h2>

                    <button
                        className="btn-cadastrar"
                        onClick={() => navigate('/vendas/cadastrar')}
                    >
                        + Nova Venda
                    </button>
                </div>

                {vendas.length === 0 ? (
                    <p className="vazio">Nenhuma venda ainda.</p>
                ) : (
                    <div className="produtos-grid">
                        {vendas.map(v => (
                            <div key={v.id} className="produto-card">
                                <h3>Venda #{v.id}</h3>
                                <p>📦 Produto ID: {v.produto_id}</p>
                                <p>Quantidade: {v.quantidade}</p>
                                <p>💰 R$ {Number(v.preco_unitario).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default ListagemVendas;