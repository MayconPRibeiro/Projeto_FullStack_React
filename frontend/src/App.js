import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CadastroSeller from './components/CadastroSeller';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<CadastroSeller />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;