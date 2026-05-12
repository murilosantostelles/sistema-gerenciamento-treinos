import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUsuariosPorId } from '../../services/usuariosService'
import { getTreinosPorAluno, salvarTreino, editarTreino, deletarTreino } from '../../services/treinosService'
import Navbar from '../../components/Navbar/Navbar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import './Atividades.css'

function Atividades() {
    const { alunoId } = useParams()
    const navigate = useNavigate()
    const [aluno, setAluno] = useState(null)
    const [treinos, setTreinos] = useState([])
    const [modalAberto, setModalAberto] = useState(false)
    const [treinoEditando, setTreinoEditando] = useState(null)
    const [form, setForm] = useState({ tipoExercicio: '', descricao: '', series: '', repeticoes: '', observacao: '' })

    useEffect(() => {
        setAluno(getUsuariosPorId(alunoId))
        carregarTreinos()
    }, [alunoId])

    function carregarTreinos() {
        setTreinos(getTreinosPorAluno(alunoId))
    }

    function abrirModalNovo() {
        setTreinoEditando(null)
        setForm({ tipoExercicio: '', descricao: '', series: '', repeticoes: '', observacao: '' })
        setModalAberto(true)
    }

    function abrirModalEditar(treino) {
        setTreinoEditando(treino)
        setForm({ tipoExercicio: treino.tipoExercicio, descricao: treino.descricao, series: treino.series, repeticoes: treino.repeticoes, observacao: treino.observacao })
        setModalAberto(true)
    }

    function fecharModal() {
        setModalAberto(false)
        setTreinoEditando(null)
    }

    function handleSalvar() {
        if (treinoEditando) {
            editarTreino(treinoEditando.id, { ...form, series: Number(form.series), repeticoes: Number(form.repeticoes) })
        } else {
            salvarTreino({ ...form, alunoId, series: Number(form.series), repeticoes: Number(form.repeticoes) })
        }
        carregarTreinos()
        fecharModal()
    }

    function handleDeletar(id) {
        deletarTreino(id)
        carregarTreinos()
    }

    return (
        <>
            <Navbar />
            <div className="atividades-page">
                <div className="atividades-header">
                    <div className="atividades-header-esquerda">
                        <button className="btn-voltar" onClick={() => navigate('/alunos')}>
                            <ArrowBackIcon />
                        </button>
                        <div>
                            <h1>Atividades de {aluno?.nome}</h1>
                            <p>Prescreva e gerencie treinos</p>
                        </div>
                    </div>
                    <button className="btn-prescrever" onClick={abrirModalNovo}>
                        <AddIcon /> Prescrever Treino
                    </button>
                </div>

                <div className="ativ-treinos-grid">
                    {treinos.length === 0 && <p className="vazio">Nenhum treino prescrito ainda.</p>}
                    {treinos.map(treino => (
                        <div key={treino.id} className="ativ-treino-card">
                            <strong>{treino.tipoExercicio}</strong>
                            <p>{treino.descricao}</p>
                            <p className="ativ-treino-series">{treino.series} séries × {treino.repeticoes} repetições</p>
                            {treino.observacao && <p className="ativ-treino-obs">Obs: {treino.observacao}</p>}
                            <div className="ativ-treino-acoes">
                                <button className="ativ-btn-editar" onClick={() => abrirModalEditar(treino)}>
                                    <EditIcon fontSize="small" /> Editar
                                </button>
                                <button className="ativ-btn-excluir" onClick={() => handleDeletar(treino.id)}>
                                    <DeleteIcon fontSize="small" /> Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modalAberto && (
                <div className="ativ-modal-overlay" onClick={fecharModal}>
                    <div className="ativ-modal" onClick={e => e.stopPropagation()}>
                        <h2>{treinoEditando ? 'Editar Treino' : 'Prescrever Novo Treino'}</h2>

                        <div className="ativ-modal-campo">
                            <label>Tipo de exercício</label>
                            <input type="text" placeholder="Ex: Corrida, Musculação..." value={form.tipoExercicio} onChange={e => setForm({ ...form, tipoExercicio: e.target.value })} />
                        </div>
                        <div className="ativ-modal-campo">
                            <label>Descrição</label>
                            <textarea placeholder="Descreva o treino..." value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} />
                        </div>
                        <div className="ativ-modal-duplo">
                            <div className="ativ-modal-campo">
                                <label>Séries</label>
                                <input type="number" placeholder="3" value={form.series} onChange={e => setForm({ ...form, series: e.target.value })} />
                            </div>
                            <div className="ativ-modal-campo">
                                <label>Repetições</label>
                                <input type="number" placeholder="12" value={form.repeticoes} onChange={e => setForm({ ...form, repeticoes: e.target.value })} />
                            </div>
                        </div>
                        <div className="ativ-modal-campo">
                            <label>Observações</label>
                            <textarea placeholder="Dicas ou observações adicionais..." value={form.observacao} onChange={e => setForm({ ...form, observacao: e.target.value })} />
                        </div>

                        <div className="ativ-modal-acoes">
                            <button className="ativ-btn-cancelar" onClick={fecharModal}>Cancelar</button>
                            <button className="ativ-btn-salvar" onClick={handleSalvar}>{treinoEditando ? 'Atualizar' : 'Salvar'}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Atividades