import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CadastroSeller from './components/CadastroSeller';
import Login from './components/Login';
import VerificarConta from './components/VerificarConta';
import ListagemProdutos from './components/ListagemProdutos';
import CadastroProduto from './components/CadastroProduto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<CadastroSeller />} />
        <Route path="/verificar" element={<VerificarConta />} />
        <Route path="/dashboard" element={<ListagemProdutos />} />
        <Route path="/produtos/cadastrar" element={<CadastroProduto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;