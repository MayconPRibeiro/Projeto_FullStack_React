import React, { useEffect, useState } from 'react';
import { cadastrarVenda } from '../services/vendaService';
import { listarProdutos } from '../services/produtoService';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './CadastroProduto.css';

function CadastroVenda() {
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState([]);
    const [formData, setFormData] = useState({
        produto_id: '',
        quantidade: ''
    });

    useEffect(() => {
        carregarProdutos();
    }, []);

    const carregarProdutos = async () => {
        const response = await listarProdutos();
        setProdutos(response.data.produtos.filter(p => p.status === 'Ativo'));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await cadastrarVenda(formData);
            alert("Venda realizada com sucesso!");
            navigate('/vendas');
        } catch (error) {
            const msg = error.response?.data?.erro || "Erro ao vender";
            alert(msg);
        }
    };

    return (
        <>
            <Navbar />

            <div className="cadastro-produto-container">
                <div className="cadastro-produto-card">
                    <button className="btn-voltar" onClick={() => navigate('/vendas')}>
                        ← Voltar
                    </button>
                    <h2>Nova Venda</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="campo">
                            <label>Produto</label>
                            <select
                                name="produto_id"
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione</option>
                                {produtos.map(p => (
                                    <option key={p.id} value={p.id}>
                                        {p.name} (Estoque: {p.quantidade})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="campo">
                            <label>Quantidade</label>
                            <input
                                name="quantidade"
                                type="number"
                                min="1"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button className="btn-salvar">
                            Salvar Venda
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CadastroVenda;