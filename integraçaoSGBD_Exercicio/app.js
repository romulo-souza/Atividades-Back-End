const express = require('express');
const logger = require('morgan');
const { sequelize } = require('./model/bd'); // Importar o sequelize para inicializar o banco de dados

const app = express();

// Função para iniciar o servidor
function startServer() {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

// Inicializa o banco de dados antes de iniciar o servidor
sequelize.sync() // sync() -> Sincroniza os modelos definidos com o banco de dados, criando as tabelas se elas não existirem.
  .then(() => {
    console.log("Banco de dados sincronizado!");
    startServer(); // Inicia o servidor após o banco de dados ser sincronizado
  })
  .catch((e) => {
    console.error("Erro ao sincronizar o banco: ", e);
    process.exit(1); // Encerra o processo em caso de erro no banco
  });

// Middlewares
app.use(logger('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

// Definição das rotas
var taskRouter = require('./routes/task');
app.use('/api/tasks', taskRouter);

var authorRouter = require('./routes/author');
app.use('/api/authors', authorRouter);

module.exports = app;
