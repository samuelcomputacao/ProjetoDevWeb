const express = require('express');
const routes  = express.Router();


const hortalicaController = require('./controllers/hortalicaController');
const usuarioController = require('./controllers/usuarioController');


routes.get('/hortalica',hortalicaController.index);
routes.get('/hortalica/:key',hortalicaController.findById);
routes.post('/hortalica', hortalicaController.create);
routes.delete('/hortalica/:key',hortalicaController.delete);
routes.put('/hortalica',hortalicaController.update);


routes.get('/usuario',usuarioController.index);
routes.get('/usuario/:key',usuarioController.findById);
routes.post('/usuario',usuarioController.create);
routes.delete('/usuario/:key',usuarioController.delete);
routes.put('/usuario',usuarioController.update);

module.exports = routes;