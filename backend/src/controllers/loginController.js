
const { response, request } = require('express');
const {getToken,verificaToken}  = require('../service/loginService');


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
        const result  = verificaToken(Authentication);
        if(result){
            return response.status(200).send();
        }
        return response.status(500).json({mensagem:"Sessão encerrada."});   
    }
}