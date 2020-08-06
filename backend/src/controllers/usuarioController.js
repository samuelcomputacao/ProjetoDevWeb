const connection = require('../database/connection');
const {getUsuario}  = require('../service/loginService');

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

    async findByToken(request,response){
        const {Authentication} = request.query;
        const usuario = await getUsuario(Authentication);
        if(usuario){
            return response.status(200).json(usuario);
        }
        return response.status(500).json({mensagem:'O Usuário não existe.'});
    },

    async create(request, response){
        const {nome, cpfCnpj, senha, funcao,tipoUsuario,avatar} = request.body;
        
        const usuarios = await connection('usuario').where('cpfCnpj',cpfCnpj).select('key').first();
        if(usuarios){
           return response.status(500).json({mensagem:'O cpf/cnpj já está cadastrado!'});
        }

       await connection('usuario').insert({
            nome,
            cpfCnpj,
            senha,
            funcao,
            tipoUsuario,
            avatar
        });
        return response.json();
    },

    async update(request, response){
        const {key} = request.params;
        const {nome, funcao, senha, avatar} = request.body;
        
        if(nome){
            await connection('usuario').where('key','=',key).update('nome',nome);
        }
        if(senha){
            await connection('usuario').where('key','=',key).update('senha',senha);
        }
        if(funcao){
            await connection('usuario').where('key','=',key).update('funcao',funcao);
        }
        if(avatar){
            await connection('usuario').where('key','=',key).update('avatar',avatar);
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