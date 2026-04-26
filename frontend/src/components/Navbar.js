import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={() => navigate('/dashboard')}>
                Gestão de Estoque
            </div>

            <div className="navbar-links">
                <button onClick={() => navigate('/dashboard')}>
                    Produtos
                </button>

                <button onClick={() => navigate('/vendas')}>
                    Vendas
                </button>

                <button className="logout" onClick={handleLogout}>
                    Sair
                </button>
            </div>
        </nav>
    );
}

export default Navbar;