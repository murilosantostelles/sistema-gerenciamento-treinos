import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getAlunosPorPersonal } from '../../services/usuariosService'
import { getTreinosPorAluno } from '../../services/treinosService'
import { getExecucoesPorAluno } from '../../services/execucoesService'
import Navbar from '../../components/Navbar/Navbar'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import './MeusAlunos.css'

function MeusAlunos() {
    const { usuario } = useAuth()
    const [alunos, setAlunos] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        setAlunos(getAlunosPorPersonal(usuario.id))
    }, [usuario])

    function getUltimaAtividade(alunoId) {
        const execucoes = getExecucoesPorAluno(alunoId)
        if (execucoes.length === 0) return null
        const ordenadas = execucoes.sort((a, b) => new Date(b.data) - new Date(a.data))
        return new Date(ordenadas[0].data).toLocaleDateString('pt-BR')
    }

    function getTotalTreinos(alunoId) {
        return getTreinosPorAluno(alunoId).length
    }

    return (
        <>
            <Navbar />
            <div className="meus-alunos-page">
                <div className="meus-alunos-header">
                    <h1>Meus Alunos</h1>
                    <p>Gerencie os treinos dos seus alunos</p>
                </div>

                <div className="alunos-grid">
                    {alunos.length === 0 && <p className="vazio">Nenhum aluno vinculado ainda.</p>}
                    {alunos.map(aluno => (
                        <div key={aluno.id} className="aluno-card">
                            <div className="aluno-card-topo">
                                <div className="aluno-avatar">
                                    <PeopleAltIcon />
                                </div>
                                <div className="aluno-dados">
                                    <strong>{aluno.nome}</strong>
                                    <span>{aluno.email}</span>
                                </div>
                            </div>

                            <div className="aluno-info">
                                <div className="aluno-info-item">
                                    <FitnessCenterIcon fontSize="small" />
                                    <span>{getTotalTreinos(aluno.id)} treinos prescritos</span>
                                </div>
                                <div className="aluno-info-item">
                                    <CalendarTodayIcon fontSize="small" />
                                    <span>
                                        {getUltimaAtividade(aluno.id)
                                            ? `Última atividade: ${getUltimaAtividade(aluno.id)}`
                                            : 'Sem atividades registradas'}
                                    </span>
                                </div>
                            </div>

                            <button
                                className="btn-ver-atividades"
                                onClick={() => navigate(`/alunos/${aluno.id}/atividades`)}
                            >
                                Ver Atividades
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MeusAlunos