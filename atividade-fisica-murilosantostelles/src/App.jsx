import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
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
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
        <Route path="/galeria" element={<PrivateRoute><Galeria /></PrivateRoute>} />
        <Route path="/alunos" element={<PrivateRoute><MeusAlunos /></PrivateRoute>} />
        <Route path="/alunos/:alunoId/atividades" element={<PrivateRoute><Atividades /></PrivateRoute>} />
        <Route path="/execucoes" element={<PrivateRoute><Execucoes /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App