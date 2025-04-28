const Projeto = require('../models/Projeto');

class ProjetoController {

    async criarProjeto(nome, descricao) {
        if (
            nome === undefined
            || descricao === undefined
        ) {
            throw new Error('Nome e descrição são obrigatórios');
        }
        const projeto = await Projeto.create({ nome, descricao });

        return projeto;
    }

    async buscarPorId(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const projeto = await Projeto.findByPk(id);

        if (!Projeto) {
            throw new Error('Projeto não encontrado');
        }
        return projeto;
    }

    async alterarProjeto(id, nome, descricao) {
        if (
            id === undefined
            || nome === undefined
            || descricao === undefined
        ) {
            throw new Error('Id, nome, descrição são obrigatórios');
        }

        const projeto = await this.buscarPorId(id);

        projeto.nome = nome;
        projeto.descricao = descricao;
        projeto.save();

        return projeto;
    }

    async deletarProjeto(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }
        const projeto = await this.buscarPorId(id);

        projeto.destroy();
    }

    async listarProjetos() {
        return Projeto.findAll();
    }
}

module.exports = new ProjetoController();