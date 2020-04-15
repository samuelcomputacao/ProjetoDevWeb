const connection = require('../database/connection');

module.exports = {

    async index(_,response){
        const usuarios = await connection('usuario').select('*');
        return response.json(usuarios);
    },

    async findById(request,response){
        const {key} = request.params;
        const usuario = await connection('usuario').where('key','=',key).select('*').first();
        if(usuario){
            return response.status(200).json(usuario);
        }
        return response.status(500).json({mensagem:'O Usuário não existe.'});
    },

    async create(request, response){
        const {nome, cpfCnpj, senha, funcao,tipoUsuario} = request.body;
        
        const usuarios = await connection('usuario').where('cpfCnpj',cpfCnpj).select('key').first();
        if(usuarios){
           return response.status(500).json({mensagem:'O cpf/cnpj já está cadastrado!'});
        }

       await connection('usuario').insert({
            nome,
            cpfCnpj,
            senha,
            funcao,
            tipoUsuario
        });
        return response.json();
    },

    async update(request, response){
        const {key} = request.params;
        const {nome, funcao, senha} = request.body;
        
        if(nome){
            await connection('usuario').where('key','=',key).update('nome',nome);
        }
        if(senha){
            await connection('usuario').where('key','=',key).update('senha',senha);
        }
        if(funcao){
            await connection('usuario').where('key','=',key).update('funcao',funcao);
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