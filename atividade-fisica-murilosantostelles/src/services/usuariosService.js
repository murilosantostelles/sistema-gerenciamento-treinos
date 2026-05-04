export function getUsuarios() {
    const dados = localStorage.getItem('usuarios')
    if (!dados) return []
    try {
        const parsed = JSON.parse(dados)
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

export function getUsuariosPorId(id) {
    return getUsuarios().find(u => u.id === id)
}

export function salvarUsuario(usuario) {
    const usuarios = getUsuarios()
    const atualizados = [...usuarios, usuario]
    localStorage.setItem('usuarios', JSON.stringify(atualizados))
}

export function getPersonal() {
    return getUsuarios().filter(u => u.tipo === 'personal')
}

export function getAlunosPorPersonal(personalId) {
    return getUsuarios().filter(u => u.tipo === 'aluno' && u.personalId === personalId)
}