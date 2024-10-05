const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Cria uma nova instância do Express
const app = express();

// Configurações
const PORT = process.env.PORT || 3000;
const MONGO_URI = 'mongodb://localhost:27017/mongo'; // Substitua pelo seu URI do MongoDB

// Conexão com o MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define o esquema e modelo para a coleção 'pessoas'
const pessoaSchema = new mongoose.Schema({
  nome: String,
  idade: Number,
});

const Pessoa = mongoose.model('Pessoa', pessoaSchema);

// Endpoint POST para adicionar uma nova pessoa
app.post('/pessoas', async (req, res) => {
  try {
    const novaPessoa = new Pessoa(req.body);
    const resultado = await novaPessoa.save();
    res.status(201).json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar a pessoa' });
  }
});

// Endpoint GET para obter todas as pessoas
app.get('/pessoas', async (req, res) => {
  try {
    const pessoas = await Pessoa.find();
    res.status(200).json(pessoas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter as pessoas' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
