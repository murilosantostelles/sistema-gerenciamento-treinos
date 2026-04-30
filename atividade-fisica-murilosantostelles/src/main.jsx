import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './contexts/AuthContext'
import App from './App.jsx'

import usuarios from './data/usuarios.json'
import treinos from './data/treinos.json'
import execucoes from './data/execucoes.json'
import galeria from './data/galeria.json'

if (!localStorage.getItem('usuarios')) {
  localStorage.setItem('usuarios', JSON.stringify(usuarios))
}
if (!localStorage.getItem('treinos')) {
  localStorage.setItem('treinos', JSON.stringify(treinos))
}
if (!localStorage.getItem('execucoes')) {
  localStorage.setItem('execucoes', JSON.stringify(execucoes))
}
if (!localStorage.getItem('galeria')) {
  localStorage.setItem('galeria', JSON.stringify(galeria))
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)