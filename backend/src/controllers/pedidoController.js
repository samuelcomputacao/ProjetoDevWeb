const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const { keyUsuario } = request.query;
        const usuario = await connection('usuario').where('key', '=', keyUsuario).select('*').first();
        let pedidos = [];
        if (usuario.funcao === 'FUNCIONARIO') {
            pedidos = await connection('pedido').join("usuario", "pedido.key_cliente", '=', 'usuario.key').select('pedido.key', 'pedido.data', 'usuario.nome', 'pedido.status');
        } else {
            pedidos = await connection('pedido').join("usuario", "pedido.key_cliente", '=', 'usuario.key').where('usuario.key', '=', keyUsuario).select('pedido.key', 'pedido.data', 'usuario.nome', 'pedido.status');
        }
        return response.json(pedidos);
    },

    async renovar(request, response) {
        const { key } = request.params;
        const { keyUsuario } = request.query;
        const { data } = request.query;
        const pedidoSalvo = await connection('pedido').where('key', '=', key).select('*').first();
        const usuario = await connection('usuario').where('key', '=', keyUsuario).select('*').first();
        if (pedidoSalvo) {
            if (usuario.key === pedidoSalvo.key_cliente) {
                const pedido = await connection('pedido').insert({
                    data,
                    key_cliente: pedidoSalvo.key_cliente,
                    status: 'REALIZADO'
                });
                const idPedido = pedido[0];
                const pedido_hortalica = await connection('pedido_hortalica').where('key_pedido', '=', key).select('*');
                pedido_hortalica.forEach(async (ped_hort)=>{
                    await connection('pedido_hortalica').insert({
                        key_pedido: idPedido,
                        key_hortalica: ped_hort.key_hortalica,
                        quantidade: ped_hort.quantidade
                    });
                });
                return response.status(200).send();
            }else{
                return response.status(500).json({mensagem:'Apenas o cliente do pedido pode renovar.'});
            }

        }else{
            return response.status(500).json({mensagem:'Pedido não encontrado.'});
        }
    },

    async findById(request, response) {
        const { key } = request.params;
        const usuario = await connection('usuario').where('key', '=', key).select('*').first();
        if (usuario) {
            return response.status(200).json(usuario);
        }
        return response.status(500).json({ mensagem: 'O Usuário não existe.' });
    },

    async create(request, response) {
        const { keyUsuario } = request.query;
        const { data, hortalicas } = request.body;

        const usuario = await connection('usuario').where('key', '=', keyUsuario).select('funcao').first();
        if (usuario.funcao !== 'CLIENTE') {
            return response.status(401).json({ mensagem: 'O Usuário não está permitido a realizar pedidos' });
        }

        const pedido = await connection('pedido').insert({
            data,
            key_cliente: keyUsuario,
            status: 'REALIZADO'
        });
        const idPedido = pedido[0];
        await hortalicas.forEach(
            async (hort) => {
                const hortalica = await connection('hortalica').where('key', '=', hort.keyHortalica).select('*');
                if (hortalica) {
                    await connection('pedido_hortalica').insert({
                        key_pedido: idPedido,
                        key_hortalica: hort.keyHortalica,
                        quantidade: hort.quantidade
                    });
                }
            }
        );
        return response.status(200).send();
    },

    async update(request, response) {
        const { key } = request.params;
        const { nome, funcao, senha } = request.body;

        if (nome) {
            await connection('usuario').where('key', '=', key).update('nome', nome);
        }
        if (senha) {
            await connection('usuario').where('key', '=', key).update('senha', senha);
        }
        if (funcao) {
            await connection('usuario').where('key', '=', key).update('funcao', funcao);
        }
        return response.json();
    },

    async delete(request, response) {
        const { key } = request.params;
        const { keyUsuario } = request.query;
        const pedido = await connection('pedido').where('key', '=', key).select('*').first();
        if (pedido) {
            const usuario = await connection('usuario').where('key', '=', keyUsuario).select('*').first();
            if (usuario) {
                if (pedido.key_cliente === usuario.key || usuario.funcao === 'FUNCIONARIO') {
                    if (pedido.status === 'REALIZADO') {
                        await connection('pedido').where('key', '=', key).update('status', 'CANCELADO');
                        return response.status(200).send();
                    } else {
                        return response.status(500).json({ mensagem: 'O pedido não pode ser cancelado ou já foi cancelado.' })
                    }
                } else {
                    return response.status(401).json({ mensagem: 'O usuário não tem permissão de cancelar o pedido' });
                }
            }
        }
        return response.status(500).json({ mensagem: 'O pedido não existe.' });
    }
}