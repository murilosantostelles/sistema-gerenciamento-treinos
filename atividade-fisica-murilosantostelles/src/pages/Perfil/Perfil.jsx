import { useAuth } from '../../contexts/AuthContext'
import { getUsuariosPorId } from '../../services/usuariosService'
import Navbar from '../../components/Navbar/Navbar'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import './Perfil.css'

function Perfil() {
    const { usuario } = useAuth()
    const personal = usuario?.tipo === 'aluno' ? getUsuariosPorId(usuario.personalId) : null

    return (
        <>
            <Navbar />
            <div className="perfil-page">
                <div className="perfil-header">
                    <h1>Perfil</h1>
                    <p>Suas informações pessoais</p>
                </div>

                <div className="perfil-card">
                    <div className="perfil-avatar">
                        <AccountCircleIcon sx={{ fontSize: 64, color: '#0071e3' }} />
                    </div>

                    <strong className="perfil-nome">{usuario?.nome}</strong>
                    <span className="perfil-tipo">{usuario?.tipo === 'aluno' ? 'Aluno' : 'Personal Trainer'}</span>

                    <div className="perfil-info">
                        <div className="perfil-info-item">
                            <div className="perfil-info-label">
                                <PersonIcon fontSize="small" />
                                <span>Nome</span>
                            </div>
                            <strong>{usuario?.nome}</strong>
                        </div>

                        <div className="perfil-info-item">
                            <div className="perfil-info-label">
                                <EmailIcon fontSize="small" />
                                <span>Email</span>
                            </div>
                            <strong>{usuario?.email}</strong>
                        </div>

                        {usuario?.tipo === 'aluno' && personal && (
                            <div className="perfil-info-item">
                                <div className="perfil-info-label">
                                    <PeopleAltIcon fontSize="small" />
                                    <span>Personal Trainer</span>
                                </div>
                                <strong>{personal.nome}</strong>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Perfil