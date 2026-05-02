import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Login.css'

function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    function fazerLogin(e) {
        e.preventDefault()
        const sucesso = login(email, senha)
        if (sucesso) {
            navigate('/dashboard')
        } else {
            setErro('Email ou senha inválidos')
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-logo">FT</div>
                <h1>Bem-vindo ao FitTrack</h1>
                <p className="login-subtitle">Faça login para continuar</p>

                <form onSubmit={fazerLogin}>
                    <div className="input-group">

                        <div className="input-wrapper">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="input-group">

                        <div className="input-wrapper">
                            <input
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                            />
                        </div>
                    </div>

                    {erro && <p className="login-erro">{erro}</p>}

                    <button type="submit" className="login-btn">Entrar</button>
                </form>

                <p className="login-cadastro">
                    Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
                </p>
            </div>
        </div>
    )
}

export default Login