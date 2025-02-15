//Gerenciar operações/serviços sobre a tabela Tasks

//importação
const { TaskModel } = require('./bd');

// Eportação de serviços/operaçoes do BD para a tabela Tasks
module.exports = {

    createTask: async (task) => { 
        return await TaskModel.create(task); //passa o objeto task a ser criado como parametro
    },

    updateTaskById: async (task, taskId) => {
        return await TaskModel.update(task, {where: {id: taskId}}); 
    },

    deleteTaskById: async (taskId) => {
        return await TaskModel.destroy({where: {id: taskId}});
    },

    getTasks: async () => {
        return await TaskModel.findAll();
    },

    getTaskById: async (taskId) => {
        return await TaskModel.findByPk(taskId);
    },

    getTaskByAuthor: async (authorId) => {
        return await TaskModel.findAll({where: {AuthorId: authorId}}); //AuthorId é a chave estrangeira na tabela Tasks que referencia a tabela Authors
    }
}
