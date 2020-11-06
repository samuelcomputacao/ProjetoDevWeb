const express = require('express');
const routes  = express.Router();


const hortalicaController = require('./controllers/hortalicaController');
const usuarioController = require('./controllers/usuarioController');
const pedidoController = require('./controllers/pedidoController');
const loginController = require('./controllers/loginController');


//Rotas de Hortaliças
routes.get('/hortalica',(req,res) => { return redirect(req,res,hortalicaController.index)});
routes.get('/hortalica/:key',(req,res) => { return redirect(req,res,hortalicaController.findById)});
routes.post('/hortalica',(req,res) => { return redirect(req,res,hortalicaController.create)});
routes.delete('/hortalica/:key',(req,res) => { return redirect(req,res,hortalicaController.delete)});
routes.put('/hortalica/:key',(req,res) => { return redirect(req,res,hortalicaController.update)});
routes.post('/hortalica/avaliacao/:key',(req,res) => { return redirect(req,res,hortalicaController.avaliacao)});



//Rotas de Usuários
routes.get('/usuario',(req,res) => { return redirect(req,res,usuarioController.index)});
routes.get('/usuario/total',(req,res) => { return redirect(req,res,usuarioController.total)});
routes.get('/usuario/:key',(req,res) => { return redirect(req,res,usuarioController.findById)});
routes.get('/usuarioToken',(req,res) => { return redirect(req,res,usuarioController.findByToken)});
routes.post('/usuario',(req,res) => { return redirect(req,res,usuarioController.create)});
routes.delete('/usuario/:key',(req,res) => { return redirect(req,res,usuarioController.delete)});
routes.put('/usuario/:key',(req,res) => { return redirect(req,res,usuarioController.update)});

//Rotas de Pedidos
routes.get('/pedido',(req,res) => { return redirect(req,res,pedidoController.index)});
routes.get('/pedido/:key',(req,res) => { return redirect(req,res,pedidoController.findById)});
routes.post('/pedido',(req,res) => { return redirect(req,res,pedidoController.create)});
routes.post('/pedido/renovar/:key',(req,res) => { return redirect(req,res,pedidoController.renovar)});
routes.put('/pedido/aceitar/:key',(req,res) => { return redirect(req,res,pedidoController.aceitar)});
routes.delete('/pedido/:key',(req,res) => { return redirect(req,res,pedidoController.delete)});
routes.put('/pedido/:key',(req,res) => { return redirect(req,res,pedidoController.update)});

//Rotas de Login
routes.get('/login',(req,res) => { return redirect(req,res,loginController.login)});
routes.get('/verificaToken',(req,res) => { return redirect(req,res,loginController.verificaLogin)});
routes.post('/resetPassword',(req,res) => { return redirect(req,res,loginController.resetPassword)});

const redirect = (req, res, route) => {
    try{
        return route(req, res);
    }catch{
        return res.status(500).json({"mensagem":"Ocorreu um erro interno!"});
    }
}

module.exports = routes;