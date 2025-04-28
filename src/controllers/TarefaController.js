const Tarefa = require('../models/Tarefa');

class TarefaController {

    async criarTarefa(titulo, status, id_projeto, id_usuario) {
        if (
            titulo === undefined
            || status === undefined
            || id_projeto === undefined
            || id_usuario === undefined

        ) {
            throw new Error('Titulo, status, projeto e usuario são obrigatórios');
        }
        const tarefa = await Tarefa.create({ titulo, status, id_projeto, id_usuario });

        return tarefa;
    }

    async buscarPorId(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const tarefa = await Tarefa.findByPk(id);

        if (!tarefa) {
            throw new Error('Tarefa não encontrada');
        }
        return tarefa;
    }

    async alterarProjeto(id, titulo, status, id_projeto, id_usuario) {
        if (
            id === undefined
            || titulo === undefined
            || status === undefined
            || id_projeto === undefined
            || id_usuario === undefined
        ) {
            throw new Error('Id, titulo, status, projeto e usuario são obrigatórios');
        }

        const tarefa = await this.buscarPorId(id);

        tarefa.titulo = titulo;
        tarefa.status = status;
        tarefa.id_projeto = id_projeto;
        tarefa.id_usuario = id_usuario;
        tarefa.save();

        return tarefa;
    }

    async deletarTarefa(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }
        const tarefa = await this.buscarPorId(id);

        tarefa.destroy();
    }

    async listarTarefas() {
        return Tarefa.findAll();
    }
}

module.exports = new TarefaController();