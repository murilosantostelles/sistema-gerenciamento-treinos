export function getUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios')) || []
}

export function getUsuariosPorId(id) {
    return getUsuarios().find(u => u.id === id)
}

export function salvarUsuario(usuario) {
    const usuarios = getUsuarios()
    const atualizados = [...usuarios, usuario]
    localStorage.setItem('usuarios', JSON.stringify(atualizados))
}

export function getPersonais() {
    return getUsuarios.filter(u => u.tipo === 'personal')
}

export function getAlunosPorPersonal(personalId) {
    return getUsuarios().filter(u => u.tipo === 'aluno' && u.personalId === personalId)
}