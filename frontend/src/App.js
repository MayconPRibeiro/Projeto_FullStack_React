import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CadastroSeller from './components/CadastroSeller';
import Login from './components/Login';
import VerificarConta from './components/VerificarConta';
import ListagemProdutos from './components/ListagemProdutos';
import CadastroProduto from './components/CadastroProduto';
import EditarProduto from './components/EditarProduto';
import CadastroVenda from './components/CadastroVenda';
import ListagemVendas from './components/ListagemVendas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<CadastroSeller />} />
        <Route path="/verificar" element={<VerificarConta />} />
        <Route path="/dashboard" element={<ListagemProdutos />} />
        <Route path="/produtos/cadastrar" element={<CadastroProduto />} />
        <Route path="/produtos/editar/:id" element={<EditarProduto />} />
        <Route path="/vendas" element={<ListagemVendas />} />
        <Route path="/vendas/cadastrar" element={<CadastroVenda />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;