# FitTrack — Sistema de Controle de Atividades Físicas

Aplicação web desenvolvida como trabalho prático da disciplina de Desenvolvimento Web Front-End com React. O sistema permite o monitoramento de atividades físicas com suporte a múltiplos usuários, diferenciando dois perfis: **aluno** e **personal trainer**.

## Vídeo de Apresentação: https://drive.google.com/file/d/1hLcx-oJWFUVohznWswbNjXq9UghH7JKO/view?usp=sharing

---

## Tecnologias Utilizadas

- React
- Vite
- React Router DOM
- Material UI Icons
- CSS puro
- localStorage

---

## Funcionalidades

### Autenticação
- Cadastro de usuários com seleção de perfil (aluno ou personal)
- Login e logout
- Sessão persistida via localStorage
- Rotas protegidas — páginas privadas inacessíveis sem autenticação

### Personal Trainer
- Dashboard com visão geral dos alunos e métricas da semana
- Gerenciamento de alunos vinculados
- Prescrição de treinos para alunos específicos (CRUD completo)

### Aluno
- Dashboard com resumo semanal de treinos, calorias e minutos ativos
- Visualização dos treinos prescritos pelo personal
- Registro de execução de cada treino com data, duração, calorias, status e observações
- Edição e exclusão de execuções registradas
- Página de Galeria (funcionalidade extra)

### Galeria (Funcionalidade Extra)
Mural de fotos pessoal onde o aluno registra e visualiza momentos da sua jornada fitness. Cada registro contém uma imagem, legenda e data. Os dados são isolados por usuário.

---

## Arquitetura do Projeto

O projeto segue uma arquitetura em camadas inspirada no padrão de projetos backend:
