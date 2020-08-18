const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { nome, categoria, valor } = request.body;
        await connection('hortalica').insert({
            nome,
            categoria,
            valor
        });
        return response.json();
    },

    async index(_, response) {
        const hortalicas = await connection('hortalica').select('*');
        return response.json(hortalicas);
    },

    async delete(request, response) {
        const { key } = request.params;

        const hortalica = await connection('hortalica').where('key', '=', key).select('*').first();
        if (!hortalica) {
            return response.status(500).json({ mensagem: 'Hortaliça não cadastrada' })
        } else {
            await connection('hortalica').where('key', key).delete();
        }
        return response.status(204).send();
    },

    async update(request, response) {
        const { key } = request.params;
        const { nome, categoria, valor } = request.body;
        const hortalica = await connection('hortalica').where('key', '=', key).select('*').first();
        if (hortalica) {
            if (nome) {
                await connection('hortalica').where('key', '=', key).update('nome', nome);
            }
            if (categoria) {
                await connection('hortalica').where('key', '=', key).update('categoria', categoria);
            }
            if (valor) {
                await connection('hortalica').where('key', '=', key).update('valor', valor);
            }
            response.send(200);
        } else {
            response.status(500).json({ mensagem: 'Hortaliça não cadastrada.' })
        }
    },

    async findById(request, response) {
        const { key } = request.params;
        const hortalica = await connection('hortalica').where('key', '=', key).select('*').first();
        return response.json(hortalica);
    },

    async avaliacao(request, response) {

        const { keyUsuario } = request.query;
        const { key } = request.params;
        const { avaliacao } = request.body;

        if (keyUsuario && key && avaliacao) {

            const usuario = await connection('usuario').where('key', '=', keyUsuario).select('*').first();
            const hortalica = await connection('hortalica').where('key','=',key).select('*').first();
            if (usuario && hortalica) {
                if (usuario.funcao === 'CLIENTE') {
                   const result =  await connection('usuario_avaliacao').insert({
                        key_usuario: parseInt(keyUsuario),
                        key_hortalica: parseInt(key),
                        avaliacao
                    });
                    console.log(result);
                    return response.send().status(200);
                }else{
                    response.status(500).json({ mensagem: 'Usuário sem Permissão.' })
                }
            }else{
                response.status(500).json({ mensagem: 'Usuário ou Hortaliça não cadastrado(s).' })
            }
        }else{
            response.status(500).json({ mensagem: 'Dados inválidos.' })
        }
    }

}