const express = require('express');
const routes  = express.Router();


const hortalicaController = require('./controllers/hortalicaController');
const usuarioController = require('./controllers/usuarioController');
const pedidoController = require('./controllers/pedidoController');
const loginController = require('./controllers/loginController');

//Rotas de Hortaliças
routes.get('/hortalica',hortalicaController.index);
routes.get('/hortalica/:key',hortalicaController.findById);
routes.post('/hortalica', hortalicaController.create);
routes.delete('/hortalica/:key',hortalicaController.delete);
routes.put('/hortalica/:key',hortalicaController.update);
routes.post('/hortalica/avaliacao/:key',hortalicaController.avaliacao);



//Rotas de Usuários
routes.get('/usuario',usuarioController.index);
routes.get('/usuario/total',usuarioController.total);
routes.get('/usuario/:key',usuarioController.findById);
routes.get('/usuarioToken',usuarioController.findByToken);
routes.post('/usuario',usuarioController.create);
routes.delete('/usuario/:key',usuarioController.delete);
routes.put('/usuario/:key',usuarioController.update);

//Rotas de Pedidos
routes.get('/pedido',pedidoController.index);
routes.get('/pedido/:key',pedidoController.findById);
routes.post('/pedido',pedidoController.create);
routes.post('/pedido/renovar/:key',pedidoController.renovar);
routes.delete('/pedido/:key',pedidoController.delete);
routes.put('/pedido/:key',pedidoController.update);

//Rotas de Login
routes.get('/login',loginController.login);
routes.get('/verificaToken',loginController.verificaLogin);
routes.post('/resetPassword',loginController.resetPassword);

module.exports = routes;