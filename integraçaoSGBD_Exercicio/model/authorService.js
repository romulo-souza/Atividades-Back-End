//Gerenciar operações/serviços sobre a tabela Authors

//importação
const {AuthorModel} = require('./bd');

//Eportação de serviços/operaçoes do BD para a tabela Authors
module.exports = {  
    createAuthor: async (name) => {
        return await AuthorModel.create({name: name}); 
    },
    getAuthorById: async (authorId) => {
        return await AuthorModel.findByPk(authorId);
    }
}