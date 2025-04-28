const controller = require('../controllers/TarefaController');

class TarefaApi {
    async criarTarefa(req, res) {
        const titulo = req.body.titulo
        const status = req.body.status
        const id_projeto = req.body.id_projeto
        const id_usuario = req.body.id_usuario;

        try {
            const tarefa = await controller.criarTarefa(titulo, status, id_projeto, id_usuario);
            return res.status(201).send(tarefa);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async alterarTarefa(req, res) {
        const { id } = req.params;
        const { titulo, status, id_projeto, id_usuario } = req.body;

        try {
            const tarefa = await controller.alterarTarefa(Number(id), titulo, status, id_projeto, id_usuario);
            return res.status(200).send(tarefa);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async deletarTarefa(req, res) {
        const { id } = req.params;

        try {
            await controller.deletarTarefa(Number(id));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async listarTarefas(req, res) {

        try {
            const tarefa = await controller.listarTarefas();
            return res.status(200).send(tarefa);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new TarefaApi();
