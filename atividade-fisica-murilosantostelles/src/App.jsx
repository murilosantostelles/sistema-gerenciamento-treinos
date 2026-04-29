import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastro/Cadastro'
import Dashboard from './pages/Dashboard/Dashboard'
import MeusAlunos from './pages/MeusAlunos/MeusAlunos'
import Atividades from './pages/Atividades/Atividades'
import Execucoes from './pages/Execucoes/Execucoes'
import Galeria from './pages/Galeria/Galeria'
import Perfil from './pages/Perfil/Perfil'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/alunos" element={<MeusAlunos />} />
        <Route path="/alunos/:alunoId/atividades" element={<Atividades />} />
        <Route path="/execucoes" element={<Execucoes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App