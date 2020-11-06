const connection = require('../database/connection');

async function getMediaAvaliacao(key) {
    const { soma } = await connection('usuario_avaliacao').where('key_hortalica', '=', key).sum('avaliacao', { as: 'soma' }).first();
    const { total } = await connection('usuario_avaliacao').where('key_hortalica', '=', key).count('avaliacao', { as: 'total' }).first();
    return (soma / total);
}

async function getAvaliacao(keyUsuario, key) {
    const usuario = await connection('usuario').where('key', '=', keyUsuario).select('*').first();
    let aval = 0;
    if (usuario.funcao === 'CLIENTE') {
        const result = await connection('usuario_avaliacao').where('key_usuario', '=', keyUsuario).andWhere('key_hortalica', '=', key).select('avaliacao').first();
        if (result) {
            const { avaliacao } = result;
            aval = avaliacao;
        }
    } else {
        aval = await getMediaAvaliacao(key);
    }
    return aval;
}

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
        if((!keyUsuario||keyUsuario==='')) return response.status(400).json({"mensagem":"Há inconcistência nos dados"});
        const hortalicas = await connection('hortalica').select('*');
        let retorno = [];

        let i = 0;
        let hortalica;
        while (i < hortalicas.length) {
            hortalica = hortalicas[i];
            const media = await getAvaliacao(keyUsuario, hortalica.key);
            retorno = [...retorno, {
                key: hortalica.key,
                nome: hortalica.nome,
                categoria: hortalica.categoria,
                avaliacao: media,
                valor: hortalica.valor,
            }];
            i += 1;
        }

        return response.json(retorno);
    },

    async delete(request, response) {
        const { key } = request.params;
        if((!key||key==='')) return response.status(400).json({"mensagem":"Há inconcistência nos dados"});
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

        if((!key||key==='')) return response.status(400).json({"mensagem":"Há inconcistência nos dados"});
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
            return response.send(200);
        } else {
            return response.status(500).json({ mensagem: 'Hortaliça não cadastrada.' })
        }
    },

    async findById(request, response) {
        const { key } = request.params;
        const { keyUsuario } = request.query;
        if((!keyUsuario||keyUsuario==='') || (!key || key==='')) return response.status(400).json({"mensagem":"Há inconcistência nos dados"});
        const hortalica = await connection('hortalica').where('key', '=', key).select('*').first();
        hortalica.avaliacao = await this.getAvaliacao(keyUsuario, hortalica.key);
        return response.json(hortalica);
    },

    async avaliacao(request, response) {

        const { keyUsuario } = request.query;
        const { key } = request.params;
        const { avaliacao } = request.body;
        if((!keyUsuario||keyUsuario==='') || !key || !avaliacao) return response.status(400).json({"mensagem":"Há inconcistência nos dados"});
        if (keyUsuario && key && avaliacao) {

            const usuario = await connection('usuario').where('key', '=', keyUsuario).select('*').first();
            const hortalica = await connection('hortalica').where('key', '=', key).select('*').first();
            if (usuario && hortalica) {
                if (usuario.funcao === 'CLIENTE') {
                    const result = await connection('usuario_avaliacao').where('key_usuario', '=', keyUsuario).andWhere('key_hortalica', '=', key).select('*').first();
                    if (result) {
                        await connection('usuario_avaliacao').where('key_usuario', '=', keyUsuario).andWhere('key_hortalica', '=', key).update('avaliacao', avaliacao);
                    } else {
                        await connection('usuario_avaliacao').insert({
                            key_usuario: parseInt(keyUsuario),
                            key_hortalica: parseInt(key),
                            avaliacao
                        });
                    }
                    return response.send().status(200);
                } else {
                    return response.status(500).json({ mensagem: 'Usuário sem Permissão.' })
                }
            } else {
                return response.status(500).json({ mensagem: 'Usuário ou Hortaliça não cadastrado(s).' })
            }
        } else {
            return response.status(500).json({ mensagem: 'Dados inválidos.' })
        }
    }

}