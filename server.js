require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

//  Serve o HTML/CSS da pasta public
app.use(express.static("public"))

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.log("Erro ao conectar MongoDB:", err))

// Schema do usuário
const UserSchema = new mongoose.Schema({
  nome: String,
  email: String,
  idade: Number
})
const User = mongoose.model("User", UserSchema)

// CREATE
app.post("/usuarios", async (req, res) => {
  try {
    const usuario = new User(req.body)
    await usuario.save()
    res.status(201).json(usuario)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

// READ (listar todos)
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await User.find()
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

// READ (por ID)
app.get("/usuarios/:id", async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id)
    res.json(usuario)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

// UPDATE
app.put("/usuarios/:id", async (req, res) => {
  try {
    const usuario = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(usuario)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

// DELETE
app.delete("/usuarios/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ mensagem: "Usuário deletado com sucesso" })
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

// Rota teste
app.get("/api", (req, res) => res.send("API CRUD funcionando"))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))