const controller = require('../controllers/ProjetoController');

class ProjetoApi {
    async criarProjeto(req, res) {
        const nome = req.body.nome
        const descricao = req.body.descricao;

        try {
            const projeto = await controller.criarProjeto(nome, descricao);
            return res.status(201).send(projeto);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async alterarProjeto(req, res) {
        const { id } = req.params;
        const { nome, descricao } = req.body;

        try {
            const projeto = await controller.alterarProjeto(Number(id), nome, descricao);
            return res.status(200).send(projeto);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async deletarProjeto(req, res) {
        const { id } = req.params;

        try {
            await controller.deletarProjeto(Number(id));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async listarProjetos(req, res) {

        try {
            const projetos = await controller.listarProjetos();
            return res.status(200).send(projetos);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new ProjetoApi();
