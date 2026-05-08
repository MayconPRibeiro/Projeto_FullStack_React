import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import './Dashboard.css';

const api = axios.create({ baseURL: 'http://localhost:5000' });
const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
});

function Dashboard() {
    const navigate = useNavigate();
    const [dados, setDados] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) { navigate('/', { replace: true }); return; }
        carregarDashboard();
    }, []);

    const carregarDashboard = async () => {
        try {
            const response = await api.get('/dashboard', getAuthHeader());
            setDados(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                navigate('/');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <>
            <Navbar />
            <div className="dash-loading">
                <div className="dash-spinner" />
                <span>Carregando dashboard...</span>
            </div>
        </>
    );

    if (!dados) return null;

    const { resumo, estoque_baixo, top_produtos, ultimas_vendas } = dados;

    return (
        <>
            <Navbar />
            <div className="dash-container">

                <div className="dash-header">
                    <div>
                        <h1 className="dash-title">Dashboard</h1>
                        <p className="dash-subtitle">Visão geral do seu mercado</p>
                    </div>
                    <button className="dash-btn-refresh" onClick={carregarDashboard}>
                        ↻ Atualizar
                    </button>
                </div>

                {/* Cards de resumo */}
                <div className="dash-cards">
                    <div className="dash-card dash-card--blue">
                        <div className="dash-card-icon">🛍️</div>
                        <div className="dash-card-info">
                            <span className="dash-card-label">Total de Vendas</span>
                            <span className="dash-card-value">{resumo.total_vendas}</span>
                        </div>
                    </div>

                    <div className="dash-card dash-card--green">
                        <div className="dash-card-icon">💰</div>
                        <div className="dash-card-info">
                            <span className="dash-card-label">Faturamento Total</span>
                            <span className="dash-card-value">
                                R$ {Number(resumo.faturamento_total).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <div className="dash-card dash-card--indigo">
                        <div className="dash-card-icon">📦</div>
                        <div className="dash-card-info">
                            <span className="dash-card-label">Produtos Ativos</span>
                            <span className="dash-card-value">{resumo.produtos_ativos}</span>
                        </div>
                    </div>

                    <div className="dash-card dash-card--gray">
                        <div className="dash-card-icon">🚫</div>
                        <div className="dash-card-info">
                            <span className="dash-card-label">Produtos Inativos</span>
                            <span className="dash-card-value">{resumo.produtos_inativos}</span>
                        </div>
                    </div>
                </div>

                <div className="dash-grid">

                    {/* Últimas vendas */}
                    <div className="dash-panel">
                        <h2 className="dash-panel-title">🧾 Últimas Vendas</h2>
                        {ultimas_vendas.length === 0 ? (
                            <p className="dash-empty">Nenhuma venda registrada.</p>
                        ) : (
                            <table className="dash-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Produto</th>
                                        <th>Qtd</th>
                                        <th>Preço Unit.</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ultimas_vendas.map((v) => (
                                        <tr key={v.id}>
                                            <td className="dash-id">#{v.id}</td>
                                            <td>{v.produto}</td>
                                            <td>{v.quantidade}</td>
                                            <td>R$ {Number(v.preco_unitario).toFixed(2)}</td>
                                            <td className="dash-total">R$ {Number(v.total).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        <button className="dash-link" onClick={() => navigate('/vendas')}>
                            Ver todas as vendas →
                        </button>
                    </div>

                    {/* Top produtos */}
                    <div className="dash-panel">
                        <h2 className="dash-panel-title">🏆 Produtos Mais Vendidos</h2>
                        {top_produtos.length === 0 ? (
                            <p className="dash-empty">Nenhuma venda ainda.</p>
                        ) : (
                            <div className="dash-top-list">
                                {top_produtos.map((p, i) => (
                                    <div className="dash-top-item" key={i}>
                                        <div className="dash-top-rank">
                                            {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}º`}
                                        </div>
                                        <div className="dash-top-info">
                                            <span className="dash-top-name">{p.name}</span>
                                            <span className="dash-top-sub">{p.total_vendido} unid. vendidas</span>
                                        </div>
                                        <span className="dash-top-fat">
                                            R$ {Number(p.faturamento).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Estoque baixo */}
                    <div className="dash-panel dash-panel--alert">
                        <h2 className="dash-panel-title">⚠️ Estoque Baixo</h2>
                        {estoque_baixo.length === 0 ? (
                            <p className="dash-empty dash-empty--ok">✅ Todos os produtos com estoque OK.</p>
                        ) : (
                            <div className="dash-alert-list">
                                {estoque_baixo.map((p) => (
                                    <div className="dash-alert-item" key={p.id}>
                                        <div className="dash-alert-info">
                                            <span className="dash-alert-name">{p.name}</span>
                                            <span className="dash-alert-preco">R$ {Number(p.preco).toFixed(2)}</span>
                                        </div>
                                        <span className={`dash-alert-qty ${p.quantidade === 0 ? 'dash-alert-qty--zero' : ''}`}>
                                            {p.quantidade === 0 ? 'SEM ESTOQUE' : `${p.quantidade} un.`}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button className="dash-link" onClick={() => navigate('/produtos')}>
                            Gerenciar produtos →
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Dashboard;