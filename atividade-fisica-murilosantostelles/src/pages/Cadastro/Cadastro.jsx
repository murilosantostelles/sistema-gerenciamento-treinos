import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getPersonal } from '../../services/usuariosService'
import './Cadastro.css'

function Cadastro() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [tipo, setTipo] = useState('aluno')
    const [personalId, setPersonalId] = useState('')
    const [personal, setPersonal] = useState([])
    const [erro, setErro] = useState('')
    const { cadastrar } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        setPersonal(getPersonal())
    }, [])

    function handleCadastro(e) {
        e.preventDefault()
        if (tipo === 'aluno' && !personalId) {
            setErro('Selecione um personal trainer')
            return
        }
        const dados = { nome, email, senha, tipo, ...(tipo === 'aluno' && { personalId }) }
        const sucesso = cadastrar(dados)
        if (sucesso) {
            navigate('/login')
        } else {
            setErro('Email já cadastrado')
        }
    }

    return (
        <div className="cadastro-page">
            <div className="cadastro-card">
                <div className="cadastro-logo">FT</div>
                <h1>Criar Conta</h1>
                <p className="cadastro-subtitle">Preencha os dados para começar</p>

                <form onSubmit={handleCadastro}>
                    <div className="input-group">
                        <label>Nome completo</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Seu nome"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Senha</label>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Tipo de usuário</label>
                        <div className="tipo-selector">
                            <button
                                type="button"
                                className={tipo === 'aluno' ? 'tipo-btn ativo' : 'tipo-btn'}
                                onClick={() => setTipo('aluno')}
                            >
                                Sou Aluno
                            </button>
                            <button
                                type="button"
                                className={tipo === 'personal' ? 'tipo-btn ativo' : 'tipo-btn'}
                                onClick={() => setTipo('personal')}
                            >
                                Sou Personal
                            </button>
                        </div>
                    </div>

                    {tipo === 'aluno' && (
                        <div className="input-group">
                            <label>Personal Trainer</label>
                            <select
                                value={personalId}
                                onChange={e => setPersonalId(e.target.value)}
                                className="select-personal"
                            >
                                <option value="">Selecione seu personal</option>
                                {personal.map(p => (
                                    <option key={p.id} value={p.id}>{p.nome}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {erro && <p className="cadastro-erro">{erro}</p>}

                    <button type="submit" className="cadastro-btn">Cadastrar</button>
                </form>

                <p className="cadastro-login">
                    Já tem uma conta? <Link to="/login">Fazer login</Link>
                </p>
            </div>
        </div>
    )
}

export default Cadastro