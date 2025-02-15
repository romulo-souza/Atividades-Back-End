//Conexão com o BD e Criação da estrutura do BD (tabelas/models)

//importação do Sequelize e do DataTypes provenientes do pacote sequelize
const {Sequelize, DataTypes}  = require('sequelize'); 
 
//conexao com o BD
const sequelize = new Sequelize({ 
    dialect: "sqlite",
    storage: "./database.sqlite" 
})  

//Model (tabela) do Autor
const AuthorModel = sequelize.define('Authors', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    }
});

//Model (tabela) de Task
const TaskModel = sequelize.define('Tasks', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

});

//Tabela Task terá como chave estrangeira a chave primária da tabela Authors (id do Autor) (uma task pertence a um e somente um autor relacionado)
TaskModel.belongsTo(AuthorModel)


//exportação 
module.exports = {
    sequelize: sequelize,
    AuthorModel: AuthorModel,
    TaskModel: TaskModel,
}
 