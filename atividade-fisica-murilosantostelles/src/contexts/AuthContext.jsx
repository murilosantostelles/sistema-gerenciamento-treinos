import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null)

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem('usuarioLogado')
        if (usuarioSalvo) {
            setUsuario(JSON.parse(usuarioSalvo))
        }
    }, [])

    function login(email, senha) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
        const encontrado = usuarios.find(u => u.email === email && u.senha === senha)
        if (encontrado) {
            setUsuario(encontrado)
            localStorage.setItem('usuarioLogado', JSON.stringify(encontrado))
            return true
        }
        return false
    }

    function cadastrar(dados) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
        const emailExiste = usuarios.find(u => u.email === dados.email)
        if (emailExiste) return false
        const novoUsuario = { ...dados, id: crypto.randomUUID() }
        const atualizados = [...usuarios, novoUsuario]
        localStorage.setItem('usuarios', JSON.stringify(atualizados))
        return true
    }

    function logout() {
        setUsuario(null)
        localStorage.removeItem('usuarioLogado')
    }

    return (
        <AuthContext.Provider value={{ usuario, login, cadastrar, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}