export function getTreinos() {
    return JSON.parse(localStorage.getItem('treinos')) || []
}

export function getTreinosPorAluno(alunoId) {
    return getTreinos().filter(t => t.alunoId === alunoId)
}

export function salvarTreino(treino) {
    const treinos = getTreinos()
    const atualizados = [...treinos, { ...treino, id: crypto.randomUUID() }]
    localStorage.setItem('treinos', JSON.stringify(atualizados))
}

export function editarTreino(id, dadosAtualizados) {
    const treinos = getTreinos()
    const atualizados = treinos.map(t => t.id === id ? { ...t, ...dadosAtualizados } : t)
    localStorage.setItem('treinos', JSON.stringify(atualizados))
}

export function deletarTreino(id) {
    const treinos = getTreinos()
    const atualizados = treinos.filter(t => t.id !== id)
    localStorage.setItem('treinos', JSON.stringify(atualizados))
}