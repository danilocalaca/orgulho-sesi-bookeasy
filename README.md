# BookEasy 📚

O **BookEasy** é um sistema web desenvolvido para facilitar o gerenciamento da biblioteca escolar. A plataforma permite que os alunos consultem o acervo e solicitem reservas de livros, enquanto o bibliotecário pode gerenciar os livros, alunos e reservas.

O projeto foi desenvolvido por uma equipe de 9 alunos do **SESI Paulista** e será apresentado no evento **Orgulho de Ser SESI**.

---

## 🎯 Objetivo

O principal objetivo do BookEasy é tornar o gerenciamento da biblioteca escolar mais organizado, prático e acessível.

O sistema centraliza as informações dos livros e alunos, permitindo que os estudantes encontrem livros com facilidade e realizem solicitações de reserva, enquanto o bibliotecário possui uma área própria para administrar o acervo e acompanhar as reservas.

---

## 👥 Público-alvo

O BookEasy possui dois principais tipos de usuários:

### 📚 Alunos

Os alunos podem:

- Criar uma conta utilizando os dados fornecidos pela escola;
- Fazer login no sistema;
- Pesquisar livros;
- Navegar pelas categorias;
- Visualizar informações dos livros;
- Solicitar reservas;
- Cancelar solicitações;
- Visualizar suas reservas;
- Acessar seu perfil.

### 🧑‍💼 Bibliotecário

O bibliotecário possui acesso ao painel administrativo e pode:

- Fazer login como bibliotecário;
- Visualizar o acervo;
- Cadastrar livros;
- Editar informações dos livros;
- Excluir livros;
- Cadastrar alunos;
- Editar informações dos alunos;
- Excluir alunos;
- Visualizar as solicitações de reserva;
- Aprovar reservas;
- Recusar solicitações;
- Cancelar reservas;
- Acompanhar a quantidade de livros, alunos e reservas.

---

## ⚙️ Funcionalidades

### Sistema de livros

- Cadastro de livros;
- Edição de livros;
- Exclusão de livros;
- Pesquisa por título, autor ou categoria;
- Filtro por gênero;
- Ordenação do acervo;
- Visualização dos detalhes dos livros;
- Controle do status dos livros;
- Adição de capas através de links ou arquivos de imagem.

### Sistema de alunos

- Cadastro de alunos;
- Login através do sistema de autenticação;
- Visualização do perfil;
- Edição de informações;
- Exclusão de cadastro;
- Associação do aluno à sua conta de usuário.

### Sistema de reservas

- Solicitação de reserva;
- Cancelamento de solicitação;
- Aprovação de reservas pelo bibliotecário;
- Recusa de solicitações;
- Cancelamento de reservas;
- Visualização das reservas realizadas.

---

## 🖥️ Telas do sistema

O BookEasy possui as seguintes áreas principais:

### Tela inicial

Página principal do sistema, apresentando o acervo, destaques, categorias e opções de pesquisa.

### Explorar livros

Área destinada à pesquisa e navegação pelo catálogo de livros.

### Detalhes do livro

Exibe informações como:

- Capa;
- Título;
- Autor;
- Ano de lançamento;
- Gênero;
- Descrição;
- Status do livro.

### Minhas reservas

Área onde o aluno pode acompanhar suas solicitações e reservas.

### Login do aluno

Área de autenticação utilizada pelos alunos para acessar suas contas.

### Login do bibliotecário

Área de acesso ao painel administrativo.

### Painel do bibliotecário

Área administrativa para gerenciamento dos livros, alunos e reservas.

### Cadastro de livros

Tela utilizada para adicionar novos livros ao acervo.

### Cadastro de alunos

Tela utilizada para cadastrar novos alunos no sistema.

---

## 🗄️ Banco de dados

O BookEasy utiliza o **Supabase** como backend e banco de dados.

O banco é responsável pelo armazenamento das informações utilizadas pelo sistema, incluindo:

- Livros;
- Alunos;
- Usuários;
- Reservas;
- Informações do acervo.

O sistema também utiliza o **Supabase Auth** para realizar a autenticação dos usuários.

A comunicação entre o site e o banco de dados é realizada através da biblioteca **Supabase JavaScript**.

---

## 🔐 Autenticação e segurança

O sistema possui autenticação para diferentes tipos de usuários.

Os alunos utilizam suas contas para acessar suas informações e realizar reservas, enquanto o bibliotecário possui acesso à área administrativa.

O banco de dados utiliza **Row Level Security (RLS)** do Supabase para controlar o acesso às informações.

---

## 🛠️ Tecnologias utilizadas

| Tecnologia/Ferramenta | Utilização |
| --------------------- | ---------- |
| **HTML5** | Estrutura das páginas |
| **CSS3** | Estilização e identidade visual |
| **JavaScript** | Funcionalidades e interatividade |
| **Supabase** | Banco de dados e autenticação |
| **Figma** | Prototipação e design das interfaces |
| **GitHub** | Versionamento e armazenamento do projeto |
| **Visual Studio Code** | Desenvolvimento do sistema |
| **Lovable** | Apoio no desenvolvimento e prototipação |

---

## 🎨 Design e experiência do usuário

O BookEasy foi desenvolvido buscando uma interface:

- Simples;
- Moderna;
- Intuitiva;
- Responsiva;
- Fácil de navegar.

A identidade visual teve como inspiração conceitos presentes em plataformas como **Apple** e **Nike**, priorizando uma interface limpa, boa organização das informações e hierarquia visual.

O protótipo e o planejamento das interfaces foram desenvolvidos utilizando o **Figma**.

---

## 📁 Estrutura do projeto

```text
BookEasy/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
├── docs/
│   ├── diagrama-caso-de-uso.md
│   └── ...
│
└── ...