var express = require('express');
var router = express.Router();

//Importação do authorService
const authorService = require('../model/authorService');

//listar autor pelo id
router.get('/:authorId', async(req, res) => {
   res.json({Autor: await authorService.getAuthorById(req.params.authorId)}); 
})

//criar autor
router.post('/', async (req, res) => {
    try{
        const {name} = req.body;
        if(!name){
            return res.status(400).json({mensagem: 'Dados faltantes!'})
        }

        let author = await authorService.createAuthor(name);
        res.json({Autor: author});
    }
    catch(e){
        res.status(400).json({mensagem: "falha na criação do Autor!"});
    }
});

module.exports = router;