const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
const CHAVE = 'CHAVESECRETAAPP';

async function getToken(cpfCnpj, senha) {
    const usuario = await connection('usuario').where('cpfCnpj', '=', cpfCnpj).select('*').first();
    if (usuario) {
        if (senha === usuario.senha) {
            const token = jwt.sign({ id: usuario.key }, CHAVE, { expiresIn: 3600 });
            return token;
        }
    }
    return null;
}

async function verificaToken(token) {
    const usuario = await getUsuario(token);
    if (usuario) {   
        return true;
    }
    return false;
}

async function getUsuario(token){
    if (token) {
        const { id } = jwt.verify(token, CHAVE);
        const usuario = await connection('usuario').where('key', '=', id).select('*').first();
        if (usuario) {
            return usuario;
        }
    }
    return undefined;
}

module.exports = {getToken,verificaToken,getUsuario}