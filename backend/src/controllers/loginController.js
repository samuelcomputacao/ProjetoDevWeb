
const {getToken,verificaToken}  = require('../service/loginService');
const connection = require('../database/connection');


module.exports = {
    async login(request,response) {
        const {cpfCnpj, senha} = request.query;
        const token = await getToken(cpfCnpj,senha);
        if(token){
            return response.json({auth:true,token});
        }
        return response.status(500).json({mensagem:'Cpf/Cnpj ou senha incorretos!'});
    },

    async verificaLogin(request,response){
        const {Authentication} = request.query;
        const result  = await verificaToken(Authentication);
        if(result){
            return response.json({auth:true});
        }
        return response.status(500).json({mensagem:"Sessão encerrada."});   
    },

    async resetPassword(request,response){
        const {cpfCnpj,senha} = request.body;
        const usuario = await connection('usuario').where('cpfCnpj','=',cpfCnpj).select('*').first();
        if(usuario){
            await connection('usuario').where('cpfCnpj','=',cpfCnpj).update('senha',senha);
            return response.status(200).send();
        }
        return response.status(500).json({mensagem:"Cpf/Cnpj não cadastrado ou sem formatação."});   
    }
}