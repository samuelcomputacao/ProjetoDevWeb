const express = require('express');
const routes  = express.Router();


const hortalicaController = require('./controllers/hortalicaController');
const usuarioController = require('./controllers/usuarioController');


routes.get('/hortalica',hortalicaController.index);
routes.post('/hortalica', hortalicaController.create);
routes.delete('/hortalica/:id',hortalicaController.delete);


routes.get('/usuario',usuarioController.index);
routes.post('/usuario',usuarioController.create);
routes.delete('/usuario',usuarioController.delete);
routes.put('/usuario',usuarioController.update);

module.exports = routes;