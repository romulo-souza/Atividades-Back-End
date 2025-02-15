var express = require('express');
var router = express.Router();

//Importação do postService
const taskService = require('../model/taskService');

//listar as tasks
router.get('/', async (req,res) => {
  res.json({posts: await taskService.getTasks()});
});

//Visualizar uma task
router.get('/view/:taskId', async (req, res) => {
  res.json({task: await taskService.getTaskById(req.params.taskId)});
});

//listagem de task(s) por autor
router.get('/author/:authorId', async (req, res) => {
  res.json({posts: await taskService.getTaskByAuthor(req.params.authorId)})//req.params -> captura parâmetros de rota
});


//Inserir uma nova task
router.post('/', async (req, res) => {
  
  try {

    const { title, description, AuthorId} = req.body; //desestruturação do objeto 
    //Verificação de dados/propriedades faltantes
    if (!title || !description || !AuthorId) {
      return res.status(400).json({ mensagem: "Dados faltantes!" });
    }

    let task = await taskService.createTask(req.body); // req.body converte o json enviado para objeto atraves do middleware express.json()
    res.json({task: task});
  }
  catch(e) {
    res.status(400).json({mensagem: "falha na criação da task!"});
  }
});

//Alterar uma task pelo id
router.put('/:id', async (req, res) => {
  
  try {

    const { title, description, AuthorId } = req.body;
    
    if (!title || !description || !AuthorId) {
      return res.status(400).json({ mensagem: "Dados faltantes!" });
    }
    
    let task = await taskService.updateTaskById(req.body, req.params.id); 
    res.json({task: task}); //retorna o numero de linhas afetadas
  }
  catch(e) {
    res.status(400).json({mensagem: "falha na atualização da task!"});
  }
});

//Excluir um post pelo id
router.delete('/:id', async(req, res) => {
  await taskService.deleteTaskById(req.params.id);
  res.json({mensagem: "task excluída com sucesso!"});
});

module.exports = router;
