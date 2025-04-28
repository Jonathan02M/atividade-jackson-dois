const database = require('../config/database');

class Tarefa {
    constructor() {
        this.model = database.define('tarefas', {

            id: {
                type: database.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            titulo: {
                type: database.Sequelize.STRING
            },

            status: {
                type: database.Sequelize.STRING
            },

            id_projeto: {
                type: database.Sequelize.INTEGER
            },

            id_usuario: {
                type: database.Sequelize.INTEGER
            }
        });
    }
}

module.exports = (new Tarefa).model;
