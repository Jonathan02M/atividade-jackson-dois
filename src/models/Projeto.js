const database = require('../config/database');

class Projeto {
    constructor() {
        this.model = database.define('projetos', {
            id: {
                type: database.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: database.Sequelize.STRING
            },
            descricao: {
                type: database.Sequelize.STRING
            }
        });
    }
}

module.exports = (new Projeto).model;
