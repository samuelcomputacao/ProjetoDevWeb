const connection = require('../database/connection');
const {getUsuario}  = require('../service/loginService');

module.exports = {

    async index(request,response){
        const{page, pageSize, nome, funcao, cpfCnpj, key, orderby} = request.query;
        const conn =  connection('usuario');
        if(nome){
            conn.where('nome','like',`%${nome}%`);
        }
        if(funcao){
            conn.andWhere('funcao','=',funcao);
        }
        if(cpfCnpj){
            conn.andWhere('cpfCnpj','=',cpfCnpj);
        }
        if(key){
            conn.andWhere('key','=',key);
        }
        if(orderby){
            conn.orderBy(orderby);
        }
        const usuarios = await conn.select('*').offset((page-1)*pageSize).limit(pageSize);
        return response.json(usuarios);
    },

    async total(request,response){
        const{nome, funcao, cpfCnpj, key} = request.query;
        const conn = connection('usuario');
        if(nome){
            conn.where('nome','like',`%${nome}%`);
        }
        if(funcao){
            conn.andWhere('funcao','=',funcao);
        }
        if(cpfCnpj){
            conn.andWhere('cpfCnpj','=',cpfCnpj);
        }
        if(key){
            conn.andWhere('key','=',key);
        }
        const result = await conn.count('key',{as:'total'}).first();
        const {total} = result;
        return response.status(200).json(total);
    },

    async findById(request,response){
        const {key} = request.params;
        if((!key||key==='')) return response.status(400).json({"mensagem":"Há inconcistência nos dados"});
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
        if((!key||key==='')) return response.status(400).json({"mensagem":"Há inconcistência nos dados"});
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
        if((!key||key==='')) return response.status(400).json({"mensagem":"Há inconcistência nos dados"});

        const usuario = await connection('usuario').where('key','=',key).select('key').first();
        if(usuario){
            await connection('usuario').where('key','=',key).delete();
            return response.status(200).send();
        }
        return response.status(500).json({mensagem:'O Usuário não existe.'});
    }
}