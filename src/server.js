const express = require('express');
const UsuarioApi = require('./API/Usuario');
const ProjetoApi = require('./API/Projeto');
const TarefaApi = require('./API/Tarefa');
const database = require('./config/database');

console.log('Starting server....')
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send({ response: 'Hello World!' });
})
app.post('/login', UsuarioApi.login);
app.post('/Usuario', UsuarioApi.criarUsuario);

// Aplica a validação do token para as rotas abaixo
//app.use(usuariosApi.validarToken);
app.get('/Usuario', UsuarioApi.listarUsuario);
app.put('/Usuario/:id', UsuarioApi.alterarUsuario);
app.delete('/Usuario/:id', UsuarioApi.deletarUsuario);

app.post('/projetos', ProjetoApi.criarProjeto);
app.get('/projetos', ProjetoApi.listarProjetos);
app.put('/projetos/:id', ProjetoApi.alterarProjeto);
app.delete('/projetos/:id', ProjetoApi.deletarProjeto);

app.post('/Tarefas', TarefaApi.criarTarefa);
app.get('/Tarefas', TarefaApi.listarTarefas);
app.put('/Tarefas/:id', TarefaApi.alterarTarefa);
app.delete('/Tarefas/:id', TarefaApi.deletarTarefa);

database.sync({ force: false })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        })
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });

