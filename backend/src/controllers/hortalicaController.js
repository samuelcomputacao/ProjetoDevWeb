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

        const hortalica = await connection('hortalica').where('key','=',key).select('*').first();
        if(!hortalica){
            return response.status(500).json({mensagem:'Hortaliça não cadastrada'})
        }else{
            await connection('hortalica').where('key', key).delete(); 
        }
        return response.status(204).send();
    },

    async update(request, response) {
        const { key } = request.query;
        const { nome, categoria, valor } = response.body;
        const hortalica = await connection('hortalica').where('key', '=', key).select('*').first();
        if (hortalica) {
            if (nome) {
                await connection('hortalica').where('key', '=', key).update('nome', nome);
            }
            if (categoria) {
                await connection('hortalica').where('key','=',key).update('categoria',categoria);
            }
            if(valor){
                await connection('hortalica').where('key','=',key).update('valor',valor);
            }
        } else {
            response.status(500).json({ mensagem: 'Hortaliça não cadastrada.' })
        }
    },

    async findById(request, response) {
        const { key } = request.params;
        const hortalica = await connection('hortalica').where('key', '=', key).select('*').first();
        return response.json(hortalica);
    }

}