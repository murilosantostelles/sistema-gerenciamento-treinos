import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getExecucoesPorAluno } from '../../services/execucoesService'
import { getTreinosPorAluno } from '../../services/treinosService'
import { getAlunosPorPersonal } from '../../services/usuariosService'
import { getExecucoes } from '../../services/execucoesService'
import { getTreinos } from '../../services/treinosService'
import Navbar from '../../components/Navbar/Navbar'
import './Dashboard.css'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DoneIcon from '@mui/icons-material/Done';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';

function Dashboard() {
    const { usuario } = useAuth()
    const [execucoes, setExecucoes] = useState([])
    const [treinos, setTreinos] = useState([])
    const [alunos, setAlunos] = useState([])

    useEffect(() => {
        if (usuario?.tipo === 'aluno') {
            setExecucoes(getExecucoesPorAluno(usuario.id))
            setTreinos(getTreinosPorAluno(usuario.id))
        } else if (usuario?.tipo === 'personal') {
            setAlunos(getAlunosPorPersonal(usuario.id))
            setExecucoes(getExecucoes())
            setTreinos(getTreinos())
        }
    }, [usuario])

    const agora = new Date()
    const inicioSemana = new Date(agora)
    inicioSemana.setDate(agora.getDate() - agora.getDay())

    const execucoesSemana = execucoes.filter(e => {
        const data = new Date(e.data)
        return data >= inicioSemana
    })

    const totalCalorias = execucoesSemana.reduce((acc, e) => acc + e.caloriasGastas, 0)
    const totalMinutos = execucoesSemana.reduce((acc, e) => acc + e.duracaoMinutos, 0)

    const treinosSemana = treinos.filter(t => {
        const data = new Date(t.dataCriacao)
        return data >= inicioSemana
    })

    const ultimasExecucoes = [...execucoes]
        .sort((a, b) => new Date(b.data) - new Date(a.data))
        .slice(0, 3)

    if (usuario?.tipo === 'aluno') {
        return (
            <>
                <Navbar />
                <div className="dashboard">
                    <div className="dashboard-header">
                        <h1>Olá, {usuario.nome}!</h1>
                        <p>Aqui está um resumo da sua semana</p>
                    </div>

                    <div className="dashboard-cards">
                        <div className="card">
                            <span className="card-icon treinos-icon"><StackedLineChartIcon></StackedLineChartIcon></span>
                            <h2>{execucoesSemana.length}</h2>
                            <p>Treinos esta semana</p>
                        </div>
                        <div className="card">
                            <span className="card-icon calorias-icon"><WhatshotIcon></WhatshotIcon></span>
                            <h2>{totalCalorias}</h2>
                            <p>Calorias gastas</p>
                        </div>
                        <div className="card">
                            <span className="card-icon minutos-icon"><AccessTimeIcon></AccessTimeIcon></span>
                            <h2>{totalMinutos}</h2>
                            <p>Minutos ativos</p>
                        </div>
                        <div className="card">
                            <span className="card-icon atividades-icon"><DoneIcon></DoneIcon></span>
                            <h2>{execucoes.length}</h2>
                            <p>Atividades registradas</p>
                        </div>
                    </div>

                    <div className="dashboard-section">
                        <h3>Últimas execuções registradas</h3>
                        <div className="execucoes-lista">
                            {ultimasExecucoes.length === 0 && <p className="vazio">Nenhuma execução registrada ainda.</p>}
                            {ultimasExecucoes.map(e => {
                                const treino = treinos.find(t => t.id === e.treinoId)
                                return (
                                    <div key={e.id} className="execucao-item">
                                        <div>
                                            <strong>{treino?.tipoExercicio || 'Atividade'}</strong>
                                            <p>{e.duracaoMinutos} min • {e.caloriasGastas} kcal</p>
                                        </div>
                                        <span>{new Date(e.data).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="dashboard-section">
                        <h3>Treinos prescritos pelo personal</h3>
                        <div className="execucoes-lista">
                            {treinos.length === 0 && <p className="vazio">Nenhum treino prescrito ainda.</p>}
                            {treinos.map(t => (
                                <div key={t.id} className="execucao-item">
                                    <div>
                                        <strong>{t.tipoExercicio}</strong>
                                        <p>{t.descricao}</p>
                                        <p className="series">{t.series} séries × {t.repeticoes} repetições</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="dashboard">
                <div className="dashboard-header">
                    <h1>Olá, {usuario?.nome}!</h1>
                    <p>Visão geral dos seus alunos</p>
                </div>

                <div className="dashboard-cards">
                    <div className="card">
                        <span className="card-icon treinos-icon"><PeopleAltIcon></PeopleAltIcon></span>
                        <h2>{alunos.length}</h2>
                        <p>Total de alunos</p>
                    </div>
                    <div className="card">
                        <span className="card-icon minutos-icon"><ShowChartIcon></ShowChartIcon></span>
                        <h2>{treinosSemana.length}</h2>
                        <p>Treinos prescritos esta semana</p>
                    </div>
                    <div className="card">
                        <span className="card-icon atividades-icon"><FitnessCenterIcon></FitnessCenterIcon></span>
                        <h2>{execucoes.length}</h2>
                        <p>Execuções registradas pelos alunos</p>
                    </div>
                </div>

                <div className="dashboard-section">
                    <h3>Meus Alunos</h3>
                    <div className="alunos-grid">
                        {alunos.length === 0 && <p className="vazio">Nenhum aluno vinculado ainda.</p>}
                        {alunos.map(aluno => {
                            const execucoesAluno = execucoes
                                .filter(e => e.alunoId === aluno.id)
                                .sort((a, b) => new Date(b.data) - new Date(a.data))
                            const treinosAluno = treinos.filter(t => t.alunoId === aluno.id)
                            const ultimaAtividade = execucoesAluno[0]?.data

                            return (
                                <div key={aluno.id} className="aluno-card">
                                    <div className="aluno-avatar"><PeopleAltIcon></PeopleAltIcon></div>
                                    <div className="aluno-info">
                                        <strong>{aluno.nome}</strong>
                                        <p>{treinosAluno.length} treinos prescritos</p>
                                        {ultimaAtividade && (
                                            <p>Última atividade: {new Date(ultimaAtividade).toLocaleDateString('pt-BR')}</p>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard