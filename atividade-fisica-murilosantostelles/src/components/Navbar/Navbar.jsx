import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Navbar.css'

function Navbar() {
    const { usuario, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/dashboard">FitTrack</Link>
            </div>

            <div className="navbar-links">
                {usuario?.tipo === 'aluno' && (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/execucoes">Meus Treinos</Link>
                        <Link to="/galeria">Galeria</Link>
                        <Link to="/perfil">Perfil</Link>
                    </>
                )}

                {usuario?.tipo === 'personal' && (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/alunos">Meus Alunos</Link>
                        <Link to="/perfil">Perfil</Link>
                    </>
                )}
            </div>

            <div className="navbar-user">
                <span>{usuario?.nome}</span>
                <button onClick={handleLogout}>Sair</button>
            </div>
        </nav>
    )
}

export default Navbar