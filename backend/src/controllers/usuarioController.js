const connection = require('../database/connection');

module.exports = {

    async index(request,response){
        const usuarios = await connection('usuario').select('*');
        return response.json(usuarios);
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

    },

    async delete(request, response){

    }
}