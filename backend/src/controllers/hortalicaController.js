const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { nome, categoria, valor } = request.body;
        console.log(request.body);
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

    async delete(request,response){
        const {id}  = request.params;
        await connection('hortalica').where('id',id).delete();
        return response.status(204).send();
    }

}