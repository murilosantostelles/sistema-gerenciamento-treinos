export function getExecucoes() {
    return JSON.parse(localStorage.getItem('execucoes')) || []
}

export function getExecucoesPorAluno(alunoId) {
    return getExecucoes().filter(e => e.alunoId === alunoId)
}

export function salvarExecucao(execucao) {
    const execucoes = getExecucoes()
    const atualizadas = [...execucoes, { ...execucao, id: crypto.randomUUID() }]
    localStorage.setItem('execucoes', JSON.stringify(atualizadas))
}

export function editarExecucao(id, dadosAtualizados) {
    const execucoes = getExecucoes()
    const atualizadas = execucoes.map(e => e.id === id ? { ...e, ...dadosAtualizados } : e)
    localStorage.setItem('execucoes', JSON.stringify(atualizadas))
}

export function deletarExecucao(id) {
    const execucoes = getExecucoes()
    const atualizadas = execucoes.filter(e => e.id !== id)
    localStorage.setItem('execucoes', JSON.stringify(atualizadas))
}