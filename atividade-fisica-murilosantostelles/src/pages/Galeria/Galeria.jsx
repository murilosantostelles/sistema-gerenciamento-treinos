import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getGaleriaPorAluno, salvarFoto, deletarFoto } from '../../services/galeriaService'
import Navbar from '../../components/Navbar/Navbar'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import './Galeria.css'

function Galeria() {
    const { usuario } = useAuth()
    const [fotos, setFotos] = useState([])
    const [modalAberto, setModalAberto] = useState(false)
    const [form, setForm] = useState({ foto: '', legenda: '', data: '' })

    useEffect(() => {
        carregarFotos()
    }, [usuario])

    function carregarFotos() {
        setFotos(getGaleriaPorAluno(usuario.id))
    }

    function abrirModal() {
        setForm({ foto: '', legenda: '', data: new Date().toISOString().split('T')[0] })
        setModalAberto(true)
    }

    function fecharModal() {
        setModalAberto(false)
    }

    function handleAdicionar() {
        if (!form.foto || !form.legenda || !form.data) return
        salvarFoto({ ...form, alunoId: usuario.id })
        carregarFotos()
        fecharModal()
    }

    function handleDeletar(id) {
        deletarFoto(id)
        carregarFotos()
    }

    return (
        <>
            <Navbar />
            <div className="galeria-page">
                <div className="galeria-topo">
                    <div>
                        <h1>Galeria</h1>
                        <p>Registre sua jornada fitness</p>
                    </div>
                    <button className="galeria-btn-add" onClick={abrirModal}>
                        <AddIcon />
                    </button>
                </div>

                {fotos.length === 0 && (
                    <p className="galeria-vazio">Nenhuma foto registrada ainda. Clique em + para adicionar!</p>
                )}

                <div className="galeria-grid">
                    {fotos.map(foto => (
                        <div key={foto.id} className="galeria-card">
                            <img src={foto.foto} alt={foto.legenda} className="galeria-img" />
                            <div className="galeria-card-info">
                                <p className="galeria-legenda">{foto.legenda}</p>
                                <div className="galeria-card-rodape">
                                    <div className="galeria-data">
                                        <CalendarTodayIcon fontSize="small" />
                                        <span>{new Date(foto.data).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                    <button className="galeria-btn-deletar" onClick={() => handleDeletar(foto.id)}>
                                        <DeleteIcon fontSize="small" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modalAberto && (
                <div className="galeria-modal-overlay" onClick={fecharModal}>
                    <div className="galeria-modal" onClick={e => e.stopPropagation()}>
                        <h2>Adicionar Foto</h2>

                        <div className="galeria-modal-campo">
                            <label>URL da imagem</label>
                            <input
                                type="text"
                                placeholder="https://..."
                                value={form.foto}
                                onChange={e => setForm({ ...form, foto: e.target.value })}
                            />
                        </div>

                        <div className="galeria-modal-campo">
                            <label>Legenda</label>
                            <textarea
                                placeholder="Descreva sua conquista..."
                                value={form.legenda}
                                onChange={e => setForm({ ...form, legenda: e.target.value })}
                            />
                        </div>

                        <div className="galeria-modal-campo">
                            <label>Data</label>
                            <input
                                type="date"
                                value={form.data}
                                onChange={e => setForm({ ...form, data: e.target.value })}
                            />
                        </div>

                        <div className="galeria-modal-acoes">
                            <button className="galeria-btn-cancelar" onClick={fecharModal}>Cancelar</button>
                            <button className="galeria-btn-salvar" onClick={handleAdicionar}>Adicionar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Galeria