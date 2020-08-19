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

    async index(request, response) {
        const { keyUsuario } = request.query;
        const usuario = await connection('usuario').where('key', '=', keyUsuario).select('*').first();
        const hortalicas = await connection('hortalica').select('*');
        let retorno = [];
        if (usuario.funcao === 'CLIENTE') {
            let i = 0;
            let hortalica;
            while (i < hortalicas.length) {
                hortalica = hortalicas[i];
                const result = await connection('usuario_avaliacao').where('key_usuario', '=', keyUsuario).andWhere('key_hortalica', '=', hortalica.key).select('avaliacao').first();
                let aval;
                if (result) {
                    const { avaliacao } = result;
                    aval = avaliacao;
                }
                retorno = [...retorno, {
                    key: hortalica.key,
                    nome: hortalica.nome,
                    categoria: hortalica.categoria,
                    avaliacao: aval,
                    valor: hortalica.valor,
                }];
                i += 1;
            }
        } else {
            retorno = hortalicas;
        }
        return response.json(retorno);
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
            const hortalica = await connection('hortalica').where('key', '=', key).select('*').first();
            if (usuario && hortalica) {
                if (usuario.funcao === 'CLIENTE') {
                    const result = await connection('usuario_avaliacao').where('key_usuario', '=', keyUsuario).andWhere('key_hortalica', '=', key).select('*').first();
                    if (result) {
                        await connection('usuario_avaliacao').where('key_usuario', '=', keyUsuario).andWhere('key_hortalica', '=', key).update('avaliacao',avaliacao);
                    } else {
                        await connection('usuario_avaliacao').insert({
                            key_usuario: parseInt(keyUsuario),
                            key_hortalica: parseInt(key),
                            avaliacao
                        });
                    }
                    return response.send().status(200);
                } else {
                    response.status(500).json({ mensagem: 'Usuário sem Permissão.' })
                }
            } else {
                response.status(500).json({ mensagem: 'Usuário ou Hortaliça não cadastrado(s).' })
            }
        } else {
            response.status(500).json({ mensagem: 'Dados inválidos.' })
        }
    }

}