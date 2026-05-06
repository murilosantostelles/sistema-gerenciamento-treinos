import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getTreinosPorAluno } from '../../services/treinosService'
import { getExecucoesPorAluno, salvarExecucao, editarExecucao, deletarExecucao } from '../../services/execucoesService'
import Navbar from '../../components/Navbar/Navbar'

import './Execucoes.css'

function Execucoes() {
    const { usuario } = useAuth()
    const [treinos, setTreinos] = useState([])
    const [execucoes, setExecucoes] = useState([])
    const [modalAberto, setModalAberto] = useState(false)
    const [treinoSelecionado, setTreinoSelecionado] = useState(null)
    const [execucaoEditando, setExecucaoEditando] = useState(null)
    const [form, setForm] = useState({ data: '', duracaoMinutos: '', caloriasGastas: '', status: 'completo', observacao: '' })

    useEffect(() => {
        carregarDados()
    }, [usuario])

    function carregarDados() {
        setTreinos(getTreinosPorAluno(usuario.id))
        setExecucoes(getExecucoesPorAluno(usuario.id))
    }

    function abrirModalRegistrar(treino) {
        setTreinoSelecionado(treino)
        setExecucaoEditando(null)
        setForm({ data: new Date().toISOString().split('T')[0], duracaoMinutos: '', caloriasGastas: '', status: 'completo', observacao: '' })
        setModalAberto(true)
    }

    function abrirModalEditar(execucao) {
        setExecucaoEditando(execucao)
        setTreinoSelecionado(null)
        setForm({ data: execucao.data, duracaoMinutos: execucao.duracaoMinutos, caloriasGastas: execucao.caloriasGastas, status: execucao.status, observacao: execucao.observacao })
        setModalAberto(true)
    }

    function fecharModal() {
        setModalAberto(false)
        setTreinoSelecionado(null)
        setExecucaoEditando(null)
    }

    function handleSalvar() {
        if (execucaoEditando) {
            editarExecucao(execucaoEditando.id, { ...form, duracaoMinutos: Number(form.duracaoMinutos), caloriasGastas: Number(form.caloriasGastas) })
        } else {
            if (!treinoSelecionado) return
            salvarExecucao({ ...form, alunoId: usuario.id, treinoId: treinoSelecionado.id, duracaoMinutos: Number(form.duracaoMinutos), caloriasGastas: Number(form.caloriasGastas) })
        }
        carregarDados()
        fecharModal()
    }

    function handleDeletar(id) {
        deletarExecucao(id)
        carregarDados()
    }

    function getNomeTreino(treinoId) {
        return treinos.find(t => t.id === treinoId)?.tipoExercicio || 'Atividade'
    }

    return (
        <>
            <Navbar />
            <div className="execucoes-page">
                <div className="execucoes-header">
                    <h1>Meus Treinos</h1>
                    <p>Gerencie suas atividades e execuções</p>
                </div>

                <div className="execucoes-section">
                    <h2>Treinos prescritos</h2>
                    {treinos.length === 0 && <p className="vazio">Nenhum treino prescrito ainda.</p>}
                    {treinos.map(treino => (
                        <div key={treino.id} className="treino-card">
                            <strong>{treino.tipoExercicio}</strong>
                            <p>{treino.descricao}</p>
                            <p className="treino-series">{treino.series} séries × {treino.repeticoes} repetições</p>
                            {treino.observacao && <p className="treino-obs">Obs: {treino.observacao}</p>}
                            <button className="btn-registrar" onClick={() => abrirModalRegistrar(treino)}>
                                Registrar Execução
                            </button>
                        </div>
                    ))}
                </div>

                <div className="execucoes-section">
                    <h2>Histórico de execuções</h2>
                    {execucoes.length === 0 && <p className="vazio">Nenhuma execução registrada ainda.</p>}
                    {execucoes.map(execucao => (
                        <div key={execucao.id} className="historico-card">
                            <div className="historico-topo">
                                <strong>{getNomeTreino(execucao.treinoId)}</strong>
                                <span className="status-badge">{execucao.status === 'completo' ? ' Completo' : execucao.status === 'parcial' ? 'Parcial' : ' Não completo'}</span>
                            </div>
                            <div className="historico-info">
                                <span>{new Date(execucao.data).toLocaleDateString('pt-BR')}</span>
                                <span>{execucao.duracaoMinutos} min</span>
                                <span> {execucao.caloriasGastas} kcal</span>
                            </div>
                            {execucao.observacao && <p className="historico-obs">Obs: {execucao.observacao}</p>}
                            <div className="historico-acoes">
                                <button className="btn-editar" onClick={() => abrirModalEditar(execucao)}> Editar</button>
                                <button className="btn-excluir" onClick={() => handleDeletar(execucao.id)}> Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modalAberto && (
                <div className="modal-overlay" onClick={fecharModal}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h2>{execucaoEditando ? 'Editar Execução' : 'Registrar Execução'}</h2>

                        <div className="modal-campo">
                            <label>Data</label>
                            <input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} />
                        </div>
                        <div className="modal-campo">
                            <label>Duração (minutos)</label>
                            <input type="number" placeholder="30" value={form.duracaoMinutos} onChange={e => setForm({ ...form, duracaoMinutos: e.target.value })} />
                        </div>
                        <div className="modal-campo">
                            <label>Calorias gastas</label>
                            <input type="number" placeholder="200" value={form.caloriasGastas} onChange={e => setForm({ ...form, caloriasGastas: e.target.value })} />
                        </div>
                        <div className="modal-campo">
                            <label>Status</label>
                            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                                <option value="completo">Completo</option>
                                <option value="parcial">Parcial</option>
                                <option value="nao_completo">Não Completo</option>
                            </select>
                        </div>
                        <div className="modal-campo">
                            <label>Observações</label>
                            <textarea placeholder="Como foi o treino..." value={form.observacao} onChange={e => setForm({ ...form, observacao: e.target.value })} />
                        </div>

                        <div className="modal-acoes">
                            <button className="btn-cancelar" onClick={fecharModal}>Cancelar</button>
                            <button className="btn-salvar" onClick={handleSalvar}>{execucaoEditando ? 'Atualizar' : 'Salvar'}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Execucoes