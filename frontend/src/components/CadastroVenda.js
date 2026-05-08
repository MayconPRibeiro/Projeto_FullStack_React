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
        quantidade: '',
        preco_unitario: ''
    });
    const [precoOriginal, setPrecoOriginal] = useState(null);

    useEffect(() => {
        carregarProdutos();
    }, []);

    const carregarProdutos = async () => {
        const response = await listarProdutos();
        setProdutos(response.data.produtos.filter(p => p.status === 'Ativo'));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'produto_id') {
            const produtoSelecionado = produtos.find(p => String(p.id) === value);
            if (produtoSelecionado) {
                setPrecoOriginal(produtoSelecionado.preco);
                setFormData(prev => ({
                    ...prev,
                    produto_id: value,
                    preco_unitario: produtoSelecionado.preco
                }));
            } else {
                setPrecoOriginal(null);
                setFormData(prev => ({ ...prev, produto_id: value, preco_unitario: '' }));
            }
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await cadastrarVenda({
                produto_id: formData.produto_id,
                quantidade: formData.quantidade,
                preco_unitario: formData.preco_unitario
            });
            alert("Venda realizada com sucesso!");
            navigate('/vendas');
        } catch (error) {
            const msg = error.response?.data?.erro || "Erro ao vender";
            alert(msg);
        }
    };

    const isPromocao =
        precoOriginal !== null &&
        formData.preco_unitario !== '' &&
        parseFloat(formData.preco_unitario) !== precoOriginal;

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
                            <select name="produto_id" onChange={handleChange} required>
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

                        <div className="campo">
                            <label>
                                Preço Unitário (R$)
                                {isPromocao && (
                                    <span style={{
                                        marginLeft: '8px',
                                        fontSize: '12px',
                                        color: '#e67e22',
                                        fontWeight: 'bold'
                                    }}>
                                        🏷️ Preço promocional
                                        (original: R$ {Number(precoOriginal).toFixed(2)})
                                    </span>
                                )}
                            </label>
                            <input
                                name="preco_unitario"
                                type="number"
                                step="0.01"
                                min="0.01"
                                value={formData.preco_unitario}
                                onChange={handleChange}
                                placeholder="Preço será preenchido ao selecionar o produto"
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