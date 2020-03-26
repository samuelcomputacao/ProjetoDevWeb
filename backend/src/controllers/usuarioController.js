const connection = require('../database/connection');

module.exports = {

    async index(_,response){
        const usuarios = await connection('usuario').select('*');
        return response.json(usuarios);
    },

    async findById(request,response){
        const {key} = request.params;
        const usuario = await connection('usuario').where('key','=',key).select('nome','funcao','cpfCnpj').first();
        if(usuario){
            return response.status(200).json(usuario);
        }
        return response.status(500).json({mensagem:'O Usuário não existe.'});
    },

    async create(request, response){
        const {nome, cpfCnpj, senha, funcao} = request.body.usuario;
        const usuarios = await connection('usuario').where('cpfCnpj',cpfCnpj).select('key').first();
        if(usuarios){
           return response.status(500).json({mensagem:'O cpf/cnpj já está cadastrado!'});
        }

       await connection('usuario').insert({
            nome,
            cpfCnpj,
            senha,
            funcao
        });
        return response.json();
    },

    async update(request, response){
        const {usuario} = request.body;
        if(usuario.nome){
            await connection('usuario').where('cpfCnpj','=',usuario.cpfCnpj).update('nome',usuario.nome);
        }
        if(usuario.senha){
            await connection('usuario').where('cpfCnpj','=',usuario.cpfCnpj).update('senha',usuario.senha);
        }
        if(usuario.funcao){
            await connection('usuario').where('cpfCnpj','=',usuario.cpfCnpj).update('funcao',usuario.funcao);
        }
        return response.json();
    },

    async delete(request, response){
        const {key} = request.params;
        const usuario = await connection('usuario').where('key','=',key).select('key').first();
        if(usuario){
            await connection('usuario').where('key','=',key).delete();
            return response.status(200).send();
        }
        return response.status(500).json({mensagem:'O Usuário não existe.'});
    }
}