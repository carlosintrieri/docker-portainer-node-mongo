# 🚀 docker-portainer-node-mongo

# Um aplicativo CRUD para teste de Portainer com Docker utilizando Node.js e MongoDB.

CRUD completo com **Node.js**, **MongoDB**, **Docker** e **Portainer**.  
Projeto desenvolvido como atividade prática de administração de servidores Linux com containers Docker.

---

## 📋 Sobre o Projeto

Aplicação web fullstack para gerenciamento de usuários, com operações de **Criar, Ler, Atualizar e Deletar (CRUD)** utilizando uma API REST em Node.js conectada ao MongoDB, tudo containerizado com Docker e gerenciado pelo Portainer.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Função |
|---|---|
| **Node.js** | Servidor e API REST |
| **Express** | Framework web |
| **MongoDB** | Banco de dados NoSQL |
| **Mongoose** | ODM para MongoDB |
| **Docker** | Containerização |
| **Docker Compose** | Orquestração dos containers |
| **Portainer** | Gerenciamento visual dos containers |
| **HTML + CSS** | Interface do usuário |
| **Linux (Ubuntu)** | Sistema operacional do servidor |

---

## 📁 Estrutura do Projeto

```
node-mongo-crud/
├── public/
│   ├── index.html        # Interface do CRUD
│   └── style.css         # Estilização
├── .env                  # Variáveis de ambiente
├── docker-compose.yml    # Orquestração dos containers
├── Dockerfile            # Imagem da aplicação Node.js
├── package.json          # Dependências do projeto
└── server.js             # API REST (rotas CRUD)
```

---

## ⚙️ Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado
- [Docker Compose](https://docs.docker.com/compose/) instalado
- [Portainer](https://www.portainer.io/) (opcional, para gerenciamento visual)

---

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/carlosintrieri/docker-portainer-node-mongo.git
cd docker-portainer-node-mongo
```

### 2. Suba os containers

```bash
docker compose up -d --build
```

### 3. Acesse no navegador

```
http://localhost:3000
```

---

## 🐳 Containers

Após rodar o `docker compose up`, dois containers serão criados:

| Container | Imagem | Porta |
|---|---|---|
| `node-crud` | node:20-alpine | 3000 |
| `mongodb` | mongo:latest | 27017 |

Os dois containers se comunicam pela rede interna `app-network` criada automaticamente pelo Docker Compose.

---

## 🔌 Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/usuarios` | Lista todos os usuários |
| `GET` | `/usuarios/:id` | Busca usuário por ID |
| `POST` | `/usuarios` | Cria um novo usuário |
| `PUT` | `/usuarios/:id` | Atualiza um usuário |
| `DELETE` | `/usuarios/:id` | Remove um usuário |

### Exemplo de requisição

```bash
# Criar usuário
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome": "Carlos", "email": "carlos@email.com", "idade": 25}'

# Listar usuários
curl http://localhost:3000/usuarios
```

---

## 🗄️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
MONGO_URI=mongodb://root:root@mongodb:27017/cruddb?authSource=admin
PORT=3000
```

> ⚠️ O host `mongodb` é o nome do serviço definido no `docker-compose.yml`.  
> Ao rodar fora do Docker use `localhost` no lugar de `mongodb`.

---

## 📊 Arquitetura

```
Ubuntu (Linux)
└── Docker
      ├── container: node-crud :3000
      │     ├── Express (API REST)
      │     ├── Mongoose (ODM)
      │     └── HTML/CSS (frontend estático)
      │           └── conecta via rede interna ↓
      └── container: mongodb :27017
            └── banco de dados: cruddb
                  └── collection: users

Portainer :9000
└── gerencia todos os containers visualmente
```

---

## 🖥️ Interface

A interface web permite:

- ✅ Cadastrar usuários (nome, email, idade)
- ✅ Listar todos os usuários em tabela
- ✅ Editar usuário diretamente pelo formulário
- ✅ Deletar usuário com confirmação via modal

---

## 📦 Comandos Úteis

```bash
# Subir os containers em background
docker compose up -d

# Ver logs da aplicação
docker logs node-crud

# Ver logs do MongoDB
docker logs mongodb

# Parar os containers
docker compose down

# Parar e remover volumes (apaga os dados)
docker compose down -v

# Ver containers rodando
docker ps
```

---

## 🌐 Portainer

O Portainer permite gerenciar os containers visualmente sem precisar do terminal.  
Acesse em: `http://localhost:9000`

No Portainer você pode:
- Ver status dos containers
- Acessar logs em tempo real
- Reiniciar ou parar containers
- Inspecionar redes e volumes

---

## 📚 Aprendizados

Este projeto abordou na prática:

- Administração de servidores **Linux (Ubuntu)**
- Criação e gerenciamento de **containers Docker**
- Orquestração com **Docker Compose**
- Gerenciamento visual com **Portainer**
- Desenvolvimento de **API REST** com Node.js e Express
- Conexão com banco de dados **MongoDB** via Mongoose
- **Redes Docker** para comunicação entre containers
- **Volumes Docker** para persistência de dados
