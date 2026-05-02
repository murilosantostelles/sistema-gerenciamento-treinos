export function getGaleria() {
    return JSON.parse(localStorage.getItem('galeria')) || []
}

export function getGaleriaPorAluno(alunoId) {
    return getGaleria().filter(g => g.alunoId === alunoId)
}

export function salvarFoto(foto) {
    const galeria = getGaleria()
    const atualizada = [...galeria, { ...foto, id: crypto.randomUUID() }]
    localStorage.setItem('galeria', JSON.stringify(atualizada))
}

export function deletarFoto(id) {
    const galeria = getGaleria()
    const atualizada = galeria.filter(g => g.id !== id)
    localStorage.setItem('galeria', JSON.stringify(atualizada))
}