const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;  

class UsuarioController {
    async criarUsuario(nome, email, senha) {
        if (
            nome === undefined
            || email === undefined
            || senha === undefined
        ) {
            throw new Error('Nome, email e senha são obrigatórios');
        }
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
        const usuario = await Usuario
            .create({ nome, email, senha: senhaCriptografada });

        return usuario;
    }

    async buscarPorId(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        return usuario;
    }

    async alterarUsuario(id, nome, email, senha) {
        if (
            id === undefined
            || nome === undefined
            || email === undefined
            || senha === undefined
        ) {
            throw new Error('Id, nome, email e senha são obrigatórios');
        }

        const usuario = await this.buscarPorId(id);

        usuario.nome = nome;
        usuario.email = email;
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
        usuario.senha = senhaCriptografada;
        usuario.save();

        return usuario;
    }

    async deletarUsuario(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const usuario = await this.buscarPorId(id);

        usuario.destroy();
    }

    async listarUsuarios() {
        return Usuario.findAll();
    }

    async login(email, senha) {
        if (!email || !senha) {
            throw new Error('Email e senha são obrigatórios');
        }

        const usuario = await Usuario.findOne({ where: { email }});

        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            throw new Error('Senha inválida');
        }
        const jwtToken = jwt.sign({ id: usuario.id }, JWT_SECRET_KEY);

        usuario.token = jwtToken;
        await usuario.save();
        
        return { token: jwtToken };
        
    }

  
    
}

module.exports = new UsuarioController();